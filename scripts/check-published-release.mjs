import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout } from 'node:timers/promises'

const isRecord = value => typeof value === 'object' && value !== null && !Array.isArray(value)

const readProvenanceStatement = attestations => {
  if (!isRecord(attestations) || !Array.isArray(attestations.attestations)) {
    throw new Error('Missing npm provenance attestations.')
  }

  const provenance = attestations.attestations.find(item => isRecord(item) && item.predicateType === 'https://slsa.dev/provenance/v1')
  const envelope = provenance?.bundle?.dsseEnvelope

  if (!isRecord(envelope) || typeof envelope.payload !== 'string') throw new Error('Missing npm provenance payload.')

  return JSON.parse(Buffer.from(envelope.payload, 'base64').toString('utf8'))
}

const verifyRegistryMetadata = (metadata, name, version) => {
  if (!isRecord(metadata) || metadata.name !== name || metadata.version !== version) {
    throw new Error(`Registry metadata does not match ${name}@${version}.`)
  }

  if (!isRecord(metadata.dist) || typeof metadata.dist.integrity !== 'string' || !metadata.dist.integrity.startsWith('sha512-')) {
    throw new Error(`Missing SHA-512 artifact integrity for ${name}@${version}.`)
  }

  return metadata.dist.integrity
}

const verifyWorkflow = (workflow, repository) => {
  if (workflow?.repository !== `https://github.com/${repository}` || workflow?.ref !== 'refs/heads/main' || workflow?.path !== '.github/workflows/release.yml') {
    throw new Error('Provenance was produced by a different workflow.')
  }
}

const hasReleaseSource = (definition, commit, repository) => definition?.resolvedDependencies?.some(item => item?.digest?.gitCommit === commit && item.uri === `git+https://github.com/${repository}@refs/heads/main`)
const hasArtifactSubject = (statement, name, version, digest) => statement?.subject?.some(item => item?.name === `pkg:npm/${encodeURIComponent(name).replace('%2F', '/')}@${version}` && item?.digest?.sha512 === digest)

export const verifyProvenance = ({ metadata, attestations, name, version, commit, repository }) => {
  const integrity = verifyRegistryMetadata(metadata, name, version)
  const statement = readProvenanceStatement(attestations)
  const definition = statement?.predicate?.buildDefinition

  verifyWorkflow(definition?.externalParameters?.workflow, repository)

  const digest = Buffer.from(integrity.slice('sha512-'.length), 'base64').toString('hex')

  if (!hasReleaseSource(definition, commit, repository) || !hasArtifactSubject(statement, name, version, digest)) throw new Error(`Published provenance does not match ${name}@${version}, its artifact, and merged commit ${commit}.`)
}

const registryJSON = async path => {
  const response = await fetch(new URL(path, 'https://registry.npmjs.org/'), { signal: AbortSignal.timeout(15000) })

  if (!response.ok) throw new Error(`npm registry returned HTTP ${response.status} for ${path}.`)

  return response.json()
}

export const verifyReleaseRefs = ({ object, release, tag, commit }) => {
  if (!isRecord(object) || object.type !== 'commit' || object.sha !== commit) {
    throw new Error(`Tag ${tag} does not reference merged release ${commit}.`)
  }

  if (!isRecord(release) || release.draft !== false || release.prerelease !== false || release.tag_name !== tag) {
    throw new Error(`GitHub Release ${tag} is not a published stable release.`)
  }
}

const verifyTag = (tag, commit, repository) => {
  const ref = JSON.parse(execFileSync('gh', ['api', `repos/${repository}/git/ref/tags/${encodeURIComponent(tag)}`], { encoding: 'utf8' }))
  const object = ref.object.type === 'tag' ? JSON.parse(execFileSync('gh', ['api', `repos/${repository}/git/tags/${ref.object.sha}`], { encoding: 'utf8' })).object : ref.object
  const release = JSON.parse(execFileSync('gh', ['api', `repos/${repository}/releases/tags/${encodeURIComponent(tag)}`], { encoding: 'utf8' }))

  verifyReleaseRefs({ object, release, tag, commit })
}

const waitForProvenance = async ({ name, version, commit, repository }) => {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const metadata = await registryJSON(`${encodeURIComponent(name)}/${version}`)
      const attestations = await registryJSON(`-/npm/v1/attestations/${encodeURIComponent(name)}@${version}`)

      verifyProvenance({ metadata, attestations, name, version, commit, repository })

      break
    } catch (error) {
      if (attempt === 12) throw error

      console.log(`Waiting for ${name}@${version} registry provenance (${attempt}/12).`)

      await setTimeout(10000)
    }
  }
}

export const verifyPublishedConsumer = ({ basic, full, packages = [] }) => {
  const consumer = mkdtempSync(join(tmpdir(), 'eslint-published-smoke-'))

  try {
    writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module', dependencies: {
      ...Object.fromEntries(packages.map(({ name, version }) => [name, version])),
      [basic.name]: basic.version, [full.name]: full.version, eslint: '^10.0.0', typescript: '^6.0.0'
    } }))

    execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: consumer, stdio: 'inherit' })

    // npm verifies registry signatures and Sigstore attestations cryptographically.
    execFileSync('npm', ['audit', 'signatures'], { cwd: consumer, stdio: 'inherit' })

    writeFileSync(join(consumer, 'eslint.config.mjs'), "export { default } from '@santi020k/eslint-config-basic/recommended'\n")

    writeFileSync(join(consumer, 'index.js'), 'export const answer = 42\n')

    const eslint = join(consumer, 'node_modules', '.bin', 'eslint')

    execFileSync(eslint, ['index.js', '--max-warnings=0'], { cwd: consumer, stdio: 'inherit' })

    writeFileSync(join(consumer, 'index.js'), 'const unused = 42\n')

    const invalid = spawnSync(eslint, ['index.js', '--max-warnings=0', '--format', 'json'], { cwd: consumer, encoding: 'utf8' })

    if (invalid.status !== 1 || !JSON.parse(invalid.stdout).some(file => file.messages.some(message => message.ruleId?.includes('no-unused-vars')))) {
      throw new Error('Published consumer did not reject an unused variable with the expected rule.')
    }

    writeFileSync(join(consumer, 'eslint.config.mjs'), "export { default } from '@santi020k/eslint-config-full/recommended'\n")

    writeFileSync(join(consumer, 'index.js'), 'export const answer = 42\n')

    execFileSync(eslint, ['index.js', '--max-warnings=0'], { cwd: consumer, stdio: 'inherit' })
  } finally {
    rmSync(consumer, { recursive: true, force: true })
  }

}

if (process.argv[1]?.endsWith('check-published-release.mjs')) {
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  const repository = process.env.GITHUB_REPOSITORY
  const base = process.env.RELEASE_BASE_SHA || execFileSync('git', ['rev-parse', 'HEAD^'], { encoding: 'utf8' }).trim()

  if (!repository || !base) throw new Error('Set GITHUB_REPOSITORY and RELEASE_BASE_SHA.')

  const packages = readdirSync('packages').flatMap(directory => {
    const path = `packages/${directory}/package.json`

    if (!existsSync(path)) return []

    const manifest = JSON.parse(readFileSync(path, 'utf8'))

    if (manifest.private) return []

    const previous = spawnSync('git', ['show', `${base}:${path}`], { encoding: 'utf8' })

    if (previous.status === 0 && JSON.parse(previous.stdout).version === manifest.version) return []

    return [manifest]
  })

  if (packages.length === 0) throw new Error('No versioned packages found; recover by rerunning the original release workflow with its original base SHA.')

  for (const { name, version } of packages) {
    await waitForProvenance({ name, version, commit, repository })

    verifyTag(`${name}@${version}`, commit, repository)

    if (name === '@santi020k/eslint-config-basic') verifyTag(`v${version}`, commit, repository)
  }

  verifyPublishedConsumer({
    basic: JSON.parse(readFileSync('packages/basic/package.json', 'utf8')),
    full: JSON.parse(readFileSync('packages/full/package.json', 'utf8')),
    packages
  })

  console.log(`Verified ${packages.length} published packages, provenance, release tags, and Basic/Full consumer behavior at ${commit}.`)
}
