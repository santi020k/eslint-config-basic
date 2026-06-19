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
import { lit as litConfig } from '@santi020k/eslint-config-lit'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { nuxt as nuxtConfig } from '@santi020k/eslint-config-nuxt'
import { preactConfig } from '@santi020k/eslint-config-preact'
import { qwik as qwikConfig } from '@santi020k/eslint-config-qwik'
import { reactConfig } from '@santi020k/eslint-config-react'
import { reactRouter as reactRouterConfig } from '@santi020k/eslint-config-react-router'
import { remix as remixConfig } from '@santi020k/eslint-config-remix'
import { slidevConfig } from '@santi020k/eslint-config-slidev'
import { solidConfig } from '@santi020k/eslint-config-solid'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { tanstackStart as tanstackStartConfig } from '@santi020k/eslint-config-tanstack-start'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { viteConfig } from '@santi020k/eslint-config-vite'
import { vueConfig } from '@santi020k/eslint-config-vue'

import type { TSESLint } from '@typescript-eslint/utils'
import { describe, expect, test } from 'vitest'

describe('Core Config', () => {
  test('should export coreConfig as an array', () => {
    expect(Array.isArray(coreConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(coreConfig.length).toBeGreaterThan(0)
  })

  test('should have named config entries', () => {
    const hasNames = coreConfig.every(config => typeof config.name === 'string')

    expect(hasNames).toBe(true)
  })

  test('should include core plugins', () => {
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
  test('should export typescriptConfig as an array', () => {
    expect(Array.isArray(typescriptConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(typescriptConfig.length).toBeGreaterThan(0)
  })

  test('should include typescript-eslint plugin', () => {
    const plugins = typescriptConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('@typescript-eslint')
  })
})

describe('React Config', () => {
  test('should export reactConfig as an array', () => {
    expect(Array.isArray(reactConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(reactConfig.length).toBeGreaterThan(0)
  })

  test('should include react-related plugins', () => {
    const plugins = reactConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('@eslint-react')
    expect(plugins).toContain('react-compiler')
    expect(plugins).toContain('react-refresh')
  })
})

describe('Next.js Config', () => {
  test('should export nextConfig as an array', () => {
    expect(Array.isArray(nextConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(nextConfig.length).toBeGreaterThan(0)
  })
})

describe('Astro Config', () => {
  test('should export astroConfig as an array', () => {
    expect(Array.isArray(astroConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(astroConfig.length).toBeGreaterThan(0)
  })
})

describe('Expo Config', () => {
  test('should export expoConfig as an array', () => {
    expect(Array.isArray(expoConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(expoConfig.length).toBeGreaterThan(0)
  })
})

describe('NestJS Config', () => {
  test('should export nestConfig as an array', () => {
    expect(Array.isArray(nestConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(nestConfig.length).toBeGreaterThan(0)
  })
})

describe('Hono Config', () => {
  test('should export honoConfig as an array', () => {
    expect(Array.isArray(honoConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(honoConfig.length).toBeGreaterThan(0)
  })

  test('should include worker runtime globals', () => {
    const globals = honoConfig.flatMap(config => Object.keys(config.languageOptions?.globals ?? {}))

    expect(globals).toContain('fetch')
  })

  test('should allow non-Worker Hono runtimes through the factory', () => {
    const config = createHonoConfig({ runtime: Runtime.Node })
    const globals = config.flatMap(entry => Object.keys(entry.languageOptions?.globals ?? {}))

    expect(globals).toContain('process')
  })
})

describe('Vue Config', () => {
  test('should export vueConfig as an array', () => {
    expect(Array.isArray(vueConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(vueConfig.length).toBeGreaterThan(0)
  })

  test('should include vue parser and plugin', () => {
    const plugins = vueConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('vue')
  })
})

describe('Svelte Config', () => {
  test('should export svelteConfig as an array', () => {
    expect(Array.isArray(svelteConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(svelteConfig.length).toBeGreaterThan(0)
  })

  test('should include svelte plugin', () => {
    const plugins = svelteConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('svelte')
  })

  test('should scope rules to .svelte files', () => {
    const files = svelteConfig.flatMap(c => c.files ?? [])
    expect(files.some(f => f.toString().includes('.svelte'))).toBe(true)
  })
})

describe('Solid Config', () => {
  test('should export solidConfig as an array', () => {
    expect(Array.isArray(solidConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(solidConfig.length).toBeGreaterThan(0)
  })

  test('should include solid plugin', () => {
    const plugins = solidConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('solid')
  })
})

describe('Angular Config', () => {
  test('should export angularConfig as an array', () => {
    expect(Array.isArray(angularConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(angularConfig.length).toBeGreaterThan(0)
  })

  test('should include angular-eslint plugin', () => {
    const plugins = angularConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('@angular-eslint')
  })

  test('should scope rules to .ts files', () => {
    const files = angularConfig.flatMap(c => c.files ?? [])
    expect(files.some(f => f.toString().includes('.ts'))).toBe(true)
  })
})

describe('Qwik Config', () => {
  test('should export qwik as an array', () => {
    expect(Array.isArray(qwikConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(qwikConfig.length).toBeGreaterThan(0)
  })

  test('should include qwik plugin', () => {
    const plugins = qwikConfig.flatMap(c => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('qwik')
  })
})

describe('React Router Config', () => {
  test('should export reactRouterConfig as an array', () => {
    expect(Array.isArray(reactRouterConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(reactRouterConfig.length).toBeGreaterThan(0)
  })

  test('should include jsx-a11y plugin', () => {
    const plugins = reactRouterConfig.flatMap((c: TSESLint.FlatConfig.Config) => Object.keys(c.plugins ?? {}))
    expect(plugins).toContain('jsx-a11y')
  })

  test('should disable unused-expression rules in virtual script blocks', () => {
    const virtualConfig = reactRouterConfig.find((config: TSESLint.FlatConfig.Config) => config.name === 'eslint-config-react-router/virtual-script-rules')

    expect(virtualConfig?.rules?.['@typescript-eslint/no-unused-expressions']).toBe('off')
  })
})

describe('Lit Config', () => {
  test('should export lit as an array', () => {
    expect(Array.isArray(litConfig)).toBe(true)
  })

  test('should include wc and lit recommended entries', () => {
    const names = litConfig.flatMap((c: TSESLint.FlatConfig.Config) => (c.name ? [c.name] : []))

    expect(names).toContain('eslint-config-lit/wc-recommended')
    expect(names).toContain('eslint-config-lit/lit-recommended')
  })

  test('should include wc and lit plugins', () => {
    const plugins = litConfig.flatMap((c: TSESLint.FlatConfig.Config) => Object.keys(c.plugins ?? {}))

    expect(plugins).toContain('wc')
    expect(plugins).toContain('lit')
  })
})

describe('Nuxt Config', () => {
  test('should export nuxt as an array', () => {
    expect(Array.isArray(nuxtConfig)).toBe(true)
  })

  test('should include rules and server-runtime entries', () => {
    const names = nuxtConfig.flatMap((c: TSESLint.FlatConfig.Config) => (c.name ? [c.name] : []))

    expect(names).toContain('eslint-config-nuxt/rules')
    expect(names).toContain('eslint-config-nuxt/server-runtime')
  })

  test('should include the nuxt plugin with prefer-import-meta enabled', () => {
    const rulesConfig = nuxtConfig.find((config: TSESLint.FlatConfig.Config) => config.name === 'eslint-config-nuxt/rules')

    expect(Object.keys(rulesConfig?.plugins ?? {})).toContain('nuxt')
    expect(rulesConfig?.rules?.['nuxt/prefer-import-meta']).toBe('error')
  })
})

describe('TanStack Start Config', () => {
  test('should export tanstackStart as an array', () => {
    expect(Array.isArray(tanstackStartConfig)).toBe(true)
  })

  test('should include router and query entries', () => {
    const names = tanstackStartConfig.flatMap((c: TSESLint.FlatConfig.Config) => (c.name ? [c.name] : []))

    expect(names).toContain('eslint-config-tanstack-start/router')
    expect(names).toContain('eslint-config-tanstack-start/query')
  })

  test('should include TanStack router and query plugins', () => {
    const plugins = tanstackStartConfig.flatMap((c: TSESLint.FlatConfig.Config) => Object.keys(c.plugins ?? {}))

    expect(plugins).toContain('@tanstack/router')
    expect(plugins).toContain('@tanstack/query')
  })
})

describe('Vite Config', () => {
  test('should export viteConfig as an array', () => {
    expect(Array.isArray(viteConfig)).toBe(true)
  })

  test('should include browser and config-file entries', () => {
    const names = viteConfig.flatMap(c => (c.name ? [c.name] : []))

    expect(names).toContain('eslint-config-vite/runtime')
    expect(names).toContain('eslint-config-vite/config-files')
  })

  test('should include browser globals for app files', () => {
    const globals = viteConfig.flatMap(config => Object.keys(config.languageOptions?.globals ?? {}))

    expect(globals).toContain('document')
  })
})

describe('Slidev Config', () => {
  test('should export slidevConfig as an array', () => {
    expect(Array.isArray(slidevConfig)).toBe(true)
  })

  test('should include deck markdown and setup entries', () => {
    const names = slidevConfig.flatMap(c => (c.name ? [c.name] : []))

    expect(names).toContain('eslint-config-slidev/deck-markdown')
    expect(names).toContain('eslint-config-slidev/setup-files')
  })

  test('should disable Vue rules for Slidev markdown files', () => {
    const markdownConfig = slidevConfig.find(config => config.name === 'eslint-config-slidev/deck-markdown')

    expect(markdownConfig?.rules?.['vue/multi-word-component-names']).toBe('off')
    expect(markdownConfig?.rules?.['vue/no-async-in-computed-properties']).toBe('off')
  })
})

describe('Preact Config', () => {
  test('should export preactConfig as an array', () => {
    expect(Array.isArray(preactConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(preactConfig.length).toBeGreaterThan(0)
  })

  test('should include recommended and custom entries', () => {
    const names = preactConfig.flatMap((c: TSESLint.FlatConfig.Config) => (c.name ? [c.name] : []))

    expect(names).toContain('eslint-config-preact/recommended')
    expect(names).toContain('eslint-config-preact/custom')
  })
})

describe('Remix Config', () => {
  test('should export remix as an array', () => {
    expect(Array.isArray(remixConfig)).toBe(true)
  })

  test('should have at least one config entry', () => {
    expect(remixConfig.length).toBeGreaterThan(0)
  })

  test('should re-export react-router config with eslint-config-remix prefix', () => {
    const names = remixConfig.flatMap((c: TSESLint.FlatConfig.Config) => (c.name ? [c.name] : []))

    expect(names.every((name: string) => name.startsWith('eslint-config-remix'))).toBe(true)
  })
})

describe('Config Enums', () => {
  test('should export all Library enum values', () => {
    expect(Library.AiSdk).toBeDefined()
    expect(Library.Autogen).toBeDefined()
    expect(Library.Drizzle).toBeDefined()
    expect(Library.GoogleGenAi).toBeDefined()
    expect(Library.I18next).toBeDefined()
    expect(Library.Langchain).toBeDefined()
    expect(Library.LlamaIndex).toBeDefined()
    expect(Library.Mastra).toBeDefined()
    expect(Library.Mcp).toBeDefined()
    expect(Library.MikroOrm).toBeDefined()
    expect(Library.OpenAiAgents).toBeDefined()
    expect(Library.Prisma).toBeDefined()
    expect(Library.Sequelize).toBeDefined()
    expect(Library.Stencil).toBeDefined()
    expect(Library.Storybook).toBeDefined()
    expect(Library.Tailwind).toBeDefined()
    expect(Library.TanstackQuery).toBeDefined()
    expect(Library.TanstackRouter).toBeDefined()
    expect(Library.Turbo).toBeDefined()
    expect(Library.Typeorm).toBeDefined()
    expect(Library.Zod).toBeDefined()
  })

  test('should export all Testing enum values', () => {
    expect(Testing.Cypress).toBeDefined()
    expect(Testing.Jest).toBeDefined()
    expect(Testing.JestDom).toBeDefined()
    expect(Testing.Playwright).toBeDefined()
    expect(Testing.TestingLibrary).toBeDefined()
    expect(Testing.Vitest).toBeDefined()
  })

  test('should export all Tool enum values', () => {
    expect(Tool.Command).toBeDefined()
    expect(Tool.Cspell).toBeDefined()
    expect(Tool.Docker).toBeDefined()
    expect(Tool.GithubActions).toBeDefined()
    expect(Tool.Jsdoc).toBeDefined()
    expect(Tool.Nx).toBeDefined()
    expect(Tool.Pnpm).toBeDefined()
    expect(Tool.Prettier).toBeDefined()
    expect(Tool.Swagger).toBeDefined()
  })

  test('should export all Extension enum values', () => {
    expect(Extension.A11y).toBeDefined()
    expect(Extension.BestPractices).toBeDefined()
    expect(Extension.Biome).toBeDefined()
    expect(Extension.Boundaries).toBeDefined()
    expect(Extension.Compat).toBeDefined()
    expect(Extension.DeMorgan).toBeDefined()
    expect(Extension.Depend).toBeDefined()
    expect(Extension.Node).toBeDefined()
    expect(Extension.Oxlint).toBeDefined()
    expect(Extension.Perfectionist).toBeDefined()
    expect(Extension.Regexp).toBeDefined()
    expect(Extension.Security).toBeDefined()
    expect(Extension.Sonarjs).toBeDefined()
    expect(Extension.Unicorn).toBeDefined()
  })

  test('should export all Format enum values', () => {
    expect(Format.Css).toBeDefined()
    expect(Format.Graphql).toBeDefined()
    expect(Format.Html).toBeDefined()
    expect(Format.Jsonc).toBeDefined()
    expect(Format.Markdown).toBeDefined()
    expect(Format.Mdx).toBeDefined()
    expect(Format.PackageJson).toBeDefined()
    expect(Format.Toml).toBeDefined()
    expect(Format.Yaml).toBeDefined()
  })

  test('should export all Setting enum values', () => {
    expect(Setting.DefaultIgnores).toBeDefined()
    expect(Setting.GeneratedCodeIgnores).toBeDefined()
    expect(Setting.Gitignore).toBeDefined()
    expect(Setting.NoDefaultIgnores).toBeDefined()
    expect(Setting.NoGeneratedCodeIgnores).toBeDefined()
    expect(Setting.NoGitignore).toBeDefined()
  })

  test('should export all Runtime enum values', () => {
    expect(Runtime.Browser).toBeDefined()
    expect(Runtime.Bun).toBeDefined()
    expect(Runtime.Cloudflare).toBeDefined()
    expect(Runtime.Deno).toBeDefined()
    expect(Runtime.Node).toBeDefined()
    expect(Runtime.Universal).toBeDefined()
    expect(Runtime.Worker).toBeDefined()
  })
})
