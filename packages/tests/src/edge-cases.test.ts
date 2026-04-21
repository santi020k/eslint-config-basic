import { tmpdir } from 'node:os'
import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

import astro from '@santi020k/eslint-config-astro'
import { eslintConfig, Extension, Format, Library, NextMode, Testing, Tool } from '@santi020k/eslint-config-basic'

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
    const names = extractConfigNames(config)

    expect(names.some(n => n.includes('react'))).toBe(true)
  })

  it('should include React config when next framework is specified (implicit React)', () => {
    const config = eslintConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should include React config when expo framework is specified (implicit React)', () => {
    const config = eslintConfig({
      frameworks: {
        expo: [{ name: 'mock-expo', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('react/jsx-pascal-case')
  })

  it('should handle Astro configuration with react framework passed', () => {
    const config = eslintConfig({
      frameworks: {
        astro: [{ name: 'mock-astro', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config)

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

  it('should apply Astro parser and rule workarounds through the framework factory', () => {
    const config = eslintConfig({
      typescript: true,
      tsconfigRootDir: tmpdir(), // os.tmpdir() always exists on any platform
      frameworks: { astro }
    })

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@typescript-eslint/no-unsafe-return')).toBe('off')
    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@stylistic/jsx-indent-props')).toBe('off')
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

    const names = extractConfigNames(config)
    const prettierIndex = names.lastIndexOf('eslint-config/prettier')

    const maxNonPrettierIndex = names.reduce(
      (max, name, idx) => name !== 'eslint-config/prettier' ? Math.max(max, idx) : max, -1
    )

    expect(prettierIndex).toBeGreaterThan(maxNonPrettierIndex)
  })

  it('should apply NextMode.AppRouter override for app/** files', () => {
    const config = eslintConfig({
      typescript: false,
      nextMode: NextMode.AppRouter,
      frameworks: {
        react: [{ name: 'mock-react', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }]
      }
    })

    const appRouterEntry = (config as Record<string, unknown>[]).find(
      (c: Record<string, unknown>) => c.name === 'eslint-config-next/app-router-overrides'
    )

    expect(appRouterEntry).toBeDefined()
    expect((appRouterEntry)?.rules).toHaveProperty('@next/next/no-html-link-for-pages', 'off')
  })

  it('should NOT apply app-router overrides when NextMode.Pages is used', () => {
    const config = eslintConfig({
      typescript: false,
      nextMode: NextMode.Pages,
      frameworks: {
        react: [{ name: 'mock-react', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }]
      }
    })

    const appRouterEntry = (config as Record<string, unknown>[]).find(
      (c: Record<string, unknown>) => c.name === 'eslint-config-next/app-router-overrides'
    )

    expect(appRouterEntry).toBeUndefined()
  })

  it('should throw a clear error when tsconfigRootDir does not exist', () => {
    expect(() => eslintConfig({
      typescript: true,
      tsconfigRootDir: '/this/path/does/not/exist'
    })).toThrow(/tsconfigRootDir does not exist/)
  })

  it('should include best-practices rules when Extension.BestPractices is requested', () => {
    const config = eslintConfig({
      extensions: [Extension.BestPractices]
    })

    const noConsoleValue = getEffectiveRuleValue(config, 'no-console')

    expect(noConsoleValue).toBe('warn')

    const complexityValue = getEffectiveRuleValue(config, 'complexity')

    expect(Array.isArray(complexityValue)).toBe(true)
  })

  it('should disable no-undef for TypeScript configs (#3)', () => {
    const config = eslintConfig({ typescript: true })

    const effectiveValue = getEffectiveRuleValue(
      config, 'no-undef'
    )

    expect(effectiveValue).toBe('off')
  })

  it('should NOT include typescript configs when typescript is disabled', () => {
    const config = eslintConfig({ typescript: false })

    const names = extractConfigNames(config)

    expect(names).not.toContain('eslint-config-typescript/standard-rules')
  })

  it('should include typescript configs when typescript is enabled', () => {
    const config = eslintConfig({ typescript: true })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config-typescript/standard-rules')
  })
})
