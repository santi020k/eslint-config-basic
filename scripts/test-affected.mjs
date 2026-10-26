import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

import { readChangedFiles } from './affected-changes.mjs'

const globalInputs = new Set([
  '.npmrc',
  'eslint.config.js',
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'tsconfig.base.json',
  'turbo.json'
])

const isUnknownInput = (file, rootDir) =>
  (file.startsWith('packages/') && !existsSync(join(rootDir, 'packages', file.split('/')[1], 'package.json')))
  || (!file.startsWith('packages/') && !file.startsWith('apps/') && !/^\.changeset\/[^/]+\.md$/u.test(file) && !file.endsWith('.md'))

const isGlobalInput = file => globalInputs.has(file)
  || ['vendor/', 'patches/', 'scripts/'].some(prefix => file.startsWith(prefix))
  || file.endsWith('/package.json')
  || (file.startsWith('packages/tests/') && !file.endsWith('.test.ts'))

const dependencyFields = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies'
]

const collectDependents = workspacePackages => {
  const workspacePackageNames = new Set(workspacePackages.map(({ manifest }) => manifest.name))
  const dependentsByPackage = new Map()

  for (const { manifest } of workspacePackages) {
    for (const field of dependencyFields) {
      for (const dependencyName of Object.keys(manifest[field] ?? {})) {
        if (!workspacePackageNames.has(dependencyName)) continue

        const dependents = dependentsByPackage.get(dependencyName) ?? new Set()

        dependents.add(manifest.name)

        dependentsByPackage.set(dependencyName, dependents)
      }
    }
  }

  return dependentsByPackage
}

export const selectAffectedTests = (rootDir, comparison) => {
  const testsDir = join(rootDir, 'packages/tests/src')
  const changedFiles = comparison ?? []
  const requiresFullSuite = comparison === null || changedFiles.some(file => isGlobalInput(file) || isUnknownInput(file, rootDir))

  const testFiles = readdirSync(testsDir)
    .filter(fileName => fileName.endsWith('.test.ts'))
    .map(fileName => join(testsDir, fileName))

  const workspacePackages = readdirSync(join(rootDir, 'packages'), { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      directory: entry.name,
      manifestPath: join(rootDir, 'packages', entry.name, 'package.json')
    }))
    .filter(({ manifestPath }) => existsSync(manifestPath))
    .map(({ directory, manifestPath }) => ({
      directory,
      manifest: JSON.parse(readFileSync(manifestPath, 'utf8'))
    }))
    .filter(({ manifest }) => manifest.name)

  const workspacePackagesByName = new Map(
    workspacePackages.map(workspacePackage => [workspacePackage.manifest.name, workspacePackage])
  )

  const dependentsByPackage = collectDependents(workspacePackages)
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

    const affectedPackageNames = new Set(changedPackageNames)
    const pendingPackageNames = [...changedPackageNames]

    while (pendingPackageNames.length > 0) {
      const packageName = pendingPackageNames.pop()

      for (const dependentName of dependentsByPackage.get(packageName) ?? []) {
        if (affectedPackageNames.has(dependentName)) continue

        affectedPackageNames.add(dependentName)

        pendingPackageNames.push(dependentName)
      }
    }

    const affectedPackages = [...affectedPackageNames]
      .map(packageName => workspacePackagesByName.get(packageName))
      .filter(Boolean)

    const hasAffectedPublicPackage = affectedPackages.some(
      ({ manifest }) => manifest.private !== true
    )

    const alwaysRun = new Set([
      'contracts.test.ts',
      'integration.test.ts',
      'invariants.test.ts'
    ])

    if (hasAffectedPublicPackage) alwaysRun.add('package-artifacts.test.ts')

    const directlyChangedTests = new Set(
      changedFiles
        .filter(file => file.startsWith('packages/tests/src/') && file.endsWith('.test.ts'))
        .map(file => basename(file))
    )

    selected = testFiles.filter(testFile => {
      const fileName = basename(testFile)

      if (alwaysRun.has(fileName) || directlyChangedTests.has(fileName)) return true

      const source = readFileSync(testFile, 'utf8')

      return affectedPackages.some(({ directory, manifest }) => (
        source.includes(manifest.name) || source.includes(`packages/${directory}/`)
      ))
    })
  }

  return { requiresFullSuite, relativeTests: selected.map(testFile => relative(rootDir, testFile)) }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const rootDir = process.cwd()

  const comparison = readChangedFiles({
    base: process.env.CI_BASE_SHA || process.env.TURBO_SCM_BASE,
    head: process.env.CI_HEAD_SHA || process.env.TURBO_SCM_HEAD || 'HEAD'
  })

  const { requiresFullSuite, relativeTests } = selectAffectedTests(rootDir, comparison)

  process.stdout.write(
    `${requiresFullSuite ? 'Full' : 'Affected'} test selection (${relativeTests.length} files):\n` +
    `${relativeTests.join('\n')}\n`
  )

  if (relativeTests.length > 0) execFileSync('pnpm', [
    '--filter', '@santi020k/eslint-config-tests', 'exec', 'vitest', 'run', ...relativeTests
  ], { cwd: rootDir, stdio: 'inherit' })
}
