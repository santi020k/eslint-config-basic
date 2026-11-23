import { appendFileSync, readFileSync } from 'node:fs'
import process from 'node:process'

const isCommit = value => typeof value === 'string' && /^[a-f\d]{40}$/u.test(value)
const isReleaseBranch = ref => ref === 'changeset-release/main' || (typeof ref === 'string' && ref.startsWith('release/v'))
const unverified = reason => ({ verified: false, reason })

const isSameRepositoryRelease = ({ base, head }, repository) => base?.ref === 'main' &&
  base.repo?.full_name === repository && head?.repo?.full_name === repository && isReleaseBranch(head.ref)

const resolvesCommits = ({ merge_commit_sha: mergeSha, head }, mergedCommit, headCommit) => isCommit(mergeSha) &&
  isCommit(head.sha) && mergedCommit?.sha === mergeSha && headCommit?.sha === head.sha

const hasIdenticalTree = (mergedCommit, headCommit) => isCommit(mergedCommit.tree?.sha) &&
  mergedCommit.tree.sha === headCommit.tree?.sha

// A candidate that already contains the previous main commit was validated
// against its own tree, because the pull-request merge ref added nothing.
const containsPreviousMain = (mergedCommit, head, comparison) => {
  const previousMain = mergedCommit.parents?.[0]?.sha

  return isCommit(previousMain) && comparison?.base === previousMain && comparison.head === head &&
    ['ahead', 'identical'].includes(comparison.status)
}

const isSuccessfulRun = (run, head) => run.head_sha === head && run.app?.slug === 'github-actions' &&
  run.status === 'completed' && run.conclusion === 'success'

const readCheckFailure = (checkRuns, checkName, head) => {
  const runs = (checkRuns ?? []).filter(run => run.name === checkName)

  if (runs.length === 0) return `no "${checkName}" check exists for the candidate commit`

  return runs.every(run => isSuccessfulRun(run, head)) ? null : `"${checkName}" did not succeed for the candidate commit`
}

const readFailure = ({ repository, pullRequest, mergedCommit, headCommit, comparison, checkName, checkRuns }) => {
  if (!pullRequest?.merged) return 'the event is not a merged pull request'

  if (!isSameRepositoryRelease(pullRequest, repository)) {
    return 'the pull request is not a same-repository release branch into main'
  }

  if (!resolvesCommits(pullRequest, mergedCommit, headCommit)) return 'the merged and candidate commits could not be resolved'

  if (!hasIdenticalTree(mergedCommit, headCommit)) return 'the merged tree differs from the validated candidate tree'

  if (!containsPreviousMain(mergedCommit, pullRequest.head.sha, comparison)) {
    return 'the candidate did not contain the main commit it merged into'
  }

  return readCheckFailure(checkRuns, checkName, pullRequest.head.sha)
}

// The gate may be skipped only on positive proof. Every missing, ambiguous, or
// unexpected value therefore resolves to "run the gate again".
export const evaluateReleaseGate = evidence => {
  const failure = readFailure(evidence)

  if (failure) return unverified(failure)

  const { checkName, mergedCommit, pullRequest } = evidence

  return {
    verified: true,
    reason: `"${checkName}" succeeded for ${pullRequest.head.sha} with the merged tree ${mergedCommit.tree.sha}`
  }
}

const createClient = ({ apiUrl, repository, token, fetchImpl }) => async path => {
  const response = await fetchImpl(`${apiUrl}/repos/${repository}/${path}`, {
    headers: {
      'accept': 'application/vnd.github+json',
      'authorization': `Bearer ${token}`,
      'x-github-api-version': '2022-11-28'
    }
  })

  if (!response.ok) throw new Error(`GitHub API ${path} responded with ${response.status}.`)

  return response.json()
}

const collectEvidence = async (request, { merge_commit_sha: mergeSha, head }, checkName) => {
  const mergedCommit = await request(`git/commits/${mergeSha}`)
  const headCommit = await request(`git/commits/${head.sha}`)
  const previousMain = mergedCommit.parents?.[0]?.sha

  if (!isCommit(previousMain)) return { mergedCommit, headCommit }

  const compared = await request(`compare/${previousMain}...${head.sha}`)
  const query = `check_name=${encodeURIComponent(checkName)}&filter=latest&per_page=100`
  const checks = await request(`commits/${head.sha}/check-runs?${query}`)

  return {
    mergedCommit,
    headCommit,
    comparison: { base: previousMain, head: head.sha, status: compared.status },
    checkRuns: checks.check_runs
  }
}

const isLookupCandidate = (pullRequest, repository) => Boolean(pullRequest?.merged) &&
  isSameRepositoryRelease(pullRequest, repository) && isCommit(pullRequest.merge_commit_sha) && isCommit(pullRequest.head.sha)

export const verifyReleaseGate = async ({
  apiUrl = 'https://api.github.com', repository, token, pullRequest, checkName, fetchImpl = fetch
}) => {
  if (!isLookupCandidate(pullRequest, repository)) return evaluateReleaseGate({ repository, pullRequest, checkName })

  try {
    const request = createClient({ apiUrl, repository, token, fetchImpl })
    const evidence = await collectEvidence(request, pullRequest, checkName)

    return evaluateReleaseGate({ repository, pullRequest, checkName, ...evidence })
  } catch (error) {
    return unverified(error instanceof Error ? error.message : 'the GitHub API request failed')
  }
}

if (process.argv[1]?.endsWith('verify-release-gate.mjs')) {
  const checkName = process.env.RELEASE_GATE_CHECK

  if (!checkName) throw new Error('RELEASE_GATE_CHECK must name the required check.')

  const event = process.env.GITHUB_EVENT_NAME === 'pull_request' ?
    JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')) :
      {}

  const result = await verifyReleaseGate({
    apiUrl: process.env.GITHUB_API_URL,
    repository: process.env.GITHUB_REPOSITORY,
    token: process.env.GITHUB_TOKEN,
    pullRequest: event.pull_request,
    checkName
  })

  console.log(result.verified ?
    `Release gate already verified: ${result.reason}.` :
    `Release gate must run: ${result.reason}.`)

  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `verified=${String(result.verified)}\n`)
}
