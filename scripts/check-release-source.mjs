import { readdirSync, readFileSync } from 'node:fs'

import { gt, valid } from 'semver'

const isTrustedPullRequest = (pullRequest, repository, candidate) => {
  if (!pullRequest || (!pullRequest.merged && !candidate)) return false

  if (pullRequest.base?.ref !== 'main') return false

  return pullRequest.head?.repo?.full_name === repository
}

const validateVersionedBranch = (branch, version, previousVersion) => {
  const expectedVersion = branch.startsWith('release/v') ? branch.slice('release/v'.length) : ''

  if (!valid(expectedVersion) || expectedVersion.includes('-') || expectedVersion.includes('+') || expectedVersion !== version) {
    throw new Error(`Release branch ${branch} must match the stable Basic package version: release/v${version}.`)
  }

  if (!valid(version) || !valid(previousVersion) || !gt(version, previousVersion)) {
    throw new Error(`A release must increase the Basic version (${previousVersion} → ${version}).`)
  }
}

export const validateConsumedChangesets = fileNames => {
  const pending = fileNames.filter(name => name.endsWith('.md') && name !== 'README.md')

  if (pending.length > 0) {
    throw new Error(`Release metadata must consume all pending changesets: ${pending.join(', ')}.`)
  }
}

export const validateReleaseSource = ({ eventName, ref, pullRequest, repository, version, previousVersion, candidate = false }) => {
  if (eventName === 'workflow_dispatch') {
    if (ref !== 'refs/heads/main') throw new Error('Release recovery must run from main.')

    return
  }

  if (eventName !== 'pull_request' || !isTrustedPullRequest(pullRequest, repository, candidate)) {
    throw new Error('Publishing requires a merged release pull request from this repository into main.')
  }

  // Independent Changesets releases may bump only another package.
  if (pullRequest.head.ref === 'changeset-release/main') return

  validateVersionedBranch(pullRequest.head.ref, version, previousVersion)
}

if (process.argv[1]?.endsWith('check-release-source.mjs')) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
  const manifest = JSON.parse(readFileSync('packages/basic/package.json', 'utf8'))

  validateReleaseSource({
    candidate: process.env.RELEASE_CANDIDATE === 'true',
    eventName: process.env.GITHUB_EVENT_NAME,
    ref: process.env.GITHUB_REF,
    pullRequest: event.pull_request,
    repository: process.env.GITHUB_REPOSITORY,
    version: manifest.version,
    previousVersion: process.env.RELEASE_PREVIOUS_VERSION
  })

  validateConsumedChangesets(readdirSync('.changeset'))

  console.log(`Validated release source for Basic ${manifest.version}.`)
}
