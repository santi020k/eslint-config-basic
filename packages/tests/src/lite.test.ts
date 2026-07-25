import {
  defineConfig,
  Extension,
  type Format,
  Library,
  Preset,
  Runtime,
  type Testing,
  type Tool
} from '@santi020k/eslint-config-lite'

import { describe, expect, test } from 'vitest'

const noDetectRootDir = '/__eslint-config-basic_lite_tests_no_detect__'

const baseOptions = {
  autoFrameworks: false,
  detection: false,
  detectRootDir: noDetectRootDir,
  extensions: [] as Extension[],
  formats: [] as Format[],
  frameworks: {},
  libraries: [] as Library[],
  optionMergeStrategy: 'replace' as const,
  testing: [] as Testing[],
  tools: [] as Tool[],
  typescript: false
}

const getRuleValues = (config: Awaited<ReturnType<typeof defineConfig>>) => (
  config
    .filter(c => 'rules' in c && c.rules)
    .flatMap(c => Object.values(c.rules ?? {}))
)

describe('resolvePreset', () => {
  test.each([
    Preset.All,
    Preset.App,
    Preset.Basic,
    Preset.Browser,
    Preset.CI,
    Preset.Library,
    Preset.Monorepo,
    Preset.Node,
    Preset.Worker
  ])('resolves %s preset without error', async (preset: Preset) => {
    const config = await defineConfig({ ...baseOptions, preset })
    expect(Array.isArray(config)).toBe(true)
    expect(config.length).toBeGreaterThan(0)
  })
})

describe('resolveFramework', () => {
  test('handles an empty config array directly', async () => {
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: [] } })
    expect(Array.isArray(config)).toBe(true)
  })

  test('handles a non-empty config array directly', async () => {
    const marker = { files: ['**/__lite_array_test__.js'], rules: {} }
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: [marker] } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_array_test__.js'] }))
  })

  test('calls a sync factory function', async () => {
    const marker = { files: ['**/__lite_factory_test__.js'], rules: {} }
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: () => [marker] } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_factory_test__.js'] }))
  })

  test('calls an async factory function', async () => {
    const marker = { files: ['**/__lite_async_factory_test__.js'], rules: {} }
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: async () => [marker] } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_async_factory_test__.js'] }))
  })

  test('calls a default-export factory function', async () => {
    const marker = { files: ['**/__lite_default_fn_test__.js'], rules: {} }
    const mod = { default: () => [marker] }
    const config = await defineConfig({ ...baseOptions, frameworks: { vue: mod as unknown as typeof mod.default } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_default_fn_test__.js'] }))
  })

  test('returns a default-export config array', async () => {
    const marker = { files: ['**/__lite_default_arr_test__.js'], rules: {} }
    const mod = { default: [marker] }
    const config = await defineConfig({ ...baseOptions, frameworks: { vue: mod as unknown as typeof mod.default } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_default_arr_test__.js'] }))
  })

  test('loads a bundled config via true', async () => {
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: true } })
    expect(Array.isArray(config)).toBe(true)
    expect(config.length).toBeGreaterThan(0)
  })
})

describe('applyStrictMode via defineConfig', () => {
  test('strict true escalates warn to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: true })
    const values = getRuleValues(config)
    expect(values).not.toContain('warn')
    expect(values).not.toContain(1)
  })

  test('strict ci escalates warn to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: 'ci' })
    const values = getRuleValues(config)
    expect(values).not.toContain('warn')
  })

  test('strict pedantic escalates warn to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: 'pedantic' })
    const values = getRuleValues(config)
    expect(values).not.toContain('warn')
  })

  test('strict recommended leaves rules unchanged', async () => {
    const config = await defineConfig({ ...baseOptions, strict: 'recommended' })
    expect(config.length).toBeGreaterThan(0)
  })

  test('config items without rules are passed through unchanged', async () => {
    const config = await defineConfig({ ...baseOptions, strict: true })
    const noRuleEntries = config.filter(c => !('rules' in c) || !c.rules)
    expect(noRuleEntries.length).toBeGreaterThan(0)
  })

  test('array-style warn rules like ["warn", opts] are escalated to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: true })
    const arrayWarnRules = config
      .filter(c => 'rules' in c && c.rules)
      .flatMap(c => Object.values(c.rules ?? {}))
      .filter(r => Array.isArray(r) && (r[0] === 'warn' || r[0] === 1))
    expect(arrayWarnRules).toHaveLength(0)
  })
})

describe('defineConfig with runtime', () => {
  test('Node runtime resolves correctly', async () => {
    const config = await defineConfig({ ...baseOptions, runtime: Runtime.Node })
    expect(Array.isArray(config)).toBe(true)
  })

  test('Browser runtime resolves correctly', async () => {
    const config = await defineConfig({ ...baseOptions, runtime: Runtime.Browser })
    expect(Array.isArray(config)).toBe(true)
  })
})

describe('defineConfig workspacePrefixes', () => {
  test('injects workspace prefix group into simple-import-sort rules', async () => {
    const config = await defineConfig({ ...baseOptions, workspacePrefixes: ['@acme'] })

    const sortRules = config
      .filter(c => 'rules' in c && c.rules?.['simple-import-sort/imports'])
      .flatMap(c => {
        const rule = c.rules?.['simple-import-sort/imports']

        return Array.isArray(rule) && rule[1] ? [(rule[1] as { groups?: string[][] }).groups ?? []] : []
      })

    const hasPrefix = sortRules.some(groups => groups.some(group => group.some(p => p.includes('@acme'))))

    expect(hasPrefix).toBe(true)
  })

  test('no workspace prefix leaves import order unchanged', async () => {
    const withoutPrefix = await defineConfig({ ...baseOptions })
    const withPrefix = await defineConfig({ ...baseOptions, workspacePrefixes: ['@myorg'] })

    expect(withPrefix.length).toBeGreaterThanOrEqual(withoutPrefix.length)
  })
})

describe('lite tailwind options', () => {
  test('explicit entryPoint and ignore are reflected in the settings block', async () => {
    const config = await defineConfig({
      ...baseOptions,
      tailwind: {
        entryPoint: 'src/styles/global.css',
        ignore: ['^prose-custom$']
      }
    })

    const tw = config.find(c => c.name === 'eslint-config-lite/tailwind-settings')

    expect(tw).toBeDefined()
    expect(tw?.settings?.['better-tailwindcss']).toMatchObject({
      detectComponentClasses: true,
      entryPoint: 'src/styles/global.css',
      ignore: ['^prose-custom$']
    })
    expect(tw?.rules?.['better-tailwindcss/no-unknown-classes']).toEqual([
      'error',
      { entryPoint: 'src/styles/global.css', ignore: ['^prose-custom$'] }
    ])
  })

  test('noUnknownClasses: false disables the rule', async () => {
    const config = await defineConfig({
      ...baseOptions,
      tailwind: {
        entryPoint: 'src/styles/global.css',
        noUnknownClasses: false
      }
    })

    const tw = config.find(c => c.name === 'eslint-config-lite/tailwind-settings')

    expect(tw).toBeDefined()
    expect(tw?.rules?.['better-tailwindcss/no-unknown-classes']).toBe('off')
  })

  test('noUnknownClasses: warn without extra options produces bare severity', async () => {
    const config = await defineConfig({
      ...baseOptions,
      tailwind: { noUnknownClasses: 'warn' }
    })

    const tw = config.find(c => c.name === 'eslint-config-lite/tailwind-settings')

    expect(tw?.rules?.['better-tailwindcss/no-unknown-classes']).toBe('warn')
  })

  test('tailwind: false suppresses the settings block even with Library.Tailwind', async () => {
    const config = await defineConfig({
      ...baseOptions,
      libraries: [Library.Tailwind],
      tailwind: false
    })

    expect(config.find(c => c.name === 'eslint-config-lite/tailwind-settings')).toBeUndefined()
  })

  test('Library.Tailwind without explicit tailwind option auto-detects (returns no settings block when no entry point found)', async () => {
    const config = await defineConfig({
      ...baseOptions,
      detectRootDir: '/__eslint-config-basic_lite_tests_no_detect__',
      libraries: [Library.Tailwind]
    })

    expect(config.find(c => c.name === 'eslint-config-lite/tailwind-settings')).toBeUndefined()
  })
})

describe('scripts-overrides block', () => {
  test('is present and disables n/no-unpublished-import for script files', async () => {
    const config = await defineConfig({ ...baseOptions })
    const scriptsBlock = config.find(c => c.name === 'eslint-config-lite/scripts-overrides')

    expect(scriptsBlock).toBeDefined()
    expect(scriptsBlock?.files).toEqual(['**/scripts/**/*.{js,mjs,cjs,ts,mts,cts}'])
    expect(scriptsBlock?.rules?.['n/no-unpublished-import']).toBe('off')
  })

  test('includes security rule when Security extension is enabled', async () => {
    const config = await defineConfig({ ...baseOptions, extensions: [Extension.Security] })
    const scriptsBlock = config.find(c => c.name === 'eslint-config-lite/scripts-overrides')

    expect(scriptsBlock?.rules?.['security/detect-non-literal-fs-filename']).toBe('off')
  })

  test('excludes security rule when Security extension is not enabled', async () => {
    const config = await defineConfig({ ...baseOptions, extensions: [] })
    const scriptsBlock = config.find(c => c.name === 'eslint-config-lite/scripts-overrides')
    const ruleKeys = Object.keys(scriptsBlock?.rules ?? {})

    expect(ruleKeys.some(k => k.startsWith('security/'))).toBe(false)
  })
})

describe('defineConfig with projects', () => {
  test('scopes sub-project configs to their path', async () => {
    const config = await defineConfig({
      ...baseOptions,
      projects: {
        'apps/web': { typescript: false, autoFrameworks: false, detection: false }
      }
    })

    const scopedFiles = config
      .filter(c => 'files' in c && Array.isArray(c.files))
      .flatMap(c => c.files ?? [])
      .filter(f => typeof f === 'string')

    expect(scopedFiles.some(f => (f as string).startsWith('apps/web/'))).toBe(true)
  })

  test('inherits projectDefaults before scoping each project', async () => {
    const config = await defineConfig({
      ...baseOptions,
      projectDefaults: {
        extensions: [Extension.Unicorn],
        optionMergeStrategy: 'merge'
      },
      projects: {
        'packages/lib': {
          extensions: [Extension.Security]
        }
      }
    })

    const scopedRules = config
      .filter(entry => entry.files?.some(pattern => typeof pattern === 'string' && pattern.startsWith('packages/lib/')))
      .flatMap(entry => Object.keys(entry.rules ?? {}))

    expect(scopedRules.some(rule => rule.startsWith('security/'))).toBe(true)
    expect(scopedRules.some(rule => rule.startsWith('unicorn/'))).toBe(true)
  })
})
