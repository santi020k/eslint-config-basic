import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

import { readChangedFiles } from './affected-changes.mjs'

const isFixMode = process.argv.includes('--fix')

const changedFiles = readChangedFiles({
  base: process.env.CI_BASE_SHA || process.env.TURBO_SCM_BASE,
  head: process.env.CI_HEAD_SHA || process.env.TURBO_SCM_HEAD || 'HEAD'
})

const sharedInputs = ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', '.npmrc', 'turbo.json', 'tsconfig.base.json']
const fullLint = changedFiles === null || changedFiles.some(file => sharedInputs.includes(file) || /^eslint\.config\./u.test(file))
const eslintExt = new Set(['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx'])
const selected = fullLint ? undefined : changedFiles.filter(file => existsSync(file) && eslintExt.has(file.slice(file.lastIndexOf('.'))))

if (selected && selected.length === 0) {
  process.stdout.write('[lint:changed] No changed JS/TS files detected.\n')
} else {
  const args = selected
    ? ['exec', 'eslint', '--no-warn-ignored', '--max-warnings=0', ...(isFixMode ? ['--fix'] : []), '--', ...selected]
    : ['run', isFixMode ? 'lint:repo:fix' : 'lint:repo']

  const result = spawnSync('pnpm', args, { stdio: 'inherit' })

  if (result.error) throw result.error

  process.exitCode = result.status ?? 1
}
