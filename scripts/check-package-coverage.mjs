import { readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

const coverage = JSON.parse(
  readFileSync(join(rootDir, 'packages', 'tests', 'coverage', 'coverage-final.json'), 'utf8')
)

const policy = JSON.parse(readFileSync(join(rootDir, 'scripts', 'coverage-policy.json'), 'utf8'))
const percentage = (covered, total) => total === 0 ? 100 : covered / total * 100

const summarize = files => {
  const counters = {
    branches: [],
    functions: [],
    lines: new Map(),
    statements: []
  }

  for (const file of files) {
    counters.statements.push(...Object.values(file.s))

    counters.functions.push(...Object.values(file.f))

    counters.branches.push(...Object.values(file.b).flat())

    for (const [statementId, count] of Object.entries(file.s)) {
      const line = file.statementMap[statementId].start.line
      const lineKey = `${file.path}:${line}`

      counters.lines.set(lineKey, Math.max(counters.lines.get(lineKey) ?? 0, count))
    }
  }

  return Object.fromEntries(
    Object.entries(counters).map(([metric, values]) => {
      const counts = values instanceof Map ? [...values.values()] : values

      return [metric, percentage(counts.filter(count => count > 0).length, counts.length)]
    })
  )
}

const failures = []
const rows = []

for (const [packageDir, thresholds] of Object.entries(policy)) {
  const packagePrefix = `packages/${packageDir}/src/`

  const files = Object.values(coverage).filter(file => (
    relative(rootDir, file.path).replaceAll('\\', '/').startsWith(packagePrefix)
  ))

  if (files.length === 0) {
    failures.push(`${packageDir}: no coverage data found.`)

    continue
  }

  const summary = summarize(files)

  rows.push({ package: packageDir, ...summary })

  for (const [metric, minimum] of Object.entries(thresholds)) {
    if (summary[metric] < minimum) {
      failures.push(`${packageDir} ${metric} coverage is ${summary[metric].toFixed(2)}%; minimum is ${minimum}%.`)
    }
  }
}

console.table(rows.map(row => Object.fromEntries(
  Object.entries(row).map(([key, value]) => [key, typeof value === 'number' ? `${value.toFixed(2)}%` : value])
)))

if (failures.length > 0) {
  throw new Error(`Package coverage policy failed:\n${failures.join('\n')}`)
}
