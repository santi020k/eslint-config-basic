import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

import { eslintConfig, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

describe('Edge-Case & Conflict Tests (#6)', () => {
  it('should handle Expo + Next together without crashing', () => {
    const config = eslintConfig({
      typescript: true,
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

  it('should include React config when next framework is specified (implicit React)', () => {
    const config = eslintConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include React config when expo framework is specified (implicit React)', () => {
    const config = eslintConfig({
      frameworks: {
        expo: [{ name: 'mock-expo', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should handle Astro configuration with react framework passed', () => {
    const config = eslintConfig({
      frameworks: {
        astro: [{ name: 'mock-astro', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include Astro-specific rules logic', () => {
    // Note: Astro rules are in the astro package, but we test composition here
    const config = eslintConfig({
      frameworks: {
        astro: [{
          name: 'mock-astro',
          rules: {
            'react/jsx-no-undef': 'off',
            '@stylistic/comma-dangle': ['warn', 'never']
          }
        }]
      }
    })

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], 'react/jsx-no-undef')).toBe('off')

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@stylistic/comma-dangle')).toEqual(['warn', 'never'])
  })

  it('should handle duplicate optionals without doubling', () => {
    const single = eslintConfig({
      libraries: [Library.Tailwind],
      tools: [Tool.Prettier]
    })

    const doubled = eslintConfig({
      libraries: [Library.Tailwind, Library.Tailwind],
      tools: [Tool.Prettier, Tool.Prettier]
    })

    expect(single).toHaveLength(doubled.length)
  })

  it('Prettier optional should be applied last', () => {
    const config = eslintConfig({
      typescript: true,
      libraries: [Library.Tailwind],
      testing: [Testing.Vitest],
      tools: [Tool.Prettier],
      formats: [Format.Mdx]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])
    const prettierIndex = names.lastIndexOf('eslint-config/prettier')

    const maxNonPrettierIndex = names.reduce(
      (max, name, idx) => name !== 'eslint-config/prettier' ? Math.max(max, idx) : max, -1
    )

    expect(prettierIndex).toBeGreaterThan(maxNonPrettierIndex)
  })

  it('should disable no-undef for TypeScript configs (#3)', () => {
    const config = eslintConfig({ typescript: true })

    const effectiveValue = getEffectiveRuleValue(
      config as Record<string, unknown>[], 'no-undef'
    )

    expect(effectiveValue).toBe('off')
  })

  it('should NOT include typed-rules-overrides when typescript is disabled', () => {
    const config = eslintConfig({ typescript: false })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).not.toContain('eslint-config-basic/typed-rules-overrides')
  })

  it('should include typed-rules-overrides when typescript is enabled', () => {
    const config = eslintConfig({ typescript: true })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('eslint-config-basic/typed-rules-overrides')
  })
})
