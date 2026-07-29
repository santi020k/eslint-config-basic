/* eslint-disable turbo/no-undeclared-env-vars -- Git comparison refs configure this CI orchestration script */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import process from 'node:process'

const rootDir = process.cwd()
const testsDir = join(rootDir, 'packages/tests/src')
const base = process.env.CI_BASE_SHA || process.env.TURBO_SCM_BASE
const head = process.env.CI_HEAD_SHA || process.env.TURBO_SCM_HEAD || 'HEAD'

if (!base) {
  throw new Error('Set CI_BASE_SHA or TURBO_SCM_BASE before running affected tests.')
}

const changedFiles = execFileSync(
  'git',
  ['diff', '--name-only', '--diff-filter=ACMR', `${base}...${head}`],
  { cwd: rootDir, encoding: 'utf8' }
).trim().split('\n').filter(Boolean)

const globalInputs = new Set([
  '.npmrc',
  'eslint.config.js',
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'tsconfig.base.json',
  'turbo.json'
])

const requiresFullSuite = changedFiles.some(file => (
  globalInputs.has(file) ||
  file.startsWith('patches/') ||
  file.startsWith('scripts/') ||
  (file.startsWith('packages/tests/') && !file.endsWith('.test.ts'))
))

const testFiles = readdirSync(testsDir)
  .filter(fileName => fileName.endsWith('.test.ts'))
  .map(fileName => join(testsDir, fileName))

let selected

if (requiresFullSuite) {
  selected = testFiles
} else {
  const changedPackageNames = new Set(
    changedFiles
      .map(file => file.match(/^packages\/([^/]+)\//)?.[1])
      .filter(Boolean)
      .map(packageDir => join(rootDir, 'packages', packageDir, 'package.json'))
      .filter(existsSync)
      .map(manifestPath => JSON.parse(readFileSync(manifestPath, 'utf8')).name)
      .filter(Boolean)
  )

  const alwaysRun = new Set([
    'contracts.test.ts',
    'integration.test.ts',
    'invariants.test.ts'
  ])

  const directlyChangedTests = new Set(
    changedFiles
      .filter(file => file.startsWith('packages/tests/src/') && file.endsWith('.test.ts'))
      .map(basename)
  )

  selected = testFiles.filter(testFile => {
    const fileName = basename(testFile)

    if (alwaysRun.has(fileName) || directlyChangedTests.has(fileName)) return true

    const source = readFileSync(testFile, 'utf8')

    return [...changedPackageNames].some(packageName => source.includes(packageName))
  })
}

if (selected.length === 0) {
  process.stdout.write('No package tests are affected by this change.\n')
} else {
  const relativeTests = selected.map(testFile => relative(rootDir, testFile))

  process.stdout.write(
    `${requiresFullSuite ? 'Full' : 'Affected'} test selection (${relativeTests.length} files):\n` +
    `${relativeTests.join('\n')}\n`
  )

  execFileSync(
    'pnpm',
    [
      '--filter',
      '@santi020k/eslint-config-tests',
      'exec',
      'vitest',
      'run',
      ...relativeTests,
      '--maxWorkers=1'
    ],
    { cwd: rootDir, stdio: 'inherit' }
  )
}
