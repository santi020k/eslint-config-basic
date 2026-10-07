import { describe, expect, test } from 'vitest'

import { isRecoveryPackageVersioned, resolveRecordRecoverySource } from '../../../scripts/resolve-record-recovery.mjs'

const repository = 'santi020k/eslint-config-basic'
const pullRequest = {
  merged: true,
  merged_at: '2026-10-07T22:49:37Z',
  merge_commit_sha: 'a'.repeat(40),
  base: { ref: 'main', repo: { full_name: repository } },
  head: { ref: 'release/v3.6.0', sha: 'b'.repeat(40), repo: { full_name: repository } }
}

describe('release record recovery source', () => {
  test('uses the original merged versioned release commit', () => {
    expect(resolveRecordRecoverySource({ repository, pullRequest })).toEqual({ commit: pullRequest.merge_commit_sha, version: '3.6.0' })
  })

  test('supports independent Changesets releases without a Basic bump', () => {
    expect(resolveRecordRecoverySource({ repository, pullRequest: { ...pullRequest, head: { ...pullRequest.head, ref: 'changeset-release/main' } } })).toEqual({ commit: pullRequest.merge_commit_sha, version: '' })
  })

  test.each([
    { ...pullRequest, merged: false },
    { ...pullRequest, merge_commit_sha: null },
    { ...pullRequest, merge_commit_sha: 'main' },
    { ...pullRequest, base: { ...pullRequest.base, ref: 'other' } },
    { ...pullRequest, base: { ...pullRequest.base, repo: { full_name: 'other/repo' } } },
    { ...pullRequest, head: { ...pullRequest.head, repo: null } },
    { ...pullRequest, head: { ...pullRequest.head, repo: { full_name: 'fork/repo' } } },
    { ...pullRequest, head: { ...pullRequest.head, ref: 'feature/change' } },
    { ...pullRequest, head: { ...pullRequest.head, ref: 'release/v3.6.0-beta.1' } }
  ])('rejects an untrusted release source %#', pr => {
    expect(() => resolveRecordRecoverySource({ repository, pullRequest: pr })).toThrow()
  })
})

describe('versioned recovery packages', () => {
  test('includes a new public package absent from the release base', () => {
    expect(isRecoveryPackageVersioned({ version: '1.0.0' })).toBe(true)
  })

  test('includes an existing bumped public package', () => {
    expect(isRecoveryPackageVersioned({ version: '1.1.0' }, { version: '1.0.0' })).toBe(true)
  })

  test('excludes unchanged versions and private packages', () => {
    expect(isRecoveryPackageVersioned({ version: '1.0.0' }, { version: '1.0.0' })).toBe(false)
    expect(isRecoveryPackageVersioned({ version: '1.0.0', private: true })).toBe(false)
  })
})
