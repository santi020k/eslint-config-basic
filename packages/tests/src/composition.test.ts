import { describe, expect, it } from 'vitest'

import { ConfigOption, eslintConfig, OptionalOption, SettingOption } from '@santi020k/eslint-config-basic'

/**
 * Helper: collect all rule names from a composed config
 */
const extractRuleNames = (config: Record<string, unknown>[]): string[] => {
  const ruleNames = new Set<string>()

  for (const entry of config) {
    const rules = entry.rules as Record<string, unknown> | undefined

    if (rules) {
      for (const ruleName of Object.keys(rules)) {
        ruleNames.add(ruleName)
      }
    }
  }

  return [...ruleNames].sort()
}

/**
 * Helper: collect all config entry names from a composed config
 */
const extractConfigNames = (config: Record<string, unknown>[]): string[] => config
  .map(entry => entry.name as string | undefined)
  .filter((name): name is string => typeof name === 'string')

/**
 * Helper: get the effective value of a rule from a composed config
 * (last definition wins, just like ESLint merging)
 */
const getEffectiveRuleValue = (
  config: Record<string, unknown>[],
  ruleName: string
): unknown => {
  let value: unknown

  for (const entry of config) {
    const rules = entry.rules as Record<string, unknown> | undefined

    if (rules && ruleName in rules) {
      value = rules[ruleName]
    }
  }

  return value
}

describe('eslintConfig Function', () => {
  it('should return an array when called with minimal options', () => {
    const config = eslintConfig({ config: [] })

    expect(Array.isArray(config)).toBe(true)
  })

  it('should return config with TypeScript when Ts option is specified', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should return config with React when React option is specified', () => {
    const config = eslintConfig({ config: [ConfigOption.React] })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should return config with Next when Next option is specified', () => {
    const config = eslintConfig({ config: [ConfigOption.Next] })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should return config with Nest when Nest option is specified', () => {
    const config = eslintConfig({ config: [ConfigOption.Nest] })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should return config with Vue when Vue option is specified', () => {
    const config = eslintConfig({ config: [ConfigOption.Vue] })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should include gitignore by default', () => {
    const config = eslintConfig({ config: [] })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(true)
  })

  it('should exclude gitignore when NoGitignore setting is specified', () => {
    const config = eslintConfig({
      config: [],
      settings: [SettingOption.NoGitignore]
    })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(false)
  })

  it('should handle multiple framework configs', () => {
    const config = eslintConfig({
      config: [ConfigOption.Ts, ConfigOption.React]
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle optionals', () => {
    const config = eslintConfig({
      config: [ConfigOption.Ts],
      optionals: [OptionalOption.Tailwind]
    })

    expect(Array.isArray(config)).toBe(true)
  })

  it('should return a valid config when called with no arguments', () => {
    const config = eslintConfig()

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle all framework configs combined', () => {
    const config = eslintConfig({
      config: [
        ConfigOption.Ts,
        ConfigOption.React,
        ConfigOption.Next,
        ConfigOption.Astro,
        ConfigOption.Expo,
        ConfigOption.Nest,
        ConfigOption.Vue
      ]
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle all optionals combined', () => {
    const config = eslintConfig({
      config: [ConfigOption.Ts],
      optionals: [
        OptionalOption.Cspell,
        OptionalOption.Tailwind,
        OptionalOption.Vitest,
        OptionalOption.I18next,
        OptionalOption.Mdx,
        OptionalOption.Markdown,
        OptionalOption.Stencil,
        OptionalOption.Regexp,
        OptionalOption.Prettier,
        OptionalOption.Unicorn,
        OptionalOption.Sonarjs
      ]
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle duplicate config entries without doubling config blocks (#4)', () => {
    const single = eslintConfig({
      config: [ConfigOption.Ts]
    })
    const doubled = eslintConfig({
      config: [ConfigOption.Ts, ConfigOption.Ts]
    })

    expect(single).toHaveLength(doubled.length)
  })

  it('should not crash with unknown enum values', () => {
    const config = eslintConfig({
      config: ['unknown-config' as ConfigOption]
    })

    expect(Array.isArray(config)).toBe(true)
  })

  it('should handle full kitchen-sink configuration', () => {
    const config = eslintConfig({
      config: [ConfigOption.Ts, ConfigOption.React, ConfigOption.Next],
      optionals: [OptionalOption.Tailwind, OptionalOption.Vitest, OptionalOption.Cspell],
      settings: [SettingOption.Gitignore]
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })
})

describe('Deep Rule Assertions (#5)', () => {
  it('should include React-specific rules when React is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.React] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')

    expect(rules).toContain('react/self-closing-comp')

    expect(rules).toContain('react-hooks/exhaustive-deps')
  })

  it('should include TypeScript rules when Ts is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@typescript-eslint/no-explicit-any')

    expect(rules).toContain('@typescript-eslint/no-unused-vars')
  })

  it('should disable no-undef for TypeScript configs (#3)', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const effectiveValue = getEffectiveRuleValue(
      config as Record<string, unknown>[], 'no-undef'
    )

    expect(effectiveValue).toBe('off')
  })

  it('should include core stylistic rules in all configs', () => {
    const config = eslintConfig({ config: [] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@stylistic/indent')

    expect(rules).toContain('@stylistic/quotes')

    expect(rules).toContain('@stylistic/semi')
  })

  it('should include config entry names', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('eslint-config/custom-rules')

    expect(names).toContain('eslint-config-typescript/rules')
  })

  it('should NOT include React rules when only Ts is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).not.toContain('react/jsx-pascal-case')

    expect(rules).not.toContain('react-hooks/exhaustive-deps')
  })

  it('should include unicorn rules when Unicorn optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Unicorn]
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('unicorn/better-regex')

    expect(rules).toContain('unicorn/prefer-array-flat-map')
  })

  it('should include sonarjs rules when Sonarjs optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Sonarjs]
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('sonarjs/no-duplicate-string')

    expect(rules).toContain('sonarjs/cognitive-complexity')
  })

  it('should include prettier config when Prettier optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Prettier]
    })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('eslint-config/prettier')
  })

  it('should include regexp rules when Regexp optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Regexp]
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('regexp/no-super-linear-backtracking')

    expect(rules).toContain('regexp/no-useless-escape')
  })

  it('should include Vue rules when Vue is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.Vue] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('vue/multi-word-component-names')

    expect(rules).toContain('vue/html-self-closing')
  })
})

describe('Edge-Case & Conflict Tests (#6)', () => {
  it('should handle Expo + Next together without crashing', () => {
    const config = eslintConfig({
      config: [ConfigOption.Expo, ConfigOption.Next, ConfigOption.Ts]
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    // Both should trigger React configs
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n?.includes('react'))).toBe(true)
  })

  it('should include React config when Next is specified (implicit React)', () => {
    const config = eslintConfig({ config: [ConfigOption.Next] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include React config when Expo is specified (implicit React)', () => {
    const config = eslintConfig({ config: [ConfigOption.Expo] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include React config when Astro is specified (implicit React)', () => {
    const config = eslintConfig({ config: [ConfigOption.Astro] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should handle duplicate optionals without doubling', () => {
    const single = eslintConfig({
      config: [],
      optionals: [OptionalOption.Tailwind]
    })
    const doubled = eslintConfig({
      config: [],
      optionals: [OptionalOption.Tailwind, OptionalOption.Tailwind]
    })

    expect(single).toHaveLength(doubled.length)
  })

  it('Prettier optional should be applied last', () => {
    const config = eslintConfig({
      config: [ConfigOption.Ts],
      optionals: [OptionalOption.Prettier, OptionalOption.Tailwind]
    })
    const names = extractConfigNames(config as Record<string, unknown>[])
    const prettierIndex = names.lastIndexOf('eslint-config/prettier')
    const maxNonPrettierIndex = names.reduce(
      (max, name, idx) => name !== 'eslint-config/prettier' ? Math.max(max, idx) : max, -1
    )

    expect(prettierIndex).toBeGreaterThan(maxNonPrettierIndex)
  })
})

describe('Type Exports', () => {
  it('should have all ConfigOption values', () => {
    const options = Object.values(ConfigOption)

    expect(options).toContain('ts')

    expect(options).toContain('react')

    expect(options).toContain('next')

    expect(options).toContain('vue')
  })

  it('should have all OptionalOption values', () => {
    const options = Object.values(OptionalOption)

    expect(options).toContain('tailwind')

    expect(options).toContain('vitest')

    expect(options).toContain('prettier')

    expect(options).toContain('regexp')

    expect(options).toContain('unicorn')

    expect(options).toContain('sonarjs')
  })

  it('should have all SettingOption values', () => {
    const options = Object.values(SettingOption)

    expect(options).toContain('gitignore')

    expect(options).toContain('no-gitignore')
  })
})
