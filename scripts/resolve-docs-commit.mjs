const isCommit = value => typeof value === 'string' && /^[a-f\d]{40}$/u.test(value)
const isSuccessfulRelease = run => run?.name === 'Release' && run.conclusion === 'success' && isCommit(run.head_sha)
const belongsToRepository = (branch, repository) => branch?.repo?.full_name === repository
const isReleaseBranch = ref => ref === 'changeset-release/main' || (typeof ref === 'string' && ref.startsWith('release/v'))

const isMergedReleasePullRequest = (pullRequest, repository) => Boolean(pullRequest.merged_at) &&
  isCommit(pullRequest.merge_commit_sha) &&
  belongsToRepository(pullRequest.head, repository) && pullRequest.base?.ref === 'main' &&
  belongsToRepository(pullRequest.base, repository) && isReleaseBranch(pullRequest.head.ref)

const isMergedRelease = (pullRequest, head, repository) =>
  isMergedReleasePullRequest(pullRequest, repository) && pullRequest.head.sha === head

// The Release workflow publishes exactly these merges and then triggers the
// deployment itself, so the push for the same commit must not deploy first.
export const isReleaseMergePush = ({ eventName, commit, repository, pullRequests = [] }) => eventName === 'push' &&
  isCommit(commit) &&
  pullRequests.some(pullRequest => isMergedReleasePullRequest(pullRequest, repository) && pullRequest.merge_commit_sha === commit)

export const resolveDocsCommit = ({ eventName, commit, repository, workflowRun, pullRequests = [] }) => {
  if (eventName !== 'workflow_run') {
    if (!isCommit(commit)) throw new Error('Missing documentation source commit.')

    return commit
  }

  if (!isSuccessfulRelease(workflowRun)) {
    throw new Error('Documentation requires a successful Release workflow.')
  }

  if (workflowRun.event === 'workflow_dispatch' && workflowRun.head_branch === 'main') return workflowRun.head_sha

  if (workflowRun.event !== 'pull_request') throw new Error('Unsupported release source event.')

  const merged = pullRequests.filter(pullRequest => isMergedRelease(pullRequest, workflowRun.head_sha, repository))

  if (merged.length !== 1) throw new Error('Expected exactly one merged release pull request for the workflow source.')

  return merged[0].merge_commit_sha
}
