import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

import { eslintConfig, Extension, Library, Preset, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'

describe('v1.0.0 Roadmap Features', () => {
  it('should apply strict mode (warnings to errors)', () => {
    const config = eslintConfig({ strict: true })
    const configsWithRules = config.filter(c => 'rules' in c && c.rules)
    const allRules = configsWithRules.flatMap(c => Object.values(c.rules ?? {}))
    const arrayWarnings = allRules.filter(
      rule => Array.isArray(rule) && (rule[0] === 'warn' || rule[0] === 1)
    )

    expect(allRules).not.toContain('warn')
    expect(arrayWarnings).toHaveLength(0)
    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })

  it('should include Security plugin rules', () => {
    const config = eslintConfig({ extensions: [Extension.Security] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('security/detect-object-injection')
  })

  it('should include TanStack Query rules', () => {
    const config = eslintConfig({ libraries: [Library.TanstackQuery] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('@tanstack/query/exhaustive-deps')
  })

  it('should include Perfectionist rules', () => {
    const config = eslintConfig({ extensions: [Extension.Perfectionist] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('perfectionist/sort-imports')
  })

  it('should include JSDoc rules', () => {
    const config = eslintConfig({ tools: [Tool.Jsdoc] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('jsdoc/check-access')
  })

  it('should support v2 practical presets', () => {
    const appConfig = eslintConfig({ preset: Preset.App, detection: false })
    const ciConfig = eslintConfig({ preset: Preset.CI, detection: false })
    const ciRuleValues = ciConfig.flatMap(entry => Object.values(entry.rules ?? {}))

    expect(extractConfigNames(appConfig)).toContain('eslint-config/prettier')
    expect(extractConfigNames(appConfig)).toContain('integrations/vitest')
    expect(ciRuleValues).not.toContain('warn')
  })

  it('should allow granular detection controls', () => {
    const config = eslintConfig({
      detection: {
        libraries: false,
        testing: false
      },
      libraries: [Library.Tailwind],
      testing: [Testing.Vitest],
      runtime: Runtime.Browser
    })
    const names = extractConfigNames(config)

    expect(names).toContain('integrations/vitest')
    expect(names.some(name => name.toLowerCase().includes('tailwind'))).toBe(true)
  })

  it('should support project-scoped monorepo configs', () => {
    const config = eslintConfig({
      detection: false,
      projects: {
        'apps/web': {
          typescript: false,
          testing: [Testing.Vitest]
        }
      }
    })

    expect(config.some(entry => (
      entry.name === 'integrations/vitest' &&
      Array.isArray(entry.files) &&
      entry.files.some(file => typeof file === 'string' && file.startsWith('apps/web/'))
    ))).toBe(true)
  })

  it('should support pedantic strict mode', () => {
    const config = eslintConfig({ strict: 'pedantic' })
    const rules = extractRuleNames(config)

    expect(rules).toContain('no-console')
    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })
})
