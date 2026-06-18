import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { describe, expect, test } from 'vitest'

interface ExportEntry {
  import?: string
  types?: string
}

interface PackageJson {
  bin?: Record<string, string> | string
  exports?: Record<string, ExportEntry>
  name: string
  private?: boolean
  types?: string
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const packagesDir = join(repoRoot, 'packages')

const readPackageJson = (packageDir: string): PackageJson => JSON.parse(
  readFileSync(join(packageDir, 'package.json'), 'utf8')
) as PackageJson

const publicPackages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => join(packagesDir, entry.name))
  .filter(packageDir => existsSync(join(packageDir, 'package.json')))
  .map(packageDir => ({
    dir: packageDir,
    manifest: readPackageJson(packageDir)
  }))
  .filter(({ manifest }) => manifest.private !== true)

describe('package artifacts', () => {
  test.each(publicPackages)('$manifest.name exposes built entry points', async ({ dir, manifest }) => {
    expect(manifest.exports, `${manifest.name} should declare package exports`).toBeDefined()

    for (const [exportPath, entry] of Object.entries(manifest.exports ?? {})) {
      expect(entry.import, `${manifest.name}${exportPath} should declare an import path`).toBeDefined()
      expect(entry.types, `${manifest.name}${exportPath} should declare a types path`).toBeDefined()

      const importPath = join(dir, entry.import ?? '')
      const typesPath = join(dir, entry.types ?? '')

      expect(existsSync(importPath), `${manifest.name}${exportPath} import artifact is missing`).toBe(true)
      expect(existsSync(typesPath), `${manifest.name}${exportPath} types artifact is missing`).toBe(true)
      await expect(import(pathToFileURL(importPath).href)).resolves.toBeDefined()
    }

    const typesArtifactPaths = manifest.types ? [join(dir, manifest.types)] : []

    for (const typesArtifactPath of typesArtifactPaths) {
      expect(existsSync(typesArtifactPath), `${manifest.name} package types artifact is missing`).toBe(true)
    }
  })

  test.each(publicPackages)('$manifest.name exposes executable bin files', ({ dir, manifest }) => {
    if (!manifest.bin) {
      return
    }

    const bins = typeof manifest.bin === 'string' ?
      { [manifest.name]: manifest.bin } :
      manifest.bin

    for (const [binName, binPath] of Object.entries(bins)) {
      expect(existsSync(join(dir, binPath)), `${manifest.name} bin "${binName}" is missing`).toBe(true)
    }
  })
})
