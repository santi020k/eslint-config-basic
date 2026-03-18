import { describe, expect, it } from 'vitest'

import { extractConfigNames } from './test-utils.js'

import { ConfigOption, eslintConfig, OptionalOption, SettingOption } from '@santi020k/eslint-config-basic'

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

  it('should return config with Nest when Next option is specified', () => {
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
        OptionalOption.Sonarjs,
        OptionalOption.Playwright
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
