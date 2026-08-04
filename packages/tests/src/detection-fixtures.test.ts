import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { detectProjectOptions, Format, Library, NextMode, Preset, Runtime, Tool } from '@santi020k/eslint-config-basic'
import { afterEach, describe, expect, test } from 'vitest'

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
  test.each([
    ['index.d.ts', { 'index.d.ts': 'export interface Theme {}' }, 'syntax'],
    ['index.d.mts', { 'index.d.mts': 'export interface Preset {}' }, 'syntax'],
    [
      'JavaScript plus declarations',
      {
        'src/index.d.ts': 'export declare const value: string',
        'src/index.js': 'export const value = "ok"'
      },
      'syntax'
    ],
    ['package without TypeScript files', { 'index.js': 'export const value = "ok"' }, false]
  ])('selects a safe TypeScript mode for %s without a tsconfig', (_label, files, expected) => {
    const dirs = Object.keys(files).some(fileName => fileName.startsWith('src/')) ? ['src'] : []
    const dir = createFixtureProject({ name: 'fixture' }, dirs, files)

    expect(detectProjectOptions(dir).typescript).toBe(expected)
  })

  test('resolves runtime and preset for Next + Nest + TypeScript fixtures', () => {
    const dir = createFixtureProject(
      {
        dependencies: {
          '@nestjs/core': 'latest',
          next: 'latest'
        }
      }, ['app'], { 'tsconfig.json': '{}' }
    )

    const options = detectProjectOptions(dir)

    expect(options.runtime).toBe(Runtime.Node)
    expect(options.preset).toBe(Preset.Node)
    expect(options.nextMode).toBe(NextMode.AppRouter)
  })

  test('resolves Cloudflare runtime for Hono Cloudflare fixtures', () => {
    const dir = createFixtureProject(
      {
        dependencies: { hono: 'latest' },
        devDependencies: { wrangler: 'latest' }
      }, [], { 'tsconfig.base.json': '{}' }
    )

    const options = detectProjectOptions(dir)

    expect(options.runtime).toBe(Runtime.Cloudflare)
    expect(options.preset).toBe(Preset.Worker)
    expect(options.detectedFrameworks).toContain('hono')
  })

  test('detects graphql format when only schema file exists', () => {
    const dir = createFixtureProject(
      { dependencies: {} }, [], { 'schema.graphql': 'type Query { hello: String }' }
    )

    const options = detectProjectOptions(dir)

    expect(options.formats).toContain(Format.Graphql)
  })

  test('keeps Expo runtime universal while still implying react', () => {
    const dir = createFixtureProject({
      dependencies: { expo: 'latest' }
    })

    const options = detectProjectOptions(dir)

    expect(options.runtime).toBe(Runtime.Universal)
    expect(options.detectedFrameworks).toContain('expo')
    expect(options.detectedFrameworks).toContain('react')
  })

  test('detects Astro from component files without a package dependency', () => {
    const dir = createFixtureProject(
      { name: 'shared-theme' },
      ['components'],
      { 'components/AppleIcon.astro': '<svg aria-hidden="true"></svg>\n' }
    )

    const options = detectProjectOptions(dir)

    expect(options.detectedFrameworks).toContain('astro')
    expect(options.runtime).toBe(Runtime.Browser)
  })

  test('detects Astro in a mixed React package with deeply nested templates', () => {
    const dir = createFixtureProject(
      {
        devDependencies: {
          astro: 'latest',
          react: 'latest'
        },
        name: 'mixed-component-library'
      },
      ['templates/astro/saas-admin/src/lumen'],
      {
        'templates/astro/saas-admin/src/lumen/saas-admin.astro': '<main>Admin</main>\n'
      }
    )

    const options = detectProjectOptions(dir)

    expect(options.detectedFrameworks).toContain('astro')
    expect(options.detectedFrameworks).toContain('react')
  })

  test('detects Vite fixtures with Tailwind adapter packages and config files', () => {
    const pkgJson = { devDependencies: { '@tailwindcss/vite': 'latest', vite: 'latest' } }
    const extraFiles = {
      '.prettierrc': '{}',
      'cspell.config.yml': 'version: "0.2"\n',
      'tsconfig.json': '{}',
      'vite.config.ts': 'export default {}'
    }
    const dir = createFixtureProject(pkgJson, [], extraFiles)

    const options = detectProjectOptions(dir)

    expect(options.detectedFrameworks).toContain('vite')
    expect(options.libraries).toContain(Library.Tailwind)
    expect(options.tools).toContain(Tool.Prettier)
    expect(options.tools).toContain(Tool.Cspell)
    expect(options.formats).toContain(Format.Yaml)
    expect(options.runtime).toBe(Runtime.Browser)
    expect(options.preset).toBe(Preset.Browser)
  })

  test('detects Slidev fixtures as Slidev + Vue without adding Vite separately', () => {
    const pkgJson = { dependencies: { '@slidev/cli': 'latest', vite: 'latest', vue: 'latest' } }
    const extraFiles = { 'slides.md': '# Deck\n\n{{ 1 + 1 }}', 'tsconfig.json': '{}' }
    const dir = createFixtureProject(pkgJson, [], extraFiles)

    const options = detectProjectOptions(dir)

    expect(options.detectedFrameworks).toContain('slidev')
    expect(options.detectedFrameworks).toContain('vue')
    expect(options.detectedFrameworks).not.toContain('vite')
    expect(options.formats).toContain(Format.Markdown)
    expect(options.runtime).toBe(Runtime.Browser)
  })
})
