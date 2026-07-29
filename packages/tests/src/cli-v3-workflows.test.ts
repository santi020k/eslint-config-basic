import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import { afterEach, describe, expect, test, vi } from 'vitest'

import { generateAgentSkills } from '../../basic/src/agent-skill-generator.js'
import { handleDoctor, handleInit, runCli } from '../../basic/src/cli.js'
import {
  createCompatibilityReport,
  handleCompatibility,
  handleExplainRule
} from '../../basic/src/cli-advanced.js'
import {
  handleMigrateV3,
  migrateConfigToV3,
  type V3MigrationContext
} from '../../basic/src/cli-migration.js'
import {
  type CommandRunner,
  createConfigSnapshot,
  diffConfigSnapshots,
  findRepresentativeFiles,
  handleBaseline,
  handleProfile,
  handleSnapshot,
  handleSnapshotDiff,
  isDirectory
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
    JSON.stringify({
      bin: { eslint: './bin/eslint.js' },
      main: './index.js',
      name: 'eslint',
      version: '10.0.0'
    })
  )
  writeFileSync(join(packageDir, 'bin', 'eslint.js'), '')
  writeFileSync(
    join(packageDir, 'index.js'),
    'module.exports = { ESLint: class { async calculateConfigForFile() { ' +
    'return { rules: { "example/rule": [2, { allow: [] }] } } } } }\n'
  )
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
  vi.restoreAllMocks()

  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('v2 to v3 migration', () => {
  test.each([
    {
      context: migrationContext({ libraries: ['tailwind'] }),
      fixture: 'lean'
    },
    {
      context: migrationContext({ frameworks: ['react'], typescript: true }),
      fixture: 'lite-react'
    },
    {
      context: migrationContext({ frameworks: ['react', 'react-router'] }),
      fixture: 'full-remix'
    }
  ])('migrates the real $fixture v2 fixture with recoverable backups', ({ context, fixture }) => {
    const fixtureRoot = join(import.meta.dirname, '../fixtures/v2-migrations', fixture)
    const packageJson = JSON.parse(readFileSync(join(fixtureRoot, 'package.json'), 'utf8')) as Record<string, unknown>
    const cwd = createTempProject(packageJson)

    writeFileSync(
      join(cwd, 'eslint.config.js'),
      readFileSync(join(fixtureRoot, 'eslint.config.js'), 'utf8')
    )
    vi.spyOn(console, 'log').mockImplementation(() => {})

    handleMigrateV3(cwd, context, { write: true })

    const migratedConfig = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')
    const migratedPackage = readFileSync(join(cwd, 'package.json'), 'utf8')

    expect(migratedConfig).not.toContain('@santi020k/eslint-config-lite')
    expect(migratedConfig).not.toContain('remix: true')
    expect(migratedPackage).not.toContain('@santi020k/eslint-config-remix')
    expect(migratedPackage).not.toContain('"@santi020k/eslint-config-lite"')
    expect(existsSync(join(cwd, 'eslint.config.js.v2.bak'))).toBe(true)
    expect(existsSync(join(cwd, 'package.json.v2.bak'))).toBe(true)
  })

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

  test('invokes factories when replacing static array aliases', () => {
    const input = [
      'import { astroConfig, gitignore } from \'@santi020k/eslint-config-basic\'',
      '',
      'export default [...astroConfig, ...gitignore]'
    ].join('\n')

    const result = migrateConfigToV3(input, 'lean')

    expect(result.content).toContain('import { createAstroConfig, createGitignoreConfig }')
    expect(result.content).toContain('export default [...createAstroConfig(), ...createGitignoreConfig()]')
  })

  test('invokes aliased factory bindings without rewriting unrelated lookalikes', () => {
    const input = [
      'import { astroConfig as astro, gitignore } from \'@santi020k/eslint-config-basic\'',
      '',
      'const label = "gitignore"',
      'const options = { gitignore: false }',
      'export default [...astro, ...gitignore]',
      'void label',
      'void options'
    ].join('\n')

    const result = migrateConfigToV3(input, 'lean')

    expect(result.content).toContain('import { createAstroConfig as astro, createGitignoreConfig }')
    expect(result.content).toContain('const label = "gitignore"')
    expect(result.content).toContain('const options = { gitignore: false }')
    expect(result.content).toContain('export default [...astro(), ...createGitignoreConfig()]')
  })

  test('does not rewrite removed alias names that are not imported bindings', () => {
    const input = [
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
      '',
      'const gitignore = false',
      'export default defineConfig({ gitignore })'
    ].join('\n')

    const result = migrateConfigToV3(input, 'lean')

    expect(result.content).toBe(input)
  })

  test('writes config and package backups with granular v3 dependencies', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '^2.0.0',
        '@santi020k/eslint-config-lite': '^2.0.0',
        '@santi020k/eslint-config-remix': '^2.0.0',
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
    expect(packageJson.devDependencies['@santi020k/eslint-config-lite']).toBeUndefined()
    expect(packageJson.devDependencies['@santi020k/eslint-config-remix']).toBeUndefined()
    expect(existsSync(join(cwd, 'package.json.v2.bak'))).toBe(true)
    vi.restoreAllMocks()
  })

  test('includes feature packages selected explicitly in the config', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '^2.0.0',
        eslint: '^10.0.0'
      },
      name: 'test-project',
      type: 'module'
    })

    writeFileSync(
      join(cwd, 'eslint.config.js'),
      [
        'import { defineConfig, Extension, Format } from \'@santi020k/eslint-config-basic\'',
        'export default defineConfig({',
        '  extensions: [Extension.Security],',
        '  formats: [Format.Css],',
        '  features: { zod: true }',
        '})'
      ].join('\n')
    )

    vi.spyOn(console, 'log').mockImplementation(() => {})
    handleMigrateV3(cwd, migrationContext(), { write: true })

    const packageJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
      devDependencies: Record<string, string>
    }

    expect(packageJson.devDependencies['@santi020k/eslint-config-extensions']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-formats']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-libraries']).toBe('^3.0.0')
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

  test('prints JSON and preserves an already configured preset without another backup', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    writeFileSync(
      join(cwd, 'eslint.config.mjs'),
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\n' +
      'export default defineConfig({ strict: "ci" })\n'
    )
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleBaseline(cwd, { json: true, preset: 'ci' }, () => ({
      status: 0,
      stderr: '',
      stdout: ''
    }))

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      action: string
      backup: null | string
      preset: string
    }

    expect(payload).toMatchObject({ action: 'created', backup: null, preset: 'ci' })
  })

  test.each([
    ['unsupported preset', 'invalid', undefined, 'Unsupported baseline preset'],
    ['missing config', 'ci', undefined, 'No eslint.config.* file was found'],
    [
      'custom config',
      'pedantic',
      'export default defineConfig({ typescript: true })\n',
      'Cannot safely add strict'
    ]
  ])('rejects an %s', (_label, preset, config, message) => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    if (config) writeFileSync(join(cwd, 'eslint.config.js'), config)

    expect(() => handleBaseline(cwd, { preset }, () => ({
      status: 0,
      stderr: '',
      stdout: ''
    }))).toThrow(message)
  })

  test.each([
    [{ status: 1, stderr: 'stderr details', stdout: '' }, 'stderr details'],
    [{ status: 1, stderr: '', stdout: 'stdout details' }, 'stdout details'],
    [{ status: 1, stderr: '', stdout: '' }, 'exit code 1']
  ])('reports the most useful ESLint failure details', (result, message) => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)

    expect(() => handleBaseline(cwd, {}, () => result)).toThrow(message)
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

  test('fails when warning and slow-rule budgets are exceeded', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    const runner: CommandRunner = () => ({
      status: 0,
      stderr: '',
      stdout: JSON.stringify([{
        errorCount: 0,
        stats: {
          times: {
            passes: [{
              rules: {
                'example/slow-rule': { total: 8 }
              }
            }]
          }
        },
        warningCount: 2
      }])
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleProfile(cwd, {
      json: true,
      maxRuleTimeMs: 5,
      maxWarnings: 0
    }, runner)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      budget: { passed: boolean, violations: string[] }
    }

    expect(payload.budget.passed).toBe(false)
    expect(payload.budget.violations).toHaveLength(2)
    expect(process.exitCode).toBe(1)
  })

  test('fails closed when ESLint only produces fatal profile runs', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    const runner: CommandRunner = () => ({
      status: 2,
      stderr: 'fatal configuration error',
      stdout: JSON.stringify([{
        errorCount: 1,
        fatalErrorCount: 1,
        warningCount: 0
      }])
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleProfile(cwd, { json: true, maxWarnings: 0 }, runner)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      budget: { passed: boolean, violations: string[] }
    }

    expect(payload.budget.passed).toBe(false)
    expect(payload.budget.violations).toContain(
      'ESLint profiling did not produce a successful run.'
    )
    expect(process.exitCode).toBe(1)
  })

  test('prints the human profile, recommendation, slow rules, and duration violations', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const runner: CommandRunner = (_executable, args) => ({
      status: 0,
      stderr: '',
      stdout: JSON.stringify([{
        errorCount: 1,
        stats: {
          times: {
            passes: [{
              parse: {},
              rules: {
                'example/slow-rule': { total: args.includes('auto') ? 4 : 8 },
                'example/unknown-time': {}
              }
            }]
          }
        },
        warningCount: 1
      }])
    })

    handleProfile(cwd, {
      concurrency: 'auto',
      files: ['src/index.ts'],
      maxDurationMs: 0
    }, runner)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint performance profile:')
    expect(output).toContain('Recommended concurrency: auto')
    expect(output).toContain('Budget violations:')
    expect(output).toContain('Slowest rules:')
    expect(process.exitCode).toBe(1)
  })

  test('reports invalid profiler output with command stderr', () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)

    expect(() => handleProfile(cwd, {}, () => ({
      status: 2,
      stderr: 'configuration failed',
      stdout: 'not JSON'
    }))).toThrow('ESLint profile failed: configuration failed')
  })

  test.each([
    { maxDurationMs: Number.NaN },
    { maxRuleTimeMs: -1 },
    { maxWarnings: Number.POSITIVE_INFINITY }
  ])('rejects invalid programmatic profile budgets: %j', options => {
    const cwd = createTempProject()

    expect(() => handleProfile(cwd, options)).toThrow('must be a non-negative number')
  })

  test.each([
    ['--max-duration'],
    ['--max-rule-time='],
    ['--max-warnings', '--json']
  ])('rejects a missing numeric budget value for %s', (...args) => {
    const cwd = createTempProject()
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    runCli(['node', 'basic-eslint', 'profile', ...args], cwd)

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining(
      'must be a non-negative number'
    ))
    expect(process.exitCode).toBe(1)
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

  test('detects changes to non-rule effective configuration', async () => {
    const cwd = createTempProject()
    const before = await createConfigSnapshot(cwd, ['src/index.ts'], createFakeEslint(1))
    const after = structuredClone(before)

    after.files['src/index.ts'].globals.console = 'writable'
    after.files['src/index.ts'].languageOptions.ecmaVersion = 2025
    after.files['src/index.ts'].plugins.push('another')

    const diffs = diffConfigSnapshots(before, after)
    const changedFields = diffs[0]?.changed.map(change => change.rule)

    expect(changedFields).toEqual(expect.arrayContaining([
      'globals:console',
      'languageOptions:ecmaVersion'
    ]))
    expect(diffs[0]?.added).toContain('plugins:another')
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

  test('checks the files saved in the snapshot when --file is omitted', async () => {
    const cwd = createTempProject()
    const eslint = createFakeEslint(1)
    const calculateSpy = vi.spyOn(eslint, 'calculateConfigForFile')
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleSnapshot(cwd, { files: ['src/saved.ts'] }, eslint)
    calculateSpy.mockClear()

    await handleSnapshot(cwd, { check: true }, eslint)

    expect(calculateSpy).toHaveBeenCalledTimes(1)
    expect(calculateSpy).toHaveBeenCalledWith('src/saved.ts')
    expect(process.exitCode).toBeUndefined()
    logSpy.mockRestore()
  })

  test('discovers one representative file per category and ignores generated directories', () => {
    const cwd = createTempProject()

    mkdirSync(join(cwd, 'src'), { recursive: true })
    mkdirSync(join(cwd, 'node_modules', 'ignored'), { recursive: true })
    writeFileSync(join(cwd, 'eslint.config.js'), 'export default []\n')
    writeFileSync(join(cwd, 'src', 'component.tsx'), 'export const Component = () => null\n')
    writeFileSync(join(cwd, 'src', 'component.test.tsx'), 'test("component", () => {})\n')
    writeFileSync(join(cwd, 'src', 'view.vue'), '<template />\n')
    writeFileSync(join(cwd, 'node_modules', 'ignored', 'index.js'), '')

    expect(findRepresentativeFiles(cwd)).toEqual([
      'eslint.config.js',
      'src/component.test.tsx',
      'src/component.tsx',
      'src/view.vue'
    ])
    expect(isDirectory(join(cwd, 'src'))).toBe(true)
    expect(isDirectory(join(cwd, 'missing'))).toBe(false)
  })

  test('rejects snapshots when no representative files exist', async () => {
    const cwd = createTempProject()

    await expect(createConfigSnapshot(cwd, [], createFakeEslint(1))).rejects.toThrow(
      'No representative source files were found'
    )
  })

  test('normalizes missing, non-object, and unserializable config fields', async () => {
    const cwd = createTempProject()
    const circular: Record<string, unknown> = {}

    circular.self = circular
    const eslint = {
      calculateConfigForFile: vi.fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          languageOptions: { globals: [] },
          plugins: { circular },
          rules: ['not', 'an', 'object']
        })
    }
    const snapshot = await createConfigSnapshot(
      cwd,
      ['src/empty.ts', 'src/unserializable.ts'],
      eslint
    )

    expect(snapshot.files['src/empty.ts']).toEqual({
      globals: {},
      languageOptions: {},
      plugins: [],
      rules: {}
    })
    expect(snapshot.files['src/unserializable.ts']?.plugins).toEqual([])
  })

  test('reports added and removed files and unchanged snapshots', () => {
    const base = {
      files: {
        'removed.ts': {
          globals: {},
          languageOptions: {},
          plugins: [],
          rules: { 'old/rule': 2 }
        }
      },
      version: 1 as const
    }
    const current = {
      files: {
        'added.ts': {
          globals: {},
          languageOptions: {},
          plugins: [],
          rules: { 'new/rule': 1 }
        }
      },
      version: 1 as const
    }

    expect(diffConfigSnapshots(base, base)).toEqual([])
    expect(diffConfigSnapshots(base, current)).toEqual([
      {
        added: ['new/rule'],
        changed: [],
        file: 'added.ts',
        removed: []
      },
      {
        added: [],
        changed: [],
        file: 'removed.ts',
        removed: ['old/rule']
      }
    ])
  })

  test('handles missing, matching, and changed snapshot checks in text and JSON modes', async () => {
    const cwd = createTempProject()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await handleSnapshot(cwd, { check: true, files: ['src/index.ts'] }, createFakeEslint(1))
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Snapshot is missing'))
    expect(process.exitCode).toBe(1)

    process.exitCode = undefined
    await handleSnapshot(
      cwd,
      { check: true, files: ['src/index.ts'], json: true },
      createFakeEslint(1)
    )
    expect(JSON.parse(String(logSpy.mock.calls.at(-1)?.[0]))).toMatchObject({ exists: false })

    process.exitCode = undefined
    await handleSnapshot(cwd, { files: ['src/index.ts'], json: true }, createFakeEslint(1))
    await handleSnapshot(cwd, { check: true, files: ['src/index.ts'] }, createFakeEslint(1))
    expect(logSpy.mock.calls.flat().join('\n')).toContain('matches the saved snapshot')
    expect(process.exitCode).toBeUndefined()

    await handleSnapshot(
      cwd,
      { check: true, files: ['src/index.ts'], json: true },
      createFakeEslint(2)
    )
    expect(process.exitCode).toBe(1)
  })

  test('prints detailed snapshot changes and rejects a missing snapshot diff', async () => {
    const cwd = createTempProject()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await expect(handleSnapshotDiff(
      cwd,
      { files: ['src/index.ts'] },
      createFakeEslint(1)
    )).rejects.toThrow('Snapshot is missing')

    await handleSnapshot(cwd, { files: ['src/index.ts'] }, createFakeEslint(1))
    await handleSnapshotDiff(cwd, {}, {
      calculateConfigForFile: async () => ({
        rules: {
          'added/rule': 1
        }
      })
    })

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Added: added/rule')
    expect(output).toContain('Removed: example/rule')
    expect(process.exitCode).toBe(1)
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

describe('v3 project assistance', () => {
  test('explains an effective rule and its defining config entry', async () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'export default [{ name: "project/rules", rules: { "example/rule": [2, { allow: [] }] } }]\n'
    )
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleExplainRule(cwd, {
      file: 'src/index.ts',
      json: true,
      rule: 'example/rule'
    })

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      enabled: boolean
      sources: { name: string }[]
    }

    expect(payload.enabled).toBe(true)
    expect(payload.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'project/rules' })
    ]))
  })

  test('explains a missing core rule in text mode without a project config', async () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleExplainRule(cwd, { rule: 'custom/missing' })

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('- Config: none')
    expect(output).toContain('- Effective value: null')
    expect(output).toContain('- Enabled: no')
    expect(output).toContain('- Likely package: core or custom config')
    expect(process.exitCode).toBe(1)
  })

  test('falls back safely when the project config cannot be imported', async () => {
    const cwd = createTempProject()

    writeFakeEslint(cwd)
    writeFileSync(join(cwd, 'eslint.config.js'), 'throw new Error("broken config")\n')
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleExplainRule(cwd, {
      file: 'src/index.ts',
      json: true,
      rule: 'example/rule'
    })

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      packageHint: null | string
      sources: unknown[]
    }

    expect(payload.packageHint).toBeNull()
    expect(payload.sources).toEqual([])
  })

  test('reports declared config packages that are not installed', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '^3.0.0'
      },
      name: 'test-project',
      type: 'module'
    })
    const report = createCompatibilityReport(cwd)

    expect(report.compatible).toBe(false)
    expect(report.packages[0]?.issues).toContain('declared but not installed')
  })

  test('checks workspace package engines and peer ranges and prints both output modes', () => {
    const cwd = createTempProject({
      dependencies: [],
      devDependencies: {
        '@santi020k/eslint-config-example': 'workspace:*'
      },
      name: 'test-project',
      optionalDependencies: null,
      peerDependencies: 'invalid',
      type: 'module'
    })

    writeFakeEslint(cwd)
    const typescriptDir = join(cwd, 'node_modules', 'typescript')
    const workspacePackageDir = join(cwd, 'packages', 'example')

    mkdirSync(typescriptDir, { recursive: true })
    writeFileSync(join(typescriptDir, 'index.js'), 'module.exports = {}\n')
    writeFileSync(join(typescriptDir, 'package.json'), JSON.stringify({
      main: './index.js',
      name: 'typescript',
      version: '5.9.0'
    }))
    mkdirSync(workspacePackageDir, { recursive: true })
    writeFileSync(join(workspacePackageDir, 'package.json'), JSON.stringify({
      engines: { node: '<1' },
      name: '@santi020k/eslint-config-example',
      peerDependencies: {
        eslint: '<1',
        typescript: '<1'
      },
      version: '3.0.0'
    }))
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const report = createCompatibilityReport(cwd)

    expect(report.packages[0]?.issues).toEqual([
      'requires Node <1',
      'requires eslint <1, resolved 10.0.0',
      'requires typescript <1, resolved 5.9.0'
    ])

    handleCompatibility(cwd)
    expect(logSpy.mock.calls.flat().join('\n')).toContain('ESLint compatibility: issues found')
    expect(process.exitCode).toBe(1)

    process.exitCode = undefined
    handleCompatibility(cwd, true)
    expect(JSON.parse(String(logSpy.mock.calls.at(-1)?.[0]))).toMatchObject({
      compatible: false
    })
    expect(process.exitCode).toBe(1)
  })

  test('doctor fix creates safe backups, a config, a lint script, and declarations', async () => {
    const cwd = createTempProject({ name: 'test-project', type: 'module' })

    vi.spyOn(console, 'log').mockImplementation(() => {})
    await handleDoctor(cwd, false, false, true)

    const packageJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
      devDependencies: Record<string, string>
      scripts: Record<string, string>
    }

    expect(packageJson.scripts.lint).toBe('eslint .')
    expect(packageJson.devDependencies.eslint).toBe('^10.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-basic']).toBe('^3.0.0')
    expect(existsSync(join(cwd, 'package.json.doctor.bak'))).toBe(true)
    expect(existsSync(join(cwd, 'eslint.config.js'))).toBe(true)
  })

  test('doctor fix reports the repaired project state', async () => {
    const cwd = createTempProject({ name: 'test-project', type: 'module' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleDoctor(cwd, true, false, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      configFile: null | string
      warnings: string[]
    }

    expect(payload.configFile).toBe('eslint.config.js')
    expect(payload.warnings).not.toContain('No eslint.config.js/mjs/cjs file found. Run `basic-eslint init` to create one.')
    expect(payload.warnings).not.toContain('No `lint` script found in package.json.')
  })

  test('init explicit records the detected framework and TypeScript settings', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '^19.0.0'
      },
      devDependencies: {
        typescript: '^5.9.0'
      },
      name: 'test-project',
      type: 'module'
    })

    writeFileSync(join(cwd, 'tsconfig.json'), '{}\n')
    vi.spyOn(console, 'log').mockImplementation(() => {})
    handleInit(cwd, false, true)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).toContain('typescript: true')
    expect(config).toContain('react: true')
  })
})
