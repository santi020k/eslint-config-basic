import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { EslintConfigFeatures } from '../../basic/src/agent-skill-generator.js'
import {
  AGENT_TARGETS,
  generateAgentSkills,
  generateSkillContent
} from '../../basic/src/agent-skill-generator.js'
import { handleDocs, handleExplain, handleInit, handleMigrate, handleUpdate, runCli } from '../../basic/src/cli.js'

const tempDirs: string[] = []

const createTempProject = (packageJson: Record<string, unknown>): string => {
  const cwd = mkdtempSync(resolve(tmpdir(), 'eslint-config-basic-cli-'))

  tempDirs.push(cwd)
  writeFileSync(join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2))

  return cwd
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

describe('CLI scaffolding', () => {
  it('should default to eslint.config.mjs for non-ESM projects', () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    handleInit(cwd)

    expect(readFileSync(join(cwd, 'eslint.config.mjs'), 'utf8')).toContain(
      'import { eslintConfig } from \'@santi020k/eslint-config-basic\''
    )
  })

  it('should keep eslint.config.js for ESM projects and include React for Next.js', () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      dependencies: {
        next: '15.0.0'
      }
    })

    handleInit(cwd)

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).not.toContain('@santi020k/eslint-config-next')
    expect(config).not.toContain('@santi020k/eslint-config-react')
    expect(config).toContain('next: true')
    expect(config).toContain('react: true')
  })

  it('should update an existing config file in place', () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      dependencies: {
        react: '19.0.0'
      }
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
  it('should print help text for --help', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    runCli(['node', 'basic-eslint', '--help'])

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls.flat().join('\n')).toContain('Usage: basic-eslint <command> [options]')
    logSpy.mockRestore()
  })

  it('should print version for --version', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    runCli(['node', 'basic-eslint', '--version'])

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy.mock.calls[0]?.[0]).toMatch(/\d+\.\d+\.\d+|unknown/)
    logSpy.mockRestore()
  })

  it('should set non-zero exit code for unknown command', () => {
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

  it('should explain detected project settings', () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      dependencies: {
        react: '19.0.0'
      },
      devDependencies: {
        vitest: 'latest'
      }
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleExplain(cwd)

    const output = logSpy.mock.calls.flat().join('\n')

    expect(output).toContain('ESLint Basic detected configuration:')
    expect(output).toContain('Frameworks: react')
    expect(output).toContain('Testing: vitest')
    logSpy.mockRestore()
  })

  it('should generate human-readable ESLint standards docs', () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      dependencies: {
        next: '15.0.0'
      }
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    handleDocs(cwd)

    const content = readFileSync(join(cwd, 'ESLINT_STANDARDS.md'), 'utf8')

    expect(content).toContain('# ESLint Standards')
    expect(content).toContain('Frameworks: next, react')
    expect(logSpy).toHaveBeenCalledWith('✅ Generated ESLINT_STANDARDS.md')
    logSpy.mockRestore()
  })

  it('should report migration suggestions', () => {
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
})

// ── Helpers ────────────────────────────────────────────────────────────────────

const makeFeatures = (
  overrides: Partial<EslintConfigFeatures> = {}
): EslintConfigFeatures => ({
  typescript: false,
  frameworks: [],
  testing: [],
  tools: [],
  libraries: [],
  formats: [],
  extensions: [],
  lintCommand: 'npm run lint',
  configFile: null,
  source: 'detection-fallback',
  ...overrides
})

describe('generateSkillContent', () => {
  it('should include TypeScript conventions when typescript is enabled', () => {
    const content = generateSkillContent(makeFeatures({ typescript: true }), 'plain')

    expect(content).toContain('TypeScript')
    expect(content).toContain('import type')
  })

  it('should include React hints when React is in frameworks', () => {
    const content = generateSkillContent(makeFeatures({ frameworks: ['React'] }), 'plain')

    expect(content).toContain('React')
    expect(content).toContain('Hooks')
  })

  it('should include Next.js hints when Next.js is in frameworks', () => {
    const content = generateSkillContent(
      makeFeatures({ frameworks: ['React', 'Next.js'] }), 'plain'
    )

    expect(content).toContain('Next.js')
    expect(content).toContain('next/image')
  })

  it('should include Vue hints when Vue is in frameworks', () => {
    const content = generateSkillContent(makeFeatures({ frameworks: ['Vue'] }), 'plain')

    expect(content).toContain('Vue')
    expect(content).toContain('Composition API')
  })

  it('should include Prettier hint when Prettier is in tools', () => {
    const content = generateSkillContent(makeFeatures({ tools: ['Prettier'] }), 'plain')

    expect(content).toContain('Prettier')
    expect(content).toContain('last')
  })

  it('should produce frontmatter format with trigger: always_on', () => {
    const content = generateSkillContent(makeFeatures(), 'frontmatter')

    expect(content).toMatch(/^---/)
    expect(content).toContain('trigger: always_on')
    expect(content).toContain('name: eslint-standards')
  })

  it('should produce cursor format with globs and alwaysApply', () => {
    const content = generateSkillContent(makeFeatures(), 'cursor')

    expect(content).toMatch(/^---/)
    expect(content).toContain('alwaysApply: true')
    expect(content).toContain('globs:')
  })

  it('should produce plain format without frontmatter', () => {
    const content = generateSkillContent(makeFeatures(), 'plain')

    expect(content).not.toMatch(/^---/)
    expect(content).toContain('# ESLint Code Standards')
  })

  it('should include the lint command in the verification section', () => {
    const content = generateSkillContent(
      makeFeatures({ lintCommand: 'pnpm run lint' }), 'plain'
    )

    expect(content).toContain('pnpm run lint')
  })
})

describe('generateAgentSkills', () => {
  it('should return empty arrays when no agent folders are present', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(0)
    expect(result.skipped).toHaveLength(0)
  })

  it('should write a skill file when .agent folder exists', async () => {
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

  it('should write a .mdc file when .cursor folder exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.cursor'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(1)
    expect(result.written[0]).toContain('eslint-standards.mdc')

    const content = readFileSync(result.written[0], 'utf8')

    expect(content).toContain('alwaysApply: true')
  })

  it('should write a plain md file when .claude folder exists', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.claude'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(1)
    expect(result.written[0]).toContain('eslint.md')

    const content = readFileSync(result.written[0], 'utf8')

    expect(content).not.toMatch(/^---/)
  })

  it('should write to multiple agent folders when several are present', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    mkdirSync(join(cwd, '.agent'))
    mkdirSync(join(cwd, '.cursor'))
    mkdirSync(join(cwd, '.windsurf'))

    const result = await generateAgentSkills({ cwd })

    expect(result.written).toHaveLength(3)
  })

  it('should generate files for every configured AGENT_TARGET marker folder', async () => {
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

  it('should skip existing files when force is false', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const skillsDir = join(cwd, '.agent', 'skills')

    mkdirSync(skillsDir, { recursive: true })
    writeFileSync(join(skillsDir, 'eslint-standards.md'), '# existing')

    const result = await generateAgentSkills({ cwd, force: false })

    expect(result.written).toHaveLength(0)
    expect(result.skipped).toHaveLength(1)
    expect(readFileSync(join(skillsDir, 'eslint-standards.md'), 'utf8')).toBe('# existing')
  })

  it('should overwrite existing files when force is true', async () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const skillsDir = join(cwd, '.agent', 'skills')

    mkdirSync(skillsDir, { recursive: true })
    writeFileSync(join(skillsDir, 'eslint-standards.md'), '# existing')

    const result = await generateAgentSkills({ cwd, force: true })

    expect(result.written).toHaveLength(1)
    expect(readFileSync(result.written[0], 'utf8')).not.toBe('# existing')
  })

  it('should append to .github/copilot-instructions.md when it exists', async () => {
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

  it('should update the copilot-instructions section when force is true and section exists', async () => {
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

  it('should use display labels when falling back to package.json detection', async () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      devDependencies: {
        tailwindcss: '4.0.0',
        vitest: '4.0.0'
      }
    })

    mkdirSync(join(cwd, '.agent'))

    const result = await generateAgentSkills({ cwd })
    const content = readFileSync(result.written[0], 'utf8')

    expect(content).toContain('Tailwind CSS')
    expect(content).toContain('Vitest')
    expect(content).not.toContain('tailwind,')
  })

  it('should read features from a local eslint.config.js when present', async () => {
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

  it('AGENT_TARGETS should cover the standard known agents', () => {
    const markerFolders = AGENT_TARGETS.map(t => t.markerFolder)

    expect(markerFolders).toContain('.agent')
    expect(markerFolders).toContain('.cursor')
    expect(markerFolders).toContain('.windsurf')
    expect(markerFolders).toContain('.claude')
  })

  it('should cover all AGENT_TARGET marker folders in tests', () => {
    const markerFolders = AGENT_TARGETS.map(target => target.markerFolder)

    expect(markerFolders).toContain('.agent')
    expect(markerFolders).toContain('.cursor')
    expect(markerFolders).toContain('.windsurf')
    expect(markerFolders).toContain('.claude')
    expect(markerFolders).toContain('.copilot')
    expect(markerFolders).toContain('.aider')
    expect(markerFolders).toContain('.agents')
  })
})
