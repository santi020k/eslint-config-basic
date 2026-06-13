import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const rootDir = process.cwd()
const packagesDir = join(rootDir, 'packages')

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`

  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`

  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`
}

const walk = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true })

  return entries.flatMap(entry => {
    const path = join(dir, entry.name)

    if (entry.isDirectory()) return walk(path)

    if (entry.isFile()) return [path]

    return []
  })
}

const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => join(packagesDir, entry.name))
  .filter(packageDir => {
    const manifestPath = join(packageDir, 'package.json')

    if (!existsSync(manifestPath)) return false

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

    return manifest.private !== true
  })

const rows = packages.map(packageDir => {
  const manifest = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'))
  const distDir = join(packageDir, 'dist')
  const files = existsSync(distDir) ? walk(distDir) : []
  const distBytes = files.reduce((total, file) => total + statSync(file).size, 0)
  const dependencyCount = Object.keys(manifest.dependencies ?? {}).length
  const peerCount = Object.keys(manifest.peerDependencies ?? {}).length

  return {
    dependencies: dependencyCount,
    dist: distBytes,
    files: files.length,
    name: manifest.name,
    path: relative(rootDir, packageDir),
    peers: peerCount
  }
})

if (rows.length === 0) {
  throw new Error('No publishable packages found.')
}

console.info('Package metrics are informational; this script does not enforce size budgets.')
console.table(rows.map(row => ({
  dependencies: row.dependencies,
  dist: formatBytes(row.dist),
  files: row.files,
  package: row.name,
  path: row.path,
  peers: row.peers
})))
