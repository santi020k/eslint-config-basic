import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

// @ts-expect-error -- the JavaScript release script intentionally has no TypeScript declaration
// eslint-disable-next-line import/no-relative-packages -- release script behavior is exercised from the test package
import { createInternalCompatibilityReport } from '../../../scripts/check-internal-compatibility.mjs'

const tempDirs: string[] = []

interface CompatibilityIssue { dependent?: string, kind: string }

const createWorkspace = (manifests: Record<string, Record<string, unknown>>): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'eslint-config-internal-compatibility-'))

  tempDirs.push(cwd)

  for (const [directory, manifest] of Object.entries(manifests)) {
    const packageDir = join(cwd, 'packages', directory)

    mkdirSync(packageDir, { recursive: true })
    writeFileSync(join(packageDir, 'package.json'), JSON.stringify(manifest))
  }

  return cwd
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('internal package compatibility policy', () => {
  test('accepts independent minor and patch versions on one major', () => {
    const cwd = createWorkspace({
      basic: {
        dependencies: { '@santi020k/eslint-config-core': 'workspace:^' },
        name: '@santi020k/eslint-config-basic',
        version: '3.4.0'
      },
      core: {
        name: '@santi020k/eslint-config-core',
        version: '3.2.1'
      },
      react: {
        dependencies: { '@santi020k/eslint-config-core': 'workspace:^' },
        name: '@santi020k/eslint-config-react',
        version: '3.1.3'
      }
    })

    const report = createInternalCompatibilityReport(cwd)

    expect(report.healthy).toBe(true)
    expect(report.familyMajor).toBe(3)
    expect(report.edges).toHaveLength(2)
  })

  test('rejects exact or non-workspace production internal ranges', () => {
    const cwd = createWorkspace({
      basic: {
        dependencies: { '@santi020k/eslint-config-core': 'workspace:*' },
        name: '@santi020k/eslint-config-basic',
        version: '3.4.0'
      },
      core: {
        name: '@santi020k/eslint-config-core',
        version: '3.2.1'
      }
    })

    const report = createInternalCompatibilityReport(cwd)

    expect(report.healthy).toBe(false)
    expect(report.issues).toContainEqual(expect.objectContaining({
      dependent: '@santi020k/eslint-config-basic',
      expectedRange: 'workspace:^',
      kind: 'invalid-internal-range',
      target: '@santi020k/eslint-config-core'
    }))
  })

  test('identifies every dependent left behind by a major release', () => {
    const cwd = createWorkspace({
      basic: {
        dependencies: { '@santi020k/eslint-config-core': 'workspace:^' },
        name: '@santi020k/eslint-config-basic',
        version: '3.4.0'
      },
      core: {
        name: '@santi020k/eslint-config-core',
        version: '4.0.0'
      },
      react: {
        peerDependencies: { '@santi020k/eslint-config-core': 'workspace:^' },
        name: '@santi020k/eslint-config-react',
        version: '3.1.0'
      }
    })

    const report = createInternalCompatibilityReport(cwd)
    const issues = report.issues as CompatibilityIssue[]
    const affectedDependents = issues.flatMap(issue => (
      issue.kind === 'internal-major-mismatch' && issue.dependent ? [issue.dependent] : []
    ))

    expect(report.healthy).toBe(false)
    expect(affectedDependents).toEqual([
      '@santi020k/eslint-config-basic',
      '@santi020k/eslint-config-react'
    ])
    expect(report.issues).toContainEqual(expect.objectContaining({
      expectedMajor: 3,
      foundMajor: 4,
      kind: 'family-major-mismatch',
      package: '@santi020k/eslint-config-core'
    }))
  })

  test('rejects internal references to missing packages', () => {
    const cwd = createWorkspace({
      basic: {
        optionalDependencies: { '@santi020k/eslint-config-missing': 'workspace:^' },
        name: '@santi020k/eslint-config-basic',
        version: '3.4.0'
      }
    })

    const report = createInternalCompatibilityReport(cwd)

    expect(report.issues).toContainEqual(expect.objectContaining({
      dependent: '@santi020k/eslint-config-basic',
      kind: 'missing-internal-target',
      target: '@santi020k/eslint-config-missing'
    }))
  })
})
