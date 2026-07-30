import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  attachReferencedPlugins,
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
import { describe, expect, test } from 'vitest'

import { extractConfigNames, extractRuleNames } from './test-utils.js'

describe('defineConfig Function', () => {
  test('attaches referenced plugins to the same ESLint 10 config object', () => {
    const plugin = { rules: { example: { create: () => ({}), meta: { schema: [] } } } }
    const config = attachReferencedPlugins([
      {
        name: 'plugin-registration',
        plugins: { example: plugin }
      },
      {
        name: 'consumer-rule-override',
        rules: { 'example/example': 'off' }
      }
    ])

    expect(config[1]?.plugins?.example).toBe(plugin)
  })

  test('can attach plugins to overrides appended after defineConfig resolves', async () => {
    const plugin = { rules: { example: { create: () => ({}), meta: { schema: [] } } } }
    const generated = await defineConfig(
      { detection: false },
      {
        name: 'dynamic-plugin-registration',
        plugins: { dynamic: plugin }
      }
    )
    const lateOverride = {
      name: 'late-dynamic-override',
      rules: { 'dynamic/example': 'off' as const }
    }

    expect(lateOverride).not.toHaveProperty('plugins')

    const attached = attachReferencedPlugins([...generated, lateOverride])
    const attachedOverride = attached.find(config => config.name === 'late-dynamic-override')

    expect(attachedOverride?.plugins?.dynamic).toBe(plugin)
  })

  test('does not attach an ambiguous plugin implementation across disjoint scopes', () => {
    const appPlugin = { rules: { example: { create: () => ({}), meta: { schema: [] } } } }
    const docsPlugin = { rules: { example: { create: () => ({}), meta: { schema: [] } } } }
    const config = attachReferencedPlugins([
      {
        files: ['apps/**'],
        name: 'app-plugin-registration',
        plugins: { example: appPlugin }
      },
      {
        files: ['docs/**'],
        name: 'docs-plugin-registration',
        plugins: { example: docsPlugin }
      },
      {
        files: ['docs/**'],
        name: 'docs-rule-override',
        rules: { 'example/example': 'off' }
      }
    ])

    expect(config[2]?.plugins).toBeUndefined()
  })

  test('should return an array when called with minimal options', async () => {
    const config = await defineConfig({})

    expect(Array.isArray(config)).toBe(true)
  })

  test('should return config with TypeScript when typescript option is true', async () => {
    const config = await defineConfig({ typescript: true })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  test('should return config with React when react framework is specified', async () => {
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

  test('should return config with Next when next and react frameworks are specified', async () => {
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

  test('does not mutate framework options while adding implicit React', async () => {
    const frameworks = {
      next: [{ name: 'mock-next', rules: {} }]
    }

    await defineConfig({ frameworks })

    expect(frameworks).toEqual({
      next: [{ name: 'mock-next', rules: {} }]
    })
    expect('react' in frameworks).toBe(false)
  })

  test('should return config with Nest when nest framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { nest: [{ name: 'mock-nest', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-nest')
  })

  test('should return config with Hono when hono framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { hono: [{ name: 'mock-hono', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-hono')
  })

  test('should return config with Vue when vue framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { vue: [{ name: 'mock-vue', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-vue')
  })

  test('should include gitignore by default', async () => {
    const config = await defineConfig({})
    const names = extractConfigNames(config)

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(true)
  })

  test('should use root for detection, TypeScript, and gitignore resolution', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-root-'))

    try {
      writeFileSync(join(root, '.gitignore'), 'root-only.tmp\n')
      writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'root-fixture' }))
      writeFileSync(join(root, 'tsconfig.json'), '{}')

      const config = await defineConfig({ root })
      const gitignoreEntry = config.find(entry => entry.name === 'eslint-config/gitignore')
      const rootEntry = config.find(entry => entry.name === 'eslint-config-basic/tsconfig-root-dir')

      expect(gitignoreEntry?.ignores).toContain('**/root-only.tmp')
      expect(rootEntry?.languageOptions?.parserOptions?.tsconfigRootDir).toBe(root)
      expect(extractConfigNames(config)).toContain('eslint-config-typescript/type-checked-rules')
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should not scope child gitignore patterns twice', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-workspace-gitignore-'))
    const projectRoot = join(root, 'apps', 'web')

    try {
      mkdirSync(projectRoot, { recursive: true })
      writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'root-fixture' }))
      writeFileSync(join(projectRoot, 'package.json'), JSON.stringify({ name: 'web' }))
      writeFileSync(join(projectRoot, '.gitignore'), '/generated.js\n')

      const config = await defineConfig({
        projects: { 'apps/web': {} },
        root
      })
      const gitignoreEntry = config.find(entry => entry.name === 'eslint-config/gitignore' && entry.ignores?.some(pattern => pattern.includes('generated.js')))

      expect(gitignoreEntry?.basePath).toBe(projectRoot)
      expect(gitignoreEntry?.ignores).toContain('generated.js')
      expect(gitignoreEntry?.ignores).not.toContain('apps/web/apps/web/generated.js')
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should exclude gitignore when NoGitignore setting is specified', async () => {
    const config = await defineConfig({
      settings: [Setting.NoGitignore]
    })

    const names = extractConfigNames(config)

    expect(names.some(n => n.toLowerCase().includes('gitignore'))).toBe(false)
  })

  test('should prepend a global ignores block when ignores option is non-empty', async () => {
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

  test('should ignore AI coding-assistant artifact folders by default', async () => {
    const config = await defineConfig({ detection: false })
    const defaultIgnoreEntry = config.find((entry): entry is { ignores?: string[], name: string } => typeof entry === 'object' &&
      'name' in entry &&
      entry.name === 'eslint-config-basic/default-ignores')

    expect(defaultIgnoreEntry?.ignores).toContain('**/.claude/**')
    expect(defaultIgnoreEntry?.ignores).toContain('**/.cursor/**')
    expect(defaultIgnoreEntry?.ignores).toContain('**/.clinerules/**')
    expect(defaultIgnoreEntry?.ignores).toContain('**/.kiro/**')
    expect(defaultIgnoreEntry?.ignores).toContain('**/.windsurf/**')
  })

  test('should ignore workspace fixtures without hiding standalone fixture projects', async () => {
    const workspaceConfig = await defineConfig({
      detection: false,
      projects: { 'packages/example': { typescript: false } }
    })
    const standaloneConfig = await defineConfig({ detection: false })
    const workspaceFixtureIgnoreName = 'eslint-config-basic/workspace-fixture-ignores'
    const workspaceIgnore = workspaceConfig.find(entry => entry.name === workspaceFixtureIgnoreName)

    expect(workspaceIgnore?.ignores).toEqual([
      'apps/*/fixtures/**',
      'packages/*/fixtures/**'
    ])
    expect(standaloneConfig.some(entry => entry.name === workspaceFixtureIgnoreName)).toBe(false)
  })

  test('should exclude default ignores when NoDefaultIgnores setting is specified', async () => {
    const config = await defineConfig({
      settings: [Setting.NoDefaultIgnores]
    })

    expect(extractConfigNames(config)).not.toContain('eslint-config-basic/default-ignores')
  })

  test('should handle multiple framework configs', async () => {
    const config = await defineConfig({
      frameworks: { react: [{ name: 'mock-react', rules: {} }] },
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-react')
  })

  test('should handle integrations', async () => {
    const config = await defineConfig({
      extensions: [Extension.Unicorn],
      libraries: [Library.Tailwind],
      testing: [Testing.Vitest],
      tools: [Tool.Prettier],
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)
  })

  test('should return a valid config when called with no arguments', async () => {
    const config = await defineConfig()

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })

  test('should allow intentional test doubles and helper declaration order', async () => {
    const config = await defineConfig({ detection: false, typescript: true })
    const testOverride = config.find(entry => entry.name === 'eslint-config-basic/test-file-overrides')

    expect(testOverride?.rules).toMatchObject({
      '@typescript-eslint/no-empty-function': 'off',
      'no-use-before-define': 'off'
    })
  })

  test('should handle all framework configs combined', async () => {
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

  test('should handle all integrations combined', async () => {
    const config = await defineConfig({
      extensions: Object.values(Extension),
      libraries: Object.values(Library),
      tools: Object.values(Tool),
      typescript: true
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  }, 20000)

  test('should handle roadmap options (Jest, Cypress, TestingLibrary, GraphQL)', async () => {
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

  test('should handle duplicate integration entries without doubling config blocks', async () => {
    const single = await defineConfig({
      testing: [Testing.Vitest]
    })

    const doubled = await defineConfig({
      testing: [Testing.Vitest, Testing.Vitest]
    })

    expect(single).toHaveLength(doubled.length)
  })

  test('should handle full kitchen-sink configuration', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }]
      },

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

  test('should handle nested frameworks objects', async () => {
    const mockConfig = [{ name: 'mock-framework/rules', rules: {} }] as Record<string, unknown>[]

    const config = await defineConfig({
      frameworks: {
        react: mockConfig as ImportedFramework
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('mock-framework/rules')
  })

  test('should resolve bundled framework configs when a framework boolean is passed manually', async () => {
    const config = await defineConfig({
      frameworks: {
        react: true
      }
    })

    expect(extractConfigNames(config)).toContain('eslint-config-react/recommended')
  })

  test('should include React automatically when Next.js is enabled', async () => {
    const config = await defineConfig({
      frameworks: {
        next: [{ name: 'mock-next', rules: {} }]
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config-react/recommended')
    expect(names).toContain('mock-next')
  })

  test('should keep the Browser preset free of implicit React rules', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      frameworks: {},
      preset: Preset.Browser
    })

    const rules = extractRuleNames(config)

    expect(rules).not.toContain('react/jsx-pascal-case')
  })

  test('should preserve detected Cloudflare runtime globals over detected preset defaults', async () => {
    const tmpDir = mkdtempSync(join(tmpdir(), 'eslint-config-cloudflare-'))

    try {
      writeFileSync(join(tmpDir, 'package.json'), JSON.stringify({
        devDependencies: {
          '@cloudflare/workers-types': 'latest',
          wrangler: 'latest'
        }
      }))
      writeFileSync(join(tmpDir, 'tsconfig.json'), '{}')

      const config = await defineConfig({
        autoFrameworks: false,
        detectRootDir: tmpDir
      })
      const globals = config.flatMap(entry => Object.keys(entry.languageOptions?.globals ?? {}))

      expect(globals).toContain('DurableObject')
      expect(globals).toContain('WebSocketPair')
    } finally {
      rmSync(tmpDir, { force: true, recursive: true })
    }
  })

  test('should keep the All preset focused on bundled configs', async () => {
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

  test('should disable detected frameworks when autoFrameworks is false', async () => {
    const config = await defineConfig({
      autoFrameworks: false
    })

    const names = extractConfigNames(config)

    expect(names).not.toContain('eslint-config-react/recommended')
  })

  test('should replace preset integrations when optionMergeStrategy is replace', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      optionMergeStrategy: 'replace',
      preset: Preset.All,
      tools: [Tool.Prettier]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config/prettier')
    expect(names).not.toContain('eslint-config-integrations/jsdoc')
  })

  test('should union explicit values with detected values when optionMergeStrategy is merge', async () => {
    // Preset.CI includes Tool.Prettier; explicit Jsdoc must be added, not replace it
    const config = await defineConfig({
      autoFrameworks: false,
      preset: Preset.CI,
      tools: [Tool.Jsdoc]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config/prettier')
    expect(names).toContain('eslint-config-integrations/jsdoc')
  })

  test('should replace detected values with explicit values when optionMergeStrategy is replace', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      optionMergeStrategy: 'replace',
      tools: [Tool.Jsdoc]
    })

    const names = extractConfigNames(config)

    expect(names).not.toContain('eslint-config/prettier')
    expect(names).toContain('eslint-config-integrations/jsdoc')
  })

  test('should disable default extensions when detection is false', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      detection: false
    })

    const names = extractConfigNames(config)

    expect(names.some(name => name.includes('unicorn'))).toBe(false)
    expect(names.some(name => name.includes('perfectionist'))).toBe(false)
    expect(names.some(name => name.includes('security'))).toBe(false)
  })

  test('should disable only extensions via granular detection control', async () => {
    const config = await defineConfig({
      autoFrameworks: false,
      detection: { extensions: false },
      tools: [Tool.Prettier]
    })

    const names = extractConfigNames(config)

    expect(names.some(name => name.includes('unicorn'))).toBe(false)
    // Explicit tools are unaffected when only extension detection is disabled
    expect(names).toContain('eslint-config/prettier')
  })

  test('should preserve negated globs when scoping project configs', async () => {
    const config = await defineConfig({
      detection: false,
      projects: {
        'apps/web': {
          frameworks: {
            react: [{
              files: ['**/*.tsx', '!**/legacy/**'],
              name: 'mock-negated-files',
              rules: {}
            }]
          },
          typescript: false
        }
      }
    })

    const scoped = config.find(entry => entry.name === 'mock-negated-files')

    expect(scoped?.files).toContain('apps/web/**/*.tsx')
    expect(scoped?.files).toContain('!apps/web/**/legacy/**')
  })

  test('should auto-detect monorepo projects without leaking root framework devDependencies', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-monorepo-'))

    try {
      mkdirSync(join(root, 'apps/web'), { recursive: true })
      writeFileSync(join(root, 'package.json'), JSON.stringify({
        devDependencies: { react: 'latest' },
        name: 'workspace-root'
      }))
      writeFileSync(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - \'apps/*\'\n')
      writeFileSync(join(root, 'apps/web/package.json'), JSON.stringify({
        dependencies: { astro: 'latest' },
        name: 'web'
      }))

      const config = await defineConfig({
        root,
        settings: [Setting.NoGitignore],
        tools: []
      })
      const names = extractConfigNames(config)

      expect(names).toContain('astro/recommended')
      expect(names).not.toContain('eslint-config-react/recommended')

      const astroConfig = config.find(entry => entry.name === 'astro/recommended')

      expect(astroConfig?.files?.every(
        pattern => typeof pattern === 'string' && pattern.startsWith('apps/web/')
      )).toBe(true)
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should syntax-lint declaration-only workspace packages without a tsconfig', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-declarations-'))

    try {
      mkdirSync(join(root, 'packages/theme/src'), { recursive: true })
      writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'workspace-root' }))
      writeFileSync(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - \'packages/*\'\n')
      writeFileSync(join(root, 'packages/theme/package.json'), JSON.stringify({ name: 'theme' }))
      writeFileSync(join(root, 'packages/theme/src/index.js'), 'export const theme = {}\n')
      writeFileSync(
        join(root, 'packages/theme/src/index.d.ts'),
        'export declare const theme: Record<string, string>\n'
      )

      const config = await defineConfig({
        root,
        settings: [Setting.NoGitignore],
        tools: []
      })
      const syntaxFallback = config.find(
        entry => entry.name?.includes('disable-type-checked')
      )

      expect(syntaxFallback?.files?.every(
        pattern => typeof pattern === 'string' && pattern.startsWith('packages/theme/')
      )).toBe(true)
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should apply Astro processing to neutral workspace packages containing Astro files', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-shared-astro-'))

    try {
      mkdirSync(join(root, 'apps/site/src'), { recursive: true })
      mkdirSync(join(root, 'packages/theme/components'), { recursive: true })
      writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'workspace-root' }))
      writeFileSync(
        join(root, 'pnpm-workspace.yaml'),
        'packages:\n  - \'apps/*\'\n  - \'packages/*\'\n'
      )
      writeFileSync(join(root, 'apps/site/package.json'), JSON.stringify({
        dependencies: { astro: 'latest' },
        name: 'site'
      }))
      writeFileSync(
        join(root, 'apps/site/src/page.astro'),
        '---\nimport AppleIcon from "../../../packages/theme/components/AppleIcon.astro"\n---\n<AppleIcon />\n'
      )
      writeFileSync(join(root, 'packages/theme/package.json'), JSON.stringify({ name: 'theme' }))
      writeFileSync(
        join(root, 'packages/theme/components/AppleIcon.astro'),
        '<svg aria-hidden="true"></svg>\n'
      )

      const config = await defineConfig({
        root,
        settings: [Setting.NoGitignore],
        tools: []
      })
      const astroConfigs = config.filter(entry => entry.name === 'astro/recommended')

      expect(astroConfigs.some(entry => entry.files?.some(
        pattern => typeof pattern === 'string' && pattern.startsWith('apps/site/')
      ))).toBe(true)
      expect(astroConfigs.some(entry => entry.files?.some(
        pattern => typeof pattern === 'string' && pattern.startsWith('packages/theme/')
      ))).toBe(true)
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should preserve root detections when workspace project detection is disabled', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-monorepo-opt-out-'))

    try {
      mkdirSync(join(root, 'apps/web'), { recursive: true })
      writeFileSync(join(root, 'package.json'), JSON.stringify({
        dependencies: { react: 'latest' },
        name: 'workspace-root'
      }))
      writeFileSync(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - \'apps/*\'\n')
      writeFileSync(join(root, 'apps/web/package.json'), JSON.stringify({
        dependencies: { astro: 'latest' },
        name: 'web'
      }))

      const config = await defineConfig({
        detection: { projects: false },
        root,
        settings: [Setting.NoGitignore],
        tools: []
      })
      const names = extractConfigNames(config)

      expect(names).toContain('eslint-config-react/recommended')
      expect(names).not.toContain('astro/recommended')
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should syntax-lint config files and explicit untyped TypeScript files', async () => {
    const config = await defineConfig({
      detection: false,
      typescript: {
        projectService: {
          allowDefaultProject: ['eslint.config.ts']
        },
        untypedFiles: ['templates/**/*.ts']
      }
    })
    const untyped = config.find(entry => entry.name === 'eslint-config-typescript/untyped-files')
    const setup = config.find(entry => entry.name === 'eslint-config-typescript/setup')

    expect(untyped?.files).toContain('**/*.config.{ts,mts,cts}')
    expect(untyped?.files).toContain('templates/**/*.ts')
    expect(untyped?.languageOptions?.parserOptions?.projectService).toBe(false)
    expect(setup?.languageOptions?.parserOptions?.projectService).toEqual({
      allowDefaultProject: ['eslint.config.ts']
    })
  })

  test('should apply untyped TypeScript files after Astro parser options', async () => {
    const config = await defineConfig({
      detection: false,
      frameworks: { astro: true },
      typescript: {
        untypedFiles: ['**/*.astro']
      }
    })
    const astroIndex = config.findLastIndex(entry => entry.name?.includes('astro'))
    const untypedIndex = config.findIndex(
      entry => entry.name === 'eslint-config-typescript/untyped-files'
    )

    expect(astroIndex).toBeGreaterThanOrEqual(0)
    expect(untypedIndex).toBeGreaterThan(astroIndex)
  })

  test('should keep root untyped TypeScript files effective in detected workspace projects', async () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-config-monorepo-untyped-'))

    try {
      mkdirSync(join(root, 'apps/web/tests'), { recursive: true })
      writeFileSync(join(root, 'package.json'), JSON.stringify({
        devDependencies: { typescript: 'latest' },
        name: 'workspace-root'
      }))
      writeFileSync(join(root, 'pnpm-workspace.yaml'), 'packages:\n  - \'apps/*\'\n')
      writeFileSync(join(root, 'tsconfig.json'), '{}')
      writeFileSync(join(root, 'apps/web/package.json'), JSON.stringify({
        devDependencies: { typescript: 'latest' },
        name: 'web'
      }))
      writeFileSync(join(root, 'apps/web/tsconfig.json'), '{}')

      const config = await defineConfig({
        root,
        typescript: {
          untypedFiles: ['tests/**/*.ts']
        }
      })
      const projectUntypedIndex = config.findLastIndex(entry => entry.name === 'eslint-config-typescript/untyped-files' &&
        entry.files?.includes('apps/web/tests/**/*.ts'))
      const projectUntyped = config.findLast(entry => entry.name === 'eslint-config-typescript/untyped-files' &&
        entry.files?.includes('apps/web/tests/**/*.ts'))
      const projectParserIndex = config.findLastIndex(entry => entry.name === 'eslint-config-typescript/parser-setup' &&
        entry.files?.some(pattern => typeof pattern === 'string' && pattern.startsWith('apps/web/')))

      expect(projectParserIndex).toBeGreaterThanOrEqual(0)
      expect(projectUntypedIndex).toBeGreaterThan(projectParserIndex)
      expect(projectUntyped?.languageOptions?.parserOptions?.projectService).toBe(false)
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })

  test('should use detectRootDir independently from tsconfigRootDir', async () => {
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

  test('should throw a clear error for invalid framework shapes', async () => {
    await expect(defineConfig({
      frameworks: {
        react: { invalid: true } as unknown as ImportedFramework
      }
    })).rejects.toThrow(/Invalid framework config/)
  })

  test('should resolve framework modules with default config arrays', async () => {
    const config = await defineConfig({
      frameworks: {
        react: {
          default: [{ name: 'default-export-react', rules: {} }]
        }
      }
    })

    expect(extractConfigNames(config)).toContain('default-export-react')
  })

  test('should resolve framework modules with default factory exports', async () => {
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
  test('should return config with Astro when astro framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { astro: [{ name: 'mock-astro', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-astro')
  })

  test('should return config with Expo when expo framework is specified', async () => {
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

  test('should return config with Svelte when svelte framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { svelte: [{ name: 'mock-svelte', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-svelte')
  })

  test('should return config with Solid when solid framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { solid: [{ name: 'mock-solid', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-solid')
  })

  test('should return config with Angular when angular framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { angular: [{ name: 'mock-angular', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-angular')
  })

  test('should return config with Qwik when qwik framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { qwik: [{ name: 'mock-qwik', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-qwik')
  })

  test('should return config with React Router when react-router framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { 'react-router': [{ name: 'mock-remix', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-remix')
  })

  test('should return config with Lit when lit framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { lit: [{ name: 'mock-lit', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-lit')
  })

  test('should return config with Nuxt when nuxt framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { nuxt: [{ name: 'mock-nuxt', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-nuxt')
  })

  test('should return config with TanStack Start when tanstack-start framework is specified', async () => {
    const config = await defineConfig({
      frameworks: { 'tanstack-start': [{ name: 'mock-tanstack-start', rules: {} }] }
    })

    expect(Array.isArray(config)).toBe(true)

    expect(extractConfigNames(config as Record<string, unknown>[])).toContain('mock-tanstack-start')
  })

  test('should handle all bundled frameworks combined', async () => {
    const config = await defineConfig({
      frameworks: {
        angular: [{ name: 'mock-angular', rules: {} }],
        astro: [{ name: 'mock-astro', rules: {} }],
        expo: [{ name: 'mock-expo', rules: {} }],
        hono: [{ name: 'mock-hono', rules: {} }],
        lit: [{ name: 'mock-lit', rules: {} }],
        nest: [{ name: 'mock-nest', rules: {} }],
        next: [{ name: 'mock-next', rules: {} }],
        nuxt: [{ name: 'mock-nuxt', rules: {} }],
        qwik: [{ name: 'mock-qwik', rules: {} }],
        react: [{ name: 'mock-react', rules: {} }],
        'react-router': [{ name: 'mock-remix', rules: {} }],
        solid: [{ name: 'mock-solid', rules: {} }],
        svelte: [{ name: 'mock-svelte', rules: {} }],
        'tanstack-start': [{ name: 'mock-tanstack-start', rules: {} }],
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
    expect(names).toContain('mock-lit')
    expect(names).toContain('mock-nuxt')
    expect(names).toContain('mock-tanstack-start')
  })

  test('should handle all formats combined', async () => {
    const config = await defineConfig({
      formats: Object.values(Format)
    })

    expect(Array.isArray(config)).toBe(true)

    expect(config.length).toBeGreaterThan(0)
  })
})

describe('scripts-overrides block', () => {
  test('is always present in the output', async () => {
    const config = await defineConfig({ detection: false })
    const scriptsBlock = config.find(c => c.name === 'eslint-config-basic/scripts-overrides')

    expect(scriptsBlock).toBeDefined()
    expect(scriptsBlock?.rules?.['n/no-unpublished-import']).toBe('off')
  })

  test('includes security rule when Security extension is enabled', async () => {
    const config = await defineConfig({
      detection: false,
      extensions: [Extension.Security]
    })
    const scriptsBlock = config.find(c => c.name === 'eslint-config-basic/scripts-overrides')

    expect(scriptsBlock).toBeDefined()
    expect(scriptsBlock?.rules?.['security/detect-non-literal-fs-filename']).toBe('off')
  })

  test('excludes security rule when Security extension is not enabled', async () => {
    const config = await defineConfig({
      detection: false,
      extensions: []
    })
    const scriptsBlock = config.find(c => c.name === 'eslint-config-basic/scripts-overrides')

    expect(scriptsBlock).toBeDefined()
    const ruleKeys = Object.keys(scriptsBlock?.rules ?? {})

    expect(ruleKeys.some(k => k.startsWith('security/'))).toBe(false)
  })
})

describe('Monorepo project scoping', () => {
  test('root detection and Tailwind options are inherited by scoped projects', async () => {
    const config = await defineConfig({
      detection: { libraries: false },
      projects: {
        'apps/docs': {
          libraries: ['tailwind'],
          typescript: false
        }
      },
      root: '/repo',
      tailwind: {
        entryPoint: 'src/styles/global.css',
        noUnknownClasses: false
      }
    })
    const tailwindSettings = config.find(entry => entry.name === 'eslint-config-basic/tailwind-settings' &&
      entry.files?.some(pattern => pattern === 'apps/docs/**/*'))

    expect(tailwindSettings?.rules?.['better-tailwindcss/no-unknown-classes']).toBe('off')
    expect(tailwindSettings?.settings?.['better-tailwindcss']).toMatchObject({
      cwd: '/repo/apps/docs',
      entryPoint: 'src/styles/global.css'
    })
  })

  test('projectDefaults are inherited and merged with project overrides', async () => {
    const config = await defineConfig({
      detection: false,
      projectDefaults: {
        extensions: [Extension.Unicorn],
        frameworks: {
          react: [{ name: 'default-react', rules: {} }]
        },
        runtime: 'browser',
        typescript: false
      },
      projects: {
        'apps/web': {
          extensions: [Extension.Security],
          frameworks: {
            vite: [{ name: 'project-vite', rules: {} }]
          }
        }
      }
    })

    const names = extractConfigNames(config)
    const scopedRules = config
      .filter(entry => entry.files?.some(pattern => typeof pattern === 'string' && pattern.startsWith('apps/web/')))
      .flatMap(entry => Object.keys(entry.rules ?? {}))

    expect(names).toContain('default-react')
    expect(names).toContain('project-vite')
    expect(scopedRules.some(rule => rule.startsWith('unicorn/'))).toBe(true)
    expect(scopedRules.some(rule => rule.startsWith('security/'))).toBe(true)
  })

  test('projectDefaults respect a project replace strategy', async () => {
    const config = await defineConfig({
      detection: false,
      projectDefaults: {
        extensions: [Extension.Unicorn],
        frameworks: {
          react: [{ name: 'inherited-react', rules: {} }]
        },
        typescript: false
      },
      projects: {
        'packages/lib': {
          extensions: [Extension.Security],
          frameworks: {
            vite: [{ name: 'replacement-vite', rules: {} }]
          },
          optionMergeStrategy: 'replace'
        }
      }
    })

    const scopedRules = config
      .filter(entry => {
        const files = Array.isArray(entry.files) ? entry.files : [entry.files]

        return files.some(pattern => typeof pattern === 'string' && pattern.startsWith('packages/lib/'))
      })
      .flatMap(entry => Object.keys(entry.rules ?? {}))

    expect(scopedRules.some(rule => rule.startsWith('security/'))).toBe(true)
    expect(scopedRules.some(rule => rule.startsWith('unicorn/'))).toBe(false)
    expect(extractConfigNames(config)).toContain('replacement-vite')
    expect(extractConfigNames(config)).not.toContain('inherited-react')
  })

  test('ignore-only configs inside a project are scoped to the project path', async () => {
    const config = await defineConfig({
      detection: false,
      projects: {
        'apps/web': {
          frameworks: {
            react: [{ ignores: ['dist/**', 'tmp/**'], name: 'mock-ignore-only' }]
          },
          typescript: false
        }
      }
    })

    const entry = config.find(configEntry => configEntry.name === 'mock-ignore-only')
    // Ignores must be prefixed with the project path — not global
    expect(entry?.ignores).toEqual(['apps/web/dist/**', 'apps/web/tmp/**'])
  })

  test('negated ignores inside a project are also scoped correctly', async () => {
    const config = await defineConfig({
      detection: false,
      projects: {
        'packages/lib': {
          frameworks: {
            react: [{ ignores: ['!src/**'], name: 'mock-negated-ignore' }]
          },
          typescript: false
        }
      }
    })

    const entry = config.find(configEntry => configEntry.name === 'mock-negated-ignore')
    expect(entry?.ignores).toEqual(['!packages/lib/src/**'])
  })

  test('file patterns in project configs are prefixed with the project path', async () => {
    const config = await defineConfig({
      detection: false,
      projects: {
        'apps/web': {
          frameworks: {
            react: [{ files: ['**/*.tsx'], name: 'mock-files', rules: {} }]
          },
          typescript: false
        }
      }
    })

    const entry = config.find(configEntry => configEntry.name === 'mock-files')
    expect(entry?.files).toContain('apps/web/**/*.tsx')
    expect(entry?.files).not.toContain('**/*.tsx')
  })
})
