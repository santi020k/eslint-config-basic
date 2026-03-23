import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'

const cliPath = resolve(
  dirname(fileURLToPath(import.meta.url)), '../../basic/dist/cli.js'
)

const tempDirs: string[] = []

const createTempProject = (packageJson: Record<string, unknown>): string => {
  const cwd = mkdtempSync(resolve(tmpdir(), 'eslint-config-basic-cli-'))

  tempDirs.push(cwd)
  writeFileSync(join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2))

  return cwd
}

const runCli = (cwd: string, ...args: string[]): string => execFileSync(
  process.execPath, [cliPath, ...args], { cwd, encoding: 'utf8' }
)

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

describe('CLI scaffolding', () => {
  it('should default to eslint.config.mjs for non-ESM projects', () => {
    const cwd = createTempProject({ name: 'tmp-project' })

    runCli(cwd, 'init')

    expect(readFileSync(join(cwd, 'eslint.config.mjs'), 'utf8')).toContain(
      'import { eslintConfig } from \'@santi020k/eslint-config-basic\''
    )
  }, 15000)

  it('should keep eslint.config.js for ESM projects and include React for Next.js', () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      dependencies: {
        next: '15.0.0'
      }
    })

    runCli(cwd, 'init')

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).toContain('import next from \'@santi020k/eslint-config-next\'')
    expect(config).toContain('import react from \'@santi020k/eslint-config-react\'')
    expect(config).toContain('next: next')
    expect(config).toContain('react: react')
  }, 15000)

  it('should update an existing config file in place', () => {
    const cwd = createTempProject({
      name: 'tmp-project',
      type: 'module',
      dependencies: {
        react: '19.0.0'
      }
    })

    writeFileSync(join(cwd, 'eslint.config.js'), '// old config')

    runCli(cwd, 'update')

    const config = readFileSync(join(cwd, 'eslint.config.js'), 'utf8')

    expect(config).not.toContain('// old config')
    expect(config).toContain('import react from \'@santi020k/eslint-config-react\'')
  }, 15000)

  it('should print the correct usage message', () => {
    const cwd = createTempProject({ name: 'tmp-project' })
    const output = runCli(cwd)

    expect(output.trim()).toBe('Usage: basic-eslint <init|update>')
  }, 15000)
})
