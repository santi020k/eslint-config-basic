import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const packagePrefix = '@santi020k/eslint-config-'
const readJson = path => JSON.parse(readFileSync(path, 'utf8'))

const parseMajor = version => {
  const match = /^(\d+)\./v.exec(version)

  return match ? Number(match[1]) : null
}

const readWorkspacePackages = (cwd) => {
  const packagesDir = join(cwd, 'packages')

  if (!existsSync(packagesDir)) return []

  return readdirSync(packagesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => join(packagesDir, entry.name, 'package.json'))
    .filter(existsSync)
    .map(manifestPath => ({
      manifest: readJson(manifestPath),
      path: relative(cwd, manifestPath)
    }))
}

const getInternalReferences = manifest => [
  ['dependencies', manifest.dependencies],
  ['optionalDependencies', manifest.optionalDependencies],
  ['peerDependencies', manifest.peerDependencies]
].flatMap(([field, dependencies]) => Object.entries(dependencies ?? {}).map(([target, range]) => ({
  field,
  range,
  target
}))).filter(({ target }) => target.startsWith(packagePrefix))

const getPackageVersionIssues = (pkg, familyMajor) => {
  const sourceMajor = parseMajor(pkg.manifest.version)

  if (sourceMajor === null) {
    return [{ kind: 'invalid-package-version', package: pkg.manifest.name, version: pkg.manifest.version }]
  }

  if (familyMajor !== null && sourceMajor !== familyMajor) {
    return [{
      expectedMajor: familyMajor,
      foundMajor: sourceMajor,
      kind: 'family-major-mismatch',
      package: pkg.manifest.name,
      version: pkg.manifest.version
    }]
  }

  return []
}

const getEdgeIssues = (edge, target, sourceMajor) => {
  const issues = []

  if (edge.range !== 'workspace:^') {
    issues.push({ ...edge, expectedRange: 'workspace:^', kind: 'invalid-internal-range' })
  }

  if (!target) return [...issues, { ...edge, kind: 'missing-internal-target' }]

  if (target.manifest.private === true) {
    issues.push({ ...edge, kind: 'private-internal-target' })
  }

  const targetMajor = parseMajor(target.manifest.version)

  if (sourceMajor !== null && targetMajor !== null && sourceMajor !== targetMajor) {
    issues.push({
      ...edge,
      dependentMajor: sourceMajor,
      kind: 'internal-major-mismatch',
      targetMajor
    })
  }

  return issues
}

const getPackageEdges = (pkg, packagesByName) => getInternalReferences(pkg.manifest).map(reference => {
  const target = packagesByName.get(reference.target)

  return {
    edge: {
      dependent: pkg.manifest.name,
      ...reference,
      targetVersion: target?.manifest.version ?? null
    },
    target
  }
})

const getFamilyContext = (publicPackages) => {
  const basic = publicPackages.find(({ manifest }) => manifest.name === `${packagePrefix}basic`)
  const familyPackage = basic ?? publicPackages[0]
  const familyMajor = parseMajor(familyPackage?.manifest.version ?? '')
  const issues = publicPackages.length === 0 ? [{ kind: 'no-public-packages' }] : []

  if (familyMajor === null && familyPackage) {
    issues.push({
      kind: 'invalid-family-version',
      package: familyPackage.manifest.name,
      version: familyPackage.manifest.version ?? null
    })
  }

  return { familyMajor, issues }
}

const getCompatibilityIssues = (publicPackages, packageEdges, packagesByName, familyMajor) => {
  const issues = publicPackages.flatMap(pkg => getPackageVersionIssues(pkg, familyMajor))

  for (const { edge, target } of packageEdges) {
    const dependent = packagesByName.get(edge.dependent)
    const sourceMajor = parseMajor(dependent?.manifest.version ?? '')

    issues.push(...getEdgeIssues(edge, target, sourceMajor))
  }

  return issues
}

export const createInternalCompatibilityReport = (cwd) => {
  const workspacePackages = readWorkspacePackages(cwd)
    .filter(({ manifest }) => manifest.name?.startsWith(packagePrefix))

  const publicPackages = workspacePackages
    .filter(({ manifest }) => manifest.private !== true)
    .sort((a, b) => a.manifest.name.localeCompare(b.manifest.name))

  const packagesByName = new Map(workspacePackages.map(pkg => [pkg.manifest.name, pkg]))
  const packageEdges = publicPackages.flatMap(pkg => getPackageEdges(pkg, packagesByName))
  const family = getFamilyContext(publicPackages)

  const issues = [
    ...family.issues,
    ...getCompatibilityIssues(publicPackages, packageEdges, packagesByName, family.familyMajor)
  ]

  return {
    edges: packageEdges.map(({ edge }) => edge),
    familyMajor: family.familyMajor,
    healthy: issues.length === 0,
    issues,
    packages: publicPackages.map(({ manifest, path }) => ({
      name: manifest.name,
      path,
      version: manifest.version
    }))
  }
}

export const checkInternalCompatibility = (cwd) => {
  const report = createInternalCompatibilityReport(cwd)

  if (!report.healthy) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)

    throw new Error(
      `Internal compatibility check found ${report.issues.length} issue(s). ` +
      'Keep public packages on one major and use workspace:^ for production internal references.'
    )
  }

  process.stdout.write(
    `Internal compatibility healthy: ${report.packages.length} public packages, ` +
    `${report.edges.length} production internal edges, major ${report.familyMajor}.\n`
  )

  return report
}

if (process.argv[1] && process.argv[1].endsWith('check-internal-compatibility.mjs')) {
  checkInternalCompatibility(process.argv[2] ?? process.cwd())
}
