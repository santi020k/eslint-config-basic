import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const rootDir = process.cwd()
const packagesDir = join(rootDir, 'packages')
const allowEmpty = process.argv.includes('--allow-empty')

const publishablePackages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => join(packagesDir, entry.name))
  .filter(packageDir => {
    const manifestPath = join(packageDir, 'package.json')

    if (!existsSync(manifestPath)) return false

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

    return manifest.private !== true && existsSync(join(packageDir, 'dist'))
  })

if (publishablePackages.length === 0 && !allowEmpty) {
  throw new Error('No built publishable packages found. Run `pnpm run build` first.')
}

let failed = false

for (const packageDir of publishablePackages) {
  process.stdout.write(`\npnpm publish --dry-run ${packageDir}\n`)

  try {
    execFileSync('pnpm', ['publish', '--dry-run', '--no-git-checks'], {
      cwd: packageDir,
      stdio: 'inherit'
    })
  } catch {
    failed = true
  }
}

process.exitCode = failed ? 1 : 0
