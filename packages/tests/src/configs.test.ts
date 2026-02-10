import { describe, expect, it } from 'vitest'

import { astroConfig } from '@santi020k/eslint-config-astro'
import {
  ConfigOption,
  coreConfig,
  OptionalOption,
  SettingOption
} from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'

describe('Core Config', () => {
  it('should export coreConfig as an array', () => {
    expect(Array.isArray(coreConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(coreConfig.length).toBeGreaterThan(0)
  })

  it('should have named config entries', () => {
    const hasNames = coreConfig.every(config => typeof config.name === 'string')

    expect(hasNames).toBe(true)
  })
})

describe('TypeScript Config', () => {
  it('should export typescriptConfig as an array', () => {
    expect(Array.isArray(typescriptConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(typescriptConfig.length).toBeGreaterThan(0)
  })
})

describe('React Config', () => {
  it('should export reactConfig as an array', () => {
    expect(Array.isArray(reactConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(reactConfig.length).toBeGreaterThan(0)
  })
})

describe('Next.js Config', () => {
  it('should export nextConfig as an array', () => {
    expect(Array.isArray(nextConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(nextConfig.length).toBeGreaterThan(0)
  })
})

describe('Astro Config', () => {
  it('should export astroConfig as an array', () => {
    expect(Array.isArray(astroConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(astroConfig.length).toBeGreaterThan(0)
  })
})

describe('Expo Config', () => {
  it('should export expoConfig as an array', () => {
    expect(Array.isArray(expoConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(expoConfig.length).toBeGreaterThan(0)
  })
})

describe('NestJS Config', () => {
  it('should export nestConfig as an array', () => {
    expect(Array.isArray(nestConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(nestConfig.length).toBeGreaterThan(0)
  })
})

describe('Config Enums', () => {
  it('should export ConfigOption enum with expected values', () => {
    expect(ConfigOption.Ts).toBeDefined()

    expect(ConfigOption.React).toBeDefined()

    expect(ConfigOption.Next).toBeDefined()

    expect(ConfigOption.Astro).toBeDefined()

    expect(ConfigOption.Expo).toBeDefined()

    expect(ConfigOption.Nest).toBeDefined()
  })

  it('should export OptionalOption enum with expected values', () => {
    expect(OptionalOption.Tailwind).toBeDefined()

    expect(OptionalOption.Vitest).toBeDefined()

    expect(OptionalOption.Cspell).toBeDefined()
  })

  it('should export SettingOption enum with expected values', () => {
    expect(SettingOption.Gitignore).toBeDefined()
  })
})
