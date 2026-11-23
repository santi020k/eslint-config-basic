export interface ReleaseGateRepository {
  full_name: string
}

export interface ReleaseGatePullRequest {
  merged: boolean
  merge_commit_sha: string | null
  base: { ref: string, repo: ReleaseGateRepository | null }
  head: { ref: string, sha: string, repo: ReleaseGateRepository | null }
}

export interface ReleaseGateCommit {
  sha: string
  tree: { sha: string }
  parents: { sha: string }[]
}

export interface ReleaseGateCheckRun {
  name: string
  head_sha: string
  status: string
  conclusion: string | null
  app: { slug: string } | null
}

export interface ReleaseGateEvidence {
  repository: string
  pullRequest?: ReleaseGatePullRequest
  mergedCommit?: ReleaseGateCommit
  headCommit?: ReleaseGateCommit
  comparison?: { base: string, head: string, status: string }
  checkName: string
  checkRuns?: ReleaseGateCheckRun[]
}

export interface ReleaseGateResult {
  verified: boolean
  reason: string
}

export interface ReleaseGateRequest {
  apiUrl?: string
  repository: string
  token: string
  pullRequest?: ReleaseGatePullRequest
  checkName: string
  fetchImpl?: (input: string, init: { headers: Record<string, string> }) => Promise<{
    ok: boolean
    status: number
    json: () => Promise<unknown>
  }>
}

export function evaluateReleaseGate(evidence: ReleaseGateEvidence): ReleaseGateResult

export function verifyReleaseGate(request: ReleaseGateRequest): Promise<ReleaseGateResult>
