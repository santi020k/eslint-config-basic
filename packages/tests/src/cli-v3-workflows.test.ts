import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import { afterEach, describe, expect, test, vi } from 'vitest'

import { generateAgentSkills } from '../../basic/src/agent-skill-generator.js'
import {
  handleMigrateV3,
  migrateConfigToV3,
  type V3MigrationContext
} from '../../basic/src/cli-migration.js'
import {
  type CommandRunner,
  createConfigSnapshot,
  diffConfigSnapshots,
  handleBaseline,
  handleProfile,
  handleSnapshot,
  handleSnapshotDiff
} from '../../basic/src/cli-workflows.js'

const tempDirs: string[] = []

const createTempProject = (
  packageJson: Record<string, unknown> = { name: 'test-project', type: 'module' }
): string => {
  const cwd = mkdtempSync(resolve(tmpdir(), 'eslint-config-basic-v3-cli-'))

  tempDirs.push(cwd)
  writeFileSync(join(cwd, 'package.json'), `${JSON.stringify(packageJson, null, 2)}\n`)

  return cwd
}

const writeFakeEslint = (cwd: string): void => {
  const packageDir = join(cwd, 'node_modules', 'eslint')

  mkdirSync(join(packageDir, 'bin'), { recursive: true })
  writeFileSync(
    join(packageDir, 'package.json'),
    JSON.stringify({ bin: { eslint: './bin/eslint.js' }, name: 'eslint', version: '10.0.0' })
  )
  writeFileSync(join(packageDir, 'bin', 'eslint.js'), '')
}

const migrationContext = (
  overrides: Partial<V3MigrationContext> = {}
): V3MigrationContext => ({
  extensions: [],
  formats: [],
  frameworks: [],
  libraries: [],
  packageManager: 'npm',
  testing: [],
  tools: [],
  typescript: false,
  ...overrides
})

afterEach(() => {
  process.exitCode = undefined

  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('v2 to v3 migration', () => {
  test('moves removed aliases, Remix, and direct feature factories', () => {
    const input = [
      'import { eslintConfig, tailwind, vitest } from \'@santi020k/eslint-config-basic\'',
      '',
      'export default eslintConfig({ frameworks: { remix: true } }, tailwind(), vitest)'
    ].join('\n')

    const result = migrateConfigToV3(input, 'lean')

    expect(result.content).toContain('import { defineConfig }')
    expect(result.content).toContain('eslint-config-libraries')
    expect(result.content).toContain('eslint-config-testing')
    expect(result.content).toContain('defineConfig({')
    expect(result.content).toContain('frameworks: { \'react-router\': true }')
    expect(result.featurePackages).toEqual(expect.arrayContaining([
      '@santi020k/eslint-config-libraries',
      '@santi020k/eslint-config-testing'
    ]))
  })

  test('writes config and package backups with granular v3 dependencies', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '^2.0.0',
        eslint: '^10.0.0',
        vitest: '^4.0.0'
      },
      name: 'test-project',
      type: 'module'
    })

    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\nexport default defineConfig()\n'
    )

    vi.spyOn(console, 'log').mockImplementation(() => {})
    handleMigrateV3(cwd, migrationContext({ frameworks: ['react'], testing: ['vitest'] }), { write: true })

    const packageJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
      devDependencies: Record<string, string>
    }

    expect(packageJson.devDependencies['@santi020k/eslint-config-basic']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-react']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-testing']).toBe('^3.0.0')
    expect(existsSync(join(cwd, 'package.json.v2.bak'))).toBe(true)
    vi.restoreAllMocks()
  })

  test('selects full automatically for Preset.All', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '^2.0.0'
      },
      name: 'test-project',
      type: 'module'
    })

    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'import { defineConfig, Preset } from \'@santi020k/eslint-config-basic\'\n' +
      'export default defineConfig({ preset: Preset.All })\n'
    )
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleMigrateV3(cwd, migrationContext(), { json: true })

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as { mode?: string }

    expect(payload.mode).toBe('full')
    logSpy.mockRestore()
  })
})

describe('incremental baseline', () => {
  test('enables pedantic mode and delegates suppression creation to project ESLint', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\nexport default defineConfig()\n'
    )
    const calls: string[][] = []
    const runner: CommandRunner = (_executable, args) => {
      calls.push(args)

      return { status: 0, stderr: '', stdout: '' }
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleBaseline(cwd, { preset: 'pedantic' }, runner)

    expect(readFileSync(join(cwd, 'eslint.config.js'), 'utf8')).toContain("strict: 'pedantic'")
    expect(existsSync(join(cwd, 'eslint.config.js.baseline.bak'))).toBe(true)
    expect(calls[0]).toEqual(expect.arrayContaining(['--fix', '--suppress-all']))
    logSpy.mockRestore()
  })

  test('prunes resolved suppressions', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    const calls: string[][] = []
    const runner: CommandRunner = (_executable, args) => {
      calls.push(args)

      return { status: 0, stderr: '', stdout: '' }
    }

    vi.spyOn(console, 'log').mockImplementation(() => {})
    handleBaseline(cwd, { prune: true }, runner)

    expect(calls[0]).toEqual(expect.arrayContaining(['--prune-suppressions']))
    vi.restoreAllMocks()
  })
})

describe('performance profile', () => {
  test('compares single-threaded and automatic concurrency and reports slow rules', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    const runner: CommandRunner = (_executable, args) => ({
      status: 0,
      stderr: '',
      stdout: JSON.stringify([{
        errorCount: 0,
        filePath: 'src/index.ts',
        stats: {
          times: {
            passes: [{
              parse: { total: 2 },
              rules: {
                'example/slow-rule': { total: args.includes('auto') ? 3 : 8 }
              }
            }]
          }
        },
        warningCount: 0
      }])
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleProfile(cwd, { json: true }, runner)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      runs?: { concurrency: string, slowestRules: { rule: string }[] }[]
    }

    expect(payload.runs?.map(run => run.concurrency)).toEqual(['off', 'auto'])
    expect(payload.runs?.[0]?.slowestRules[0]?.rule).toBe('example/slow-rule')
    logSpy.mockRestore()
  })
})

describe('configuration snapshots', () => {
  const createFakeEslint = (severity: number) => ({
    calculateConfigForFile: async () => ({
      languageOptions: {
        ecmaVersion: 2024,
        globals: { console: 'readonly' },
        sourceType: 'module'
      },
      plugins: { example: {} },
      rules: {
        'example/rule': [severity]
      }
    })
  })

  test('normalizes effective rules and detects severity changes', async () => {
    const cwd = createTempProject()
    const before = await createConfigSnapshot(cwd, ['src/index.ts'], createFakeEslint(1))
    const after = await createConfigSnapshot(cwd, ['src/index.ts'], createFakeEslint(2))
    const diffs = diffConfigSnapshots(before, after)

    expect(diffs).toHaveLength(1)
    expect(diffs[0]?.changed[0]).toMatchObject({ rule: 'example/rule' })
  })

  test('writes and checks a committed snapshot', async () => {
    const cwd = createTempProject()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleSnapshot(cwd, { files: ['src/index.ts'] }, createFakeEslint(1))

    expect(existsSync(join(cwd, '.eslint-config-snapshot.json'))).toBe(true)

    await handleSnapshotDiff(cwd, { files: ['src/index.ts'] }, createFakeEslint(1))
    expect(process.exitCode).toBeUndefined()

    await handleSnapshotDiff(cwd, { files: ['src/index.ts'] }, createFakeEslint(2))
    expect(process.exitCode).toBe(1)
    logSpy.mockRestore()
  })
})

describe('ESLint MCP scaffolding', () => {
  test('adds the official ESLint MCP server while preserving existing servers', async () => {
    const cwd = createTempProject()

    writeFileSync(join(cwd, '.mcp.json'), JSON.stringify({
      mcpServers: {
        existing: {
          args: [],
          command: 'existing-server'
        }
      }
    }))

    const result = await generateAgentSkills({ cwd, withEslintMcp: true })
    const config = JSON.parse(readFileSync(join(cwd, '.mcp.json'), 'utf8')) as {
      mcpServers: Record<string, { args: string[], command: string }>
    }

    expect(result.written).toContain(join(cwd, '.mcp.json'))
    expect(config.mcpServers.existing?.command).toBe('existing-server')
    expect(config.mcpServers.eslint).toEqual({
      args: ['eslint', '--mcp'],
      command: 'npx'
    })
  })

  test('reports a missing MCP entry as stale in check mode', async () => {
    const cwd = createTempProject()
    const result = await generateAgentSkills({
      check: true,
      cwd,
      withEslintMcp: true
    })

    expect(result.stale).toContain(join(cwd, '.mcp.json'))
    expect(existsSync(join(cwd, '.mcp.json'))).toBe(false)
  })
})
