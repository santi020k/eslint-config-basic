import { defineConfig, Extension, Library, Preset, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'
import { describe, expect, test } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

describe('v1.0.0 Roadmap Features', () => {
  test('should apply strict mode (warnings to errors)', async () => {
    const config = await defineConfig({ detection: false, strict: true, tools: [] })
    const configsWithRules = config.filter(c => 'rules' in c && c.rules)
    const allRules = configsWithRules.flatMap(c => Object.values(c.rules ?? {}))
    const arrayWarnings = allRules.filter(
      rule => Array.isArray(rule) && (rule[0] === 'warn' || rule[0] === 1)
    )

    expect(allRules).not.toContain('warn')
    expect(arrayWarnings).toHaveLength(0)
    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })

  test('should include Security plugin rules', async () => {
    const config = await defineConfig({ extensions: [Extension.Security] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('security/detect-object-injection')
  })

  test('should include TanStack Query rules', async () => {
    const config = await defineConfig({ libraries: [Library.TanstackQuery] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('@tanstack/query/exhaustive-deps')
  })

  test('should include Perfectionist rules', async () => {
    const config = await defineConfig({ extensions: [Extension.Perfectionist] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('perfectionist/sort-imports')
  })

  test('should include JSDoc rules', async () => {
    const config = await defineConfig({ tools: [Tool.Jsdoc] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('jsdoc/check-access')
  })

  test('should support v2 practical presets', async () => {
    const appConfig = await defineConfig({ detection: false, preset: Preset.App })
    const ciConfig = await defineConfig({ detection: false, preset: Preset.CI })
    const ciRuleValues = ciConfig.flatMap(entry => Object.values(entry.rules ?? {}))

    expect(extractConfigNames(appConfig)).toContain('eslint-config/prettier')
    expect(extractConfigNames(appConfig)).toContain('integrations/vitest')
    expect(ciRuleValues).not.toContain('warn')
  })

  test('should allow granular detection controls', async () => {
    const config = await defineConfig({
      detection: {
        libraries: false,
        testing: false
      },
      libraries: [Library.Tailwind],
      runtime: Runtime.Browser,
      testing: [Testing.Vitest]
    })
    const names = extractConfigNames(config)

    expect(names).toContain('integrations/vitest')
    expect(names.some(name => name.toLowerCase().includes('tailwind'))).toBe(true)
  })

  test('should support project-scoped monorepo configs', async () => {
    const config = await defineConfig({
      detection: false,
      projects: {
        'apps/web': {
          testing: [Testing.Vitest],
          typescript: false
        }
      }
    })

    expect(config.some(entry => (
      entry.name === 'integrations/vitest' &&
      Array.isArray(entry.files) &&
      entry.files.some(file => typeof file === 'string' && file.startsWith('apps/web/'))
    ))).toBe(true)
  })

  test('should support pedantic strict mode', async () => {
    const config = await defineConfig({ detection: false, strict: 'pedantic', tools: [] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('no-console')
    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })

  test('Preset.Node sets Node runtime', async () => {
    const config = await defineConfig({ detection: false, preset: Preset.Node })
    const names = extractConfigNames(config)

    expect(names.some(n => n.toLowerCase().includes('node'))).toBe(true)
  })

  test('Preset.Worker sets Worker runtime', async () => {
    const config = await defineConfig({ detection: false, preset: Preset.Worker })

    expect(Array.isArray(config)).toBe(true)
    expect(config.length).toBeGreaterThan(0)
  })
})
