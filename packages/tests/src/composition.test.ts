import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames } from './test-utils.js'

import {
  eslintConfig,
  Extension,
  Format,
  type ImportedFramework,
  Library,
  Preset,
  Setting,
  Testing,
  Tool
} from '@santi020k/eslint-config-basic'

describe('eslintConfig Function', () => {
  it('should return an array when called with minimal options', () => {
    const config = eslintConfig({})

    expect(Array.isArray(config)).toBe(true)
  })

  it('should return config with TypeScript when typescript option is true', () => {
    const config = eslintConfig({ typescript: true })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should return config with React when react framework is specified', () => {
    const config = eslintConfig({
      frameworks: { react: [{ name: 'mock-react', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-react')
  })

  it('should return config with Next when next and react frameworks are specified', () => {
    const config = eslintConfig({
      frameworks: {
        react: [{ name: 'mock-react', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-next')
  })

  it('should return config with Nest when nest framework is specified', () => {
    const config = eslintConfig({
      frameworks: { nest: [{ name: 'mock-nest', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-nest')
  })

  it('should return config with Vue when vue framework is specified', () => {
    const config = eslintConfig({
      frameworks: { vue: [{ name: 'mock-vue', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-vue')
  })

  it('should include gitignore by default', () => {
    const config = eslintConfig({})
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(true)
  })

  it('should exclude gitignore when NoGitignore setting is specified', () => {
    const config = eslintConfig({
      settings: [Setting.NoGitignore]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(false)
  })

  it('should handle multiple framework configs', () => {
    const config = eslintConfig({
      typescript: true,
      frameworks: { react: [{ name: 'mock-react', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-react')
  })

  it('should handle optionals', () => {
    const config = eslintConfig({
      typescript: true,
      libraries: [Library.Tailwind],
      testing: [Testing.Vitest],
      tools: [Tool.Prettier],
      extensions: [Extension.Unicorn]
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
      typescript: true,
      frameworks: {
        react: [{ name: 'mock-react', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }],
        astro: [{ name: 'mock-astro', rules: {} }],
        expo: [{ name: 'mock-expo', rules: {} }],
        nest: [{ name: 'mock-nest', rules: {} }],
        vue: [{ name: 'mock-vue', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('mock-react')

    expect(names).toContain('mock-next')

    expect(names).toContain('mock-astro')
  })

  it('should handle all optionals combined', () => {
    const config = eslintConfig({
      typescript: true,
      libraries: Object.values(Library),
      tools: Object.values(Tool),
      extensions: Object.values(Extension)
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle roadmap options (Jest, Cypress, TestingLibrary, GraphQL)', () => {
    const config = eslintConfig({
      testing: [Testing.Jest, Testing.Cypress, Testing.TestingLibrary],
      formats: [Format.Graphql]
    })

    expect(Array.isArray(config)).toBe(true)

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/jest')

    expect(names).toContain('optionals/cypress')

    expect(names).toContain('optionals/testing-library')

    expect(names).toContain('optionals/graphql/schema')
    expect(names).toContain('optionals/graphql/operations')
  })

  it('should handle duplicate optional entries without doubling config blocks', () => {
    const single = eslintConfig({
      testing: [Testing.Vitest]
    })

    const doubled = eslintConfig({
      testing: [Testing.Vitest, Testing.Vitest]
    })

    expect(single).toHaveLength(doubled.length)
  })

  it('should handle full kitchen-sink configuration', () => {
    const config = eslintConfig({
      typescript: true,
      frameworks: {
        react: [{ name: 'mock-react', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }]
      },
      testing: [Testing.Vitest],
      tools: [Tool.Cspell],
      settings: [Setting.Gitignore]
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('mock-react')

    expect(names).toContain('mock-next')
  })

  it('should handle nested frameworks objects', () => {
    const mockConfig = [{ name: 'mock-framework/rules', rules: {} }] as Record<string, unknown>[]

    const config = eslintConfig({
      frameworks: {
        react: mockConfig as ImportedFramework
      }
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('mock-framework/rules')
  })

  it('should throw when a framework boolean is passed manually', () => {
    expect(() => eslintConfig({
      frameworks: {
        react: true
      }
    })).toThrow(/requires an imported config/)
  })

  it('should require the React config when Next.js is enabled', () => {
    expect(() => eslintConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }]
      }
    })).toThrow(/frameworks\.react/)
  })

  it('should keep the Browser preset free of implicit React rules', () => {
    const config = eslintConfig({
      preset: Preset.Browser
    })

    const rules = extractRuleNames(config)

    expect(rules).not.toContain('react/jsx-pascal-case')
  })

  it('should keep the All preset focused on bundled configs', () => {
    const config = eslintConfig({
      preset: Preset.All
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config/prettier')
    expect(names).toContain('optionals/graphql/schema')
    expect(names).toContain('optionals/graphql/operations')
    expect(names).not.toContain('eslint-config-react/recommended')
  })
})

describe('Framework Composition — remaining frameworks', () => {
  it('should return config with Svelte when svelte framework is specified', () => {
    const config = eslintConfig({
      frameworks: { svelte: [{ name: 'mock-svelte', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-svelte')
  })

  it('should return config with Solid when solid framework is specified', () => {
    const config = eslintConfig({
      frameworks: { solid: [{ name: 'mock-solid', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-solid')
  })

  it('should return config with Angular when angular framework is specified', () => {
    const config = eslintConfig({
      frameworks: { angular: [{ name: 'mock-angular', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-angular')
  })

  it('should return config with Qwik when qwik framework is specified', () => {
    const config = eslintConfig({
      frameworks: { qwik: [{ name: 'mock-qwik', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-qwik')
  })

  it('should return config with Remix when remix framework is specified', () => {
    const config = eslintConfig({
      frameworks: { remix: [{ name: 'mock-remix', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-remix')
  })

  it('should handle all eleven frameworks combined', () => {
    const config = eslintConfig({
      typescript: true,
      frameworks: {
        react: [{ name: 'mock-react', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }],
        astro: [{ name: 'mock-astro', rules: {} }],
        expo: [{ name: 'mock-expo', rules: {} }],
        nest: [{ name: 'mock-nest', rules: {} }],
        vue: [{ name: 'mock-vue', rules: {} }],
        svelte: [{ name: 'mock-svelte', rules: {} }],
        solid: [{ name: 'mock-solid', rules: {} }],
        angular: [{ name: 'mock-angular', rules: {} }],
        qwik: [{ name: 'mock-qwik', rules: {} }],
        remix: [{ name: 'mock-remix', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('mock-svelte')
    expect(names).toContain('mock-solid')
    expect(names).toContain('mock-angular')
    expect(names).toContain('mock-qwik')
    expect(names).toContain('mock-remix')
  })

  it('should handle all formats combined', () => {
    const config = eslintConfig({
      formats: Object.values(Format)
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })
})
