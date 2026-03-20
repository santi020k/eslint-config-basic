import * as fs from 'node:fs'
import { describe, expect, it, vi } from 'vitest'

import { ConfigOption, detectProjectOptions, OptionalOption, RuntimeOption } from '@santi020k/eslint-config-basic'

vi.mock('node:fs')

describe('detectProjectOptions', () => {
  it('should detect TypeScript if tsconfig.json exists', () => {
    vi.mocked(fs.existsSync).mockImplementation(path => path.toString().includes('tsconfig.json') || path.toString().includes('package.json'))
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }))

    const options = detectProjectOptions()
    expect(options.config).toContain(ConfigOption.Ts)
  })

  it('should detect React if react is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { react: 'latest' }
    }))

    const options = detectProjectOptions()
    expect(options.config).toContain(ConfigOption.React)
  })

  it('should detect Next.js if next is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: { next: 'latest' }
    }))

    const options = detectProjectOptions()
    expect(options.config).toContain(ConfigOption.Next)
  })

  it('should detect Tailwind if tailwindcss is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { tailwindcss: 'latest' }
    }))

    const options = detectProjectOptions()
    expect(options.optionals).toContain(OptionalOption.Tailwind)
  })

  it('should detect Vitest if vitest is a dependency', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: { vitest: 'latest' }
    }))

    const options = detectProjectOptions()
    expect(options.optionals).toContain(OptionalOption.Vitest)
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
    expect(options.optionals).toContain(OptionalOption.TanstackQuery)
    expect(options.optionals).toContain(OptionalOption.TanstackRouter)
  })

  it('should handle missing package.json gracefully', () => {
    vi.mocked(fs.existsSync).mockImplementation(path => !path.toString().includes('package.json'))
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File not found')
    })

    const options = detectProjectOptions()
    expect(options).toEqual({
      config: [],
      optionals: [],
      runtime: RuntimeOption.Universal
    })
  })
})
