import * as fs from 'node:fs'
import { describe, expect, it, vi } from 'vitest'

import { detectProjectOptions, Format, Library, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'

vi.mock('node:fs')

describe('detectProjectOptions', () => {
  it('should detect TypeScript if tsconfig.json exists', () => {
    vi.mocked(fs.existsSync).mockImplementation(path => path.toString().includes('tsconfig.json') || path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.typescript).toBe(true)
  })

  it('should detect React if react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { react: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.react).toBe(true)
  })

  it('should detect Next.js if next is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { next: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.next).toBe(true)
  })

  it('should detect Tailwind if tailwindcss is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { tailwindcss: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Tailwind)
  })

  it('should detect Vitest if vitest is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { vitest: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Vitest)
  })

  it('should detect TanStack Query/Router', () => {
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

  it('should detect Jest if jest is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { jest: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Jest)
  })

  it('should detect Cypress if cypress is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { cypress: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Cypress)
  })

  it('should detect Testing Library if @testing-library/react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@testing-library/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.TestingLibrary)
  })

  it('should detect Prettier if prettier is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { prettier: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.tools).toContain(Tool.Prettier)
  })

  it('should detect Storybook via @storybook/core', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@storybook/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Storybook)
  })

  it('should detect GraphQL when graphql is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { graphql: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Graphql)
  })

  it('should detect GraphQL when schema.graphql exists', () => {
    vi.mocked(fs.existsSync).mockImplementation(path => path.toString().includes('schema.graphql') || path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Graphql)
  })

  it('should handle missing package.json gracefully', () => {
    vi.mocked(fs.existsSync).mockImplementation(path => !path.toString().includes('package.json'))

    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File not found')
    })

    const options = detectProjectOptions()

    expect(options).toEqual({
      typescript: false,
      frameworks: {},
      libraries: [],
      testing: [],
      formats: [],
      tools: [],
      extensions: [],
      runtime: Runtime.Universal
    })
  })

  it('should detect Svelte if svelte is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { svelte: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.svelte).toBe(true)

    expect(options.runtime).toBe(Runtime.Browser)
  })

  it('should detect Solid if solid-js is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'solid-js': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.solid).toBe(true)

    expect(options.runtime).toBe(Runtime.Browser)
  })

  it('should detect Angular if @angular/core is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@angular/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.angular).toBe(true)

    expect(options.runtime).toBe(Runtime.Browser)
  })

  it('should detect Qwik if @builder.io/qwik is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@builder.io/qwik': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.qwik).toBe(true)
  })

  it('should detect Remix if @remix-run/react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@remix-run/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.remix).toBe(true)
  })

  it('should detect Remix if @remix-run/node is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@remix-run/node': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.remix).toBe(true)
  })

  it('should detect Expo if expo is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { expo: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.expo).toBe(true)
  })

  it('should detect Expo if react-native is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'react-native': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.expo).toBe(true)
  })

  it('should detect NestJS and set Node runtime', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@nestjs/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.frameworks?.nest).toBe(true)

    expect(options.runtime).toBe(Runtime.Node)
  })

  it('should detect i18next if i18next is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { i18next: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.I18next)
  })

  it('should detect Stencil if @stencil/core is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@stencil/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Stencil)
  })

  it('should detect Storybook via @storybook/react', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@storybook/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Storybook)
  })

  it('should detect Storybook via @storybook/svelte', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@storybook/svelte': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.Storybook)
  })

  it('should detect Playwright via @playwright/test', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@playwright/test': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Playwright)
  })

  it('should detect Jest via @jest/core', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@jest/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.Jest)
  })

  it('should detect Testing Library via @testing-library/vue', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { '@testing-library/vue': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.testing).toContain(Testing.TestingLibrary)
  })

  it('should detect TanStack Query via @tanstack/vue-query', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@tanstack/vue-query': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.libraries).toContain(Library.TanstackQuery)
  })

  it('should detect GraphQL via Apollo Client', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@apollo/client': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.formats).toContain(Format.Graphql)
  })

  it('should auto-enable security extension for all detected projects', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {}
    }))

    const options = detectProjectOptions()

    expect(options.extensions).toContain('security')
  })

  it('should detect tsconfig.base.json as TypeScript project', () => {
    vi.mocked(fs.existsSync).mockImplementation(
      path => path.toString().includes('tsconfig.base.json') || path.toString().includes('package.json')
    )

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()

    expect(options.typescript).toBe(true)
  })
})
