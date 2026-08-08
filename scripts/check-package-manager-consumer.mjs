import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, isAbsolute, join } from 'node:path'

const supportedManagers = new Set(['bun', 'npm', 'pnpm', 'yarn'])
const managerIndex = process.argv.indexOf('--manager')
const manager = managerIndex >= 0 ? process.argv.at(managerIndex + 1) : undefined

if (!manager || !supportedManagers.has(manager)) {
  throw new Error('Pass --manager with one of: bun, npm, pnpm, yarn.')
}

const rootDir = process.cwd()
const tempDir = mkdtempSync(join(tmpdir(), `eslint-config-${manager}-consumer-`))
const tarballDir = join(tempDir, 'tarballs')
const packageDirs = ['core', 'typescript', 'formats', 'tools', 'basic']

const packPackage = packageDir => {
  const output = execFileSync(
    'pnpm',
    ['--dir', join(rootDir, 'packages', packageDir), 'pack', '--pack-destination', tarballDir, '--json'],
    { encoding: 'utf8' }
  )

  const result = JSON.parse(output)
  const filename = Array.isArray(result) ? result.at(0)?.filename : result.filename

  if (!filename) throw new Error(`Unable to determine tarball name for ${packageDir}.`)

  return isAbsolute(filename) ? filename : join(tarballDir, filename)
}

const installArguments = {
  bun: ['install', '--ignore-scripts'],
  npm: ['install', '--ignore-scripts', '--no-audit', '--no-fund'],
  pnpm: ['install', '--ignore-scripts'],
  yarn: ['install', '--mode=skip-builds']
}

try {
  mkdirSync(tarballDir, { recursive: true })

  const tarballs = Object.fromEntries(packageDirs.map(packageDir => [packageDir, packPackage(packageDir)]))
  const consumerTarballDir = join(tempDir, 'consumer', 'tarballs')
  const consumerDir = join(tempDir, 'consumer')

  mkdirSync(consumerTarballDir, { recursive: true })

  for (const tarball of Object.values(tarballs)) {
    cpSync(tarball, join(consumerTarballDir, basename(tarball)))
  }

  const getTarballReference = packageDir => `file:./tarballs/${basename(tarballs[packageDir])}`

  const transitiveInternalDependencies = {
    '@santi020k/eslint-config-core': getTarballReference('core'),
    '@santi020k/eslint-config-formats': getTarballReference('formats'),
    '@santi020k/eslint-config-tools': getTarballReference('tools'),
    '@santi020k/eslint-config-typescript': getTarballReference('typescript')
  }

  const internalDependencies = {
    '@santi020k/eslint-config-basic': getTarballReference('basic'),
    ...transitiveInternalDependencies
  }

  writeFileSync(join(consumerDir, 'package.json'), JSON.stringify({
    dependencies: {
      ...internalDependencies,
      eslint: '^10.0.0',
      typescript: '^6.0.0'
    },
    name: `eslint-config-${manager}-consumer-check`,
    ...(['bun', 'npm'].includes(manager) && { overrides: transitiveInternalDependencies }),
    private: true,
    ...(manager === 'yarn' && {
      resolutions: {
        ...transitiveInternalDependencies,
        '@darraghor/eslint-plugin-nestjs-typed': '^6.18.0'
      }
    }),
    type: 'module'
  }, null, 2))

  if (manager === 'pnpm') {
    writeFileSync(join(consumerDir, 'pnpm-workspace.yaml'), [
      'autoInstallPeers: false',
      'packages:',
      '  - .',
      'overrides:',
      ...Object.entries(transitiveInternalDependencies).map(
        ([name, tarball]) => `  ${JSON.stringify(name)}: ${JSON.stringify(tarball)}`
      ),
      ''
    ].join('\n'))
  }

  if (manager === 'yarn') {
    writeFileSync(join(consumerDir, '.yarnrc.yml'), 'nodeLinker: node-modules\n')
  }

  writeFileSync(
    join(consumerDir, 'eslint.config.mjs'),
    'export { default } from \'@santi020k/eslint-config-basic/recommended\'\n'
  )

  writeFileSync(join(consumerDir, 'index.js'), 'const unused = 1\n')

  execFileSync(manager, installArguments[manager], {
    cwd: consumerDir,
    stdio: 'inherit'
  })

  const packageManifest = JSON.parse(
    readFileSync(join(consumerDir, 'node_modules', '@santi020k', 'eslint-config-basic', 'package.json'), 'utf8')
  )

  if (!packageManifest.version) {
    throw new Error(`${manager} did not install the packed Basic package.`)
  }

  let lintOutput = ''

  try {
    execFileSync(
      join(consumerDir, 'node_modules', '.bin', process.platform === 'win32' ? 'eslint.cmd' : 'eslint'),
      ['index.js'],
      { cwd: consumerDir, encoding: 'utf8', stdio: 'pipe' }
    )
  } catch (error) {
    lintOutput = `${error.stdout ?? ''}${error.stderr ?? ''}`
  }

  if (!lintOutput.includes('no-unused-vars')) {
    throw new Error(
      `${manager} installed the consumer, but the recommended config did not report no-unused-vars.\n${lintOutput}`
    )
  }

  process.stdout.write(
    `${manager} consumer verified: packed packages install and the one-line recommended config lints.\n`
  )
} finally {
  rmSync(tempDir, { force: true, recursive: true })
}
