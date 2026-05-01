import { execSync, spawnSync } from 'node:child_process'

const isFixMode = process.argv.includes('--fix')

const resolveBaseRef = () => {
  const candidates = [
    'git merge-base --fork-point origin/main HEAD',
    'git merge-base origin/main HEAD',
    'git merge-base main HEAD'
  ]

  for (const command of candidates) {
    try {
      return execSync(command, { encoding: 'utf-8' }).trim()
    } catch {
      // Try next fallback candidate.
    }
  }

  return ''
}

const listChangedFiles = (baseRef) => {
  if (!baseRef) {
    return []
  }

  const rawOutput = execSync(
    `git diff --name-only --diff-filter=ACMR ${baseRef}...HEAD`,
    { encoding: 'utf-8' }
  )

  const eslintExt = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'])

  return rawOutput
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .filter(filePath => eslintExt.has(filePath.slice(filePath.lastIndexOf('.'))))
}

const baseRef = resolveBaseRef()
const changedFiles = listChangedFiles(baseRef)

if (changedFiles.length === 0) {
  console.info('[lint:changed] No changed JS/TS files detected.')
  process.exitCode = 0
} else {
  const args = ['eslint', '--no-warn-ignored', ...(isFixMode ? ['--fix'] : []), ...changedFiles]
  const result = spawnSync('pnpm', args, { stdio: 'inherit' })

  process.exitCode = result.status ?? 1
}
