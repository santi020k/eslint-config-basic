import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const rootDir = process.cwd()
const packagesDir = join(rootDir, 'packages')

const dependencyBudgets = new Map([
  ['@santi020k/eslint-config-basic', 4],
  ['@santi020k/eslint-config-core', 10],
  ['@santi020k/eslint-config-full', 21],
  ['@santi020k/eslint-config-integrations', 51],
  ['@santi020k/eslint-config-lite', 3]
])

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

  const optionalPeerCount = Object.values(manifest.peerDependenciesMeta ?? {})
    .filter(meta => meta.optional === true)
    .length

  return {
    dependencies: dependencyCount,
    dist: distBytes,
    files: files.length,
    name: manifest.name,
    optionalPeers: optionalPeerCount,
    path: relative(rootDir, packageDir),
    peers: peerCount
  }
})

if (rows.length === 0) {
  throw new Error('No publishable packages found.')
}

const tableRows = rows.map(row => ({
  dependencies: row.dependencies,
  dist: formatBytes(row.dist),
  files: row.files,
  optionalPeers: row.optionalPeers,
  package: row.name,
  path: row.path,
  peers: row.peers
}))

const headers = Object.keys(tableRows.at(0) ?? {})
const rowValues = tableRows.map(row => Object.values(row).map(v => String(v ?? '')))
const allValues = [headers, ...rowValues]
const colWidths = headers.map((h, col) => Math.max(...allValues.map(r => (r.at(col) ?? '').length)))
const fmtRow = (vals) => vals.map((v, col) => v.padEnd(colWidths.at(col) ?? 0)).join('  ')
const separator = colWidths.map(w => '-'.repeat(w)).join('  ')

process.stdout.write([fmtRow(headers), separator, ...rowValues.map(fmtRow)].join('\n') + '\n')

const budgetFailures = rows.flatMap(row => {
  const budget = dependencyBudgets.get(row.name)

  return budget !== undefined && row.dependencies > budget ?
    [`${row.name} has ${row.dependencies} direct dependencies; budget is ${budget}.`] :
    []
})

if (budgetFailures.length > 0) {
  throw new Error(`Package dependency budgets exceeded:\n${budgetFailures.join('\n')}`)
}
