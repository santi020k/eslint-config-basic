const isTrustedRecoveryPR = (pullRequest, repository) => pullRequest?.merged && pullRequest.base?.ref === 'main' && pullRequest.base.repo?.full_name === repository && pullRequest.head?.repo?.full_name === repository
const recoveryVersion = branch => /^release\/v(\d+\.\d+\.\d+)$/.exec(branch)?.[1] || ''

export const resolveRecordRecoverySource = ({ repository, pullRequest }) => {
  const trusted = isTrustedRecoveryPR(pullRequest, repository)
  const branch = pullRequest?.head?.ref || ''
  const version = recoveryVersion(branch)
  const commit = pullRequest?.merge_commit_sha

  if (!trusted || (!version && branch !== 'changeset-release/main') || !/^[\da-f]{40}$/.test(commit || '')) {
    throw new Error('Recovery requires a trusted merged release PR.')
  }

  return { commit, version }
}

export const isRecoveryPackageVersioned = (current, previous) => !current.private && (!previous || current.version !== previous.version)
