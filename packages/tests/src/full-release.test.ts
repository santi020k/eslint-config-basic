import { describe, expect, test } from 'vitest'

import {
  createFullReleaseReport,
  parseChangesetPackages
} from '../../../scripts/check-full-release.mjs'

const fullDependencies = [
  '@santi020k/eslint-config-astro',
  '@santi020k/eslint-config-basic',
  '@santi020k/eslint-config-formats'
]

describe('Full release changeset gate', () => {
  test('parses quoted and unquoted config package entries', () => {
    expect(parseChangesetPackages(`---
'@santi020k/eslint-config-basic': patch
"@santi020k/eslint-config-astro": minor
@santi020k/eslint-config-formats: patch
---
`)).toEqual(fullDependencies.slice(1, 2).concat(
      fullDependencies.slice(0, 1),
      fullDependencies.slice(2)
    ))
  })

  test('requires Full when an aggregated package changes', () => {
    const report = createFullReleaseReport(fullDependencies, [`---
'@santi020k/eslint-config-basic': patch
---
`])

    expect(report.valid).toBe(false)
    expect(report.changedDependencies).toEqual(['@santi020k/eslint-config-basic'])
  })

  test('accepts a Full release in the same or a separate changeset', () => {
    const report = createFullReleaseReport(fullDependencies, [`---
'@santi020k/eslint-config-astro': patch
---
`, `---
'@santi020k/eslint-config-full': patch
---
`])

    expect(report.valid).toBe(true)
    expect(report.fullReleasePresent).toBe(true)
  })

  test('does not require Full for unrelated package releases', () => {
    const report = createFullReleaseReport(fullDependencies, [`---
'@santi020k/eslint-config-core': patch
---
`])

    expect(report).toEqual({
      changedDependencies: [],
      fullReleasePresent: false,
      fullReleaseRequired: false,
      valid: true
    })
  })
})
