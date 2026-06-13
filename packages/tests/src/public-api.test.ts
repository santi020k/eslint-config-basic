import {
  aiSdk,
  createImportGroups,
  cypress,
  defineConfig,
  drizzle,
  graphql,
  groups,
  jest as jestConfig,
  langchain,
  llamaIndex,
  mastra,
  mcp,
  mikroOrm,
  openAiAgents,
  prisma,
  sequelize,
  testingLibrary,
  typeorm
} from '@santi020k/eslint-config-basic'

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
    expect(new RegExp(workspaceGroup![0]).test('@acme/shared')).toBe(true)
    expect(new RegExp(workspaceGroup![0]).test('@other/pkg')).toBe(false)
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

  test('should re-export all testing configs from the main package', () => {
    expect(typeof jestConfig).toBe("function")
    expect(typeof cypress).toBe("function")
    expect(typeof testingLibrary).toBe("function")
  })

  test('should re-export all format configs from the main package', () => {
    expect(typeof graphql).toBe("function")
  })

  test('should re-export ORM library configs from the main package', () => {
    expect(typeof typeorm).toBe("function")
    expect(typeof prisma).toBe("function")
    expect(typeof drizzle).toBe("function")
    expect(typeof mikroOrm).toBe("function")
    expect(typeof sequelize).toBe("function")
  })

  test('should re-export AI and agent library configs from the main package', () => {
    expect(typeof aiSdk).toBe("function")
    expect(typeof mastra).toBe("function")
    expect(typeof mcp).toBe("function")
    expect(typeof openAiAgents).toBe("function")
    expect(typeof langchain).toBe("function")
    expect(typeof llamaIndex).toBe("function")
  })
})
