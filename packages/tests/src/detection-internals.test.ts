import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, sep } from 'node:path'

import { Runtime } from '@santi020k/eslint-config-basic'
import { __detectionInternals } from '@santi020k/eslint-config-core'

import { afterEach, beforeEach, describe, expect, test } from 'vitest'

describe('detection internals', () => {
  test('detectFrameworks deduplicates implied react entries', () => {
    const options = __detectionInternals.createDefaultOptions()
    const setRuntime = __detectionInternals.createRuntimeSetter(options)

    const frameworks = __detectionInternals.detectFrameworks({
      expo: 'latest',
      next: 'latest',
      react: 'latest'
    }, process.cwd(), setRuntime)

    const reactCount = frameworks?.filter(name => name === 'react').length ?? 0

    expect(reactCount).toBe(1)
  })

  test('runtime setter always keeps higher-priority runtime', () => {
    const options = __detectionInternals.createDefaultOptions()
    const setRuntime = __detectionInternals.createRuntimeSetter(options)

    setRuntime(Runtime.Browser)
    setRuntime(Runtime.Node)
    setRuntime(Runtime.Universal)

    expect(options.runtime).toBe(Runtime.Node)
  })
})

describe('parsePnpmWorkspacePatterns', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), `eslint-config-test-${sep === '\\' ? 'win' : 'nix'}-`))
  })

  afterEach(() => {
    rmSync(tmpDir, { force: true, recursive: true })
  })

  test('returns empty array when pnpm-workspace.yaml does not exist', () => {
    expect(__detectionInternals.parsePnpmWorkspacePatterns(tmpDir)).toEqual([])
  })

  test('parses package patterns from pnpm-workspace.yaml', () => {
    writeFileSync(join(tmpDir, 'pnpm-workspace.yaml'), [
      'packages:',
      '  - \'apps/*\'',
      '  - \'services/*\'',
      '  - \'!**/node_modules/**\''
    ].join('\n'))

    expect(__detectionInternals.parsePnpmWorkspacePatterns(tmpDir)).toEqual([
      'apps/*',
      'services/*',
      '!**/node_modules/**'
    ])
  })

  test('stops parsing at the next top-level key', () => {
    writeFileSync(join(tmpDir, 'pnpm-workspace.yaml'), [
      'packages:',
      '  - \'packages/*\'',
      'catalogs:',
      '  - \'some-entry\''
    ].join('\n'))

    expect(__detectionInternals.parsePnpmWorkspacePatterns(tmpDir)).toEqual(['packages/*'])
  })

  test('returns empty array when pnpm-workspace.yaml has no packages key', () => {
    writeFileSync(join(tmpDir, 'pnpm-workspace.yaml'), 'catalogs:\n  react: ^19.0.0\n')
    expect(__detectionInternals.parsePnpmWorkspacePatterns(tmpDir)).toEqual([])
  })

  test('detectProjects scans dirs declared in pnpm-workspace.yaml', () => {
    writeFileSync(join(tmpDir, 'pnpm-workspace.yaml'), 'packages:\n  - \'services/*\'\n')
    writeFileSync(join(tmpDir, 'package.json'), '{}')
    mkdirSync(join(tmpDir, 'services', 'api'), { recursive: true })
    writeFileSync(join(tmpDir, 'services', 'api', 'package.json'), '{}')

    const projects = __detectionInternals.detectProjects({}, tmpDir)

    expect(Object.keys(projects)).toContain('services/api')
  })
})
