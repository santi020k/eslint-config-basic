// cspell:words Fenix
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { afterEach, describe, expect, test } from 'vitest'

import { consumerScenarios } from '../fixtures/consumers/scenarios.js'

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

const writeConsumerConfig = (cwd: string, options: string, useAwait = true): void => {
  const packageEntry = pathToFileURL(join(repoRoot, 'packages/basic/dist/index.js')).href

  if (!existsSync(join(repoRoot, 'packages/basic/dist/index.js'))) {
    throw new Error('Missing packages/basic/dist/index.js. Run `pnpm run build` before consumer e2e tests.')
  }

  writeFileSync(join(cwd, 'eslint.config.mjs'), [
    `import { defineConfig } from '${packageEntry}'`,
    '',
    `export default ${useAwait ? 'await ' : ''}defineConfig(${options})`,
    ''
  ].join('\n'))
}

interface LintResult {
  scopes: { hasReact: boolean, hasWorkerGlobals: boolean, testingLibraryImports?: unknown }[]
  ignoredMobile: boolean
  errorCount: number
  fatalCount: number
  ruleIds: string[]
  warningCount: number }
const runExternalLint = (cwd: string, files: string[]): LintResult => {
  const script = `
    import eslintModule from ${JSON.stringify(eslintEntry)}

    const { ESLint } = eslintModule

    const eslint = new ESLint({
      cwd: ${JSON.stringify(cwd)},
      overrideConfigFile: ${JSON.stringify(join(cwd, 'eslint.config.mjs'))}
    })
    const results = await eslint.lintFiles(${JSON.stringify(files)})
    const scopes = await Promise.all(${JSON.stringify(files)}.map(async file => {
      const config = await eslint.calculateConfigForFile(file)

      return {
        hasReact: Boolean(config?.plugins?.['@eslint-react']),
        hasWorkerGlobals: config?.languageOptions?.globals?.DurableObject === 'readonly',
        testingLibraryImports: config?.settings?.['testing-library/utils-module']
      }
    }))
    const payload = {
      scopes,
      ignoredMobile: await eslint.isPathIgnored('apps/mobile/src/App.tsx'),
      fatalCount: results.reduce((sum, result) => sum + result.fatalErrorCount, 0),
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

  return JSON.parse(output) as LintResult
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('external consumer e2e', () => {
  test('loads a direct defineConfig promise export without top-level await', () => {
    const cwd = createConsumerProject({
      'src/index.js': 'const unused = 1\n'
    })

    writeConsumerConfig(cwd, '', false)

    const result = runExternalLint(cwd, ['src/index.js'])

    expect(result.errorCount).toBeGreaterThan(0)
    expect(result.ruleIds).toContain('no-unused-vars')
  })

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

describe('real consumer layout regressions', () => {
  test.each(consumerScenarios)('$name loads and applies its scoped rules', scenario => {
    const cwd = createConsumerProject(scenario.files)

    writeConsumerConfig(cwd, JSON.stringify({ ...scenario.options, root: cwd }))

    const result = runExternalLint(cwd, scenario.lintTargets)

    expect(result.fatalCount).toBe(0)

    const scopes = result.scopes.map(scope => ({
      ...scope,
      testingLibraryImports: scope.testingLibraryImports
    }))

    const expectedScopes = scenario.expectedScopes.map(scope => ({
      ...scope,
      testingLibraryImports: scope.testingLibraryImports
    }))

    expect(scopes).toEqual(expectedScopes)
    expect(result.ignoredMobile).toBe(scenario.ignoredMobile)

    for (const rule of scenario.requiredRules) expect(result.ruleIds).toContain(rule)

    expect(scenario.requiredRules.length > 0 || result.errorCount === 0).toBe(true)
  })
})

describe('built Doctor consumer comparison', () => {
  test('reports installed Astro parser and rule evidence without rewriting overrides', () => {
    const cwd = createConsumerProject({
      'src/page.astro': '---\nconst label: string = \'hello\'\n---\n<h1>{label}</h1>\n'
    })

    mkdirSync(join(cwd, 'node_modules/@santi020k'), { recursive: true })
    symlinkSync(join(repoRoot, 'packages/basic'), join(cwd, 'node_modules/@santi020k/eslint-config-basic'))
    symlinkSync(join(repoRoot, 'packages/astro'), join(cwd, 'node_modules/@santi020k/eslint-config-astro'))
    symlinkSync(dirname(repoRequire.resolve('eslint/package.json')), join(cwd, 'node_modules/eslint'))
    writeFileSync(join(cwd, 'package.json'), JSON.stringify({
      devDependencies: {
        '@santi020k/eslint-config-astro': '^3.1.4',
        '@santi020k/eslint-config-basic': '^3.6.0',
        eslint: '^10.0.0'
      },
      name: 'doctor-consumer',
      type: 'module'
    }))
    const parserEntry = pathToFileURL(createRequire(join(repoRoot, 'packages/astro/package.json')).resolve('@typescript-eslint/parser')).href
    const configSource = [
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
      `import parser from ${JSON.stringify(parserEntry)}`,
      'export default defineConfig({ detection: false, frameworks: { astro: true }, typescript: \'syntax\' }, {',
      '  files: [\'**/*.astro\'],',
      '  languageOptions: { parserOptions: { parser } },',
      '  rules: { \'@stylistic/indent\': \'off\' }',
      '})',
      ''
    ].join('\n')
    const configPath = join(cwd, 'eslint.config.mjs')

    writeFileSync(configPath, configSource)
    const output = execFileSync(process.execPath, [join(repoRoot, 'packages/basic/dist/cli.js'), 'doctor', '--json'], {
      cwd,
      encoding: 'utf8'
    })
    const result = JSON.parse(output) as { warnings: string[] }

    expect(result.warnings.join(' ')).toContain('same parser for src/page.astro')
    expect(result.warnings.join(' ')).toContain('@stylistic/indent')
    expect(result.warnings.join(' ')).not.toContain('Could not compare consumer overrides')
    expect(readFileSync(configPath, 'utf8')).toBe(configSource)
  })
})
