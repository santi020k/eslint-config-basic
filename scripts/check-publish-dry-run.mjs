import { execFileSync } from 'node:child_process'
import process from 'node:process'

import { getBuiltPublishablePackages } from './publishable-packages.mjs'

const allowEmpty = process.argv.includes('--allow-empty')
const publishablePackages = getBuiltPublishablePackages()

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
