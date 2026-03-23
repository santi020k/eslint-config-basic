import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

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
