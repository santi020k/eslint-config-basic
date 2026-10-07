import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import type { EslintConfigOptions } from '@santi020k/eslint-config-basic'
import { defineConfig } from '@santi020k/eslint-config-basic'
import type { TSESLint } from '@typescript-eslint/utils'
import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { handleDoctor } from '../../basic/src/cli.js'
import { compareConsumerOverrides, getConsumerOverrideGuidance, toEffectiveConfig } from '../../basic/src/cli-consumer-guidance.js'

import { getEffectiveRuleValue, lintText, lintTextWithFix } from './test-utils.js'

const roots: string[] = []
const project = (): string => {
  const root = mkdtempSync(join(tmpdir(), 'eslint-consumer-improvements-'))

  roots.push(root)
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'consumer', type: 'module' }))

  return root
}

afterEach(() => {
  roots.splice(0).forEach(root => {
    rmSync(root, { force: true, recursive: true })
  })
  vi.restoreAllMocks()
  process.exitCode = undefined
})

describe('consumer improvements', () => {
  test('doctor retains overrides when comparison cannot run', async () => {
    const root = project()
    const configPath = join(root, 'eslint.config.mjs')

    expect(await getConsumerOverrideGuidance(root, null)).toEqual([])
    expect(await getConsumerOverrideGuidance(root, configPath)).toEqual([])
    writeFileSync(configPath, 'throw new Error(\'consumer config unavailable\')\n')
    const warnings = await getConsumerOverrideGuidance(root, configPath)

    expect(warnings.join(' ')).toContain('consumer config unavailable')
    expect(warnings.join(' ')).toContain('Keep existing overrides')
    expect(readFileSync(configPath, 'utf8')).toBe('throw new Error(\'consumer config unavailable\')\n')
  })

  test('effective config narrowing rejects missing data and retains validated fields', () => {
    expect(toEffectiveConfig(null)).toBeUndefined()
    expect(toEffectiveConfig(['invalid'])).toBeUndefined()
    expect(toEffectiveConfig({ rules: false, settings: 'invalid', languageOptions: false })).toEqual({
      languageOptions: { parserOptions: undefined }, rules: undefined, settings: undefined
    })
    expect(toEffectiveConfig({ rules: { 'no-console': [2] }, settings: { example: true } })).toMatchObject({
      rules: { 'no-console': [2] }, settings: { example: true }
    })
  })

  test('doctor inventories independent workspace configs and lint scripts', async () => {
    const root = project()

    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'workspace', type: 'module', workspaces: ['apps/*'] }))
    mkdirSync(join(root, 'apps/mobile'), { recursive: true })
    writeFileSync(join(root, 'apps/mobile/package.json'), JSON.stringify({ name: 'mobile', scripts: { lint: 'expo lint' } }))
    writeFileSync(join(root, 'apps/mobile/eslint.config.mjs'), 'export default []\n')
    writeFileSync(join(root, 'eslint.config.mjs'), 'export default []\n')
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(root, true)

    const output = JSON.parse(String(log.mock.calls[0]?.[0])) as {
      projects: {
        path: string
        lintOwnership: { localConfig: string | null, lintScript: string | null, guidance: string }
      }[]
    }
    const mobile = output.projects.find(entry => entry.path === 'apps/mobile')

    expect(mobile?.lintOwnership.localConfig).toBe('eslint.config.mjs')
    expect(mobile?.lintOwnership.lintScript).toBe('expo lint')
    expect(mobile?.lintOwnership.guidance).toContain('independently linted apps')
    expect(mobile?.lintOwnership.guidance).toContain('type-aware')
  })

  test('formatting respects strict mode, Prettier, and explicit overrides', async () => {
    const strict = await defineConfig({ detection: false, formatting: { quotes: 'double' }, strict: 'ci' })
    const prettier = await defineConfig({ detection: false, formatting: { quotes: 'double' }, tools: ['prettier'] })
    const overridden = await defineConfig({ detection: false, formatting: { quotes: 'double' } }, {
      rules: { '@stylistic/quotes': ['error', 'single'] }
    })

    expect(getEffectiveRuleValue(strict, '@stylistic/quotes')).toEqual(['error', 'double', { avoidEscape: true }])
    expect(getEffectiveRuleValue(prettier, '@stylistic/quotes')).toBe(0)
    expect(getEffectiveRuleValue(overridden, '@stylistic/quotes')).toEqual(['error', 'single'])
  })

  test('Playwright keeps real Testing Library checks and unit-test heuristics', async () => {
    const config = await defineConfig({
      detection: false,
      testing: ['playwright', 'testing-library'],
      testingFiles: { playwright: ['tests/browser/**/*.spec.ts'] },
      typescript: 'syntax'
    })
    const locator = 'import { test } from \'@playwright/test\'\ntest(\'ready\', async ({ page }) => {\n  await page.getByText(\'Ready\')\n})\n'
    const actualLibrary = 'import { screen } from \'@testing-library/dom\'\nexport const element = await screen.getByText(\'Ready\')\n'
    const heuristic = 'export const element = await screen.getByText(\'Ready\')\n'
    const browser = await lintText(locator, config, 'tests/browser/example.spec.ts')
    const library = await lintText(actualLibrary, config, 'tests/browser/library.spec.ts')
    const unit = await lintText(heuristic, config, 'tests/unit/example.spec.ts')

    expect(browser.flatMap(result => result.messages).filter(message => message.ruleId?.startsWith('testing-library/'))).toEqual([])
    expect(library.flatMap(result => result.messages.map(message => message.ruleId))).toContain('testing-library/no-await-sync-queries')
    expect(unit.flatMap(result => result.messages.map(message => message.ruleId))).toContain('testing-library/no-await-sync-queries')
  })

  test('Astro autofix is stable across repeated runs with formatting preferences', async () => {
    const config = await defineConfig({
      detection: false,
      formatting: { quotes: 'double', semi: true },
      frameworks: { astro: true },
      typescript: 'syntax'
    })
    const source = '---\nconst label: string = \'hello\'\n---\n<div>{label}</div>\n<script>\nconst element = document.querySelector(\'div\')\nelement?.focus()\n</script>\n'
    const first = await lintTextWithFix(source, config, 'src/page.astro')
    const output = first[0]?.output ?? source
    const second = await lintTextWithFix(output, config, 'src/page.astro')

    expect(first.flatMap(result => result.messages).filter(message => message.fatal)).toEqual([])
    expect(second[0]?.output ?? output).toBe(output)
    expect(output).toContain('"hello";')
  })

  test('doctor reports only proven, applicable Astro workaround fields', async () => {
    const root = project()

    writeFileSync(join(root, 'page.astro'), '---\nconst label = \'hello\'\n---\n<div>{label}</div>\n')
    const options = { detection: false, frameworks: { astro: true }, root, typescript: 'syntax' } as const
    const baseline = await defineConfig(options)
    const config = await defineConfig(options, {
      files: ['**/*.astro'],
      name: 'consumer/old-indent',
      rules: { '@stylistic/indent': 'off', '@typescript-eslint/no-misused-promises': 'off' }
    }, {
      files: ['unmatched/**/*.astro'],
      name: 'consumer/unmatched',
      rules: { '@stylistic/jsx-closing-tag-location': 'off' }
    })
    class Inspector {
      private readonly eslint: ESLint

      constructor(settings: {
        cwd: string
        overrideConfig: TSESLint.FlatConfig.ConfigArray
        overrideConfigFile: true
      }) {
        this.eslint = new ESLint({ ...settings, overrideConfig: settings.overrideConfig as Linter.Config[] })
      }

      async calculateConfigForFile(file: string) {
        return toEffectiveConfig(await this.eslint.calculateConfigForFile(file))
      }
    }
    const guidance = await compareConsumerOverrides(root, config, baseline, Inspector)

    expect(guidance).toHaveLength(1)
    expect(guidance[0]).toContain('@stylistic/indent')
    expect(guidance[0]).toContain('page.astro')
    expect(guidance.join(' ')).not.toContain('no-misused-promises')
    expect(guidance.join(' ')).not.toContain('jsx-closing-tag-location')
    expect(await compareConsumerOverrides(root, [], baseline, Inspector)).toEqual([])
  })

  test('doctor generates a zero-warning lint script and preserves existing scripts', async () => {
    const root = project()

    vi.spyOn(console, 'log').mockImplementation(() => undefined)
    await handleDoctor(root, true, false, true)

    const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
      scripts: { lint: string }
    }

    expect(manifest.scripts.lint).toBe('eslint . --max-warnings=0')
    manifest.scripts.lint = 'turbo run lint'
    writeFileSync(join(root, 'package.json'), JSON.stringify(manifest))
    await handleDoctor(root, true, false, true)
    expect(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))).toMatchObject({
      scripts: { lint: 'turbo run lint' }
    })
  })

  test('formatting preferences change effective rules without changing correctness rules', async () => {
    const options: EslintConfigOptions = {
      detection: false,
      formatting: { arrowParens: 'always', commaDangle: 'always-multiline', quotes: 'double', semi: true },
      typescript: 'syntax'
    }
    const config = await defineConfig(options)
    const result = await lintText('export const greeting = \'hello\'\n', config, 'src/example.ts')

    expect(result.flatMap(entry => entry.messages.map(message => message.ruleId))).toContain('@stylistic/quotes')
    expect(result.flatMap(entry => entry.messages.map(message => message.ruleId))).toContain('@stylistic/semi')
    const defaults = await defineConfig({ ...options, formatting: undefined })

    expect(getEffectiveRuleValue(config, '@typescript-eslint/no-explicit-any')).toEqual(
      getEffectiveRuleValue(defaults, '@typescript-eslint/no-explicit-any')
    )
  })

  test('Playwright-owned files restrict Testing Library import heuristics', async () => {
    const config = await defineConfig({
      detection: false,
      testing: ['playwright', 'testing-library'],
      testingFiles: { playwright: ['tests/browser/**/*.spec.ts'] },
      typescript: false
    })
    const coexistence = config.find(entry => entry.name === 'eslint-config-basic/playwright-testing-library')

    expect(coexistence?.files).toEqual(['tests/browser/**/*.spec.ts'])
    expect(coexistence?.settings).toEqual({ 'testing-library/utils-module': 'off' })
  })

  test('workspace formatting defaults merge with project preferences', async () => {
    const root = project()

    mkdirSync(join(root, 'packages/example'), { recursive: true })
    const config = await defineConfig({
      detection: false,
      formatting: { quotes: 'double', semi: true },
      projects: { 'packages/example': { formatting: { quotes: 'single' } } },
      root,
      typescript: false
    })
    const scoped = config.filter(entry => entry.name?.includes('formatting') &&
      entry.files?.some(pattern => typeof pattern === 'string' && pattern.startsWith('packages/example/')))

    expect(getEffectiveRuleValue(scoped, '@stylistic/quotes')).toEqual(['warn', 'single', { avoidEscape: true }])
    expect(getEffectiveRuleValue(scoped, '@stylistic/semi')).toEqual(['warn', 'always'])
  })
})
