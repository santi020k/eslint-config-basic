import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import { createPeerHealthReport } from '../../../scripts/check-peer-health.mjs'

const tempDirs: string[] = []

const createTempProject = (): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'eslint-config-peer-health-'))

  tempDirs.push(cwd)
  writeFileSync(join(cwd, 'package.json'), JSON.stringify({
    devDependencies: {
      '@graphql-eslint/eslint-plugin': '^4.0.0'
    },
    name: 'peer-health-test'
  }))

  return cwd
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { force: true, recursive: true })
  }
})

describe('peer health policy', () => {
  test('does not accept a missing peer through an incompatible-peer exception', () => {
    const cwd = createTempProject()
    const occurrence = {
      parents: [{ name: '@graphql-eslint/eslint-plugin' }],
      wantedRange: '^16'
    }
    const report = createPeerHealthReport(cwd, {
      'packages/formats': {
        bad: {
          graphql: [{ ...occurrence, foundVersion: '17.0.0' }]
        },
        missing: {
          graphql: [occurrence]
        }
      }
    }, {
      accepted: [{
        introducedBy: '@graphql-eslint/eslint-plugin',
        kind: 'incompatible',
        owner: 'packages/formats',
        peer: 'graphql',
        removalCondition: 'Remove after upstream support.',
        wantedRange: '^16'
      }]
    })

    expect(report.accepted).toHaveLength(1)
    expect(report.accepted[0]?.kind).toBe('incompatible')
    expect(report.actionable).toHaveLength(1)
    expect(report.actionable[0]?.kind).toBe('missing')
    expect(report.healthy).toBe(false)
  })

  test('accepts a config package exception in an external consumer project', () => {
    const cwd = createTempProject()
    const report = createPeerHealthReport(cwd, {
      '.': {
        bad: {
          eslint: [{
            foundVersion: '10.8.0',
            parents: [{ name: '@santi020k/eslint-config-astro' }],
            wantedRange: '^8 || ^9'
          }]
        }
      }
    }, {
      accepted: [{
        introducedBy: '@santi020k/eslint-config-astro',
        kind: 'incompatible',
        owner: 'packages/astro',
        peer: 'eslint',
        removalCondition: 'Remove after upstream support.',
        wantedRange: '^8 || ^9'
      }]
    })

    expect(report.actionable).toEqual([])
    expect(report.accepted).toHaveLength(1)
    expect(report.accepted[0]?.project).toBe('.')
    expect(report.accepted[0]?.owner).toBe('packages/astro')
  })

  test('attributes Full transitive peer warnings to the owning config package', () => {
    const cwd = createTempProject()
    const fullPackageDir = join(cwd, 'node_modules', '@santi020k', 'eslint-config-full')

    mkdirSync(fullPackageDir, { recursive: true })
    writeFileSync(join(cwd, 'package.json'), JSON.stringify({
      dependencies: {
        '@santi020k/eslint-config-full': '^3.2.0'
      },
      name: 'full-peer-health-test'
    }))
    writeFileSync(join(fullPackageDir, 'package.json'), JSON.stringify({
      dependencies: {
        '@santi020k/eslint-config-astro': '^3.2.0'
      },
      name: '@santi020k/eslint-config-full'
    }))

    const report = createPeerHealthReport(cwd, {
      '.': {
        bad: {
          eslint: [{
            foundVersion: '10.8.0',
            parents: [{ name: '@santi020k/eslint-config-astro' }],
            wantedRange: '^8 || ^9'
          }]
        }
      }
    }, {
      accepted: [{
        introducedBy: '@santi020k/eslint-config-astro',
        kind: 'incompatible',
        owner: 'packages/astro',
        peer: 'eslint',
        removalCondition: 'Remove after upstream support.',
        wantedRange: '^8 || ^9'
      }]
    })

    expect(report.actionable).toEqual([])
    expect(report.accepted[0]?.introducedBy).toBe('@santi020k/eslint-config-astro')
    expect(report.accepted[0]?.owner).toBe('packages/astro')
  })

  test('does not accept an exception owned by another workspace project', () => {
    const cwd = createTempProject()
    const report = createPeerHealthReport(cwd, {
      'packages/other': {
        bad: {
          graphql: [{
            foundVersion: '17.0.0',
            parents: [{ name: '@graphql-eslint/eslint-plugin' }],
            wantedRange: '^16'
          }]
        }
      }
    }, {
      accepted: [{
        introducedBy: '@graphql-eslint/eslint-plugin',
        kind: 'incompatible',
        owner: 'packages/formats',
        peer: 'graphql',
        removalCondition: 'Remove after upstream support.',
        wantedRange: '^16'
      }]
    })

    expect(report.accepted).toEqual([])
    expect(report.actionable).toHaveLength(1)
    expect(report.actionable[0]?.project).toBe('packages/other')
  })
})
