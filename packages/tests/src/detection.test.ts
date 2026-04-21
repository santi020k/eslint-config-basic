import * as fs from 'node:fs'
import { describe, expect, it, vi } from 'vitest'

import { detectProjectOptions, Format, Library, NextMode, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'

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

    expect(options.detectedFrameworks).toContain('react')
    // frameworks object must stay empty — booleans would throw in resolveFramework
    expect(options.frameworks?.react).toBeUndefined()
  })

  it('should detect Next.js if next is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { next: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('next')
    expect(options.detectedFrameworks).toContain('react') // next implies react
    expect(options.frameworks?.next).toBeUndefined()
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

  it('should detect Astro if astro is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { astro: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('astro')
    expect(options.frameworks?.astro).toBeUndefined()
  })

  it('should detect Svelte if svelte is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { svelte: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('svelte')
    expect(options.frameworks?.svelte).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  it('should detect Solid if solid-js is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'solid-js': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('solid')
    expect(options.frameworks?.solid).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  it('should detect Angular if @angular/core is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@angular/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('angular')
    expect(options.frameworks?.angular).toBeUndefined()
    expect(options.runtime).toBe(Runtime.Browser)
  })

  it('should detect Qwik if @builder.io/qwik is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@builder.io/qwik': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('qwik')
    expect(options.frameworks?.qwik).toBeUndefined()
  })

  it('should detect Remix if @remix-run/react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@remix-run/react': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('remix')
    expect(options.frameworks?.remix).toBeUndefined()
  })

  it('should detect Remix if @remix-run/node is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@remix-run/node': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('remix')
  })

  it('should detect Expo if expo is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { expo: 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react') // expo implies react
    expect(options.frameworks?.expo).toBeUndefined()
  })

  it('should detect Expo if react-native is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { 'react-native': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react')
  })

  it('should detect NestJS and set Node runtime', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { '@nestjs/core': 'latest' }
    }))

    const options = detectProjectOptions()

    expect(options.detectedFrameworks).toContain('nest')
    expect(options.frameworks?.nest).toBeUndefined()
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

  describe('NextMode detection', () => {
    it('should detect NextMode.AppRouter when app/ directory exists', () => {
      vi.mocked(fs.existsSync).mockImplementation(path => {
        const p = path.toString()

        return p.includes('package.json') || p.endsWith('/app') || p.endsWith('\\app')
      })

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { next: 'latest' }
      }))

      const options = detectProjectOptions()

      expect(options.nextMode).toBe(NextMode.AppRouter)
    })

    it('should detect NextMode.Pages when only pages/ directory exists (no app/)', () => {
      vi.mocked(fs.existsSync).mockImplementation(path => {
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

    it('should not set nextMode when next is not a dependency', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true)

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { react: 'latest' }
      }))

      const options = detectProjectOptions()

      expect(options.nextMode).toBeUndefined()
    })
  })

  describe('detectedFrameworks deduplication', () => {
    it('should not duplicate react when next is detected (next implies react)', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true)

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
        dependencies: { next: 'latest', react: 'latest' }
      }))

      const options = detectProjectOptions()
      const reactCount = options.detectedFrameworks?.filter(f => f === 'react').length ?? 0

      expect(reactCount).toBe(1)
    })
  })
})

describe('detectProjectOptions — does not pollute frameworks with booleans', () => {
  it('passing detectProjectOptions() result directly to eslintConfig() should not throw', async () => {
    const { eslintConfig } = await import('@santi020k/eslint-config-basic')

    vi.mocked(fs.existsSync).mockReturnValue(true)

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { next: 'latest', svelte: 'latest' }
    }))

    const detected = detectProjectOptions()

    // Must not throw — previously frameworks.next = true would cause resolveFramework to throw
    expect(() => eslintConfig(detected)).not.toThrow()
  })
})
