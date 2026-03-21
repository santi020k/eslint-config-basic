import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

describe('Edge-Case & Conflict Tests (#6)', () => {
  it('should handle Expo + Next together without crashing', () => {
    const config = eslintConfig({
      config: [ConfigOption.Expo, ConfigOption.Next, ConfigOption.Ts],
      frameworks: {
        expo: [{ name: 'mock-expo', rules: { 'react/jsx-pascal-case': 'error' } }],
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    // Both should trigger React configs
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.includes('react'))).toBe(true)
  })

  it('should include React config when Next is specified (implicit React)', () => {
    const config = eslintConfig({
      config: [ConfigOption.Next],
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include React config when Expo is specified (implicit React)', () => {
    const config = eslintConfig({
      config: [ConfigOption.Expo],
      frameworks: {
        expo: [{ name: 'mock-expo', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should handle Astro configuration with React passed', () => {
    const config = eslintConfig({
      config: [ConfigOption.Astro],
      frameworks: {
        astro: [{ name: 'mock-astro', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include new Astro-specific default rules', () => {
    const config = eslintConfig({
      config: [ConfigOption.Astro],
      frameworks: {
        astro: [{
          name: 'mock-astro',
          rules: {
            'react/jsx-no-undef': 'off',
            '@stylistic/comma-dangle': ['warn', 'never'],
            'react/no-unescaped-entities': 'off',
            '@stylistic/quote-props': ['warn', 'as-needed']
          }
        }]
      }
    })

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], 'react/jsx-no-undef')).toBe('off')
    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@stylistic/comma-dangle')).toEqual(['warn', 'never'])
    expect(getEffectiveRuleValue(config as Record<string, unknown>[], 'react/no-unescaped-entities')).toBe('off')
    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@stylistic/quote-props')).toEqual(['warn', 'as-needed'])
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

  it('should disable no-undef for TypeScript configs (#3)', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const effectiveValue = getEffectiveRuleValue(
      config as Record<string, unknown>[], 'no-undef'
    )

    expect(effectiveValue).toBe('off')
  })
})
