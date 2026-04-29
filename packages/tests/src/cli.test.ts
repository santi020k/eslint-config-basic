import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import type { EslintConfigFeatures } from '../../basic/src/agent-skill-generator.js'
import {
  AGENT_TARGETS,
  generateAgentSkills,
  generateSkillContent
} from '../../basic/src/agent-skill-generator.js'
import { handleInit, handleUpdate } from '../../basic/src/cli.js'

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

    expect(config).toContain('import next from \'@santi020k/eslint-config-next\'')
    expect(config).toContain('import react from \'@santi020k/eslint-config-react\'')
    expect(config).toContain('next: next')
    expect(config).toContain('react: react')
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
    expect(config).toContain('import react from \'@santi020k/eslint-config-react\'')
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
})
