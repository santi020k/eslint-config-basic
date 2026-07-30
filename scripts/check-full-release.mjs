import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const FULL_PACKAGE = '@santi020k/eslint-config-full'

export const parseChangesetPackages = content => {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(content)?.[1] ?? ''

  return [...frontmatter.matchAll(/^['"]?(@santi020k\/eslint-config-[a-z0-9-]+)['"]?\s*:/gm)]
    .map(match => match[1])
    .filter(Boolean)
}

export const createFullReleaseReport = (fullDependencies, changesets) => {
  const releasedPackages = new Set(
    changesets.flatMap(changeset => parseChangesetPackages(changeset))
  )

  const changedDependencies = fullDependencies
    .filter(packageName => releasedPackages.has(packageName))
    .sort()

  const fullReleaseRequired = changedDependencies.length > 0
  const fullReleasePresent = releasedPackages.has(FULL_PACKAGE)

  return {
    changedDependencies,
    fullReleasePresent,
    fullReleaseRequired,
    valid: !fullReleaseRequired || fullReleasePresent
  }
}

export const checkFullRelease = cwd => {
  const fullManifest = JSON.parse(
    readFileSync(join(cwd, 'packages/full/package.json'), 'utf8')
  )

  const fullDependencies = Object.keys(fullManifest.dependencies ?? {})
  const changesetDir = join(cwd, '.changeset')

  const changesets = readdirSync(changesetDir)
    .filter(fileName => fileName.endsWith('.md') && fileName !== 'README.md')
    .map(fileName => readFileSync(join(changesetDir, fileName), 'utf8'))

  const report = createFullReleaseReport(fullDependencies, changesets)

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)

  if (!report.valid) {
    throw new Error(
      `Full aggregates changed package(s): ${report.changedDependencies.join(', ')}. ` +
      `Add ${FULL_PACKAGE} to a changeset so batteries-included consumers receive the update.`
    )
  }

  return report
}

if (process.argv[1]?.endsWith('check-full-release.mjs')) {
  checkFullRelease(process.argv[2] ?? process.cwd())
}
