// Runs "Are The Types Wrong" against every publishable workspace package.
// publint (check:exports) validates the manifest; attw validates what
// TypeScript actually resolves from the packed tarball. The esm-only profile
// matches this repo's ESM-only exports.
import { spawn } from 'node:child_process'
import { availableParallelism } from 'node:os'
import process from 'node:process'

import { getBuiltPublishablePackages } from './publishable-packages.mjs'

const rootDir = process.cwd()
const allowEmpty = process.argv.includes('--allow-empty')
const publishablePackages = getBuiltPublishablePackages()

if (publishablePackages.length === 0 && !allowEmpty) {
  throw new Error('No built publishable packages found. Run `pnpm run build` first.')
}

const runAttw = packageDir => new Promise(resolve => {
  process.stdout.write(`\nattw --pack ${packageDir}\n`)

  const child = spawn(
    'pnpm',
    ['exec', 'attw', '--pack', packageDir, '--profile', 'esm-only'],
    { cwd: rootDir, stdio: 'inherit' }
  )

  child.once('error', () => resolve(false))

  child.once('exit', code => resolve(code === 0))
})

let failed = false
let nextPackageIndex = 0
const concurrency = Math.min(publishablePackages.length, availableParallelism(), 4)

const worker = async () => {
  while (nextPackageIndex < publishablePackages.length) {
    const packageDir = publishablePackages.at(nextPackageIndex)

    nextPackageIndex += 1

    if (!await runAttw(packageDir)) failed = true
  }
}

await Promise.all(Array.from({ length: concurrency }, worker))

process.exitCode = failed ? 1 : 0
