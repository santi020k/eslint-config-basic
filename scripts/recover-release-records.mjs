// cspell:ignore commitish
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { isRecoveryPackageVersioned } from './resolve-record-recovery.mjs'

const source = resolve(process.env.RELEASE_SOURCE_PATH || '.')
const repository = process.env.GITHUB_REPOSITORY
const base = process.env.RELEASE_BASE_SHA
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim()
const dryRun = process.argv.includes('--dry-run')

if (!repository || !/^[\da-f]{40}$/.test(base || '')) throw new Error('A trusted repository and release base SHA are required.')

const { verifyProvenance, verifyPublishedConsumer, verifyReleaseRefs } = await import(pathToFileURL(join(source, 'scripts/check-published-release.mjs')).href)

const api = (path, payload) => JSON.parse(execFileSync('gh', ['api', `repos/${repository}/${path}`, ...(payload ? ['--method', 'POST', '--input', '-'] : [])], {
  encoding: 'utf8', ...(payload ? { input: JSON.stringify(payload) } : {})
}))

const optionalAPI = path => {
  try {
    return api(path)
  } catch (error) {
    // Only an actual missing record is recoverable; auth/network errors stop work.
    if (error instanceof Error && 'stderr' in error && String(error.stderr).includes('HTTP 404')) return null

    throw error
  }
}

const tagObject = tag => {
  const ref = optionalAPI(`git/ref/tags/${encodeURIComponent(tag)}`)

  if (!ref) return null

  return ref.object.type === 'tag' ? api(`git/tags/${ref.object.sha}`).object : ref.object
}

const manifest = directory => JSON.parse(readFileSync(join(source, 'packages', directory, 'package.json'), 'utf8'))

const packages = readdirSync(join(source, 'packages')).flatMap(directory => {
  if (!existsSync(join(source, 'packages', directory, 'package.json'))) return []

  const pkg = manifest(directory)

  if (pkg.private) return []

  const result = spawnSync('git', ['show', `${base}:packages/${directory}/package.json`], { cwd: source, encoding: 'utf8' })

  if (result.error) throw result.error

  const previous = result.status === 0 ? JSON.parse(result.stdout) : undefined

  return isRecoveryPackageVersioned(pkg, previous) ? [{ ...pkg, directory }] : []
})

if (packages.length === 0) throw new Error('The selected source has no versioned packages.')

const registry = async path => {
  const response = await fetch(`https://registry.npmjs.org/${path}`, { signal: AbortSignal.timeout(15000) })

  if (!response.ok) throw new Error(`npm registry HTTP ${response.status} for ${path}.`)

  return response.json()
}

const releaseBody = pkg => {
  const changelog = readFileSync(join(source, 'packages', pkg.directory, 'CHANGELOG.md'), 'utf8')
  const entry = changelog.split(/^## /m).find(section => section.startsWith(`${pkg.version}\n`))

  if (!entry) throw new Error(`Missing changelog for ${pkg.name}@${pkg.version}.`)

  return entry.slice(pkg.version.length).trim()
}

const records = []

// Verify every artifact and immutable ref before creating any release record.
for (const pkg of packages) {
  const tag = `${pkg.name}@${pkg.version}`
  const metadata = await registry(`${encodeURIComponent(pkg.name)}/${pkg.version}`)
  const attestations = await registry(`-/npm/v1/attestations/${encodeURIComponent(pkg.name)}@${pkg.version}`)

  verifyProvenance({ metadata, attestations, name: pkg.name, version: pkg.version, commit, repository })

  const object = tagObject(tag)
  const release = optionalAPI(`releases/tags/${encodeURIComponent(tag)}`)

  verifyReleaseRefs({ object, release: release || { draft: false, prerelease: false, tag_name: tag }, tag, commit })

  records.push({ tag, body: releaseBody(pkg), missing: !release })
}

const basic = manifest('basic')
const umbrella = `v${basic.version}`
const basicRecord = records.find(record => record.tag === `${basic.name}@${basic.version}`)

if (basicRecord) {
  const object = tagObject(umbrella)
  const release = optionalAPI(`releases/tags/${umbrella}`)

  if (object || release) verifyReleaseRefs({ object, release: release || { draft: false, prerelease: false, tag_name: umbrella }, tag: umbrella, commit })

  records.push({ tag: umbrella, body: basicRecord.body, missing: !release })
}

const majorTag = `v${basic.version.split('.')[0]}`
const majorObject = basicRecord ? tagObject(majorTag) : null

const isAncestor = (ancestor, descendant) => {
  const result = spawnSync('git', ['merge-base', '--is-ancestor', ancestor, descendant], { cwd: source })

  if (result.error) throw result.error

  if (result.status !== 0 && result.status !== 1) throw new Error('Cannot verify rolling tag ancestry.')

  return result.status === 0
}

let advanceMajor = false

if (basicRecord && majorObject && majorObject.sha !== commit) {
  if (majorObject.type !== 'commit') throw new Error('Invalid rolling action tag target.')

  advanceMajor = isAncestor(majorObject.sha, commit)

  if (!advanceMajor && !isAncestor(commit, majorObject.sha)) throw new Error('Rolling action tag history diverges from the release.')
}

verifyPublishedConsumer({ basic, full: manifest('full'), packages })

for (const record of records.filter(item => item.missing)) {
  console.log(`${dryRun ? 'Would create' : 'Creating'} GitHub Release ${record.tag} at ${commit}.`)

  if (!dryRun) api('releases', { tag_name: record.tag, target_commitish: commit, name: record.tag, body: record.body, draft: false, prerelease: false, make_latest: 'false' })
}

if (basicRecord && (!majorObject || advanceMajor)) {
  const currentMajor = tagObject(majorTag)

  if (currentMajor?.sha !== majorObject?.sha) throw new Error('Rolling action tag changed during recovery; retry after the active release completes.')

  console.log(`${dryRun ? 'Would advance' : 'Advancing'} rolling action tag ${majorTag} to ${commit}.`)

  if (!dryRun && !majorObject) api('git/refs', { ref: `refs/tags/${majorTag}`, sha: commit })

  if (!dryRun && advanceMajor) execFileSync('gh', ['api', `repos/${repository}/git/refs/tags/${majorTag}`, '--method', 'PATCH', '--input', '-'], { input: JSON.stringify({ sha: commit, force: true }) })
}

console.log(`Verified ${packages.length} published artifacts and completed ${dryRun ? 'recovery preflight' : 'release record recovery'}.`)
