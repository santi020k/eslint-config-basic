import { describe, expect, test } from 'vitest'

import { verifyLiveDocs } from '../../../scripts/check-live-docs.mjs'
import { verifyProvenance, verifyReleaseRefs } from '../../../scripts/check-published-release.mjs'

const commit = 'a'.repeat(40)
const name = '@santi020k/eslint-config-basic'
const version = '3.6.0'
const repository = 'santi020k/eslint-config-basic'
const digest = Buffer.from('artifact').toString('hex')
const metadata = { name, version, dist: { integrity: `sha512-${Buffer.from('artifact').toString('base64')}` } }

const provenance = (sourceCommit = commit, artifactDigest = digest, workflowRepository = repository) => ({
  attestations: [{
    predicateType: 'https://slsa.dev/provenance/v1',
    bundle: {
      dsseEnvelope: {
        payload: Buffer.from(JSON.stringify({
          subject: [{ name: 'pkg:npm/%40santi020k/eslint-config-basic@3.6.0', digest: { sha512: artifactDigest } }],
          predicate: {
            buildDefinition: {
              externalParameters: { workflow: { repository: `https://github.com/${workflowRepository}`, ref: 'refs/heads/main', path: '.github/workflows/release.yml' } },
              resolvedDependencies: [{ uri: `git+https://github.com/${repository}@refs/heads/main`, digest: { gitCommit: sourceCommit } }]
            }
          }
        })).toString('base64')
      }
    }
  }]
})

describe('published release provenance', () => {
  test('accepts the exact package, artifact, workflow, and merged source', () => {
    expect(() => {
      verifyProvenance({ metadata, attestations: provenance(), name, version, commit, repository })
    }).not.toThrow()
  })

  test.each([
    { metadata: { ...metadata, version: '3.5.4' }, attestations: provenance() },
    { metadata, attestations: provenance('b'.repeat(40)) },
    { metadata, attestations: provenance(commit, 'wrong-artifact') },
    { metadata, attestations: provenance(commit, digest, 'fork/repository') },
    { metadata, attestations: { attestations: [] } },
    { metadata: null, attestations: null }
  ])('rejects stale, foreign, missing, or mismatched provenance %#', input => {
    expect(() => {
      verifyProvenance({ ...input, name, version, commit, repository })
    }).toThrow()
  })
})

const fetchDocs = ({ deployedCommit = commit, status = 200, html = '<h1>Docs</h1>santi020k', search = 'export{}' } = {}): typeof fetch => input => {
  const path = new URL(input instanceof Request ? input.url : input).pathname
  if (path === '/release-build.json') return Promise.resolve(Response.json({ commit: deployedCommit }))
  return Promise.resolve(new Response(path === '/pagefind/pagefind.js' ? search : html, { status }))
}

describe('live documentation smoke checks', () => {
  test('checks deployment identity, representative routes, and indexed search', async () => {
    await expect(verifyLiveDocs({ baseURL: 'https://docs.example/', expectedCommit: commit, fetcher: fetchDocs() })).resolves.toBeUndefined()
  })

  test.each([
    { deployedCommit: 'old' },
    { status: 404 },
    { html: 'not documentation' },
    { search: '' }
  ])('rejects stale deployments, failed routes, broken shells, and empty search %#', options => expect(verifyLiveDocs({ baseURL: 'https://docs.example/', expectedCommit: commit, fetcher: fetchDocs(options) })).rejects.toThrow())
})

describe('release tag and GitHub Release identity', () => {
  const tag = 'v3.6.0'
  const object = { type: 'commit', sha: commit }
  const release = { draft: false, prerelease: false, tag_name: tag }

  test('accepts a stable release at the merged commit', () => {
    expect(() => {
      verifyReleaseRefs({ object, release, tag, commit })
    }).not.toThrow()
  })

  test.each([
    { object: { ...object, sha: 'old' }, release },
    { object: { ...object, type: 'tag' }, release },
    { object, release: { ...release, draft: true } },
    { object, release: { ...release, prerelease: true } },
    { object, release: { ...release, tag_name: 'v3.5.4' } },
    { object, release: null }
  ])('rejects mismatched commits, unresolved tags, and unpublished releases %#', input => {
    expect(() => {
      verifyReleaseRefs({ ...input, tag, commit })
    }).toThrow()
  })
})
