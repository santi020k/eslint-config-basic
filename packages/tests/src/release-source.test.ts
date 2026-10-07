import { describe, expect, test } from 'vitest'

import type { ReleaseSource } from '../../../scripts/check-release-source.mjs'
import { validateConsumedChangesets, validateReleaseSource } from '../../../scripts/check-release-source.mjs'

const source: ReleaseSource = {
  eventName: 'pull_request',
  ref: 'refs/heads/main',
  repository: 'santi020k/eslint-config-basic',
  version: '3.6.0',
  previousVersion: '3.5.4',
  pullRequest: {
    merged: true,
    base: { ref: 'main' },
    head: { ref: 'release/v3.6.0', repo: { full_name: 'santi020k/eslint-config-basic' } }
  }
}

const fromBranch = (branch: string): ReleaseSource => ({
  ...source,
  pullRequest: {
    merged: true,
    base: { ref: 'main' },
    head: { ref: branch, repo: { full_name: source.repository } }
  }
})

describe('release source authorization', () => {
  test.each(['release/v3.6.0', 'changeset-release/main'])('accepts merged versioned release from %s', branch => {
    expect(() => {
      validateReleaseSource(fromBranch(branch))
    }).not.toThrow()
  })

  test.each(['feature/release', 'release/v3.5.4', 'release/v3.6.0-beta.1', 'release/v3.6.0+build'])('rejects invalid release source %s', branch => {
    expect(() => {
      validateReleaseSource(fromBranch(branch))
    }).toThrow('must match the stable Basic package version')
  })

  test('preserves independent package releases on the generated Changesets branch', () => {
    expect(() => {
      validateReleaseSource({ ...fromBranch('changeset-release/main'), previousVersion: '3.6.0' })
    }).not.toThrow()
  })

  test('rejects forks, unmerged pull requests, and alternate targets', () => {
    for (const pullRequest of [
      { merged: false, base: { ref: 'main' }, head: { ref: 'release/v3.6.0', repo: { full_name: source.repository } } },
      { merged: true, base: { ref: 'other' }, head: { ref: 'release/v3.6.0', repo: { full_name: source.repository } } },
      { merged: true, base: { ref: 'main' }, head: { ref: 'release/v3.6.0', repo: { full_name: 'fork/repo' } } },
      { merged: true, base: { ref: 'main' }, head: { ref: 'release/v3.6.0', repo: null } }
    ]) {
      expect(() => {
        validateReleaseSource({ ...source, pullRequest })
      }).toThrow('merged release pull request')
    }
  })

  test.each(['3.6.0', '3.7.0', 'invalid'])('rejects non-increasing or invalid previous version %s', previousVersion => {
    expect(() => {
      validateReleaseSource({ ...source, previousVersion })
    }).toThrow('must increase')
  })

  test('checks a pre-merge candidate without weakening publish authorization', () => {
    const candidateSource = { ...source, pullRequest: { merged: false, base: { ref: 'main' }, head: { ref: 'release/v3.6.0', repo: { full_name: source.repository } } } }

    expect(() => {
      validateReleaseSource({ ...candidateSource, candidate: true })
    }).not.toThrow()
    expect(() => {
      validateReleaseSource(candidateSource)
    }).toThrow('merged release pull request')
    expect(() => {
      validateReleaseSource({ ...fromBranch('release/v3.7.0'), candidate: true })
    }).toThrow('must match')
  })

  test('permits idempotent recovery only on main', () => {
    expect(() => {
      validateReleaseSource({ ...source, eventName: 'workflow_dispatch' })
    }).not.toThrow()
    expect(() => {
      validateReleaseSource({ ...source, eventName: 'workflow_dispatch', ref: 'refs/heads/feature/test' })
    }).toThrow('must run from main')
    expect(() => {
      validateReleaseSource({ ...source, eventName: 'push' })
    }).toThrow('merged release pull request')
  })
})

describe('release changeset consumption', () => {
  test('accepts only support files after version preparation', () => {
    expect(() => {
      validateConsumedChangesets(['README.md', 'config.json'])
    }).not.toThrow()
  })

  test('rejects pending public or documentation changesets', () => {
    expect(() => {
      validateConsumedChangesets(['README.md', 'consumer-config-improvements.md', 'docs-reference-links.md'])
    }).toThrow('Release metadata must consume all pending changesets')
  })
})
