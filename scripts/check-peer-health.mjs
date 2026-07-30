/* eslint-disable complexity -- peer reports intentionally normalize every pnpm issue category */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const readJson = path => JSON.parse(readFileSync(path, 'utf8'))

const dependencyNames = manifest => Object.keys({
  ...(manifest.dependencies ?? {}),
  ...(manifest.devDependencies ?? {}),
  ...(manifest.optionalDependencies ?? {})
})

const ownerForIntroducer = packageName => {
  const prefix = '@santi020k/eslint-config-'

  return packageName.startsWith(prefix) ? `packages/${packageName.slice(prefix.length)}` : null
}

const findDirectIntroducer = (cwd, manifest, parentName) => {
  const direct = dependencyNames(manifest)

  if (direct.includes(parentName)) return parentName

  for (const packageName of direct.filter(name => name.startsWith('@santi020k/eslint-config-'))) {
    const packageManifestPath = join(cwd, 'node_modules', packageName, 'package.json')

    if (!existsSync(packageManifestPath)) continue

    const packageManifest = readJson(packageManifestPath)

    if (dependencyNames(packageManifest).includes(parentName)) return packageName
  }

  return parentName
}

export const createPeerHealthReport = (cwd, rawReport, policy) => {
  const manifest = readJson(join(cwd, 'package.json'))
  const issues = []

  for (const [project, result] of Object.entries(rawReport)) {
    for (const [peer, occurrences] of Object.entries(result.bad ?? {})) {
      for (const occurrence of occurrences) {
        const parent = occurrence.parents?.[0]?.name ?? 'unknown'
        const introducedBy = findDirectIntroducer(cwd, manifest, parent)

        issues.push({
          foundVersion: occurrence.foundVersion ?? null,
          introducedBy,
          kind: 'incompatible',
          peer,
          project,
          wantedRange: occurrence.wantedRange ?? null
        })
      }
    }

    for (const [peer, occurrences] of Object.entries(result.missing ?? {})) {
      for (const occurrence of occurrences) {
        const parent = occurrence.parents?.[0]?.name ?? 'unknown'

        issues.push({
          foundVersion: null,
          introducedBy: findDirectIntroducer(cwd, manifest, parent),
          kind: 'missing',
          peer,
          project,
          wantedRange: occurrence.wantedRange ?? null
        })
      }
    }

    for (const conflict of result.conflicts ?? []) {
      issues.push({
        foundVersion: null,
        introducedBy: conflict.parents?.[0]?.name ?? 'unknown',
        kind: 'conflict',
        peer: conflict.name ?? 'unknown',
        project,
        wantedRange: conflict.ranges?.join(' & ') ?? null
      })
    }
  }

  const accepted = []
  const actionable = []

  for (const issue of issues) {
    const exception = policy.accepted.find(entry => (
      entry.kind === issue.kind &&
      entry.peer === issue.peer &&
      entry.introducedBy === issue.introducedBy &&
      entry.wantedRange === issue.wantedRange &&
      (entry.owner === issue.project || (
        issue.project === '.' && entry.owner === ownerForIntroducer(issue.introducedBy)
      ))
    ))

    if (exception) accepted.push({ ...issue, owner: exception.owner, removalCondition: exception.removalCondition })
    else actionable.push(issue)
  }

  return { accepted, actionable, healthy: actionable.length === 0, issues }
}

export const checkPeerHealth = (cwd, policyPath) => {
  let output

  try {
    output = execFileSync('pnpm', ['peers', 'check', '--json'], {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe'
    })
  } catch (error) {
    output = `${error.stdout ?? ''}`

    if (!output.trim().startsWith('{')) throw error
  }

  const report = createPeerHealthReport(cwd, JSON.parse(output), readJson(policyPath))

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)

  if (!report.healthy) {
    throw new Error(
      `Peer-health check found ${report.actionable.length} unaccepted issue(s). ` +
      'Fix them or add a narrowly scoped exception with an owner and removal condition.'
    )
  }

  return report
}

if (process.argv[1] && process.argv[1].endsWith('check-peer-health.mjs')) {
  const cwd = process.argv[2] ?? process.cwd()
  const policyPath = process.argv[3] ?? join(process.cwd(), 'scripts', 'peer-health-policy.json')

  checkPeerHealth(cwd, policyPath)
}
