import { describe, expect, test } from 'vitest'

import type { ReleaseGateEvidence, ReleaseGateRequest } from '../../../scripts/verify-release-gate.mjs'
import { evaluateReleaseGate, verifyReleaseGate } from '../../../scripts/verify-release-gate.mjs'

const repository = 'santi020k/eslint-config-basic'
const head = 'a'.repeat(40)
const merged = 'b'.repeat(40)
const previousMain = 'c'.repeat(40)
const tree = 'd'.repeat(40)
const otherTree = 'e'.repeat(40)
const checkName = 'Full release candidate'

const pullRequest = {
  base: { ref: 'main', repo: { full_name: repository } },
  head: { ref: 'release/v3.8.0', repo: { full_name: repository }, sha: head },
  merge_commit_sha: merged,
  merged: true
}

const checkRun = {
  app: { slug: 'github-actions' }, conclusion: 'success', head_sha: head, name: checkName, status: 'completed'
}

const evidence: ReleaseGateEvidence = {
  checkName,
  checkRuns: [checkRun],
  comparison: { base: previousMain, head, status: 'ahead' },
  headCommit: { parents: [{ sha: previousMain }], sha: head, tree: { sha: tree } },
  mergedCommit: { parents: [{ sha: previousMain }], sha: merged, tree: { sha: tree } },
  pullRequest,
  repository
}

describe('release gate reuse', () => {
  test.each(['release/v3.8.0', 'changeset-release/main'])('reuses a successful gate for the same tree from %s', ref => {
    const candidate = { ...pullRequest, head: { ...pullRequest.head, ref } }

    expect(evaluateReleaseGate({ ...evidence, pullRequest: candidate }).verified).toBe(true)
  })

  test('accepts a candidate that is identical to the previous main commit history', () => {
    expect(evaluateReleaseGate({ ...evidence, comparison: { base: previousMain, head, status: 'identical' } }).verified).toBe(true)
  })

  test.each<[string, ReleaseGateEvidence]>([
    ['a missing pull request', { ...evidence, pullRequest: undefined }],
    ['an unmerged pull request', { ...evidence, pullRequest: { ...pullRequest, merged: false } }],
    ['a feature branch', { ...evidence, pullRequest: { ...pullRequest, head: { ...pullRequest.head, ref: 'feature/release' } } }],
    ['a fork', { ...evidence, pullRequest: { ...pullRequest, head: { ...pullRequest.head, repo: { full_name: 'fork/repo' } } } }],
    ['a deleted head repository', { ...evidence, pullRequest: { ...pullRequest, head: { ...pullRequest.head, repo: null } } }],
    ['another base branch', { ...evidence, pullRequest: { ...pullRequest, base: { ...pullRequest.base, ref: 'next' } } }],
    ['a missing merge commit', { ...evidence, pullRequest: { ...pullRequest, merge_commit_sha: null } }],
    ['another merged commit', { ...evidence, mergedCommit: { parents: [{ sha: previousMain }], sha: previousMain, tree: { sha: tree } } }],
    ['another candidate commit', { ...evidence, headCommit: { parents: [], sha: previousMain, tree: { sha: tree } } }],
    ['a different merged tree', { ...evidence, mergedCommit: { parents: [{ sha: previousMain }], sha: merged, tree: { sha: otherTree } } }],
    ['a merged commit without a parent', { ...evidence, mergedCommit: { parents: [], sha: merged, tree: { sha: tree } } }],
    ['a candidate behind main', { ...evidence, comparison: { base: previousMain, head, status: 'diverged' } }],
    ['a comparison of other commits', { ...evidence, comparison: { base: merged, head, status: 'ahead' } }],
    ['a missing comparison', { ...evidence, comparison: undefined }],
    ['no check runs', { ...evidence, checkRuns: [] }],
    ['a differently named check', { ...evidence, checkRuns: [{ ...checkRun, name: 'Quality gate' }] }],
    ['a failed check', { ...evidence, checkRuns: [{ ...checkRun, conclusion: 'failure' }] }],
    ['a skipped check', { ...evidence, checkRuns: [{ ...checkRun, conclusion: 'skipped' }] }],
    ['a running check', { ...evidence, checkRuns: [{ ...checkRun, conclusion: null, status: 'in_progress' }] }],
    ['a check from another commit', { ...evidence, checkRuns: [{ ...checkRun, head_sha: merged }] }],
    ['a check from another app', { ...evidence, checkRuns: [{ ...checkRun, app: { slug: 'third-party' } }] }],
    ['one failed duplicate check', { ...evidence, checkRuns: [checkRun, { ...checkRun, conclusion: 'failure' }] }]
  ])('runs the gate again for %s', (_name, input) => {
    expect(evaluateReleaseGate(input).verified).toBe(false)
  })
})

describe('release gate evidence collection', () => {
  const responses: Record<string, unknown> = {
    [`git/commits/${merged}`]: evidence.mergedCommit,
    [`git/commits/${head}`]: evidence.headCommit,
    [`compare/${previousMain}...${head}`]: { status: 'ahead' },
    [`commits/${head}/check-runs?check_name=Full%20release%20candidate&filter=latest&per_page=100`]: { check_runs: [checkRun] }
  }

  const createRequest = (overrides: Record<string, unknown> = {}, requested: string[] = []): ReleaseGateRequest => ({
    apiUrl: 'https://api.github.test',
    checkName,
    fetchImpl: async input => {
      const path = input.replace(`https://api.github.test/repos/${repository}/`, '')
      const body = { ...responses, ...overrides }[path]

      requested.push(path)

      const found = body !== undefined

      const json = async (): Promise<unknown> => await Promise.resolve(body)

      return await Promise.resolve({ json, ok: found, status: found ? 200 : 404 })
    },
    pullRequest,
    repository,
    token: 'token'
  })

  test('collects the commits, ancestry and check runs for the merged pull request', async () => {
    const requested: string[] = []

    await expect(verifyReleaseGate(createRequest({}, requested))).resolves.toMatchObject({ verified: true })

    expect(requested).toEqual(Object.keys(responses))
  })

  test('does not query GitHub for manual recovery runs', async () => {
    const requested: string[] = []

    const request = { ...createRequest({}, requested), pullRequest: undefined }

    await expect(verifyReleaseGate(request)).resolves.toMatchObject({ verified: false })

    expect(requested).toEqual([])
  })

  test.each([
    { [`git/commits/${head}`]: undefined },
    { [`compare/${previousMain}...${head}`]: { status: 'behind' } },
    { [`commits/${head}/check-runs?check_name=Full%20release%20candidate&filter=latest&per_page=100`]: { check_runs: [] } }
  ])('runs the gate again when the evidence is unavailable or negative %#', async overrides => {
    await expect(verifyReleaseGate(createRequest(overrides))).resolves.toMatchObject({ verified: false })
  })
})
