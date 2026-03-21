import { describe, expect, it } from 'vitest'

import { extractConfigNames } from './test-utils.js'

import { eslintConfig, ExtensionOption, LibraryOption, SettingOption, ToolOption } from '@santi020k/eslint-config-basic'

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

  it('should return config with Next when next framework is specified', () => {
    const config = eslintConfig({
      frameworks: { next: [{ name: 'mock-next', rules: {} }] }
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
      settings: [SettingOption.NoGitignore]
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
      libraries: [LibraryOption.Tailwind, LibraryOption.Vitest],
      tools: [ToolOption.Prettier],
      extensions: [ExtensionOption.Unicorn]
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
      libraries: Object.values(LibraryOption),
      tools: Object.values(ToolOption),
      extensions: Object.values(ExtensionOption)
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle duplicate optional entries without doubling config blocks', () => {
    const single = eslintConfig({
      libraries: [LibraryOption.Vitest]
    })
    const doubled = eslintConfig({
      libraries: [LibraryOption.Vitest, LibraryOption.Vitest]
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
      libraries: [LibraryOption.Vitest, LibraryOption.Tailwind],
      tools: [ToolOption.Cspell],
      settings: [SettingOption.Gitignore]
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
        react: mockConfig as any
      }
    })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('mock-framework/rules')
  })
})
