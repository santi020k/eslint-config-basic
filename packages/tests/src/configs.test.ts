import { describe, expect, it } from 'vitest'

import { angularConfig } from '@santi020k/eslint-config-angular'
import { astroConfig } from '@santi020k/eslint-config-astro'
import {
  coreConfig,
  Extension,
  Format,
  Library,
  Runtime,
  Setting,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { createHonoConfig, honoConfig } from '@santi020k/eslint-config-hono'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { qwik as qwikConfig } from '@santi020k/eslint-config-qwik'
import { reactConfig } from '@santi020k/eslint-config-react'
import { remix as remixConfig } from '@santi020k/eslint-config-remix'
import { solidConfig } from '@santi020k/eslint-config-solid'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { vueConfig } from '@santi020k/eslint-config-vue'

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

  it('should include core plugins', () => {
    const plugins = coreConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('n')
    expect(plugins).toContain('promise')
    expect(plugins).toContain('import')
    expect(plugins).toContain('simple-import-sort')
    expect(plugins).toContain('unused-imports')
    expect(plugins).toContain('@stylistic')
  })
})

describe('TypeScript Config', () => {
  it('should export typescriptConfig as an array', () => {
    expect(Array.isArray(typescriptConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(typescriptConfig.length).toBeGreaterThan(0)
  })

  it('should include typescript-eslint plugin', () => {
    const plugins = typescriptConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('@typescript-eslint')
  })
})

describe('React Config', () => {
  it('should export reactConfig as an array', () => {
    expect(Array.isArray(reactConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(reactConfig.length).toBeGreaterThan(0)
  })

  it('should include react-related plugins', () => {
    const plugins = reactConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('react')
    expect(plugins).toContain('react-hooks')
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

describe('Hono Config', () => {
  it('should export honoConfig as an array', () => {
    expect(Array.isArray(honoConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(honoConfig.length).toBeGreaterThan(0)
  })

  it('should include worker runtime globals', () => {
    const globals = honoConfig.flatMap(config => Object.keys(config.languageOptions?.globals ?? {}))

    expect(globals).toContain('fetch')
  })

  it('should allow non-Worker Hono runtimes through the factory', () => {
    const config = createHonoConfig({ runtime: Runtime.Node })
    const globals = config.flatMap(entry => Object.keys(entry.languageOptions?.globals ?? {}))

    expect(globals).toContain('process')
  })
})

describe('Vue Config', () => {
  it('should export vueConfig as an array', () => {
    expect(Array.isArray(vueConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(vueConfig.length).toBeGreaterThan(0)
  })

  it('should include vue parser and plugin', () => {
    const plugins = vueConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('vue')
  })
})

describe('Svelte Config', () => {
  it('should export svelteConfig as an array', () => {
    expect(Array.isArray(svelteConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(svelteConfig.length).toBeGreaterThan(0)
  })

  it('should include svelte plugin', () => {
    const plugins = svelteConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('svelte')
  })

  it('should scope rules to .svelte files', () => {
    const files = svelteConfig.flatMap(c => c.files ?? [])
    expect(files.some(f => f.toString().includes('.svelte'))).toBe(true)
  })
})

describe('Solid Config', () => {
  it('should export solidConfig as an array', () => {
    expect(Array.isArray(solidConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(solidConfig.length).toBeGreaterThan(0)
  })

  it('should include solid plugin', () => {
    const plugins = solidConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('solid')
  })
})

describe('Angular Config', () => {
  it('should export angularConfig as an array', () => {
    expect(Array.isArray(angularConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(angularConfig.length).toBeGreaterThan(0)
  })

  it('should include angular-eslint plugin', () => {
    const plugins = angularConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('@angular-eslint')
  })

  it('should scope rules to .ts files', () => {
    const files = angularConfig.flatMap(c => c.files ?? [])
    expect(files.some(f => f.toString().includes('.ts'))).toBe(true)
  })
})

describe('Qwik Config', () => {
  it('should export qwik as an array', () => {
    expect(Array.isArray(qwikConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(qwikConfig.length).toBeGreaterThan(0)
  })

  it('should include qwik plugin', () => {
    const plugins = qwikConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('qwik')
  })
})

describe('Remix Config', () => {
  it('should export remix as an array', () => {
    expect(Array.isArray(remixConfig)).toBe(true)
  })

  it('should have at least one config entry', () => {
    expect(remixConfig.length).toBeGreaterThan(0)
  })

  it('should include jsx-a11y plugin', () => {
    const plugins = remixConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('jsx-a11y')
  })
})

describe('Config Enums', () => {
  it('should export all Library enum values', () => {
    expect(Library.Tailwind).toBeDefined()
    expect(Library.I18next).toBeDefined()
    expect(Library.Stencil).toBeDefined()
    expect(Library.TanstackQuery).toBeDefined()
    expect(Library.TanstackRouter).toBeDefined()
    expect(Library.Storybook).toBeDefined()
  })

  it('should export all Testing enum values', () => {
    expect(Testing.Vitest).toBeDefined()
    expect(Testing.Jest).toBeDefined()
    expect(Testing.Playwright).toBeDefined()
    expect(Testing.Cypress).toBeDefined()
    expect(Testing.TestingLibrary).toBeDefined()
  })

  it('should export all Tool enum values', () => {
    expect(Tool.Cspell).toBeDefined()
    expect(Tool.Prettier).toBeDefined()
    expect(Tool.Jsdoc).toBeDefined()
    expect(Tool.Swagger).toBeDefined()
  })

  it('should export all Extension enum values', () => {
    expect(Extension.Unicorn).toBeDefined()
    expect(Extension.Sonarjs).toBeDefined()
    expect(Extension.Regexp).toBeDefined()
    expect(Extension.Security).toBeDefined()
    expect(Extension.Perfectionist).toBeDefined()
  })

  it('should export all Format enum values', () => {
    expect(Format.Mdx).toBeDefined()
    expect(Format.Markdown).toBeDefined()
    expect(Format.Jsonc).toBeDefined()
    expect(Format.Yaml).toBeDefined()
    expect(Format.Toml).toBeDefined()
    expect(Format.Graphql).toBeDefined()
  })

  it('should export Setting enum with expected values', () => {
    expect(Setting.Gitignore).toBeDefined()
    expect(Setting.NoGitignore).toBeDefined()
  })
})
