import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'

const rootDir = process.cwd()
const tempDir = mkdtempSync(join(tmpdir(), 'eslint-config-clean-install-'))
const ignoredDirectories = new Set(['.git', '.pnpm-store', 'dist', 'node_modules'])

const copyManifestTree = (sourceDir) => {
  for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue

    const sourcePath = join(sourceDir, entry.name)

    if (entry.isDirectory()) {
      copyManifestTree(sourcePath)

      continue
    }

    if (entry.name !== 'package.json') continue

    const destinationPath = join(tempDir, relative(rootDir, sourcePath))

    mkdirSync(dirname(destinationPath), { recursive: true })
    cpSync(sourcePath, destinationPath)
  }
}

try {
  for (const fileName of ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml']) {
    cpSync(join(rootDir, fileName), join(tempDir, fileName))
  }

  if (existsSync(join(rootDir, '.npmrc'))) {
    cpSync(join(rootDir, '.npmrc'), join(tempDir, '.npmrc'))
  }

  copyManifestTree(join(rootDir, 'apps'))
  copyManifestTree(join(rootDir, 'packages'))

  try {
    execFileSync('pnpm', ['install', '--frozen-lockfile', '--ignore-scripts', '--prefer-offline'], {
      cwd: tempDir,
      stdio: 'pipe'
    })
  } catch (error) {
    if (error.stdout) process.stderr.write(error.stdout)
    if (error.stderr) process.stderr.write(error.stderr)

    throw error
  }

  const cleanRequire = createRequire(join(tempDir, 'package.json'))
  const eslintEntry = cleanRequire.resolve('eslint')

  await import(pathToFileURL(eslintEntry).href)

  const eslintRequire = createRequire(eslintEntry)
  const minimatchManifestPath = eslintRequire.resolve('minimatch/package.json')
  const minimatchRequire = createRequire(minimatchManifestPath)
  const braceManifestPath = minimatchRequire.resolve('brace-expansion/package.json')
  const minimatchVersion = JSON.parse(readFileSync(minimatchManifestPath, 'utf8')).version
  const braceVersion = JSON.parse(readFileSync(braceManifestPath, 'utf8')).version
  const minimatchMajor = Number.parseInt(minimatchVersion, 10)
  const braceMajor = Number.parseInt(braceVersion, 10)
  const expectedBraceMajor = minimatchMajor >= 10 ? 5 : minimatchMajor >= 9 ? 2 : 1

  if (braceMajor !== expectedBraceMajor) {
    throw new Error(
      `Clean install linked minimatch@${minimatchVersion} to incompatible brace-expansion@${braceVersion}. ` +
      `Expected brace-expansion major ${expectedBraceMajor}.`
    )
  }

  process.stdout.write(
    `Clean install verified: ESLint imports and minimatch@${minimatchVersion} resolves brace-expansion@${braceVersion}.\n`
  )
} finally {
  rmSync(tempDir, { force: true, recursive: true })
}
