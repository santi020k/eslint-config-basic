import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'

const requiresWindows = (eventName, release, windows) => eventName !== 'pull_request' || release || windows === 'true'

export const verifyGate = (results, eventName, headRef) => {
  const release = eventName === 'pull_request' && /^(release\/v|changeset-release\/main$)/u.test(headRef)
  const windows = results.scope?.outputs?.windows

  assert.ok(['true', 'false'].includes(windows), 'Windows selection must be explicit')

  const requireWindows = requiresWindows(eventName, release, windows)

  const required = ['scope', 'impact-plan', 'package-manager-consumers',
    ...(requireWindows ? ['windows-smoke'] : []),
    ...(release ? ['release-candidate', 'release-node24'] : ['contracts', 'build', 'package-validation'])]

  for (const [name, job] of Object.entries(results)) {
    assert.ok(['success', 'skipped'].includes(job.result), `${name} failed or was cancelled`)
  }

  for (const name of required) assert.equal(results[name]?.result, 'success', `${name} must succeed`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  verifyGate(JSON.parse(process.env.REQUIRED_RESULTS ?? '{}'), process.env.EVENT_NAME, process.env.HEAD_REF ?? '')
}
