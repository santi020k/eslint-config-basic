// Runs "Are The Types Wrong" against every publishable workspace package.
// publint (check:exports) validates the manifest; attw validates what
// TypeScript actually resolves from the packed tarball. The esm-only profile
// matches this repo's ESM-only exports.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const rootDir = process.cwd()
const packagesDir = join(rootDir, 'packages')

const publishablePackages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => join(packagesDir, entry.name))
  .filter(packageDir => {
    const manifestPath = join(packageDir, 'package.json')

    if (!existsSync(manifestPath)) return false

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

    return manifest.private !== true && existsSync(join(packageDir, 'dist'))
  })

if (publishablePackages.length === 0) {
  throw new Error('No built publishable packages found. Run `pnpm run build` first.')
}

let failed = false

for (const packageDir of publishablePackages) {
  console.info(`\nattw --pack ${packageDir}`)

  try {
    execFileSync('pnpm', ['exec', 'attw', '--pack', packageDir, '--profile', 'esm-only'], {
      cwd: rootDir,
      stdio: 'inherit'
    })
  } catch {
    failed = true
  }
}

process.exitCode = failed ? 1 : 0
