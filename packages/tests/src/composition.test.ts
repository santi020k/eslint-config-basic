import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames } from './test-utils.js'

import {
  defineConfig,
  Extension,
  Format,
  type ImportedFramework,
  Library,
  Preset,
  Setting,
  Testing,
  Tool
} from '@santi020k/eslint-config-basic'

describe('eslintConfig Function', () => {
  it('should return an array when called with minimal options', async () => {
    const config = await defineConfig({})

    expect(Array.isArray(config)).toBe(true)
  })

  it('should return config with TypeScript when typescript option is true', async () => {
    const config = await defineConfig({ typescript: true })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should return config with React when react framework is specified', async () => {
    const config = await defineConfig({
      frameworks: {
        expo: [{ name: 'mock-expo', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-react')
  })

  it('should return config with Next when next and react frameworks are specified', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-next')
  })

  it('does not mutate framework options while adding implicit React', async () => {
    const frameworks = {
      next: [{ name: 'mock-next', rules: {} }]
    }

    await defineConfig({ frameworks })

    expect(frameworks).toEqual({
      next: [{ name: 'mock-next', rules: {} }]
    })
    expect('react' in frameworks).toBe(false)
  })

  it('should return config with Nest when nest framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { nest: [{ name: 'mock-nest', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-nest')
  })

  it('should return config with Hono when hono framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { hono: [{ name: 'mock-hono', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-hono')
  })

  it('should return config with Vue when vue framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { vue: [{ name: 'mock-vue', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-vue')
  })

  it('should include gitignore by default', async () => {
    const config = await defineConfig({})
    const names = extractConfigNames(config)

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(true)
  })

  it('should exclude gitignore when NoGitignore setting is specified', async () => {
    const config = await defineConfig({
      settings: [Setting.NoGitignore]
    })

    const names = extractConfigNames(config)

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(false)
  })

  it('should prepend a global ignores block when ignores option is non-empty', async () => {
    const patterns = ['dist/**', 'tmp/**']
    const config = await defineConfig({ ignores: patterns })
    const defaultIgnoreEntry = config.find((entry): entry is { ignores?: string[], name: string } => typeof entry === 'object' &&
      'name' in entry &&
      entry.name === 'eslint-config-basic/default-ignores')
    const ignoreEntry = config.find((entry): entry is { ignores?: string[], name: string } => typeof entry === 'object' &&
      'name' in entry &&
      entry.name === 'eslint-config-basic/ignores')

    expect(defaultIgnoreEntry?.ignores).toContain('**/dist/**')
    expect(ignoreEntry?.ignores).toEqual(patterns)
    expect(extractConfigNames(config)).toContain('eslint-config-basic/default-ignores')
    expect(extractConfigNames(config)).toContain('eslint-config-basic/ignores')

    if (ignoreEntry === undefined) {
      throw new Error('expected eslint-config-basic/ignores block')
    }

    expect(config.indexOf(ignoreEntry)).toBe(1)
  })

  it('should exclude default ignores when NoDefaultIgnores setting is specified', async () => {
    const config = await defineConfig({
      settings: [Setting.NoDefaultIgnores]
    })

    expect(extractConfigNames(config)).not.toContain('eslint-config-basic/default-ignores')
  })

  it('should handle multiple framework configs', async () => {
    const config = await defineConfig({
      frameworks: { react: [{ name: 'mock-react', rules: {} }] },
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-react')
  })

  it('should handle integrations', async () => {
    const config = await defineConfig({
      extensions: [Extension.Unicorn],
      libraries: [Library.Tailwind],
      testing: [Testing.Vitest],
      tools: [Tool.Prettier],
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)
  })

  it('should return a valid config when called with no arguments', async () => {
    const config = await defineConfig()

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  it('should handle all framework configs combined', async () => {
    const config = await defineConfig({
      frameworks: {
        astro: [{ name: 'mock-astro', rules: {} }],
        expo: [{ name: 'mock-expo', rules: {} }],
        hono: [{ name: 'mock-hono', rules: {} }],
        nest: [{ name: 'mock-nest', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }],
        vue: [{ name: 'mock-vue', rules: {} }]
      },
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    const names = extractConfigNames(config)

    expect(names).toContain('mock-react')

    expect(names).toContain('mock-next')

    expect(names).toContain('mock-astro')
  })

  it('should handle all integrations combined', async () => {
    const config = await defineConfig({
      extensions: Object.values(Extension),
      libraries: Object.values(Library),
      tools: Object.values(Tool),
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  }, 20000)

  it('should handle roadmap options (Jest, Cypress, TestingLibrary, GraphQL)', async () => {
    const config = await defineConfig({
      formats: [Format.Graphql],
      testing: [Testing.Jest, Testing.Cypress, Testing.TestingLibrary]
    })

    expect(Array.isArray(config)).toBe(true)

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/jest')

    expect(names).toContain('integrations/cypress')

    expect(names).toContain('integrations/testing-library')

    expect(names).toContain('integrations/graphql/schema')
    expect(names).toContain('integrations/graphql/operations')
  })

  it('should handle duplicate integration entries without doubling config blocks', async () => {
    const single = await defineConfig({
      testing: [Testing.Vitest]
    })

    const doubled = await defineConfig({
      testing: [Testing.Vitest, Testing.Vitest]
    })

    expect(single).toHaveLength(doubled.length)
  })

  it('should handle full kitchen-sink configuration', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      },
      settings: [Setting.Gitignore],
      testing: [Testing.Vitest],
      tools: [Tool.Cspell],
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    const names = extractConfigNames(config)

    expect(names).toContain('mock-react')

    expect(names).toContain('mock-next')
  })

  it('should handle nested frameworks objects', async () => {
    const mockConfig = [{ name: 'mock-framework/rules', rules: {} }] as Record<string, unknown>[]

    const config = await defineConfig({
      frameworks: {
        react: mockConfig as ImportedFramework
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('mock-framework/rules')
  })

  it('should resolve bundled framework configs when a framework boolean is passed manually', async () => {
    const config = await defineConfig({
      frameworks: {
        react: true
      }
    })

    expect(extractConfigNames(config)).toContain('eslint-config-react/recommended')
  })

  it('should include React automatically when Next.js is enabled', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }]
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config-react/recommended')
    expect(names).toContain('mock-next')
  })

  it('should keep the Browser preset free of implicit React rules', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      frameworks: {},
      preset: Preset.Browser
    })

    const rules = extractRuleNames(config)

    expect(rules).not.toContain('react/jsx-pascal-case')
  })

  it('should keep the All preset focused on bundled configs', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      frameworks: {},
      preset: Preset.All
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config/prettier')
    expect(names).toContain('integrations/graphql/schema')
    expect(names).toContain('integrations/graphql/operations')
    expect(names).not.toContain('eslint-config-react/recommended')
  })

  it('should disable detected frameworks when autoFrameworks is false', async () => {
    const config = await defineConfig({
      autoFrameworks: false
    })

    const names = extractConfigNames(config)

    expect(names).not.toContain('eslint-config-react/recommended')
  })

  it('should replace preset integrations when optionMergeStrategy is replace', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      optionMergeStrategy: 'replace',
      preset: Preset.All,
      tools: [Tool.Prettier]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config/prettier')
    expect(names).not.toContain('integrations/jsdoc')
  })

  it('should use detectRootDir independently from tsconfigRootDir', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'eslint-config-detect-root-'))
    try {
      writeFileSync(join(cwd, 'package.json'), JSON.stringify({
        dependencies: { next: 'latest' },
        name: 'tmp-detect-root'
      }))

      const config = await defineConfig({
        detectRootDir: cwd,
        tsconfigRootDir: process.cwd()
      })
      const names = extractConfigNames(config)

      expect(names.some(name => name.startsWith('eslint-config-next/'))).toBe(true)
      expect(names).toContain('eslint-config-react/recommended')
    } finally {
      rmSync(cwd, { force: true, recursive: true })
    }
  })

  it('should throw a clear error for invalid framework shapes', () => {
    expect(async () => await defineConfig({
      frameworks: {
        react: { invalid: true } as unknown as ImportedFramework
      }
    })).rejects.toThrow(/Invalid framework config/)
  })

  it('should resolve framework modules with default config arrays', async () => {
    const config = await defineConfig({
      frameworks: {
        react: {
          default: [{ name: 'default-export-react', rules: {} }]
        }
      }
    })

    expect(extractConfigNames(config)).toContain('default-export-react')
  })

  it('should resolve framework modules with default factory exports', async () => {
    const config = await defineConfig({
      frameworks: {
        hono: {
          default: (options?: Record<string, unknown>) => {
            const runtime = options?.runtime
            let runtimeKey = 'none'

            if (runtime !== undefined && runtime !== null) {
              if (typeof runtime === 'object') {
                runtimeKey = 'object'
              } else if (
                typeof runtime === 'string' ||
                typeof runtime === 'number' ||
                typeof runtime === 'boolean' ||
                typeof runtime === 'bigint' ||
                typeof runtime === 'symbol'
              ) {
                runtimeKey = String(runtime)
              } else {
                runtimeKey = 'unknown'
              }
            }

            return [
              {
                name: `default-factory-hono-${runtimeKey}`,
                rules: {}
              }
            ]
          }
        }
      }
    })

    expect(extractConfigNames(config).some(name => name.startsWith('default-factory-hono-'))).toBe(true)
  })
})

describe('Framework Composition — remaining frameworks', () => {
  it('should return config with Astro when astro framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { astro: [{ name: 'mock-astro', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-astro')
  })

  it('should return config with Expo when expo framework is specified', async () => {
    // Expo requires react — pass a mock react config alongside
    const config = await defineConfig({
      frameworks: {
        expo: [{ name: 'mock-expo', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-expo')
  })

  it('should return config with Svelte when svelte framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { svelte: [{ name: 'mock-svelte', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-svelte')
  })

  it('should return config with Solid when solid framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { solid: [{ name: 'mock-solid', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-solid')
  })

  it('should return config with Angular when angular framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { angular: [{ name: 'mock-angular', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-angular')
  })

  it('should return config with Qwik when qwik framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { qwik: [{ name: 'mock-qwik', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-qwik')
  })

  it('should return config with Remix when remix framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { remix: [{ name: 'mock-remix', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-remix')
  })

  it('should handle all twelve frameworks combined', async () => {
    const config = await defineConfig({
      frameworks: {
        angular: [{ name: 'mock-angular', rules: {} }],
        astro: [{ name: 'mock-astro', rules: {} }],
        expo: [{ name: 'mock-expo', rules: {} }],
        hono: [{ name: 'mock-hono', rules: {} }],
        nest: [{ name: 'mock-nest', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }],
        qwik: [{ name: 'mock-qwik', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }],
        remix: [{ name: 'mock-remix', rules: {} }],
        solid: [{ name: 'mock-solid', rules: {} }],
        svelte: [{ name: 'mock-svelte', rules: {} }],
        vue: [{ name: 'mock-vue', rules: {} }]
      },
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    const names = extractConfigNames(config)

    expect(names).toContain('mock-svelte')
    expect(names).toContain('mock-hono')
    expect(names).toContain('mock-solid')
    expect(names).toContain('mock-angular')
    expect(names).toContain('mock-qwik')
    expect(names).toContain('mock-remix')
  })

  it('should handle all formats combined', async () => {
    const config = await defineConfig({
      formats: Object.values(Format)
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })
})
