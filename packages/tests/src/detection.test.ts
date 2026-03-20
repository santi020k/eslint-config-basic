import fs from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ConfigOption, detectProjectOptions, OptionalOption } from '@santi020k/eslint-config-basic'

vi.mock('node:fs')

describe('detectProjectOptions', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(fs.existsSync).mockReturnValue(true)
  })

  it('should detect TypeScript and React in dependencies', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        typescript: '^5.0.0',
        react: '^18.0.0'
      }
    }))

    const options = detectProjectOptions()
    expect(options.config).toContain(ConfigOption.Ts)
    expect(options.config).toContain(ConfigOption.React)
  })

  it('should detect Next.js and Tailwind', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        next: '^14.0.0',
        tailwindcss: '^3.0.0'
      }
    }))

    const options = detectProjectOptions()
    expect(options.config).toContain(ConfigOption.Next)
    expect(options.optionals).toContain(OptionalOption.Tailwind)
  })

  it('should detect Vitest and Security plugins', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      devDependencies: {
        vitest: '^1.0.0',
        'eslint-plugin-security': '^2.0.0'
      }
    }))

    const options = detectProjectOptions()
    expect(options.optionals).toContain(OptionalOption.Vitest)
    expect(options.optionals).toContain(OptionalOption.Security)
  })

  it('should detect TanStack Query and Router', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({
      dependencies: {
        '@tanstack/react-query': '^5.0.0',
        '@tanstack/react-router': '^1.0.0'
      }
    }))

    const options = detectProjectOptions()
    expect(options.optionals).toContain(OptionalOption.TanstackQuery)
    expect(options.optionals).toContain(OptionalOption.TanstackRouter)
  })

  it('should handle missing package.json gracefully', () => {
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File not found')
    })

    const options = detectProjectOptions()
    expect(options).toEqual({
      config: [],
      optionals: []
    })
  })
})
