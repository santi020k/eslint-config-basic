import { tmpdir } from 'node:os'

import astro from '@santi020k/eslint-config-astro'
import { defineConfig, Extension, Format, Library, NextMode, Testing, Tool } from '@santi020k/eslint-config-basic'
import { describe, expect, test } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

describe('Edge-Case & Conflict Tests (#6)', () => {
  test('should handle Expo + Next together without crashing', async () => {
    const config = await defineConfig({
      frameworks: {
        expo: [{ name: 'mock-expo', rules: { 'react/jsx-pascal-case': 'error' } }],
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      },
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    // Both should trigger React configs
    const names = extractConfigNames(config)

    expect(names.some(n => n.includes('react'))).toBe(true)
  })

  test('should include React config when next framework is specified (implicit React)', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('react/jsx-pascal-case')
  })

  test('should include React config when expo framework is specified (implicit React)', async () => {
    const config = await defineConfig({
      frameworks: {
        expo: [{ name: 'mock-expo', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('react/jsx-pascal-case')
  })

  test('should handle Astro configuration with react framework passed', async () => {
    const config = await defineConfig({
      frameworks: {
        astro: [{ name: 'mock-astro', rules: {} }],
        react: [{ name: 'mock-react', rules: { 'react/jsx-pascal-case': 'error' } }]
      }
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('react/jsx-pascal-case')
  })

  test('should include Astro-specific rules logic', async () => {
    // Note: Astro rules are in the astro package, but we test composition here
    const config = await defineConfig({
      detection: false,
      frameworks: {
        astro: [{
          name: 'mock-astro',
          rules: {
            '@stylistic/comma-dangle': ['warn', 'never'],
            'react/jsx-no-undef': 'off'
          }
        }]
      },
      tools: []
    })

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], 'react/jsx-no-undef')).toBe('off')

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@stylistic/comma-dangle')).toEqual(['warn', 'never'])
  })

  test('should apply Astro parser and rule workarounds through the framework factory', async () => {
    const config = await defineConfig({
      frameworks: { astro },
      tsconfigRootDir: tmpdir(), // os.tmpdir() always exists on any platform
      typescript: true
    })

    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@typescript-eslint/no-unsafe-return')).toBe('off')
    expect(getEffectiveRuleValue(config as Record<string, unknown>[], '@stylistic/jsx-indent-props')).toBe('off')
  })

  test('should handle duplicate optionals without doubling', async () => {
    const single = await defineConfig({
      libraries: [Library.Tailwind],
      tools: [Tool.Prettier]
    })

    const doubled = await defineConfig({
      libraries: [Library.Tailwind, Library.Tailwind],
      tools: [Tool.Prettier, Tool.Prettier]
    })

    expect(single).toHaveLength(doubled.length)
  })

  test('Prettier optional should be applied last', async () => {
    const config = await defineConfig({
      formats: [Format.Mdx],
      libraries: [Library.Tailwind],
      testing: [Testing.Vitest],
      tools: [Tool.Prettier],
      typescript: true
    })

    const names = extractConfigNames(config)
    const prettierIndex = names.lastIndexOf('eslint-config/prettier')

    const maxNonPrettierIndex = names.reduce(
      (max, name, idx) => name === 'eslint-config/prettier' ? max : Math.max(max, idx), -1
    )

    expect(prettierIndex).toBeGreaterThan(maxNonPrettierIndex)
  })

  test('should apply NextMode.AppRouter override for app/** files', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      },
      nextMode: NextMode.AppRouter,
      typescript: false
    })

    const appRouterEntry = (config as Record<string, unknown>[]).find(
      (c: Record<string, unknown>) => c.name === 'eslint-config-next/app-router-overrides'
    )

    expect(appRouterEntry).toBeDefined()
    expect((appRouterEntry)?.rules).toHaveProperty('@next/next/no-html-link-for-pages', 'off')
  })

  test('should NOT apply app-router overrides when NextMode.Pages is used', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      },
      nextMode: NextMode.Pages,
      typescript: false
    })

    const appRouterEntry = (config as Record<string, unknown>[]).find(
      (c: Record<string, unknown>) => c.name === 'eslint-config-next/app-router-overrides'
    )

    expect(appRouterEntry).toBeUndefined()
  })

  test('should throw a clear error when tsconfigRootDir does not exist', async () => {
    await expect(defineConfig({
      tsconfigRootDir: '/this/path/does/not/exist',
      typescript: true
    })).rejects.toThrow(/tsconfigRootDir does not exist/)
  })

  test('should include best-practices rules when Extension.BestPractices is requested', async () => {
    const config = await defineConfig({
      extensions: [Extension.BestPractices]
    })

    const noConsoleValue = getEffectiveRuleValue(config, 'no-console')

    expect(noConsoleValue).toBe('warn')

    const complexityValue = getEffectiveRuleValue(config, 'complexity')

    expect(Array.isArray(complexityValue)).toBe(true)
  })

  test('should disable no-undef for TypeScript configs (#3)', async () => {
    const config = await defineConfig({ typescript: true })

    const effectiveValue = getEffectiveRuleValue(
      config, 'no-undef'
    )

    expect(effectiveValue).toBe('off')
  })

  test('should NOT include typescript configs when typescript is disabled', async () => {
    const config = await defineConfig({ typescript: false })

    const names = extractConfigNames(config)

    expect(names).not.toContain('eslint-config-typescript/standard-rules')
  })

  test('should include typescript configs when typescript is enabled', async () => {
    const config = await defineConfig({ typescript: true })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config-typescript/standard-rules')
  })
})
