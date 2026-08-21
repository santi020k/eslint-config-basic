import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import { afterEach, describe, expect, test, vi } from 'vitest'

import type { EslintConfigFeatures } from '../../basic/src/agent-skill-generator.js'
import {
  AGENT_TARGETS,
  analyzeEslintConfig,
  generateAgentSkills,
  generateSkillContent,
  handleGenerateSkill
} from '../../basic/src/agent-skill-generator.js'
import {
  findDuplicateEslint,
  handleDocs,
  handleDoctor,
  handleExplain,
  handleInit,
  handleInspect,
  handleInstall,
  handleMigrate,
  handleUpdate,
  isCliEntrypoint,
  runCli
} from '../../basic/src/cli.js'

const tempDirs: string[] = []
const basicPackageVersion = (
  JSON.parse(
    readFileSync(join(import.meta.dirname, '../../basic/package.json'), 'utf8')
  ) as { version: string }
).version

const createTempProject = (packageJson: Record<string, unknown>): string => {
  const cwd = mkdtempSync(resolve(tmpdir(), 'eslint-config-basic-cli-'))

  tempDirs.push(cwd)
  writeFileSync(join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2))

  return cwd
}

const writeFakePackage = (
  root: string,
  name: string,
  version: string,
  metadata: Record<string, unknown> = {}
): void => {
  const packageDir = join(root, 'node_modules', ...name.split('/'))

  mkdirSync(packageDir, { recursive: true })
  writeFileSync(join(packageDir, 'package.json'), JSON.stringify({ main: 'index.js', name, version, ...metadata }))
  writeFileSync(join(packageDir, 'index.js'), 'module.exports = {}')
}

const getProjectByPath = <Project extends { path: string }>(
  projects: Project[],
  path: string
): Project => {
  const project = projects.find(candidate => candidate.path === path)

  if (!project) throw new Error(`Expected doctor project activation for ${path}`)

  return project
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('CLI scaffolding', () => {
  test('should default to eslint.config.mjs for non-ESM projects', () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    handleInit(cwd)

    expect(readFileSync(join(cwd, 'eslint.config.mjs'), 'utf8')).toBe(
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\n\nexport default defineConfig()\n'
    )
  })

  test('should keep eslint.config.js for ESM projects and defer to runtime detection', () => {
    const cwd = createTempProject({
      dependencies: {
        next: '15.0.0'
      },
      name: 'tmp-project',
      type: 'module'
    })

    handleInit(cwd)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).toBe('import { defineConfig } from \'@santi020k/eslint-config-basic\'\n\nexport default defineConfig()\n')
  })

  test('should update an existing config file in place', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      name: 'tmp-project',
      type: 'module'
    })

    writeFileSync(join(cwd, 'eslint.config.js'), '// old config')

    handleUpdate(cwd)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).not.toContain('// old config')
    expect(config).toBe('import { defineConfig } from \'@santi020k/eslint-config-basic\'\n\nexport default defineConfig()\n')
  })
})

describe('CLI command UX', () => {
  test('should recognize direct pnpm bin symlinks as CLI entrypoints', () => {
    expect(isCliEntrypoint('/workspace/node_modules/.bin/basic-eslint', '/package/dist/cli.js')).toBe(true)
    expect(isCliEntrypoint('/package/dist/cli.js', '/package/dist/cli.js')).toBe(true)
    expect(isCliEntrypoint('/workspace/scripts/basic-eslint-wrapper', '/package/dist/cli.js')).toBe(false)
  })

  test('should print help text for --help', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', '--help'])

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls.flat().join('\n')).toContain('Usage: basic-eslint <command> [options]')
    logSpy.mockRestore()
  })

  test('should treat subcommand help as side-effect free', () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', 'install', '--help'], cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Usage: basic-eslint <command> [options]')
    expect(output).not.toContain('npm install')
    expect(readFileSync(join(cwd, 'package.json'), 'utf8')).toBe(
      JSON.stringify({ name: 'tmp-project' }, null, 2)
    )
    logSpy.mockRestore()
  })

  test('should advertise source analysis in explain-preset help', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', 'explain-preset', '--help'])

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Usage: basic-eslint explain-preset <preset> [options]')
    expect(output).toContain('--analyze-source')
    expect(output).toContain('--semantic-only')
    expect(output).toContain('--write')
    logSpy.mockRestore()
  })

  test('should forward --rules-only through the snapshot command', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFakePackage(cwd, 'eslint', '10.0.0')
    writeFileSync(join(cwd, 'node_modules/eslint/index.js'), [
      'class ESLint {',
      '  async calculateConfigForFile() {',
      '    return { languageOptions: { ecmaVersion: 2022, globals: {}, sourceType: \'module\' }, plugins: {}, rules: { semi: [2, \'never\'] } }',
      '  }',
      '  async isPathIgnored() { return false }',
      '}',
      'module.exports = { ESLint }'
    ].join('\n'))
    mkdirSync(join(cwd, 'src'))
    writeFileSync(join(cwd, 'src/index.ts'), 'export const value = 1\n')

    runCli([
      'node',
      'basic-eslint',
      'snapshot',
      '--rules-only',
      '--file',
      'src/index.ts'
    ], cwd)

    await vi.waitFor(() => {
      const snapshot = JSON.parse(
        readFileSync(join(cwd, '.eslint-config-snapshot.json'), 'utf8')
      ) as { files: Record<string, unknown>, scope?: string }

      expect(snapshot.scope).toBe('rules')
      expect(snapshot.files['src/index.ts']).toEqual({
        globals: {},
        languageOptions: {},
        plugins: [],
        rules: { semi: [2, 'never'] }
      })
    })
  })

  test('should print version for --version', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', '--version'])

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls[0]?.[0]).toMatch(/\d+\.\d+\.\d+|unknown/)
    logSpy.mockRestore()
  })

  test('should set non-zero exit code for unknown command', () => {
    process.exitCode = undefined
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', 'unknown-command'])

    expect(errorSpy).toHaveBeenCalledWith('Unknown command: unknown-command')
    expect(process.exitCode).toBe(1)
    errorSpy.mockRestore()
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should reject command flags that are not supported without mutating files', () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const before = readFileSync(join(cwd, 'package.json'), 'utf8')
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', 'install', '--write'], cwd)

    expect(errorSpy).toHaveBeenCalledWith('Unknown option for install: --write')
    expect(process.exitCode).toBe(1)
    expect(readFileSync(join(cwd, 'package.json'), 'utf8')).toBe(before)
    errorSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should reject assigned values for boolean safety flags without mutating files', () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', 'init', '--check=true'], cwd)

    const configExists = existsSync(join(cwd, 'eslint.config.mjs'))

    expect(errorSpy).toHaveBeenCalledWith('Option --check does not accept a value.')
    expect(process.exitCode).toBe(1)
    expect(configExists).toBe(false)
    errorSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should print dedicated install help', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    runCli(['node', 'basic-eslint', 'install', '--help'])

    expect(logSpy.mock.calls.flat().join('\n')).toContain('Usage: basic-eslint install [options]')
    expect(logSpy.mock.calls.flat().join('\n')).toContain('--dry-run')
    logSpy.mockRestore()
  })

  test('should explain detected project settings', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      devDependencies: {
        vitest: 'latest'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleExplain(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic detected configuration:')
    expect(output).toContain('Frameworks: react')
    expect(output).toContain('Testing: vitest')
    logSpy.mockRestore()
  })

  test('should print one install command for all missing detected packages', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        eslint: '10.0.0',
        typescript: '6.0.0',
        vitest: 'latest'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    const output = String(logSpy.mock.calls[0]?.[0])

    expect(output).toBe(
      'npm install -D @santi020k/eslint-config-react@^3.0.0 @santi020k/eslint-config-testing@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should diagnose pnpm minimum-release-age failures', () => {
    const cwd = createTempProject({
      dependencies: { react: '19.0.0' },
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.1.0',
        eslint: '10.0.0'
      },
      name: 'tmp-project'
    })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), 'packages: []\n')
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true)

    handleInstall(cwd, false, () => ({
      status: 1,
      stderr: 'ERR_PNPM_NO_MATCHING_VERSION_INSIDE_WORKSPACE minimumReleaseAge blocked this release',
      stdout: ''
    }))

    expect(errorSpy.mock.calls.flat().join('\n')).toContain(
      'pnpm minimumReleaseAge temporarily blocks the compatible ESLint config release'
    )
    expect(errorSpy.mock.calls.flat().join('\n')).toContain(
      '@santi020k/eslint-config-react@^3.0.0'
    )
    expect(process.exitCode).toBe(1)
    stderrSpy.mockRestore()
    errorSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should include feature packs selected explicitly in the config', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        eslint: '10.0.0'
      },
      name: 'tmp-project',
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    writeFileSync(join(cwd, 'eslint.config.js'), `
      import { defineConfig, Extension, Preset } from '@santi020k/eslint-config-basic'
      export default defineConfig({
        extensions: [Extension.Security],
        features: { markdown: true },
        preset: Preset.App,
        strict: 'pedantic'
      })
    `)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      'npm install -D @santi020k/eslint-config-extensions@^3.0.0 @santi020k/eslint-config-formats@^3.0.0 @santi020k/eslint-config-testing@^3.0.0 @santi020k/eslint-config-tools@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should install the canonical React Router package', () => {
    const cwd = createTempProject({
      dependencies: {
        '@react-router/dev': 'latest'
      },
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        '@santi020k/eslint-config-react': '3.0.0',
        eslint: '10.0.0'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      'npm install -D @santi020k/eslint-config-react-router@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should report when every detected package is already declared', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        '@santi020k/eslint-config-react': '3.0.0',
        eslint: '10.0.0'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      '✅ All packages required by the detected ESLint configuration are already declared.'
    )
    logSpy.mockRestore()
  })

  test('should aggregate install requirements from workspace projects', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        eslint: '10.0.0'
      },
      name: 'tmp-workspace',
      workspaces: ['apps/*']
    })

    mkdirSync(join(cwd, 'apps/web'), { recursive: true })
    writeFileSync(join(cwd, 'apps/web/package.json'), JSON.stringify({
      dependencies: { react: '19.0.0' },
      name: 'web'
    }))

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      'npm install -D @santi020k/eslint-config-react@^3.0.0 ' +
      '@santi020k/eslint-config-extensions@^3.0.0 @santi020k/eslint-config-tools@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should aggregate workspace requirements when doctor applies fixes', async () => {
    const cwd = createTempProject({
      name: 'tmp-workspace',
      type: 'module',
      workspaces: ['apps/*']
    })

    mkdirSync(join(cwd, 'apps/web'), { recursive: true })
    writeFileSync(join(cwd, 'apps/web/package.json'), JSON.stringify({
      dependencies: {
        react: '19.0.0',
        vitest: '4.0.0'
      },
      name: 'web'
    }))

    vi.spyOn(console, 'log').mockImplementation(() => undefined)
    await handleDoctor(cwd, false, false, true)

    const packageJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
      devDependencies: Record<string, string>
    }

    expect(packageJson.devDependencies['@santi020k/eslint-config-react']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-testing']).toBe('^3.0.0')
  })

  test('should aggregate workspace requirements and declarations for v3 migration', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '^2.0.0'
      },
      name: 'tmp-workspace',
      type: 'module',
      workspaces: ['apps/*']
    })

    mkdirSync(join(cwd, 'apps/web'), { recursive: true })
    writeFileSync(join(cwd, 'apps/web/package.json'), JSON.stringify({
      dependencies: {
        react: '19.0.0',
        vitest: '4.0.0'
      },
      devDependencies: {
        '@santi020k/eslint-config-formats': '^2.0.0'
      },
      name: 'web'
    }))
    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\nexport default defineConfig()\n'
    )

    vi.spyOn(console, 'log').mockImplementation(() => undefined)
    handleMigrate(cwd, true, false, 'v3')

    const packageJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
      devDependencies: Record<string, string>
    }

    expect(packageJson.devDependencies['@santi020k/eslint-config-react']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-testing']).toBe('^3.0.0')
    expect(packageJson.devDependencies['@santi020k/eslint-config-formats']).toBe('^3.0.0')
  })

  test.each([
    {
      childPath: 'apps/web',
      workspaces: ['apps/web']
    },
    {
      childPath: 'packages/group/web',
      workspaces: ['packages/**']
    }
  ])('should aggregate install requirements from $workspaces', ({ childPath, workspaces }) => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        eslint: '10.0.0'
      },
      name: 'tmp-workspace',
      workspaces
    })

    mkdirSync(join(cwd, childPath), { recursive: true })
    writeFileSync(join(cwd, childPath, 'package.json'), JSON.stringify({
      dependencies: { react: '19.0.0' },
      name: 'web'
    }))

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      'npm install -D @santi020k/eslint-config-react@^3.0.0 ' +
      '@santi020k/eslint-config-extensions@^3.0.0 @santi020k/eslint-config-tools@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should scope pnpm installs to the workspace root', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-formats': '3.0.0',
        '@santi020k/eslint-config-tools': '3.0.0'
      },
      name: 'tmp-workspace'
    })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), 'packages:\n  - "apps/*"\n')

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      `pnpm add -D --workspace-root eslint @santi020k/eslint-config-basic@^${basicPackageVersion}`
    )
    logSpy.mockRestore()
  })

  test('should preserve the default pnpm catalog convention', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': 'catalog:',
        eslint: 'catalog:'
      },
      name: 'tmp-workspace'
    })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), [
      'packages:',
      '  - "apps/*"',
      'catalog:',
      '  "@santi020k/eslint-config-basic": ^3.1.0',
      '  eslint: ^10.0.0',
      ''
    ].join('\n'))

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      'pnpm add -D --workspace-root --save-catalog ' +
      '@santi020k/eslint-config-formats@^3.0.0 ' +
      '@santi020k/eslint-config-tools@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should discover a named pnpm catalog from a nested workspace package', () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': 'catalog:lint',
        eslint: 'catalog:lint'
      },
      name: 'tmp-workspace',
      workspaces: ['apps/*']
    })
    const child = join(cwd, 'apps/web')

    mkdirSync(child, { recursive: true })
    writeFileSync(join(child, 'package.json'), JSON.stringify({
      dependencies: { react: '19.0.0' },
      name: 'web'
    }))
    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), [
      'packages:',
      '  - "apps/*"',
      'catalog:',
      '  "@santi020k/eslint-config-basic": ^2.9.0',
      'catalogs:',
      '  lint:',
      '    "@santi020k/eslint-config-basic": ^3.1.0',
      '    eslint: ^10.0.0',
      ''
    ].join('\n'))

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(child, true)

    expect(logSpy).toHaveBeenCalledWith(
      'pnpm add -D --workspace-root --save-catalog-name=lint ' +
      '@santi020k/eslint-config-react@^3.0.0 ' +
      '@santi020k/eslint-config-formats@^3.0.0 ' +
      '@santi020k/eslint-config-tools@^3.0.0 ' +
      '@santi020k/eslint-config-extensions@^3.0.0'
    )
    logSpy.mockRestore()
  })

  test('should prefer Basic\'s named catalog over an earlier unrelated dependency catalog', () => {
    const cwd = createTempProject({
      devDependencies: {
        'unrelated-package': 'catalog:frontend',
        '@santi020k/eslint-config-basic': 'catalog:lint',
        eslint: 'catalog:lint'
      },
      name: 'tmp-workspace'
    })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), [
      'packages:',
      '  - "apps/*"',
      'catalogs:',
      '  frontend:',
      '    "unrelated-package": ^1.0.0',
      '  lint:',
      '    "@santi020k/eslint-config-basic": ^3.1.0',
      '    eslint: ^10.0.0',
      ''
    ].join('\n'))

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInstall(cwd, true)

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('--save-catalog-name=lint')
    )
    expect(logSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('--save-catalog-name=frontend')
    )
    logSpy.mockRestore()
  })

  test('should scope pnpm doctor install commands to the workspace root', async () => {
    const cwd = createTempProject({ name: 'tmp-workspace' })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), 'packages:\n  - "apps/*"\n')

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, false, true)

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('pnpm add -D --workspace-root ')
    )
    logSpy.mockRestore()
  })

  test('should omit deprecated Lite advice after doctor fixes', async () => {
    const cwd = createTempProject({ name: 'tmp-workspace', type: 'module' })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), 'packages:\n  - "apps/*"\n')

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true, false, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      installCommand?: string
      liteInstallCommand?: string
      requiredPackages?: string[]
    }

    expect(payload.installCommand).toBeUndefined()
    expect(payload.liteInstallCommand).toBeUndefined()
    expect(payload.requiredPackages).toEqual([])
    logSpy.mockRestore()
  })

  test('should report modular packages required by pnpm workspace projects', async () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-basic': '3.0.0',
        eslint: '10.0.0'
      },
      name: 'tmp-workspace',
      type: 'module'
    })

    writeFileSync(join(cwd, 'pnpm-workspace.yaml'), 'packages:\n  - "apps/*"\n')
    mkdirSync(join(cwd, 'apps/docs'), { recursive: true })
    writeFileSync(join(cwd, 'apps/docs/package.json'), JSON.stringify({
      dependencies: {
        astro: 'latest',
        tailwindcss: 'latest'
      },
      name: 'docs'
    }))
    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\nexport default defineConfig()\n'
    )

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      installCommand?: string
      requiredPackages: string[]
    }

    expect(payload.requiredPackages).toEqual(expect.arrayContaining([
      '@santi020k/eslint-config-astro',
      '@santi020k/eslint-config-libraries'
    ]))
    expect(payload.installCommand).toContain('pnpm add -D --workspace-root')
    logSpy.mockRestore()
  })

  test('should print detected project settings as JSON', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleExplain(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      frameworks?: string[]
      runtime?: string
    }

    expect(payload.frameworks).toContain('react')
    expect(payload.runtime).toBe('browser')
    logSpy.mockRestore()
  })

  test('should check whether init has an existing config without writing', () => {
    process.exitCode = undefined
    const cwd = createTempProject({ name: 'tmp-project' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleInit(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      exists?: boolean
      ok?: boolean
    }

    expect(payload.exists).toBe(false)
    expect(payload.ok).toBe(false)
    expect(existsSync(join(cwd, 'eslint.config.mjs'))).toBe(false)
    expect(process.exitCode).toBe(1)
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should generate human-readable ESLint standards docs', () => {
    const cwd = createTempProject({
      dependencies: {
        next: '15.0.0'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    handleDocs(cwd)

    const content = readFileSync(join(cwd, 'ESLINT_STANDARDS.md'), 'utf8')

    expect(content).toContain('# ESLint Standards')
    expect(content).toContain('Frameworks: next, react')
    expect(logSpy).toHaveBeenCalledWith('✅ Generated ESLINT_STANDARDS.md')
    logSpy.mockRestore()
  })

  test('should report migration suggestions', () => {
    const cwd = createTempProject({ name: 'tmp-project', type: 'module' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    writeFileSync(
      join(cwd, 'eslint.config.js'), 'import react from \'@santi020k/eslint-config-react\'\nexport default []'
    )

    handleMigrate(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('v1 to v2 migration suggestions:')
    expect(output).toContain('framework booleans')
    logSpy.mockRestore()
  })

  test('should print migration suggestions as JSON', () => {
    const cwd = createTempProject({ name: 'tmp-project', type: 'module' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const fileContent = 'import react from \'@santi020k/eslint-config-react\'\nexport default []'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    handleMigrate(cwd, false, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      suggestions?: string[]
      title?: string
    }

    expect(payload.title).toBe('v1 to v2 migration suggestions:')
    expect(payload.suggestions?.some(suggestion => suggestion.includes('framework booleans'))).toBe(true)
    logSpy.mockRestore()
  })

  test('should rewrite simple v1 framework imports when migrate --write is used', () => {
    const cwd = createTempProject({ name: 'tmp-project', type: 'module' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const fileContent = 'import next from \'@santi020k/eslint-config-next\'\n' +
      'import react from \'@santi020k/eslint-config-react\'\n' +
      'export default [...next, ...react]\n'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    handleMigrate(cwd, true)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')
    const backup = readFileSync(join(cwd, 'eslint.config.js.bak'), 'utf8')
    const output = logSpy.mock.calls.flat().join('\n')

    expect(config).toContain('defineConfig')
    expect(config).toContain('next: true')
    expect(config).toContain('react: true')
    expect(config).not.toContain('@santi020k/eslint-config-next')
    expect(backup).toBe(fileContent)
    expect(output).toContain('Rewrote eslint.config.js')
    expect(output).toContain('eslint.config.js.bak')
    logSpy.mockRestore()
  })

  test('should inspect detected inputs and active config features', async () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      name: 'tmp-project',
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    writeFileSync(
      join(cwd, 'eslint.config.js'), `export default [
        { name: 'eslint-config-react/recommended', plugins: { react: {} }, rules: {} }
      ]`
    )

    await handleInspect(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic inspection:')
    expect(output).toContain('Config source: config-file')
    expect(output).toContain('Frameworks: react')
    logSpy.mockRestore()
  })

  test('should print inspect data as JSON', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleInspect(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      detected?: { preset?: string }
      packageManager?: string
    }

    expect(payload.detected?.preset).toBe('basic')
    expect(payload.packageManager).toBe('npm')
    logSpy.mockRestore()
  })

  test('should expose detected Tailwind entry points in inspect JSON', async () => {
    const cwd = createTempProject({
      dependencies: { tailwindcss: '4.0.0' },
      name: 'tailwind-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    mkdirSync(join(cwd, 'src', 'styles'), { recursive: true })
    writeFileSync(
      join(cwd, 'src', 'styles', 'global.css'),
      '@import "tailwindcss";\n.semantic-card { display: block; }\n'
    )

    await handleInspect(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      tailwindEntryPoints?: {
        componentClasses: number
        entryPoint: null | string
        path: string
        unknownClassPolicy: string
      }[]
    }

    expect(payload.tailwindEntryPoints).toEqual([{
      componentClasses: 1,
      entryPoint: 'src/styles/global.css',
      path: '.',
      unknownClassPolicy: 'strict-with-css-components'
    }])
    logSpy.mockRestore()
  })

  test('should report doctor warnings for v1 imports and unscoped workspaces', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: {
        lint: 'eslint .'
      },
      type: 'module',
      workspaces: ['packages/*']
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    mkdirSync(join(cwd, 'packages', 'app'), { recursive: true })
    writeFileSync(join(cwd, 'packages', 'app', 'package.json'), JSON.stringify({ name: 'app' }))
    const fileContent = 'import react from \'@santi020k/eslint-config-react\'\nexport default []'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic doctor: passed with warnings')
    expect(output).toContain('Config still imports v1 framework packages')
    expect(output).toContain('Workspace packages were detected')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should recognize auto-detected workspace project scoping', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: {
        lint: 'eslint .'
      },
      type: 'module',
      workspaces: ['packages/*']
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    mkdirSync(join(cwd, 'packages', 'app'), { recursive: true })
    writeFileSync(join(cwd, 'packages', 'app', 'package.json'), JSON.stringify({ name: 'app' }))
    writeFileSync(
      join(cwd, 'eslint.config.js'),
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'\nexport default defineConfig()\n'
    )

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).not.toContain(
      'Workspace packages were detected, but the root config does not use `projects` scoping.'
    )
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test.each([
    'export { default } from \'@santi020k/eslint-config-basic/recommended\'\n',
    'export { default } from \'@santi020k/eslint-config-full/recommended\'\n'
  ])('should recognize recommended re-exports as auto-scoped configs', async configSource => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: {
        lint: 'eslint .'
      },
      type: 'module',
      workspaces: ['packages/*']
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    mkdirSync(join(cwd, 'packages', 'app'), { recursive: true })
    writeFileSync(join(cwd, 'packages', 'app', 'package.json'), JSON.stringify({ name: 'app' }))
    writeFileSync(join(cwd, 'eslint.config.js'), configSource)

    await handleDoctor(cwd)

    expect(logSpy.mock.calls.flat().join('\n')).not.toContain(
      'Workspace packages were detected, but the root config does not use `projects` scoping.'
    )
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should print doctor data as JSON', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      status?: string
      warnings?: string[]
    }

    expect(payload.status).toBe('passed with warnings')
    expect(payload.warnings?.some(warning => warning.includes('No eslint.config'))).toBe(true)
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should explain the safe Tailwind fallback when no entry point exists', async () => {
    const cwd = createTempProject({
      dependencies: { tailwindcss: '4.0.0' },
      name: 'tailwind-project',
      scripts: { lint: 'eslint .' }
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      warnings?: string[]
    }

    expect(payload.warnings).toContainEqual(expect.stringContaining(
      '`better-tailwindcss/no-unknown-classes` falls back to off'
    ))
    expect(payload.warnings).toContainEqual(expect.stringContaining('tailwind.entryPoint'))
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should name declaration-only packages and explain their syntax fallback', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      workspaces: ['packages/*']
    })
    const declarationsRoot = join(cwd, 'packages', 'theme-contract')

    mkdirSync(declarationsRoot, { recursive: true })
    writeFileSync(join(declarationsRoot, 'package.json'), JSON.stringify({ name: '@example/theme-contract' }))
    writeFileSync(join(declarationsRoot, 'index.d.mts'), 'export declare const theme: string\n')
    writeFileSync(join(cwd, 'eslint.config.js'), 'export default [{ name: \'eslint-config-typescript/recommended\' }]\n')
    writeFakePackage(cwd, 'typescript', '6.0.0')
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      projects: { path: string, typescript: { mode: string, tsconfig: null | string } }[]
      warnings?: string[]
    }
    const warning = payload.warnings?.find(message => message.includes('@example/theme-contract'))
    const declarationProject = payload.projects.find(project => project.path === 'packages/theme-contract')

    expect(declarationProject?.typescript).toEqual({
      detected: true,
      enabled: true,
      installed: true,
      mode: 'syntax',
      package: 'typescript',
      tsconfig: null
    })
    expect(warning).toContain('packages/theme-contract')
    expect(warning).toContain('tsconfig.json')
    expect(warning).toContain('typescript.untypedFiles')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should report per-project activation details in JSON and verbose output', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      workspaces: ['packages/*']
    })
    const projectRoot = join(cwd, 'packages', 'site')

    mkdirSync(join(projectRoot, 'src', 'styles'), { recursive: true })
    writeFileSync(join(projectRoot, 'package.json'), JSON.stringify({
      dependencies: { astro: '7.0.0', tailwindcss: '4.0.0' },
      name: 'site'
    }))
    writeFileSync(join(projectRoot, 'README.md'), '# Site\n')
    writeFileSync(join(projectRoot, 'src', 'styles', 'global.css'), '@import "tailwindcss";\n')
    writeFileSync(join(projectRoot, 'tsconfig.json'), '{}\n')
    writeFileSync(join(cwd, 'eslint.config.js'), `export default [
      { name: 'eslint-config/best-practices', rules: {} },
      { name: 'eslint-config-astro/recommended', ignores: ['dist/**'], rules: {} },
      { name: 'integrations/markdown', rules: {} },
      { name: 'santi020k/tailwind/recommended', rules: {} },
      { name: 'eslint-config-typescript/recommended', rules: {} }
    ]`)
    writeFakePackage(cwd, '@santi020k/eslint-config-astro', '3.2.0', {
      exports: { import: './index.js' }
    })
    writeFakePackage(cwd, '@santi020k/eslint-config-extensions', '3.2.0')
    writeFakePackage(cwd, '@santi020k/eslint-config-formats', '3.2.0')
    writeFakePackage(cwd, '@santi020k/eslint-config-libraries', '3.2.0')
    writeFakePackage(cwd, '@santi020k/eslint-config-react', '3.2.0')
    writeFakePackage(cwd, 'typescript', '6.0.0')
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      projects: {
        extensions: { detected: boolean, enabled: boolean, installed: boolean, name: string }[]
        formats: { detected: boolean, enabled: boolean, installed: boolean, name: string }[]
        frameworks: { detected: boolean, enabled: boolean, installed: boolean, name: string }[]
        ignores: string[]
        inactivePackages: { package: string, reason: string }[]
        libraries: { detected: boolean, enabled: boolean, installed: boolean, name: string }[]
        path: string
        tailwind: {
          componentClasses: number
          entryPoint: null | string
          exceptionGuidance?: string
          unknownClassPolicy: string
        }
        typescript: { mode: string, tsconfig: null | string }
      }[]
    }
    const root = getProjectByPath(payload.projects, '.')
    const site = getProjectByPath(payload.projects, 'packages/site')

    expect(payload.projects).toContainEqual(expect.objectContaining({
      path: '.',
      tailwind: {
        componentClasses: 0,
        entryPoint: null,
        detected: false,
        unknownClassPolicy: 'off'
      }
    }))
    expect(root.extensions).toContainEqual({
      detected: false,
      enabled: true,
      installed: true,
      name: 'Best Practices',
      package: '@santi020k/eslint-config-extensions'
    })
    expect(root.inactivePackages.map(item => item.package))
      .not.toContain('@santi020k/eslint-config-extensions')

    expect(site.frameworks).toContainEqual(expect.objectContaining({
      detected: true,
      enabled: true,
      installed: true,
      name: 'astro'
    }))
    expect(site.formats).toContainEqual(expect.objectContaining({
      detected: true,
      enabled: true,
      installed: true,
      name: 'markdown'
    }))
    expect(site.libraries).toContainEqual(expect.objectContaining({
      detected: true,
      enabled: true,
      installed: true,
      name: 'tailwind'
    }))
    expect(site.tailwind).toEqual({
      componentClasses: 0,
      entryPoint: 'src/styles/global.css',
      detected: true,
      exceptionGuidance: 'Keep unknown-class exceptions project-scoped with anchored `tailwind.ignore` patterns; ' +
        'use a JSX comment for a one-line MDX directive.',
      unknownClassPolicy: 'strict'
    })
    expect(site.typescript).toEqual(expect.objectContaining({
      mode: 'type-aware',
      tsconfig: 'tsconfig.json'
    }))
    expect(site.ignores).toContain('dist/**')
    expect(site.inactivePackages.map(item => `${item.package}: ${item.reason}`).join('\n'))
      .toContain('@santi020k/eslint-config-react: Installed, but no matching framework signal')

    logSpy.mockClear()
    runCli(['node', 'basic-eslint', 'doctor', '--verbose'], cwd)
    await vi.waitFor(() => {
      expect(logSpy).toHaveBeenCalled()
    })

    const verboseOutput = logSpy.mock.calls.flat().join('\n')

    expect(verboseOutput).toContain('Per-project activation (I=installed, D=detected, E=enabled):')
    expect(verboseOutput).toContain(
      'packages/site | browser | type-aware:tsconfig.json[IDE] | src/styles/global.css'
    )
    expect(verboseOutput).toContain('astro[IDE]')
    expect(verboseOutput).toContain('tailwind[IDE]')
    expect(verboseOutput).toContain('@santi020k/eslint-config-react: Installed, but no matching framework signal')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should compute active features from each project scoped config', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      workspaces: ['packages/*']
    })

    for (const projectName of ['enabled', 'disabled']) {
      const projectRoot = join(cwd, 'packages', projectName)

      mkdirSync(projectRoot, { recursive: true })
      writeFileSync(join(projectRoot, 'package.json'), JSON.stringify({
        devDependencies: { vitest: '4.0.0' },
        name: projectName
      }))
      writeFileSync(join(projectRoot, 'tsconfig.json'), '{}\n')
    }

    writeFileSync(join(cwd, 'eslint.config.js'), `export default [
      {
        files: ['packages/enabled/**/*'],
        name: 'eslint-config-typescript/recommended',
        rules: {}
      },
      {
        files: ['packages/enabled/**/*'],
        name: 'integrations/vitest',
        rules: {}
      }
    ]`)
    writeFakePackage(cwd, '@santi020k/eslint-config-testing', '3.2.0')
    writeFakePackage(cwd, 'typescript', '6.0.0')
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      projects: {
        path: string
        testing: { enabled: boolean, name: string }[]
        typescript: { enabled: boolean, mode: string, reason?: string }
      }[]
    }
    const enabled = getProjectByPath(payload.projects, 'packages/enabled')
    const disabled = getProjectByPath(payload.projects, 'packages/disabled')

    expect(enabled.typescript).toEqual(expect.objectContaining({ enabled: true, mode: 'type-aware' }))
    expect(enabled.testing).toContainEqual(expect.objectContaining({ enabled: true, name: 'vitest' }))
    expect(disabled.typescript).toEqual(expect.objectContaining({
      enabled: false,
      mode: 'off',
      reason: 'Detected and installed, but the active config did not enable TypeScript.'
    }))
    expect(disabled.testing).toContainEqual(expect.objectContaining({ enabled: false, name: 'vitest' }))
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should recognize an npm-aliased TypeScript package in workspace activation details', async () => {
    const cwd = createTempProject({
      devDependencies: {
        typescript: 'npm:@typescript/typescript6@6.0.0-dev.20260801'
      },
      name: 'tmp-project',
      type: 'module',
      workspaces: ['packages/*']
    })
    const projectRoot = join(cwd, 'packages', 'aliased-typescript')

    mkdirSync(projectRoot, { recursive: true })
    writeFileSync(join(projectRoot, 'package.json'), JSON.stringify({ name: 'aliased-typescript' }))
    writeFileSync(join(projectRoot, 'tsconfig.json'), '{}\n')
    writeFileSync(join(cwd, 'eslint.config.js'), `export default [
      { name: 'eslint-config-typescript/recommended', rules: {} }
    ]`)
    writeFakePackage(cwd, 'typescript', '6.0.0-dev.20260801', {
      name: '@typescript/typescript6'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls.at(-1)?.[0])) as {
      projects: { path: string, typescript: { installed: boolean, reason?: string } }[]
    }
    const project = payload.projects.find(candidate => candidate.path === 'packages/aliased-typescript')

    expect(project?.typescript.installed).toBe(true)
    expect(project?.typescript.reason).toBeUndefined()
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should warn when lite config packages are not declared', async () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      devDependencies: {
        '@santi020k/eslint-config-lite': '1.0.0',
        vitest: 'latest'
      },
      name: 'tmp-project',
      scripts: {
        lint: 'eslint .'
      },
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const fileContent = 'import { defineConfig } from \'@santi020k/eslint-config-lite\'\nexport default await defineConfig()'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('@santi020k/eslint-config-react')
    expect(output).toContain('@santi020k/eslint-config-integrations')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should diagnose Astro Doctor enabled without Astro', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: { lint: 'eslint .' },
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    writeFileSync(join(cwd, 'eslint.config.js'), 'export default [{ name: "eslint-config-integrations/astro-doctor", rules: {} }]')
    writeFakePackage(cwd, '@santi020k/eslint-config-integrations', '1.1.0')

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Astro Doctor is enabled without Astro')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should suggest Astro Doctor for detected Astro projects', async () => {
    const cwd = createTempProject({
      dependencies: { astro: '7.0.0' },
      name: 'tmp-project',
      scripts: { lint: 'eslint .' },
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    writeFileSync(join(cwd, 'eslint.config.js'), 'export default []')

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Astro was detected without Astro Doctor')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should report incompatible Astro Doctor Node and ESLint versions', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: { lint: 'eslint .' },
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    writeFileSync(join(cwd, 'eslint.config.js'), `export default [
        { name: 'eslint-config-astro/recommended', rules: {} },
        { name: 'eslint-config-integrations/astro-doctor', rules: {} }
      ]`)
    writeFakePackage(cwd, 'eslint', '10.8.0')
    writeFakePackage(cwd, '@santi020k/eslint-plugin-astro-doctor', '1.0.4', {
      engines: { node: '>=99' },
      peerDependencies: { eslint: '10.7.0' }
    })

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('requires Node >=99')
    expect(output).toContain('requires ESLint 10.7.0')
    expect(output).toContain('resolves 10.8.0')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should resolve an enabled Astro Doctor plugin from a sibling workspace', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: { lint: 'eslint .' },
      type: 'module',
      workspaces: ['packages/*']
    })
    const pluginDir = join(cwd, 'packages', 'astro-doctor')
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    mkdirSync(pluginDir, { recursive: true })
    writeFileSync(join(pluginDir, 'package.json'), JSON.stringify({
      engines: { node: '>=22' },
      name: '@santi020k/eslint-plugin-astro-doctor',
      peerDependencies: { eslint: '^10.0.0' },
      version: '1.0.4'
    }))
    writeFileSync(join(cwd, 'eslint.config.js'), `export default [
      { name: 'eslint-config-astro/recommended', rules: {} },
      { name: 'eslint-config-integrations/astro-doctor', rules: {} }
    ]`)
    writeFakePackage(cwd, 'eslint', '10.8.0')

    await handleDoctor(cwd)

    expect(logSpy.mock.calls.flat().join('\n')).not.toContain(
      'Astro Doctor is enabled, but @santi020k/eslint-plugin-astro-doctor could not be resolved.'
    )
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should print the lite install command from detected features', async () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      devDependencies: {
        vitest: 'latest'
      },
      name: 'tmp-project',
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd, false, true)

    const output = String(logSpy.mock.calls[0]?.[0])

    expect(output).toContain('npm install -D')
    expect(output).toContain('@santi020k/eslint-config-lite')
    expect(output).toContain('@santi020k/eslint-config-react')
    expect(output).toContain('@santi020k/eslint-config-integrations')
    logSpy.mockRestore()
  })

  test('should warn when lite config uses Preset.All', async () => {
    const cwd = createTempProject({
      devDependencies: {
        '@santi020k/eslint-config-integrations': '1.0.0',
        '@santi020k/eslint-config-lite': '1.0.0'
      },
      name: 'tmp-project',
      scripts: {
        lint: 'eslint .'
      },
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const fileContent = 'import { defineConfig, Preset } from \'@santi020k/eslint-config-lite\'\n' +
      'export default await defineConfig({ preset: Preset.All })'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Lite config uses Preset.All')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test('should fail doctor when the config file cannot be loaded', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: {
        lint: 'eslint .'
      },
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const fileContent = 'import missingConfig from \'missing-eslint-config-package\'\nexport default [missingConfig]'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic doctor: failed')
    expect(output).toContain('could not be loaded')
    logSpy.mockRestore()
    process.exitCode = undefined
  })

  test.each(['ts', 'mts', 'cts'])('should analyze eslint.config.%s files', async extension => {
    const cwd = createTempProject({ name: 'tmp-project', type: 'module' })

    writeFileSync(join(cwd, `eslint.config.${extension}`), `
      export default [{ name: 'eslint-config-basic/typescript', rules: {} }]
    `)

    const result = await analyzeEslintConfig(cwd)

    expect(result?.configFile).toBe(join(cwd, `eslint.config.${extension}`))
    expect(result?.source).toBe('config-file')
  })
})

// ── Helpers ────────────────────────────────────────────────────────────────────

const makeFeatures = (
  overrides: Partial<EslintConfigFeatures> = {}
): EslintConfigFeatures => ({
  configFile: null,
  extensions: [],
  formats: [],
  frameworks: [],
  ignores: [],
  libraries: [],
  lintCommand: 'npm run lint',
  source: 'detection-fallback',
  testing: [],
  tools: [],
  typescript: false,
  ...overrides
})

describe('generateSkillContent', () => {
  test('should include TypeScript conventions when typescript is enabled', () => {
    const content = generateSkillContent(makeFeatures({ typescript: true }), 'plain')

    expect(content).toContain('TypeScript')
    expect(content).toContain('import type')
  })

  test('should include React hints when React is in frameworks', () => {
    const content = generateSkillContent(makeFeatures({ frameworks: ['React'] }), 'plain')

    expect(content).toContain('React')
    expect(content).toContain('Hooks')
  })

  test('should include Next.js hints when Next.js is in frameworks', () => {
    const content = generateSkillContent(
      makeFeatures({ frameworks: ['React', 'Next.js'] }), 'plain'
    )

    expect(content).toContain('Next.js')
    expect(content).toContain('next/image')
  })

  test('should include Vue hints when Vue is in frameworks', () => {
    const content = generateSkillContent(makeFeatures({ frameworks: ['Vue'] }), 'plain')

    expect(content).toContain('Vue')
    expect(content).toContain('Composition API')
  })

  test('should include Prettier hint when Prettier is in tools', () => {
    const content = generateSkillContent(makeFeatures({ tools: ['Prettier'] }), 'plain')

    expect(content).toContain('Prettier')
    expect(content).toContain('last')
  })

  test('should produce frontmatter format with trigger: always_on', () => {
    const content = generateSkillContent(makeFeatures(), 'frontmatter')

    expect(content).toMatch(/^---/)
    expect(content).toContain('trigger: always_on')
    expect(content).toContain('name: eslint-standards')
  })

  test('should produce cursor format with globs and alwaysApply', () => {
    const content = generateSkillContent(makeFeatures(), 'cursor')

    expect(content).toMatch(/^---/)
    expect(content).toContain('alwaysApply: true')
    expect(content).toContain('globs:')
  })

  test('should produce plain format without frontmatter', () => {
    const content = generateSkillContent(makeFeatures(), 'plain')

    expect(content).not.toMatch(/^---/)
    expect(content).toContain('# ESLint Code Standards')
  })

  test('should include the lint command in the verification section', () => {
    const content = generateSkillContent(
      makeFeatures({ lintCommand: 'pnpm run lint' }), 'plain'
    )

    expect(content).toContain('pnpm run lint')
  })
})

describe('generateAgentSkills', () => {
  test('should return empty arrays when no agent folders are present', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(0)
    expect(result.skipped).toHaveLength(0)
  })

  test('should write a skill file when .agent folder exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.agent'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(1)
    expect(result.written[0]).toContain('.agent')
    expect(result.written[0]).toContain('SKILL.md')

    const content = readFileSync(result.written[0], 'utf8')

    expect(content).toContain('trigger: always_on')
    expect(content).toContain('ESLint Code Standards')
  })

  test('should write a .mdc file when .cursor folder exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.cursor'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(1)
    expect(result.written[0]).toContain('eslint-standards.mdc')

    const content = readFileSync(result.written[0], 'utf8')

    expect(content).toContain('alwaysApply: true')
  })

  test('should write a plain md file when .claude folder exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.claude'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(1)
    expect(result.written[0]).toContain('eslint.md')

    const content = readFileSync(result.written[0], 'utf8')

    expect(content).not.toMatch(/^---/)
  })

  test('should write to multiple agent folders when several are present', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.agent'))
    mkdirSync(join(cwd, '.cursor'))
    mkdirSync(join(cwd, '.windsurf'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(3)
  })

  test('should generate files for every configured AGENT_TARGET marker folder', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    for (const target of AGENT_TARGETS) {
      mkdirSync(join(cwd, target.markerFolder), { recursive: true })
    }

    const result = await generateAgentSkills({ cwd })

    for (const target of AGENT_TARGETS) {
      const expectedPath = target.skillSubdir === '.' ?
        join(cwd, target.markerFolder, target.skillFile) :
        join(cwd, target.markerFolder, target.skillSubdir, target.skillFile)

      expect(result.written).toContain(expectedPath)
    }
  })

  test('should skip existing files when force is false', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const skillsDir = join(cwd, '.agent', 'skills', 'eslint-standards')

    mkdirSync(skillsDir, { recursive: true })
    writeFileSync(join(skillsDir, 'SKILL.md'), '# existing')

    const result = await generateAgentSkills({ cwd, force: false })

    expect(result.written).toHaveLength(0)
    expect(result.skipped).toHaveLength(1)
    expect(readFileSync(join(skillsDir, 'SKILL.md'), 'utf8')).toBe('# existing')
  })

  test('should overwrite existing files when force is true', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const skillsDir = join(cwd, '.agent', 'skills', 'eslint-standards')

    mkdirSync(skillsDir, { recursive: true })
    writeFileSync(join(skillsDir, 'SKILL.md'), '# existing')

    const result = await generateAgentSkills({ cwd, force: true })

    expect(result.written).toHaveLength(1)
    expect(readFileSync(result.written[0], 'utf8')).not.toBe('# existing')
  })

  test('should append to .github/copilot-instructions.md when it exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const githubDir = join(cwd, '.github')

    mkdirSync(githubDir)
    writeFileSync(join(githubDir, 'copilot-instructions.md'), '# Existing instructions\n')

    const result = await generateAgentSkills({ cwd })

    expect(result.written.some(f => f.includes('copilot-instructions.md'))).toBe(true)

    const content = readFileSync(join(githubDir, 'copilot-instructions.md'), 'utf8')

    expect(content).toContain('# Existing instructions')
    expect(content).toContain('eslint-standards:start')
    expect(content).toContain('ESLint Code Standards')
  })

  test('should update the copilot-instructions section when force is true and section exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const githubDir = join(cwd, '.github')

    mkdirSync(githubDir)
    writeFileSync(
      join(githubDir, 'copilot-instructions.md'), '# Existing\n\n<!-- eslint-standards:start -->\nold content\n<!-- eslint-standards:end -->\n'
    )

    const result = await generateAgentSkills({ cwd, force: true })

    expect(result.written.some(f => f.includes('copilot-instructions.md'))).toBe(true)

    const content = readFileSync(join(githubDir, 'copilot-instructions.md'), 'utf8')

    expect(content).not.toContain('old content')
    expect(content).toContain('ESLint Code Standards')
  })

  test('should append a guarded section to AGENTS.md when it exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFileSync(join(cwd, 'AGENTS.md'), '# Agent guide\n')

    const result = await generateAgentSkills({ cwd })

    expect(result.written.some(f => f.endsWith('AGENTS.md'))).toBe(true)

    const content = readFileSync(join(cwd, 'AGENTS.md'), 'utf8')

    expect(content).toContain('# Agent guide')
    expect(content).toContain('eslint-standards:start')
    expect(content).toContain('ESLint Code Standards')
  })

  test('should skip AGENTS.md section when it already exists and force is false', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFileSync(
      join(cwd, 'AGENTS.md'), '# Agent guide\n\n<!-- eslint-standards:start -->\nold content\n<!-- eslint-standards:end -->\n'
    )

    const result = await generateAgentSkills({ cwd })

    expect(result.skipped.some(f => f.endsWith('AGENTS.md'))).toBe(true)

    const content = readFileSync(join(cwd, 'AGENTS.md'), 'utf8')

    expect(content).toContain('old content')
  })

  test('should update the AGENTS.md section when force is true and section exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFileSync(
      join(cwd, 'AGENTS.md'), '# Agent guide\n\n<!-- eslint-standards:start -->\nold content\n<!-- eslint-standards:end -->\n'
    )

    const result = await generateAgentSkills({ cwd, force: true })

    expect(result.written.some(f => f.endsWith('AGENTS.md'))).toBe(true)

    const content = readFileSync(join(cwd, 'AGENTS.md'), 'utf8')

    expect(content).not.toContain('old content')
    expect(content).toContain('ESLint Code Standards')
  })

  test('should use display labels when falling back to package.json detection', async () => {
    const cwd = createTempProject({
      devDependencies: {
        tailwindcss: '4.0.0',
        vitest: '4.0.0'
      },
      name: 'tmp-project'
    })

    mkdirSync(join(cwd, '.agent'))

    const result = await generateAgentSkills({ cwd })
    const content = readFileSync(result.written[0], 'utf8')

    expect(content).toContain('Tailwind CSS')
    expect(content).toContain('Vitest')
    expect(content).not.toContain('tailwind,')
  })

  test('should read features from a local eslint.config.js when present', async () => {
    const cwd = createTempProject({ name: 'tmp-project', type: 'module' })

    // Minimal flat config that includes a TypeScript entry name
    writeFileSync(
      join(cwd, 'eslint.config.js'), `export default [
        { name: 'eslint-config-typescript/setup', rules: {} },
        { name: 'eslint-config-react/recommended', plugins: { react: {} }, rules: {} }
      ]`
    )
    mkdirSync(join(cwd, '.agent'))

    const result = await generateAgentSkills({ cwd })
    const content = readFileSync(result.written[0], 'utf8')

    // Features read from the actual config file should appear in the skill
    expect(content).toContain('TypeScript')
    expect(content).toContain('React')
  })

  test('AGENT_TARGETS should cover the standard known agents', () => {
    const markerFolders = AGENT_TARGETS.map(t => t.markerFolder)

    expect(markerFolders).toContain('.agent')
    expect(markerFolders).toContain('.cursor')
    expect(markerFolders).toContain('.windsurf')
    expect(markerFolders).toContain('.claude')
  })

  test('should cover all AGENT_TARGET marker folders in tests', () => {
    const markerFolders = AGENT_TARGETS.map(target => target.markerFolder)

    expect(markerFolders).toContain('.agent')
    expect(markerFolders).toContain('.cursor')
    expect(markerFolders).toContain('.windsurf')
    expect(markerFolders).toContain('.claude')
    expect(markerFolders).toContain('.copilot')
    expect(markerFolders).toContain('.aider')
    expect(markerFolders).toContain('.agents')
    expect(markerFolders).toContain('.gemini')
    expect(markerFolders).toContain('.clinerules')
    expect(markerFolders).toContain('.roo')
    expect(markerFolders).toContain('.kiro')
  })

  test('should run the generate-skill CLI handler end to end', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      scripts: { lint: 'eslint .' }
    })

    mkdirSync(join(cwd, '.cursor'))
    writeFileSync(join(cwd, 'AGENTS.md'), '# My agents\n')

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleGenerateSkill(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Generated 2 skill file(s)!')

    const cursorSkill = readFileSync(join(cwd, '.cursor', 'rules', 'eslint-standards.mdc'), 'utf8')

    expect(cursorSkill).toContain('ESLint Code Standards')
    expect(readFileSync(join(cwd, 'AGENTS.md'), 'utf8')).toContain('eslint-standards:start')

    logSpy.mockRestore()
  })

  test('should warn via the CLI handler when no agent folders or AGENTS.md exist', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleGenerateSkill(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('No agent folders found')

    logSpy.mockRestore()
  })

  test('should report stale and up-to-date files in check mode without writing', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.cursor'))

    // First check: file missing → stale, nothing written
    const checkResult = await generateAgentSkills({ check: true, cwd })

    expect(checkResult.written).toHaveLength(0)
    expect(checkResult.stale.some(f => f.includes('.cursor'))).toBe(true)
    expect(existsSync(join(cwd, '.cursor', 'rules', 'eslint-standards.mdc'))).toBe(false)

    // Generate, then check again: up to date
    await generateAgentSkills({ cwd })

    const recheck = await generateAgentSkills({ check: true, cwd })

    expect(recheck.stale).toHaveLength(0)
    expect(recheck.skipped.some(f => f.includes('.cursor'))).toBe(true)
  })

  test('should flag an outdated guarded AGENTS.md section in check mode', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFileSync(
      join(cwd, 'AGENTS.md'), '# Guide\n\n<!-- eslint-standards:start -->\nold content\n<!-- eslint-standards:end -->\n'
    )

    const result = await generateAgentSkills({ check: true, cwd })

    expect(result.stale.some(f => f.endsWith('AGENTS.md'))).toBe(true)
    // Check mode must not modify the file
    expect(readFileSync(join(cwd, 'AGENTS.md'), 'utf8')).toContain('old content')
  })

  test('should create AGENTS.md when createAgentsMd is enabled and the file is missing', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    const result = await generateAgentSkills({ createAgentsMd: true, cwd })

    expect(result.written.some(f => f.endsWith('AGENTS.md'))).toBe(true)

    const content = readFileSync(join(cwd, 'AGENTS.md'), 'utf8')

    expect(content).toContain('# Agent instructions')
    expect(content).toContain('eslint-standards:start')
    expect(content).toContain('ESLint Code Standards')
  })

  test('should not create AGENTS.md in check mode even with createAgentsMd enabled', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    const result = await generateAgentSkills({ check: true, createAgentsMd: true, cwd })

    expect(result.written).toHaveLength(0)
    expect(existsSync(join(cwd, 'AGENTS.md'))).toBe(false)
  })

  test('should set a non-zero exit code from the CLI handler in check mode when stale', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.cursor'))

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const previousExitCode = process.exitCode

    await handleGenerateSkill(cwd, false, { check: true })

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Stale or missing')
    expect(process.exitCode).toBe(1)

    process.exitCode = previousExitCode
    logSpy.mockRestore()
  })

  test('should generate a Kiro steering file with always-on inclusion front-matter', () => {
    const kiroTarget = AGENT_TARGETS.find(target => target.markerFolder === '.kiro')

    expect(kiroTarget).toBeDefined()
    expect(kiroTarget?.format).toBe('kiro')
    expect(kiroTarget?.skillSubdir).toBe('steering')

    const content = generateSkillContent(makeFeatures(), 'kiro')

    expect(content.startsWith('---\ninclusion: always\n---')).toBe(true)
  })
})

describe('findDuplicateEslint', () => {
  test('should return null when eslint cannot be resolved', () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    expect(findDuplicateEslint(cwd)).toBeNull()
  })

  test('should return null when project and config resolve the same eslint copy', () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFakePackage(cwd, 'eslint', '10.2.1')
    writeFakePackage(cwd, '@santi020k/eslint-config-core', '2.0.0')

    expect(findDuplicateEslint(cwd)).toBeNull()
  })

  test('should detect two different eslint versions between project and config', () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFakePackage(cwd, 'eslint', '9.39.0')
    writeFakePackage(cwd, '@santi020k/eslint-config-core', '2.0.0')
    // Nested copy that the config package resolves first
    writeFakePackage(join(cwd, 'node_modules', '@santi020k', 'eslint-config-core'), 'eslint', '10.2.1')

    const duplicate = findDuplicateEslint(cwd)

    expect(duplicate).not.toBeNull()
    expect(duplicate?.projectVersion).toBe('9.39.0')
    expect(duplicate?.configVersion).toBe('10.2.1')
  })

  test('should surface the duplicate as a doctor warning', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    writeFakePackage(cwd, 'eslint', '9.39.0')
    writeFakePackage(cwd, '@santi020k/eslint-config-core', '2.0.0')
    writeFakePackage(join(cwd, 'node_modules', '@santi020k', 'eslint-config-core'), 'eslint', '10.2.1')

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Two ESLint copies are installed')
    expect(output).toContain('9.39.0')
    expect(output).toContain('10.2.1')

    logSpy.mockRestore()
  })
})
