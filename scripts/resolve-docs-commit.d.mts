export interface DocsPullRequest {
  merged_at: string | null
  merge_commit_sha: string | null
  head: { sha: string, ref: string, repo: { full_name: string } | null }
  base: { ref: string, repo: { full_name: string } | null }
}

export interface DocsSource {
  eventName: string
  commit: string
  repository: string
  workflowRun?: {
    name: string
    conclusion: string | null
    head_sha: string
    head_branch: string | null
    event: string
  }
  pullRequests?: DocsPullRequest[]
}

export function resolveDocsCommit(source: DocsSource): string
