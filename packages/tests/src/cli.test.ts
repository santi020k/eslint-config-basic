import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import { afterEach, describe, expect, test, vi } from 'vitest'

import type { EslintConfigFeatures } from '../../basic/src/agent-skill-generator.js'
import {
  AGENT_TARGETS,
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
  handleMigrate,
  handleUpdate,
  runCli
} from '../../basic/src/cli.js'

const tempDirs: string[] = []

const createTempProject = (packageJson: Record<string, unknown>): string => {
  const cwd = mkdtempSync(resolve(tmpdir(), 'eslint-config-basic-cli-'))

  tempDirs.push(cwd)
  writeFileSync(join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2))

  return cwd
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

    expect(readFileSync(join(cwd, 'eslint.config.mjs'), 'utf8')).toContain(
      'import { eslintConfig } from \'@santi020k/eslint-config-basic\''
    )
  })

  test('should keep eslint.config.js for ESM projects and include React for Next.js', () => {
    const cwd = createTempProject({
      dependencies: {
        next: '15.0.0'
      },
      name: 'tmp-project',
      type: 'module'
    })

    handleInit(cwd)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).not.toContain('@santi020k/eslint-config-next')
    expect(config).not.toContain('@santi020k/eslint-config-react')
    expect(config).toContain('next: true')
    expect(config).toContain('react: true')
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
    expect(config).not.toContain('@santi020k/eslint-config-react')
    expect(config).toContain('react: true')
  })
})

describe('CLI command UX', () => {
  test('should print help text for --help', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    runCli(['node', 'basic-eslint', '--help'])

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls.flat().join('\n')).toContain('Usage: basic-eslint <command> [options]')
    logSpy.mockRestore()
  })

  test('should print version for --version', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    runCli(['node', 'basic-eslint', '--version'])

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls[0]?.[0]).toMatch(/\d+\.\d+\.\d+|unknown/)
    logSpy.mockRestore()
  })

  test('should set non-zero exit code for unknown command', () => {
    process.exitCode = undefined
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    runCli(['node', 'basic-eslint', 'unknown-command'])

    expect(errorSpy).toHaveBeenCalledWith('Unknown command: unknown-command')
    expect(process.exitCode).toBe(1)
    errorSpy.mockRestore()
    logSpy.mockRestore()
    process.exitCode = undefined
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleExplain(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic detected configuration:')
    expect(output).toContain('Frameworks: react')
    expect(output).toContain('Testing: vitest')
    logSpy.mockRestore()
  })

  test('should print detected project settings as JSON', () => {
    const cwd = createTempProject({
      dependencies: {
        react: '19.0.0'
      },
      name: 'tmp-project'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleDocs(cwd)

    const content = readFileSync(join(cwd, 'ESLINT_STANDARDS.md'), 'utf8')

    expect(content).toContain('# ESLint Standards')
    expect(content).toContain('Frameworks: next, react')
    expect(logSpy).toHaveBeenCalledWith('✅ Generated ESLINT_STANDARDS.md')
    logSpy.mockRestore()
  })

  test('should report migration suggestions', () => {
    const cwd = createTempProject({ name: 'tmp-project', type: 'module' })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const fileContent = 'import next from \'@santi020k/eslint-config-next\'\n' +
      'import react from \'@santi020k/eslint-config-react\'\n' +
      'export default [...next, ...react]\n'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    handleMigrate(cwd, true)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')
    const output = logSpy.mock.calls.flat().join('\n')

    expect(config).toContain('eslintConfig')
    expect(config).toContain('next: true')
    expect(config).toContain('react: true')
    expect(config).not.toContain('@santi020k/eslint-config-next')
    expect(output).toContain('Rewrote eslint.config.js')
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleInspect(cwd, true)

    const payload = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as {
      detected?: { preset?: string }
      packageManager?: string
    }

    expect(payload.detected?.preset).toBe('basic')
    expect(payload.packageManager).toBe('npm')
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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

  test('should print doctor data as JSON', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module'
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const fileContent = 'import { defineConfig } from \'@santi020k/eslint-config-lite\'\nexport default await defineConfig()'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('@santi020k/eslint-config-react')
    expect(output).toContain('@santi020k/eslint-config-integrations')
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const fileContent = 'import missingConfig from \'missing-eslint-config-package\'\nexport default [missingConfig]'
    writeFileSync(join(cwd, 'eslint.config.js'), fileContent)

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic doctor: failed')
    expect(output).toContain('could not be loaded')
    logSpy.mockRestore()
    process.exitCode = undefined
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
    expect(result.written[0]).toContain('eslint-standards.md')

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
    const skillsDir = join(cwd, '.agent', 'skills')

    mkdirSync(skillsDir, { recursive: true })
    writeFileSync(join(skillsDir, 'eslint-standards.md'), '# existing')

    const result = await generateAgentSkills({ cwd, force: false })

    expect(result.written).toHaveLength(0)
    expect(result.skipped).toHaveLength(1)
    expect(readFileSync(join(skillsDir, 'eslint-standards.md'), 'utf8')).toBe('# existing')
  })

  test('should overwrite existing files when force is true', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const skillsDir = join(cwd, '.agent', 'skills')

    mkdirSync(skillsDir, { recursive: true })
    writeFileSync(join(skillsDir, 'eslint-standards.md'), '# existing')

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

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

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

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
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

const writeFakePackage = (root: string, name: string, version: string): void => {
  const packageDir = join(root, 'node_modules', ...name.split('/'))

  mkdirSync(packageDir, { recursive: true })
  writeFileSync(join(packageDir, 'package.json'), JSON.stringify({ main: 'index.js', name, version }))
  writeFileSync(join(packageDir, 'index.js'), 'module.exports = {}')
}

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

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await handleDoctor(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('Two ESLint copies are installed')
    expect(output).toContain('9.39.0')
    expect(output).toContain('10.2.1')

    logSpy.mockRestore()
  })
})
