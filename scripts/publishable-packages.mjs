import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'

const toPosixPath = path => path.replaceAll('\\', '/')

export const getBuiltPublishablePackages = () => {
  const rootDir = process.cwd()
  const packagesDir = join(rootDir, 'packages')
  const hasAffectedRange = Boolean(process.env.CI_BASE_SHA || process.env.TURBO_SCM_BASE)
  let affectedPaths

  if (hasAffectedRange) {
    const output = execFileSync(
      'pnpm',
      ['exec', 'turbo', 'ls', '--affected', '--output=json'],
      { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }
    )

    const workspace = JSON.parse(output)

    affectedPaths = new Set(
      workspace.packages.items.map(({ path }) => toPosixPath(path))
    )
  }

  return readdirSync(packagesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => join(packagesDir, entry.name))
    .filter(packageDir => {
      const manifestPath = join(packageDir, 'package.json')

      if (!existsSync(manifestPath)) return false

      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
      const workspacePath = toPosixPath(relative(rootDir, packageDir))

      return manifest.private !== true &&
        existsSync(join(packageDir, 'dist')) &&
        (!affectedPaths || affectedPaths.has(workspacePath))
    })
}
