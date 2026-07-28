import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { afterEach, describe, expect, test } from 'vitest'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../..')
const repoRequire = createRequire(join(repoRoot, 'package.json'))
const eslintEntry = pathToFileURL(repoRequire.resolve('eslint')).href
const tempDirs: string[] = []

const createConsumerProject = (files: Record<string, string>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'eslint-config-basic-consumer-'))

  tempDirs.push(cwd)
  mkdirSync(join(cwd, 'src'), { recursive: true })
  writeFileSync(join(cwd, 'package.json'), JSON.stringify({
    name: 'consumer-project',
    private: true,
    type: 'module'
  }, null, 2))

  for (const [filePath, content] of Object.entries(files)) {
    const absolutePath = join(cwd, filePath)

    mkdirSync(dirname(absolutePath), { recursive: true })
    writeFileSync(absolutePath, content)
  }

  return cwd
}

const writeConsumerConfig = (cwd: string, options: string): void => {
  const packageEntry = pathToFileURL(join(repoRoot, 'packages/basic/dist/index.js')).href

  if (!existsSync(join(repoRoot, 'packages/basic/dist/index.js'))) {
    throw new Error('Missing packages/basic/dist/index.js. Run `pnpm run build` before consumer e2e tests.')
  }

  writeFileSync(join(cwd, 'eslint.config.mjs'), [
    `import { defineConfig } from '${packageEntry}'`,
    '',
    `export default await defineConfig(${options})`,
    ''
  ].join('\n'))
}

interface LintResult { errorCount: number, ruleIds: string[], warningCount: number }
const runExternalLint = (cwd: string, files: string[]): LintResult => {
  const script = `
    import eslintModule from ${JSON.stringify(eslintEntry)}

    const { ESLint } = eslintModule

    const eslint = new ESLint({
      cwd: ${JSON.stringify(cwd)},
      overrideConfigFile: ${JSON.stringify(join(cwd, 'eslint.config.mjs'))}
    })
    const results = await eslint.lintFiles(${JSON.stringify(files)})
    const payload = {
      errorCount: results.reduce((sum, result) => sum + result.errorCount, 0),
      ruleIds: results.flatMap(result => result.messages.map(message => message.ruleId).filter(Boolean)),
      warningCount: results.reduce((sum, result) => sum + result.warningCount, 0)
    }

    console.log(JSON.stringify(payload))
  `

  const env = { ...process.env }
  delete env.VITEST

  const output = execFileSync(process.execPath, ['--input-type=module', '--eval', script], {
    cwd,
    encoding: 'utf8',
    env
  })

  return JSON.parse(output) as { errorCount: number, ruleIds: string[], warningCount: number }
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('external consumer e2e', () => {
  test('anchors a direct zero-argument defineConfig call to the config file', async () => {
    const cwd = createConsumerProject({
      '.gitignore': 'ignored.ts\n',
      'src/index.ts': 'const value: string = \'hello\'\nconsole.log(value)\n',
      'tsconfig.json': JSON.stringify({
        compilerOptions: { strict: true },
        include: ['src']
      })
    })

    writeConsumerConfig(cwd, '')

    const config = await import(`${pathToFileURL(join(cwd, 'eslint.config.mjs')).href}?test=${Date.now()}`) as {
      default: { languageOptions?: { parserOptions?: { tsconfigRootDir?: string } }, name?: string }[]
    }
    const tsconfigRoot = config.default.find(
      entry => entry.name === 'eslint-config-basic/tsconfig-root-dir'
    )?.languageOptions?.parserOptions?.tsconfigRootDir

    expect(tsconfigRoot).toBe(cwd)
    expect(config.default.some(entry => entry.name === 'eslint-config/gitignore')).toBe(true)
    expect(config.default.some(entry => entry.name === 'eslint-config-typescript/standard-rules')).toBe(true)
  })

  test('loads the zero-config entry from a one-line config file', () => {
    const cwd = createConsumerProject({
      'src/index.js': 'const unused = 1\n'
    })
    const recommendedEntry = pathToFileURL(
      join(repoRoot, 'packages/basic/dist/recommended.js')
    ).href

    writeFileSync(
      join(cwd, 'eslint.config.mjs'), `export { default } from ${JSON.stringify(recommendedEntry)}\n`
    )

    const result = runExternalLint(cwd, ['src/index.js'])

    expect(result.errorCount).toBeGreaterThan(0)
    expect(result.ruleIds).toContain('no-unused-vars')
  })

  test('loads the built package from an external JavaScript project and reports core rules', () => {
    const cwd = createConsumerProject({
      'src/index.js': 'const unused = 1\n'
    })

    writeConsumerConfig(cwd, `{
      detection: false,
      tools: []
    }`)

    const result = runExternalLint(cwd, ['src/index.js'])

    expect(result.errorCount).toBeGreaterThan(0)
    expect(result.ruleIds).toContain('no-unused-vars')
  })

  test('loads TypeScript syntax mode from an external project', () => {
    const cwd = createConsumerProject({
      'src/index.ts': 'const value = \'hello\'\nconsole.log(value)\n'
    })

    writeFileSync(join(cwd, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        jsx: 'react-jsx',
        strict: true
      },
      include: ['src']
    }, null, 2))
    writeConsumerConfig(cwd, `{
      detection: false,
      tools: [],
      typescript: 'syntax'
    }`)

    const result = runExternalLint(cwd, ['src/index.ts'])

    expect(result.errorCount).toBe(0)
  })

  test('loads bundled React config from an external TSX project', () => {
    const cwd = createConsumerProject({
      'src/Button.tsx': [
        'export const Button = ({ label }) => (',
        '  <button type="button">{label}</button>',
        ')',
        ''
      ].join('\n')
    })

    writeConsumerConfig(cwd, `{
      detection: false,
      frameworks: { react: true },
      tools: [],
      typescript: false
    }`)

    const result = runExternalLint(cwd, ['src/Button.tsx'])

    expect(result.errorCount).toBe(0)
  })
})
