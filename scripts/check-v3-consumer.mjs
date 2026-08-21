import { execFileSync, spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, isAbsolute, join } from 'node:path'

import { checkPeerHealth } from './check-peer-health.mjs'

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

const assertPortableDeclarations = ({ consumerDir, declarationFiles, label, sourceFiles }) => {
  const declarationDir = join(consumerDir, 'declarations')

  execFileSync(
    join(consumerDir, 'node_modules', '.bin', 'tsc'),
    [
      ...sourceFiles,
      '--allowJs',
      '--checkJs',
      '--declaration',
      '--emitDeclarationOnly',
      '--module',
      'Node16',
      '--moduleResolution',
      'Node16',
      '--target',
      'ES2022',
      '--outDir',
      declarationDir,
      '--skipLibCheck',
      '--pretty',
      'false'
    ],
    { cwd: consumerDir, stdio: 'pipe' }
  )

  const emittedDeclarations = declarationFiles
    .map(fileName => readFileSync(join(declarationDir, fileName), 'utf8'))
    .join('\n')

  if (emittedDeclarations.includes('.pnpm/') || emittedDeclarations.includes('typescript-eslint')) {
    throw new Error(`${label} exposed an internal dependency path.\n${emittedDeclarations}`)
  }
}

const assertConfigTypesCommand = ({ cliPath, consumerDir, label, sourceFiles }) => {
  const report = JSON.parse(execFileSync(
    process.execPath,
    [
      cliPath,
      'config-types',
      '--json',
      ...sourceFiles.flatMap(file => ['--file', file])
    ],
    { cwd: consumerDir, encoding: 'utf8', stdio: 'pipe' }
  ))

  if (!report.portable || report.files.length !== sourceFiles.length) {
    throw new Error(`${label} config-types command failed.\n${JSON.stringify(report, null, 2)}`)
  }
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

  const portableTypeScriptMatrix = [
    { name: 'minimum', version: '5.0.2' },
    { name: 'typescript-6', version: '6.0.3' }
  ]

  for (const typeScript of portableTypeScriptMatrix) {
    const portableConsumerDir = join(tempDir, `portable-pnpm-consumer-${typeScript.name}`)

    mkdirSync(portableConsumerDir, { recursive: true })

    writeFileSync(join(portableConsumerDir, 'package.json'), JSON.stringify({
      dependencies: {
        '@santi020k/eslint-config-basic': `file:${tarballs.basic}`,
        eslint: '^10.0.0',
        typescript: typeScript.version
      },
      name: `eslint-config-v3-portable-${typeScript.name}-consumer-check`,
      private: true,
      type: 'module'
    }, null, 2))

    writeFileSync(
      join(portableConsumerDir, 'pnpm-workspace.yaml'),
      [
        'packages:',
        '  - .',
        'overrides:',
        `  "@santi020k/eslint-config-core": "file:${tarballs.core}"`,
        `  "@santi020k/eslint-config-typescript": "file:${tarballs.typescript}"`,
        ''
      ].join('\n')
    )

    writeFileSync(
      join(portableConsumerDir, 'direct.config.js'),
      [
        'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
        '',
        'export default defineConfig({ ignores: [\'coverage/**\'] })',
        ''
      ].join('\n')
    )

    writeFileSync(
      join(portableConsumerDir, 'awaited.config.mjs'),
      [
        'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
        '',
        'export default await defineConfig({ ignores: [\'dist/**\'] })',
        ''
      ].join('\n')
    )

    writeFileSync(
      join(portableConsumerDir, 'typescript.config.ts'),
      [
        'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
        '',
        'export default await defineConfig({ ignores: [\'generated/**\'] })',
        ''
      ].join('\n')
    )

    writeFileSync(
      join(portableConsumerDir, 'recommended.config.js'),
      'export { default } from \'@santi020k/eslint-config-basic/recommended\'\n'
    )

    execFileSync('pnpm', ['install', '--ignore-scripts'], {
      cwd: portableConsumerDir,
      stdio: 'pipe'
    })

    assertPortableDeclarations({
      consumerDir: portableConsumerDir,
      declarationFiles: [
        'awaited.config.d.mts',
        'direct.config.d.ts',
        'recommended.config.d.ts',
        'typescript.config.d.ts'
      ],
      label: `Basic TypeScript ${typeScript.version} declaration emit`,
      sourceFiles: [
        'direct.config.js',
        'awaited.config.mjs',
        'typescript.config.ts',
        'recommended.config.js'
      ]
    })

    assertConfigTypesCommand({
      cliPath: join(
        realpathSync(join(
          portableConsumerDir,
          'node_modules',
          '@santi020k',
          'eslint-config-basic'
        )),
        'dist',
        'cli.js'
      ),
      consumerDir: portableConsumerDir,
      label: `Basic TypeScript ${typeScript.version}`,
      sourceFiles: [
        'direct.config.js',
        'awaited.config.mjs',
        'typescript.config.ts',
        'recommended.config.js'
      ]
    })

    process.stdout.write(
      `V3 portable pnpm consumer verified: TypeScript ${typeScript.version} emits declarations for ` +
      'direct, awaited, TypeScript, and recommended Basic configs without non-portable paths.\n'
    )
  }

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

  const fullConfigCheck = [
    'const module = await import("@santi020k/eslint-config-full/recommended");',
    'const config = module.default;',
    'if (!Array.isArray(config) || !config.some(entry => entry.name?.includes("react"))) process.exit(1);'
  ].join('')

  const fullSupportMatrix = [
    { eslint: '10.0.0', name: 'minimum', typescript: '5.0.2' },
    { eslint: '^10.0.0', name: 'typescript-6', typescript: '6.0.3' }
  ]

  for (const support of fullSupportMatrix) {
    const fullConsumerDir = join(tempDir, `full-consumer-${support.name}`)
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
        eslint: support.eslint,
        react: '^19.0.0',
        typescript: support.typescript
      },
      name: `eslint-config-v3-full-${support.name}-consumer-check`,
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

    writeFileSync(
      join(fullConsumerDir, 'composed.config.js'),
      [
        'import { defineConfig } from \'@santi020k/eslint-config-full\'',
        '',
        'export default defineConfig({}, { rules: { \'no-console\': \'off\' } })',
        ''
      ].join('\n')
    )

    writeFileSync(
      join(fullConsumerDir, 'typescript.config.ts'),
      [
        'import { defineConfig } from \'@santi020k/eslint-config-full\'',
        '',
        'export default await defineConfig({}, { ignores: [\'generated/**\'] })',
        ''
      ].join('\n')
    )

    writeFileSync(join(fullConsumerDir, 'index.jsx'), 'export const App = () => <main>Hello</main>\n')

    execFileSync('pnpm', ['install', '--ignore-scripts'], {
      cwd: fullConsumerDir,
      stdio: 'pipe'
    })

    assertPortableDeclarations({
      consumerDir: fullConsumerDir,
      declarationFiles: [
        'composed.config.d.ts',
        'eslint.config.d.mts',
        'typescript.config.d.ts'
      ],
      label: `Full TypeScript ${support.typescript} declaration emit`,
      sourceFiles: ['eslint.config.mjs', 'composed.config.js', 'typescript.config.ts']
    })

    execFileSync(process.execPath, ['--input-type=module', '--eval', fullConfigCheck], {
      cwd: fullConsumerDir,
      stdio: 'pipe'
    })

    execFileSync(
      join(fullConsumerDir, 'node_modules', '.bin', 'eslint'),
      ['index.jsx'],
      { cwd: fullConsumerDir, stdio: 'pipe' }
    )

    const fullPackageDir = realpathSync(
      join(fullConsumerDir, 'node_modules', '@santi020k', 'eslint-config-full')
    )

    const basicCli = join(
      realpathSync(join(
        dirname(dirname(fullPackageDir)),
        '@santi020k',
        'eslint-config-basic'
      )),
      'dist',
      'cli.js'
    )

    assertConfigTypesCommand({
      cliPath: basicCli,
      consumerDir: fullConsumerDir,
      label: `Full TypeScript ${support.typescript}`,
      sourceFiles: ['eslint.config.mjs', 'composed.config.js', 'typescript.config.ts']
    })

    const compatibility = JSON.parse(execFileSync(
      process.execPath,
      [basicCli, 'compatibility', '--json'],
      { cwd: fullConsumerDir, encoding: 'utf8', stdio: 'pipe' }
    ))

    const fullCompatibility = compatibility.packages.find(
      item => item.name === '@santi020k/eslint-config-full'
    )

    if (!compatibility.compatible || !fullCompatibility?.aggregatedBasic?.resolved) {
      throw new Error(`Full ${support.name} support-matrix compatibility check failed.`)
    }

    checkPeerHealth(
      fullConsumerDir,
      join(rootDir, 'scripts', 'peer-health-policy.json')
    )
  }

  process.stdout.write(
    'V3 full consumer verified with minimum TypeScript 5 and pinned TypeScript 6: ' +
    'the meta-package supplies optional framework peers, compatibility resolves its Basic composer, ' +
    'recommended and composed declarations stay portable, the config loads detected React rules, ' +
    'and peer health has no actionable warnings.\n'
  )

  const modularPackageNames = [
    '@santi020k/eslint-config-astro',
    '@santi020k/eslint-config-basic',
    '@santi020k/eslint-config-core',
    '@santi020k/eslint-config-extensions',
    '@santi020k/eslint-config-formats',
    '@santi020k/eslint-config-libraries',
    '@santi020k/eslint-config-testing',
    '@santi020k/eslint-config-tools',
    '@santi020k/eslint-config-typescript'
  ]

  const modularConsumerDir = join(tempDir, 'modular-consumer')
  const modularTarballDir = join(modularConsumerDir, 'tarballs')

  mkdirSync(join(modularConsumerDir, 'apps', 'docs', 'src'), { recursive: true })

  mkdirSync(join(modularConsumerDir, '.github', 'workflows'), { recursive: true })

  mkdirSync(modularTarballDir, { recursive: true })

  const modularTarballRefs = Object.fromEntries(
    modularPackageNames.map(packageName => {
      const packageDir = packageNameToDir.get(packageName)

      if (!packageDir) throw new Error(`Missing workspace package for ${packageName}.`)

      const tarball = pack(packageDir)
      const filename = basename(tarball)

      cpSync(tarball, join(modularTarballDir, filename))

      return [packageName, `file:./tarballs/${filename}`]
    })
  )

  writeFileSync(join(modularConsumerDir, 'package.json'), JSON.stringify({
    name: 'eslint-config-v3-modular-consumer-check',
    private: true,
    type: 'module',
    devDependencies: {
      ...Object.fromEntries(
        Object.keys(modularTarballRefs).map(packageName => [packageName, 'catalog:configs'])
      ),
      astro: 'catalog:',
      eslint: 'catalog:',
      tailwindcss: 'catalog:',
      typescript: 'catalog:',
      vitest: 'catalog:'
    }
  }, null, 2))

  writeFileSync(join(modularConsumerDir, 'apps', 'docs', 'package.json'), JSON.stringify({
    name: 'docs',
    private: true,
    type: 'module',
    dependencies: {
      astro: 'catalog:',
      tailwindcss: 'catalog:'
    }
  }, null, 2))

  writeFileSync(
    join(modularConsumerDir, 'pnpm-workspace.yaml'),
    [
      'packages:',
      '  - apps/*',
      'catalog:',
      '  astro: ^5.0.0',
      '  eslint: ^10.0.0',
      '  tailwindcss: ^4.1.0',
      '  typescript: ^5.9.0',
      '  vitest: ^4.0.0',
      'catalogs:',
      '  configs:',
      ...Object.entries(modularTarballRefs).map(
        ([name, tarball]) => `    ${JSON.stringify(name)}: ${JSON.stringify(tarball)}`
      ),
      'overrides:',
      ...Object.entries(modularTarballRefs).map(
        ([name, tarball]) => `  ${JSON.stringify(name)}: ${JSON.stringify(tarball)}`
      ),
      ''
    ].join('\n')
  )

  writeFileSync(
    join(modularConsumerDir, 'eslint.config.mjs'),
    [
      'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
      '',
      'export default await defineConfig({',
      '  detection: { libraries: false },',
      '  features: {',
      '    boundaries: true,',
      '    cspell: true,',
      '    jsonc: true,',
      '    markdown: true,',
      '    pnpm: true,',
      '    unicorn: true,',
      '    vitest: true,',
      '    yaml: true',
      '  },',
      '  projects: {',
      '    \'apps/docs\': {',
      '      frameworks: { astro: true },',
      '      libraries: [\'tailwind\'],',
      '      tailwind: { noUnknownClasses: false },',
      '      typescript: { untypedFiles: [\'**/*.astro\'] }',
      '    }',
      '  },',
      '  root: new URL(\'.\', import.meta.url).pathname,',
      '  typescript: true',
      '})',
      ''
    ].join('\n')
  )

  writeFileSync(join(modularConsumerDir, 'index.ts'), [
    'interface ApiPayload {',
    'database_specific: string;',
    'ecosystem_specific: string;',
    '}',
    '',
    'const joinLabels = (...values: string[]) => values.join(",");',
    'const payload: ApiPayload = { database_specific: "database", ecosystem_specific: "ecosystem" };',
    'export const label = joinLabels(',
    '"alpha",',
    '"beta"',
    ');',
    'export const selected = [payload.database_specific].find(value => (',
    'value === "database" ||',
    'value === "fallback"',
    '));',
    ''
  ].join('\n'))

  writeFileSync(join(modularConsumerDir, 'index.test.ts'), [
    'import { expect, test } from "vitest";',
    '',
    'import { label, selected } from "./index.js";',
    '',
    'test("creates a stable report", () => {',
    'expect(label).toBe("alpha,beta");',
    'expect(selected).toBe("database");',
    '});',
    ''
  ].join('\n'))

  writeFileSync(join(modularConsumerDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      noEmit: true,
      strict: true
    },
    include: ['*.ts']
  }, null, 2))

  writeFileSync(
    join(modularConsumerDir, 'apps', 'docs', 'src', 'page.astro'),
    [
      '---',
      'const title = "Docs";',
      '---',
      '<h1 class="generated-title">{title}</h1>',
      '<script is:inline>',
      'const button = document.querySelector("button");',
      'button?.addEventListener("click", () => console.log("clicked"));',
      '</script>',
      '<pre><code>{`const generated_value = "preserved"`}</code></pre>',
      ''
    ].join('\n')
  )

  writeFileSync(
    join(modularConsumerDir, '.github', 'workflows', 'check.yml'),
    [
      'name: Adoption fixture',
      'on:',
      '  workflow_dispatch:',
      '  pull_request:',
      'jobs:',
      '  verify:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - run: |',
      '          echo "lint fixture"',
      ''
    ].join('\n')
  )

  execFileSync('pnpm', ['install', '--ignore-scripts'], {
    cwd: modularConsumerDir,
    stdio: 'pipe'
  })

  const doctor = JSON.parse(execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'basic-eslint'),
    ['doctor', '--json'],
    { cwd: modularConsumerDir, encoding: 'utf8', stdio: 'pipe' }
  ))

  if (doctor.requiredPackages?.length > 0) {
    throw new Error(
      `Modular consumer doctor reported missing packages: ${doctor.requiredPackages.join(', ')}`
    )
  }

  const modularCompatibility = JSON.parse(execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'basic-eslint'),
    ['compatibility', '--json'],
    { cwd: modularConsumerDir, encoding: 'utf8', stdio: 'pipe' }
  ))

  const unresolvedCatalogPackages = modularCompatibility.packages.filter(
    item => item.declared === 'catalog:configs' && (
      item.resolved === null ||
      item.resolvedPath === null ||
      item.issues.includes('declared but not installed')
    )
  )

  if (!modularCompatibility.compatible || unresolvedCatalogPackages.length > 0) {
    throw new Error(
      `Packed compatibility did not resolve catalog packages: ` +
      unresolvedCatalogPackages.map(item => item.name).join(', ')
    )
  }

  const adoptionReport = JSON.parse(execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'basic-eslint'),
    ['explain-preset', 'monorepo', '--file', 'index.ts', '--analyze-source', '--json'],
    { cwd: modularConsumerDir, encoding: 'utf8', stdio: 'pipe' }
  ))

  if (
    adoptionReport.sourceAnalysis?.totals?.findings <= 0 ||
    adoptionReport.sourceAnalysis?.autofixPreview?.changedFileCount <= 0
  ) {
    throw new Error('Packed adoption fixture did not report its deliberately old-style source debt.')
  }

  const astroFixturePath = join(modularConsumerDir, 'apps', 'docs', 'src', 'page.astro')
  const astroFixture = readFileSync(astroFixturePath, 'utf8')

  writeFileSync(
    astroFixturePath,
    astroFixture.replace('console.log("clicked")', 'button?.focus()')
  )

  const autofixResult = spawnSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'eslint'),
    ['.', '--fix'],
    { cwd: modularConsumerDir, encoding: 'utf8', stdio: 'pipe' }
  )

  if (autofixResult.status !== 0) {
    throw new Error(
      'Packed adoption fixture autofix failed.\n' +
      `${autofixResult.stdout}${autofixResult.stderr}`
    )
  }

  const autofixOutput = `${autofixResult.stdout}${autofixResult.stderr}`

  if (autofixOutput.includes('does not support the `projectService` option')) {
    throw new Error(`Packed Astro config emitted an unsupported parser option warning.\n${autofixOutput}`)
  }

  const convergenceResults = JSON.parse(execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'eslint'),
    ['.', '--fix-dry-run', '--format', 'json'],
    { cwd: modularConsumerDir, encoding: 'utf8', stdio: 'pipe' }
  ))

  const unstableFiles = convergenceResults
    .filter(result => result.output !== undefined)
    .map(result => result.filePath)

  if (unstableFiles.length > 0) {
    throw new Error(
      `Packed adoption fixture did not converge after one autofix pass: ${unstableFiles.join(', ')}`
    )
  }

  try {
    execFileSync(
      join(modularConsumerDir, 'node_modules', '.bin', 'eslint'),
      ['.', '--max-warnings=0'],
      { cwd: modularConsumerDir, encoding: 'utf8', stdio: 'pipe' }
    )
  } catch (error) {
    throw new Error(
      'Modular consumer lint failed.\n' +
      `${error.stdout ?? ''}${error.stderr ?? ''}`,
      { cause: error }
    )
  }

  execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'tsc'),
    ['--noEmit'],
    { cwd: modularConsumerDir, stdio: 'pipe' }
  )

  execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'tsc'),
    ['--noEmit', '--allowJs', '--checkJs', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', 'eslint.config.mjs'],
    { cwd: modularConsumerDir, stdio: 'pipe' }
  )

  execFileSync(
    join(modularConsumerDir, 'node_modules', '.bin', 'vitest'),
    ['run'],
    { cwd: modularConsumerDir, stdio: 'pipe' }
  )

  execFileSync('pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], {
    cwd: modularConsumerDir,
    stdio: 'pipe'
  })

  const peerReport = checkPeerHealth(
    modularConsumerDir,
    join(rootDir, 'scripts', 'peer-health-policy.json')
  )

  process.stdout.write(
    'V3 modular monorepo verified: packed feature and framework packages install, ' +
    'doctor resolves every project dependency, compatibility resolves catalog packages, ' +
    'adoption analysis finds real source debt, ' +
    'autofix converges, ESLint 10 lints cleanly, source and config typecheck, tests pass, ' +
    `the generated lockfile supports a frozen install, and peer health has ` +
    `${peerReport.accepted.length} accepted and zero actionable warnings.\n`
  )
} finally {
  rmSync(tempDir, { force: true, recursive: true })
}
