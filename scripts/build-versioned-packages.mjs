/* eslint-disable turbo/no-undeclared-env-vars -- release refs configure this CI orchestration script */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const rootDir = process.cwd()
const base = process.env.RELEASE_BASE_SHA
const head = process.env.RELEASE_HEAD_SHA || 'HEAD'

if (!base) {
  throw new Error('Set RELEASE_BASE_SHA to the release pull request base commit.')
}

const changedFiles = execFileSync(
  'git',
  ['diff', '--name-only', '--diff-filter=ACMR', `${base}...${head}`],
  { cwd: rootDir, encoding: 'utf8' }
).trim().split('\n').filter(Boolean)

const packageNames = changedFiles
  .map(file => file.match(/^packages\/([^/]+)\/package\.json$/)?.[1])
  .filter(Boolean)
  .map(packageDir => join(rootDir, 'packages', packageDir, 'package.json'))
  .filter(existsSync)
  .map(manifestPath => JSON.parse(readFileSync(manifestPath, 'utf8')))
  .filter(manifest => manifest.private !== true)
  .map(manifest => manifest.name)
  .filter(Boolean)

if (packageNames.length === 0) {
  throw new Error(`No versioned public package manifests found in ${base}...${head}.`)
}

process.stdout.write(
  `Building ${packageNames.length} versioned package(s) and their build dependencies:\n` +
  `${packageNames.sort().join('\n')}\n`
)

execFileSync(
  'pnpm',
  [
    'exec',
    'turbo',
    'run',
    'build',
    'check:exports',
    ...packageNames.flatMap(packageName => ['--filter', packageName]),
    '--concurrency=50%'
  ],
  { cwd: rootDir, stdio: 'inherit' }
)
