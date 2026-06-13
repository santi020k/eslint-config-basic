import {
  a11y,
  aiSdk,
  autogen,
  bestPractices,
  biome,
  command,
  compat,
  createImportGroups,
  cspell,
  css,
  cypress,
  defineConfig,
  deMorgan,
  depend,
  docker,
  drizzle,
  githubActions,
  googleGenAi,
  graphql,
  groups,
  html,
  i18next,
  jest as jestConfig,
  jestDom,
  jsdoc,
  jsonc,
  langchain,
  llamaIndex,
  markdown,
  mastra,
  mcp,
  mdx,
  mikroOrm,
  node,
  nx,
  openAiAgents,
  oxlint,
  packageJson,
  perfectionist,
  playwright,
  pnpm,
  prettier,
  prisma,
  regexp,
  security,
  sequelize,
  sonarjs,
  stencil,
  storybook,
  swagger,
  tailwind,
  tanstackQuery,
  tanstackRouter,
  testingLibrary,
  toml,
  turbo,
  typeorm,
  unicorn,
  vitest,
  yaml,
  zod
} from '@santi020k/eslint-config-basic'
import * as integrationExtensions from '@santi020k/eslint-config-integrations/extensions'
import * as integrationFormats from '@santi020k/eslint-config-integrations/formats'
import * as integrationLibraries from '@santi020k/eslint-config-integrations/libraries'
import * as integrationTesting from '@santi020k/eslint-config-integrations/testing'
import * as integrationTools from '@santi020k/eslint-config-integrations/tools'
import {
  createImportGroups as createLiteImportGroups,
  defineConfig as defineLiteConfig,
  preact as litePreact,
  preactConfig as litePreactConfig
} from '@santi020k/eslint-config-lite'

import { describe, expect, test } from 'vitest'

describe('Public API Re-exports', () => {
  test('should expose defineConfig as the main config factory', async () => {
    expect(defineConfig).toBeDefined()
    expect(Array.isArray(await defineConfig({ detection: false }))).toBe(true)
  })

  test('should expose groups as a non-empty array of arrays', () => {
    expect(Array.isArray(groups)).toBe(true)
    expect(groups.length).toBeGreaterThan(0)
    expect(Array.isArray(groups[0])).toBe(true)
  })

  test('should expose createImportGroups as a function returning groups array', () => {
    expect(typeof createImportGroups).toBe('function')

    const defaultGroups = createImportGroups()
    expect(Array.isArray(defaultGroups)).toBe(true)
    expect(defaultGroups).toEqual(groups)
  })

  test('createImportGroups should add a workspace group before externals when workspacePrefixes is set', () => {
    const withWorkspace = createImportGroups({ workspacePrefixes: ['@acme'] })
    const withoutWorkspace = createImportGroups()

    // Workspace config has one extra group
    expect(withWorkspace).toHaveLength(withoutWorkspace.length + 1)

    // The workspace group pattern should match @acme/...
    const workspaceGroup = withWorkspace.find(g => g.some(p => p.includes('@acme')))
    expect(workspaceGroup).toBeDefined()
    if (!workspaceGroup) throw new Error('Workspace group should be defined')
    expect('@acme/shared'.match(workspaceGroup[0]) !== null).toBe(true)
    expect('@other/pkg'.match(workspaceGroup[0]) !== null).toBe(false)
  })

  test('workspacePrefixes in defineConfig should produce a config with the workspace import override', async () => {
    const config = await defineConfig({ detection: false, workspacePrefixes: ['@acme'] })
    const overrideEntry = config.find(c => c.name === 'eslint-config-basic/workspace-import-groups')
    expect(overrideEntry).toBeDefined()
    const ruleValue = overrideEntry?.rules?.['simple-import-sort/imports'] as [string, { groups: string[][] }]
    expect(ruleValue).toBeDefined()
    expect(Array.isArray(ruleValue[1].groups)).toBe(true)
    // The groups should contain the @acme workspace pattern
    const hasAcme = ruleValue[1].groups.some(g => g.some(p => p.includes('@acme')))
    expect(hasAcme).toBe(true)
  })

  test('defineConfig without workspacePrefixes should not include the workspace import override', async () => {
    const config = await defineConfig({ detection: false })
    const overrideEntry = config.find(c => c.name === 'eslint-config-basic/workspace-import-groups')
    expect(overrideEntry).toBeUndefined()
  })

  test('lite package should expose expected composer utilities and Preact factories', async () => {
    expect(typeof defineLiteConfig).toBe('function')
    expect(typeof createLiteImportGroups).toBe('function')
    expect(typeof litePreact).toBe('function')
    expect(typeof litePreactConfig).toBe('function')
    expect(Array.isArray(await defineLiteConfig({ detection: false }))).toBe(true)
  })

  test('should re-export all testing configs from the main package', () => {
    expect(typeof jestConfig).toBe('function')
    expect(typeof jestDom).toBe('function')
    expect(typeof cypress).toBe('function')
    expect(typeof playwright).toBe('function')
    expect(typeof testingLibrary).toBe('function')
    expect(typeof vitest).toBe('function')
  })

  test('should re-export all format configs from the main package', () => {
    expect(typeof css).toBe('function')
    expect(typeof graphql).toBe('function')
    expect(typeof html).toBe('function')
    expect(typeof jsonc).toBe('function')
    expect(typeof markdown).toBe('function')
    expect(typeof mdx).toBe('function')
    expect(typeof packageJson).toBe('function')
    expect(typeof toml).toBe('function')
    expect(typeof yaml).toBe('function')
  })

  test('should re-export all ORM library configs from the main package', () => {
    expect(typeof typeorm).toBe('function')
    expect(typeof prisma).toBe('function')
    expect(typeof drizzle).toBe('function')
    expect(typeof mikroOrm).toBe('function')
    expect(typeof sequelize).toBe('function')
  })

  test('should re-export all AI and agent library configs from the main package', () => {
    expect(typeof aiSdk).toBe('function')
    expect(typeof autogen).toBe('function')
    expect(typeof googleGenAi).toBe('function')
    expect(typeof langchain).toBe('function')
    expect(typeof llamaIndex).toBe('function')
    expect(typeof mastra).toBe('function')
    expect(typeof mcp).toBe('function')
    expect(typeof openAiAgents).toBe('function')
  })

  test('should re-export all tool configs from the main package', () => {
    expect(typeof command).toBe('function')
    expect(typeof cspell).toBe('function')
    expect(typeof docker).toBe('function')
    expect(typeof githubActions).toBe('function')
    expect(typeof jsdoc).toBe('function')
    expect(typeof nx).toBe('function')
    expect(typeof pnpm).toBe('function')
    expect(typeof prettier).toBe('function')
    expect(typeof swagger).toBe('function')
  })

  test('should re-export all extension configs from the main package', () => {
    expect(Array.isArray(a11y)).toBe(true)
    expect(Array.isArray(bestPractices)).toBe(true)
    expect(Array.isArray(biome)).toBe(true)
    expect(typeof compat).toBe('function')
    expect(typeof deMorgan).toBe('function')
    expect(typeof depend).toBe('function')
    expect(typeof node).toBe('function')
    expect(typeof oxlint).toBe('function')
    expect(typeof perfectionist).toBe('function')
    expect(typeof regexp).toBe('function')
    expect(typeof security).toBe('function')
    expect(typeof sonarjs).toBe('function')
    expect(typeof unicorn).toBe('function')
  })

  test('should re-export all remaining library configs from the main package', () => {
    expect(typeof i18next).toBe('function')
    expect(typeof stencil).toBe('function')
    expect(typeof storybook).toBe('function')
    expect(typeof tailwind).toBe('function')
    expect(typeof tanstackQuery).toBe('function')
    expect(typeof tanstackRouter).toBe('function')
    expect(typeof turbo).toBe('function')
    expect(typeof zod).toBe('function')
  })
})

describe('Integrations subpath exports', () => {
  test('extensions subpath exports expected configs', () => {
    expect(Object.keys(integrationExtensions).sort()).toEqual([
      'bestPractices',
      'compat',
      'deMorgan',
      'depend',
      'node',
      'oxlint',
      'perfectionist',
      'regexp',
      'security',
      'sonarjs',
      'unicorn'
    ])
  })

  test('formats subpath exports expected configs', () => {
    expect(Object.keys(integrationFormats).sort()).toEqual([
      'css',
      'graphql',
      'html',
      'jsonc',
      'markdown',
      'mdx',
      'toml',
      'yaml'
    ])
  })

  test('libraries subpath exports expected configs', () => {
    expect(Object.keys(integrationLibraries).sort()).toEqual([
      'aiSdk',
      'drizzle',
      'i18next',
      'langchain',
      'llamaIndex',
      'mastra',
      'mcp',
      'mikroOrm',
      'openAiAgents',
      'prisma',
      'sequelize',
      'stencil',
      'storybook',
      'tailwind',
      'tanstackQuery',
      'tanstackRouter',
      'turbo',
      'typeorm'
    ])
  })

  test('testing subpath exports expected configs', () => {
    expect(Object.keys(integrationTesting).sort()).toEqual([
      'cypress',
      'jest',
      'playwright',
      'testingLibrary',
      'vitest'
    ])
  })

  test('tools subpath exports expected configs', () => {
    expect(Object.keys(integrationTools).sort()).toEqual([
      'cspell',
      'jsdoc',
      'pnpm',
      'prettier',
      'swagger'
    ])
  })
})
