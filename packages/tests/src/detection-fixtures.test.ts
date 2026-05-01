import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { detectProjectOptions, Format, NextMode, Preset, Runtime } from '@santi020k/eslint-config-basic'

const tempDirs: string[] = []

const createFixtureProject = (
  packageJson: Record<string, unknown>,
  dirs: string[] = [],
  files: Record<string, string> = {}
): string => {
  const projectDir = mkdtempSync(join(tmpdir(), 'eslint-config-detection-fixture-'))
  tempDirs.push(projectDir)

  writeFileSync(join(projectDir, 'package.json'), JSON.stringify(packageJson))

  for (const dir of dirs) {
    mkdirSync(join(projectDir, dir), { recursive: true })
  }

  for (const [filePath, contents] of Object.entries(files)) {
    writeFileSync(join(projectDir, filePath), contents)
  }

  return projectDir
}

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()

    if (dir) {
      rmSync(dir, { force: true, recursive: true })
    }
  }
})

describe('detectProjectOptions fixture matrix', () => {
  it('resolves runtime and preset for Next + Nest + TypeScript fixtures', () => {
    const dir = createFixtureProject(
      {
        dependencies: {
          next: 'latest',
          '@nestjs/core': 'latest'
        }
      }, ['app'], { 'tsconfig.json': '{}' }
    )

    const options = detectProjectOptions(dir)

    expect(options.runtime).toBe(Runtime.Node)
    expect(options.preset).toBe(Preset.Node)
    expect(options.nextMode).toBe(NextMode.AppRouter)
  })

  it('resolves Worker runtime for Hono Cloudflare fixtures', () => {
    const dir = createFixtureProject(
      {
        dependencies: { hono: 'latest' },
        devDependencies: { wrangler: 'latest' }
      }, [], { 'tsconfig.base.json': '{}' }
    )

    const options = detectProjectOptions(dir)

    expect(options.runtime).toBe(Runtime.Worker)
    expect(options.preset).toBe(Preset.Worker)
    expect(options.detectedFrameworks).toContain('hono')
  })

  it('detects graphql format when only schema file exists', () => {
    const dir = createFixtureProject(
      { dependencies: {} }, [], { 'schema.graphql': 'type Query { hello: String }' }
    )

    const options = detectProjectOptions(dir)

    expect(options.formats).toContain(Format.Graphql)
  })

  it('keeps Expo runtime universal while still implying react', () => {
    const dir = createFixtureProject({
      dependencies: { expo: 'latest' }
    })

    const options = detectProjectOptions(dir)

    expect(options.runtime).toBe(Runtime.Universal)
    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react')
  })
})
