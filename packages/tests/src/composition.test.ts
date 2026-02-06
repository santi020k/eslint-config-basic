import { describe, expect, it } from 'vitest'

import { ConfigOption, eslintConfig, OptionalOption, SettingOption } from '@santi020k/eslint-config'

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

  it('should include gitignore when setting is specified', () => {
    const config = eslintConfig({
      config: [],
      settings: [SettingOption.Gitignore]
    })

    expect(Array.isArray(config)).toBe(true)
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
})

describe('Type Exports', () => {
  it('should have all ConfigOption values', () => {
    const options = Object.values(ConfigOption)

    expect(options).toContain('ts')

    expect(options).toContain('react')

    expect(options).toContain('next')
  })

  it('should have all OptionalOption values', () => {
    const options = Object.values(OptionalOption)

    expect(options).toContain('tailwind')

    expect(options).toContain('vitest')
  })

  it('should have all SettingOption values', () => {
    const options = Object.values(SettingOption)

    expect(options).toContain('gitignore')
  })
})
