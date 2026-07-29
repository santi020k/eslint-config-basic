import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, isAbsolute, join } from 'node:path'

const rootDir = process.cwd()
const tempDir = mkdtempSync(join(tmpdir(), 'eslint-config-v3-consumer-'))
const packageDirs = ['core', 'typescript', 'basic']

const readManifest = (packageDir) => JSON.parse(
  readFileSync(join(rootDir, 'packages', packageDir, 'package.json'), 'utf8')
)

const pack = (packageDir) => {
  const output = execFileSync(
    'pnpm',
    ['--dir', join(rootDir, 'packages', packageDir), 'pack', '--pack-destination', tempDir, '--json'],
    { encoding: 'utf8' }
  )

  const result = JSON.parse(output)
  const filename = Array.isArray(result) ? result.at(0)?.filename : result.filename

  if (!filename) throw new Error(`Unable to determine tarball name for ${packageDir}.`)

  return isAbsolute(filename) ? filename : join(tempDir, filename)
}

try {
  const tarballs = Object.fromEntries(packageDirs.map(packageDir => [packageDir, pack(packageDir)]))

  writeFileSync(join(tempDir, 'package.json'), JSON.stringify({
    dependencies: {
      '@santi020k/eslint-config-basic': `file:${tarballs.basic}`,
      '@santi020k/eslint-config-core': `file:${tarballs.core}`,
      '@santi020k/eslint-config-typescript': `file:${tarballs.typescript}`,
      eslint: '^10.0.0'
    },
    name: 'eslint-config-v3-consumer-check',
    private: true,
    type: 'module'
  }, null, 2))

  writeFileSync(
    join(tempDir, 'eslint.config.mjs'),
    'export { default } from \'@santi020k/eslint-config-basic/recommended\'\n'
  )

  writeFileSync(join(tempDir, 'index.js'), 'const unused = 1\n')

  execFileSync('npm', ['install', '--ignore-scripts', '--no-fund', '--no-audit'], {
    cwd: tempDir,
    stdio: 'pipe'
  })

  let lintFailedAsExpected = false
  let lintOutput = ''

  try {
    execFileSync(
      join(tempDir, 'node_modules', '.bin', 'eslint'),
      ['index.js'],
      { cwd: tempDir, encoding: 'utf8', stdio: 'pipe' }
    )
  } catch (error) {
    lintOutput = `${error.stdout ?? ''}${error.stderr ?? ''}`

    lintFailedAsExpected = lintOutput.includes('no-unused-vars')
  }

  if (!lintFailedAsExpected) {
    throw new Error(
      'The one-line consumer config did not execute the expected no-unused-vars rule.\n' +
      lintOutput
    )
  }

  const audit = JSON.parse(execFileSync(
    'npm',
    ['audit', '--omit=dev', '--json'],
    { cwd: tempDir, encoding: 'utf8', stdio: 'pipe' }
  ))

  const high = audit.metadata?.vulnerabilities?.high ?? 0
  const critical = audit.metadata?.vulnerabilities?.critical ?? 0

  if (high > 0 || critical > 0) {
    throw new Error(
      `Lean consumer audit failed with ${high} high and ${critical} critical vulnerabilities.`
    )
  }

  process.stdout.write(
    'V3 consumer verified: local tarballs install, the one-line config lints, ' +
    'and npm reports zero high/critical production vulnerabilities.\n'
  )

  const packageNameToDir = new Map(
    readdirSync(join(rootDir, 'packages'))
      .filter(packageDir => {
        try {
          return Boolean(readManifest(packageDir).name)
        } catch {
          return false
        }
      })
      .map(packageDir => [readManifest(packageDir).name, packageDir])
  )

  const fullManifest = readManifest('full')

  const fullPackageNames = new Set([
    fullManifest.name,
    ...Object.keys(fullManifest.dependencies),
    '@santi020k/eslint-config-core',
    '@santi020k/eslint-config-typescript'
  ])

  const fullTarballs = Object.fromEntries(
    [...fullPackageNames].map(packageName => {
      const packageDir = packageNameToDir.get(packageName)

      if (!packageDir) throw new Error(`Missing workspace package for ${packageName}.`)

      return [packageName, pack(packageDir)]
    })
  )

  const fullConsumerDir = join(tempDir, 'full-consumer')
  const fullConsumerTarballDir = join(fullConsumerDir, 'tarballs')

  mkdirSync(fullConsumerTarballDir, { recursive: true })

  const fullTarballRefs = Object.fromEntries(
    Object.entries(fullTarballs).map(([packageName, tarball]) => {
      const filename = basename(tarball)

      cpSync(tarball, join(fullConsumerTarballDir, filename))

      return [packageName, `file:./tarballs/${filename}`]
    })
  )

  writeFileSync(join(fullConsumerDir, 'package.json'), JSON.stringify({
    dependencies: {
      '@santi020k/eslint-config-full': fullTarballRefs['@santi020k/eslint-config-full'],
      eslint: '^10.0.0',
      react: '^19.0.0'
    },
    name: 'eslint-config-v3-full-consumer-check',
    private: true,
    type: 'module'
  }, null, 2))

  writeFileSync(
    join(fullConsumerDir, 'pnpm-workspace.yaml'),
    [
      'packages:',
      '  - .',
      'overrides:',
      ...Object.entries(fullTarballRefs).map(
        ([name, tarball]) => `  ${JSON.stringify(name)}: ${JSON.stringify(tarball)}`
      ),
      ''
    ].join('\n')
  )

  writeFileSync(
    join(fullConsumerDir, 'eslint.config.mjs'),
    'export { default } from \'@santi020k/eslint-config-full/recommended\'\n'
  )

  writeFileSync(join(fullConsumerDir, 'index.jsx'), 'export const App = () => <main>Hello</main>\n')

  execFileSync('pnpm', ['install', '--ignore-scripts'], {
    cwd: fullConsumerDir,
    stdio: 'pipe'
  })

  const fullConfigCheck = [
    'const module = await import("@santi020k/eslint-config-full/recommended");',
    'const config = module.default;',
    'if (!Array.isArray(config) || !config.some(entry => entry.name?.includes("react"))) process.exit(1);'
  ].join('')

  execFileSync(process.execPath, ['--input-type=module', '--eval', fullConfigCheck], {
    cwd: fullConsumerDir,
    stdio: 'pipe'
  })

  execFileSync(
    join(fullConsumerDir, 'node_modules', '.bin', 'eslint'),
    ['index.jsx'],
    { cwd: fullConsumerDir, stdio: 'pipe' }
  )

  process.stdout.write(
    'V3 full consumer verified: the meta-package supplies optional framework peers ' +
    'and the one-line config loads detected React rules.\n'
  )
} finally {
  rmSync(tempDir, { force: true, recursive: true })
}
