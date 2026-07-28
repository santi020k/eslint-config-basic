import * as fs from 'node:fs'

import { detectProjectOptions, Extension, Format, Library, NextMode, Preset, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'
import { __detectionInternals } from '@santi020k/eslint-config-core'

import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('node:fs')

describe('detectProjectOptions', () => {
  beforeEach(() => {
    __detectionInternals.clearDetectionCache()
  })
  test('should detect TypeScript if tsconfig.json exists', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('tsconfig.json') || path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.typescript).toBe(true)
  })

  test('should detect React if react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { react: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('react')
    // frameworks object must stay empty — booleans would throw in resolveFramework
    expect(options.frameworks?.react).toBeUndefined()
  })

  test('should detect Next.js if next is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { next: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('next')
    expect(options.detectedFrameworks).toContain('react') // next implies react
    expect(options.frameworks?.next).toBeUndefined()
  })

  test('should detect Tailwind if tailwindcss is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { tailwindcss: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Tailwind)
  })

  test('should detect Tailwind from first-party Tailwind adapter packages', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: {
        '@tailwindcss/postcss': 'latest',
        '@tailwindcss/vite': 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Tailwind)
  })

  test('should detect Vitest if vitest is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { vitest: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Vitest)
  })

  test('should detect TanStack Query/Router', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@tanstack/react-query': 'latest',
        '@tanstack/react-router': 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.TanstackQuery)

    expect(options.libraries).toContain(Library.TanstackRouter)
  })

  test('should detect AI SDK and MCP libraries', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@ai-sdk/openai': 'latest',
        '@modelcontextprotocol/sdk': 'latest',
        ai: 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.AiSdk)
    expect(options.libraries).toContain(Library.Mcp)
  })

  test('should detect OpenAI Agents SDK and Mastra libraries', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@mastra/core': 'latest',
        '@openai/agents': 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Mastra)
    expect(options.libraries).toContain(Library.OpenAiAgents)
  })

  test('should detect LangChain and LlamaIndex libraries', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@langchain/core': 'latest',
        llamaindex: 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Langchain)
    expect(options.libraries).toContain(Library.LlamaIndex)
  })

  test('should detect ORM libraries', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@mikro-orm/core': 'latest',
        '@prisma/client': 'latest',
        '@sequelize/core': 'latest',
        'drizzle-orm': 'latest',
        typeorm: 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Typeorm)
    expect(options.libraries).toContain(Library.Prisma)
    expect(options.libraries).toContain(Library.Drizzle)
    expect(options.libraries).toContain(Library.MikroOrm)
    expect(options.libraries).toContain(Library.Sequelize)
  })

  test('should detect Jest if jest is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { jest: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Jest)
  })

  test('should detect Cypress if cypress is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { cypress: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Cypress)
  })

  test('should detect extensions from their ESLint plugin dependencies', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: {
        'eslint-plugin-perfectionist': 'latest',
        'eslint-plugin-regexp': 'latest',
        'eslint-plugin-security': 'latest',
        'eslint-plugin-sonarjs': 'latest',
        'eslint-plugin-unicorn': 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.extensions).toEqual([
      Extension.Perfectionist,
      Extension.Regexp,
      Extension.Security,
      Extension.Sonarjs,
      Extension.Unicorn
    ])
  })

  test('should detect Testing Library if @testing-library/react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@testing-library/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.TestingLibrary)
  })

  test('should detect Prettier if prettier is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { prettier: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.tools).toContain(Tool.Prettier)
  })

  test('should detect Prettier from plugins and config files', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => {
      const p = path.toString()

      return p.includes('package.json') || p.endsWith('.prettierrc')
    })

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { 'prettier-plugin-tailwindcss': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.tools).toContain(Tool.Prettier)
  })

  test('should detect CSpell from config files', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => {
      const p = path.toString()

      return p.includes('package.json') || p.endsWith('cspell.config.yaml')
    })

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.tools).toContain(Tool.Cspell)
    expect(options.formats).toContain(Format.Yaml)
  })

  test('should detect JSDoc from its ESLint plugin', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { 'eslint-plugin-jsdoc': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.tools).toContain(Tool.Jsdoc)
  })

  test('should detect Storybook via @storybook/core', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@storybook/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Storybook)
  })

  test('should detect GraphQL when graphql is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { graphql: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Graphql)
  })

  test('should detect MDX from Astro MDX', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@astrojs/mdx': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Mdx)
  })

  test('should detect Markdown from Markdown tooling packages', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        'markdownlint-cli2': 'latest',
        'react-markdown': 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Markdown)
  })

  test('should detect GraphQL when schema.graphql exists', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('schema.graphql') || path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Graphql)
  })

  test('should handle missing package.json gracefully', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => !path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File not found')
    })

    const options = detectProjectOptions()

    expect(options.typescript).toBe(false)
    expect(options.frameworks).toEqual({})
    expect(options.detectedFrameworks).toEqual([])
    expect(options.libraries).toEqual([])
    expect(options.testing).toEqual([])
    expect(options.formats).toEqual([])
    expect(options.tools).toEqual([])
    expect(options.extensions).toEqual([])
    expect(options.runtime).toBe(Runtime.Universal)
  })

  test('should detect Astro if astro is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { astro: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('astro')
    expect(options.frameworks?.astro).toBeUndefined()
  })

  test('should detect Svelte if svelte is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { svelte: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('svelte')
    expect(options.frameworks?.svelte).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Solid if solid-js is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'solid-js': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('solid')
    expect(options.frameworks?.solid).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Angular if @angular/core is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@angular/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('angular')
    expect(options.frameworks?.angular).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Qwik if @builder.io/qwik is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@builder.io/qwik': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('qwik')
    expect(options.frameworks?.qwik).toBeUndefined()
  })

  test('should detect Slidev if @slidev/cli is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@slidev/cli': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('slidev')
    expect(options.detectedFrameworks).toContain('vue')
    expect(options.frameworks?.slidev).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Vite if vite is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { vite: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('vite')
    expect(options.frameworks?.vite).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should not add Vite as a separate framework for Vite-backed meta-frameworks', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { astro: 'latest' },
      devDependencies: { vite: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('astro')
    expect(options.detectedFrameworks).not.toContain('vite')
  })

  test('should detect Remix if @remix-run/react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@remix-run/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('react-router')
    expect(options.frameworks).not.toHaveProperty('remix')
  })

  test('should detect Remix if @remix-run/node is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@remix-run/node': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('react-router')
  })

  test('should detect React Router if @react-router/dev is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@react-router/dev': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('react-router')
    expect(options.detectedFrameworks).toContain('react') // react-router implies react
    expect(options.frameworks).not.toHaveProperty('react-router')
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Nuxt if nuxt is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { nuxt: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('nuxt')
    expect(options.detectedFrameworks).toContain('vue') // nuxt implies vue
    expect(options.frameworks?.nuxt).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Universal)
  })

  test('should detect Preact if preact is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { preact: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('preact')
    expect(options.frameworks?.preact).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Lit if lit is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { lit: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('lit')
    expect(options.frameworks?.lit).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect Lit if lit-element is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'lit-element': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('lit')
  })

  test('should detect TanStack Start if @tanstack/react-start is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@tanstack/react-start': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('tanstack-start')
    expect(options.detectedFrameworks).toContain('react') // react-start implies react
    expect(options.frameworks).not.toHaveProperty('tanstack-start')
    expect(options.runtime).toBe(Runtime.Universal)
  })

  test('should detect TanStack Start if @tanstack/solid-start is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@tanstack/solid-start': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('tanstack-start')
    expect(options.detectedFrameworks).toContain('solid') // solid-start implies solid
    expect(options.detectedFrameworks).not.toContain('react') // solid-start must NOT imply react
    expect(options.runtime).toBe(Runtime.Universal)
  })

  test('should not detect Vite framework config when a meta-framework owns the build', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@tanstack/react-start': 'latest' },
      devDependencies: { vite: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('tanstack-start')
    expect(options.detectedFrameworks).not.toContain('vite')
  })

  test('should detect Expo if expo is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { expo: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react') // expo implies react
    expect(options.frameworks?.expo).toBeUndefined()
  })

  test('should detect Expo if react-native is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'react-native': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react')
  })

  test('should detect NestJS and set Node runtime', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@nestjs/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('nest')
    expect(options.frameworks?.nest).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Node)
  })

  test('should detect Hono without forcing a runtime adapter', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { hono: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('hono')
    expect(options.frameworks?.hono).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Universal)
  })

  test('should detect Hono on Cloudflare Workers as Worker runtime', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { hono: 'latest' },
      devDependencies: { '@cloudflare/workers-types': 'latest', wrangler: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('hono')
    expect(options.runtime).toBe(Runtime.Cloudflare)
  })

  test('should detect Bun, Deno, and Cloudflare runtime signals', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => {
      const p = path.toString()

      return p.includes('package.json') || p.endsWith('bun.lock') || p.endsWith('deno.json') || p.endsWith('wrangler.jsonc')
    })

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: {
        '@deno/eslint-plugin': 'latest',
        wrangler: 'latest'
      },
      packageManager: 'bun@1.2.0'
    }))

    const options = detectProjectOptions()

    expect(options.runtime).toBe(Runtime.Cloudflare)
  })

  test('should detect workspace projects from package workspaces', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => {
      const p = path.toString()

      return p.includes('package.json') || p.endsWith('packages') || p.endsWith('packages/core/package.json')
    })

    vi.mocked(fs.readdirSync).mockReturnValue([
      { isDirectory: () => true, isFile: () => false, name: 'core' }
    ] as unknown as ReturnType<typeof fs.readdirSync>)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      workspaces: ['packages/*']
    }))

    const options = detectProjectOptions()

    expect(options.projects).toHaveProperty('packages/core')
  })

  test('should detect Cloudflare Worker runtime for non-framework worker packages', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@cloudflare/workers-types': 'latest', wrangler: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toEqual([])
    expect(options.runtime).toBe(Runtime.Cloudflare)
  })

  test('should not force Worker runtime for browser frameworks deployed with Wrangler', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { astro: 'latest' },
      devDependencies: { wrangler: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('astro')
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should not force Worker runtime for Qwik deployed with Wrangler', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@builder.io/qwik': 'latest' },
      devDependencies: { wrangler: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('qwik')
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('should detect i18next if i18next is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { i18next: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.I18next)
  })

  test('should detect Stencil if @stencil/core is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@stencil/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Stencil)
  })

  test('should detect Storybook via @storybook/react', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@storybook/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Storybook)
  })

  test('should detect Storybook via @storybook/svelte', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@storybook/svelte': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Storybook)
  })

  test('should detect Playwright via @playwright/test', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@playwright/test': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Playwright)
  })

  test('should detect Jest via @jest/core', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@jest/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Jest)
  })

  test('should detect Testing Library via @testing-library/vue', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@testing-library/vue': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.TestingLibrary)
  })

  test('should detect TanStack Query via @tanstack/vue-query', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@tanstack/vue-query': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.TanstackQuery)
  })

  test('should detect GraphQL via Apollo Client', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@apollo/client': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Graphql)
  })

  test('should use default extensions, formats, and tools when package.json is present', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {}
    }))

    const options = detectProjectOptions()

    expect(options.formats).toEqual([])
    expect(options.tools).toEqual([])
    expect(options.extensions).toEqual([])
  })

  test('should detect tsconfig.base.json as TypeScript project', () => {
    vi.mocked(fs.existsSync).mockImplementation(
      (path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('tsconfig.base.json') || path.toString().includes('package.json')
    )

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.typescript).toBe(true)
  })

  describe('NextMode detection', () => {
    test('should detect NextMode.AppRouter when app/ directory exists', () => {
      vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => {
        const p = path.toString()

        return p.includes('package.json') || p.endsWith('/app') || p.endsWith('\\app')
      })

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { next: 'latest' }
      }))

      const options = detectProjectOptions()

      expect(options.nextMode).toBe(NextMode.AppRouter)
    })

    test('should detect NextMode.Pages when only pages/ directory exists (no app/)', () => {
      vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => {
        const p = path.toString()

        // Return true for package.json only — no app/ directory present
        return p.includes('package.json') && !p.endsWith('/app') && !p.endsWith('\\app')
      })

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { next: 'latest' }
      }))

      const options = detectProjectOptions()

      expect(options.nextMode).toBe(NextMode.Pages)
    })

    test('should not set nextMode when next is not a dependency', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true)

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { react: 'latest' }
      }))

      const options = detectProjectOptions()

      expect(options.nextMode).toBeUndefined()
    })
  })

  describe('detectedFrameworks deduplication', () => {
    test('should not duplicate react when next is detected (next implies react)', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true)

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { next: 'latest', react: 'latest' }
      }))

      const options = detectProjectOptions()
      const reactCount = options.detectedFrameworks?.filter(f => f === 'react').length ?? 0

      expect(reactCount).toBe(1)
    })
  })

  test('should keep runtime deterministic by priority regardless of detection order', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@nestjs/core': 'latest',
        hono: 'latest',
        react: 'latest'
      },
      devDependencies: {
        wrangler: 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.runtime).toBe(Runtime.Cloudflare)
  })

  test('should not downgrade runtime when universal frameworks are combined with node frameworks', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@nestjs/core': 'latest',
        next: 'latest'
      }
    }))

    const options = detectProjectOptions()

    expect(options.runtime).toBe(Runtime.Node)
    expect(options.preset).toBe(Preset.Basic)
  })

  test('should keep Expo runtime universal while still implying react', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: Parameters<typeof fs.existsSync>[0]) => path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { expo: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react')
    expect(options.runtime).toBe(Runtime.Universal)
  })
})

describe('detectProjectOptions — does not pollute frameworks with booleans', () => {
  test('passing detectProjectOptions() result directly to defineConfig() should not throw', async () => {
    const { defineConfig } = await import('@santi020k/eslint-config-basic')

    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { next: 'latest', svelte: 'latest' }
    }))

    const detected = detectProjectOptions()

    // Must not throw — previously frameworks.next = true would cause resolveFramework to throw
    await expect(defineConfig(detected)).resolves.toBeDefined()
  })
})
