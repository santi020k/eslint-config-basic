import { describe, expect, test } from 'vitest'

import { resolveDocsCommit } from '../../../scripts/resolve-docs-commit.mjs'

const head = 'a'.repeat(40)
const merged = 'b'.repeat(40)
const current = 'c'.repeat(40)
const repository = 'santi020k/eslint-config-basic'
const pullRequest = {
  base: { ref: 'main', repo: { full_name: repository } },
  head: { ref: 'release/v3.6.0', repo: { full_name: repository }, sha: head },
  merge_commit_sha: merged,
  merged_at: '2026-10-07T22:49:37Z'
}
const workflowRun = {
  conclusion: 'success', event: 'pull_request', head_branch: 'release/v3.6.0', head_sha: head, name: 'Release'
}
const source = { commit: current, eventName: 'workflow_run', pullRequests: [pullRequest], repository, workflowRun }

describe('documentation deployment source', () => {
  test('deploys the squash merge instead of the PR head or newer main', () => {
    expect(resolveDocsCommit(source)).toBe(merged)
  })

  test.each(['push', 'pull_request', 'workflow_dispatch'])('keeps the triggering commit for %s', eventName => {
    expect(resolveDocsCommit({ ...source, eventName })).toBe(current)
  })

  test('keeps the exact original main commit for release recovery', () => {
    expect(resolveDocsCommit({
      ...source, pullRequests: [], workflowRun: { ...workflowRun, event: 'workflow_dispatch', head_branch: 'main' }
    })).toBe(head)
  })

  test.each([
    { ...source, pullRequests: [] },
    { ...source, pullRequests: [pullRequest, pullRequest] },
    { ...source, pullRequests: [{ ...pullRequest, merged_at: null }] },
    { ...source, pullRequests: [{ ...pullRequest, merge_commit_sha: null }] },
    { ...source, pullRequests: [{ ...pullRequest, head: { ...pullRequest.head, repo: { full_name: 'fork/repo' } } }] },
    { ...source, pullRequests: [{ ...pullRequest, base: { ...pullRequest.base, ref: 'other' } }] },
    { ...source, workflowRun: { ...workflowRun, conclusion: 'failure' } },
    { ...source, workflowRun: { ...workflowRun, head_sha: 'main' } },
    { ...source, workflowRun: { ...workflowRun, event: 'push' } },
    { ...source, workflowRun: { ...workflowRun, event: 'workflow_dispatch' } },
    { ...source, eventName: 'push', commit: 'main' }
  ])('rejects untrusted or ambiguous deployment sources %#', input => {
    expect(() => resolveDocsCommit(input)).toThrow()
  })
})
