import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

export interface V3MigrationContext {
  extensions: string[]
  formats: string[]
  frameworks: string[]
  libraries: string[]
  packageManager: string
  testing: string[]
  tools: string[]
  typescript: boolean
}

export interface V3MigrationOptions {
  check?: boolean
  full?: boolean
  json?: boolean
  write?: boolean
}

interface MigrationChange {
  detail: string
  target: string
}

interface MigrationResult {
  changes: MigrationChange[]
  configFile: null | string
  installCommand: string
  mode: 'full' | 'lean'
  packages: string[]
  written: string[]
}

const BASIC_PACKAGE = '@santi020k/eslint-config-basic'
const FULL_PACKAGE = '@santi020k/eslint-config-full'
const INTEGRATIONS_PACKAGE = '@santi020k/eslint-config-integrations'
const LITE_PACKAGE = '@santi020k/eslint-config-lite'
const REMIX_PACKAGE = '@santi020k/eslint-config-remix'

const FEATURE_PACKAGES = {
  extensions: '@santi020k/eslint-config-extensions',
  formats: '@santi020k/eslint-config-formats',
  libraries: '@santi020k/eslint-config-libraries',
  testing: '@santi020k/eslint-config-testing',
  tools: '@santi020k/eslint-config-tools'
} as const

const FRAMEWORK_PACKAGES: Record<string, string> = {
  angular: '@santi020k/eslint-config-angular',
  astro: '@santi020k/eslint-config-astro',
  expo: '@santi020k/eslint-config-expo',
  hono: '@santi020k/eslint-config-hono',
  lit: '@santi020k/eslint-config-lit',
  nest: '@santi020k/eslint-config-nest',
  next: '@santi020k/eslint-config-next',
  nuxt: '@santi020k/eslint-config-nuxt',
  preact: '@santi020k/eslint-config-preact',
  qwik: '@santi020k/eslint-config-qwik',
  react: '@santi020k/eslint-config-react',
  'react-router': '@santi020k/eslint-config-react-router',
  slidev: '@santi020k/eslint-config-slidev',
  solid: '@santi020k/eslint-config-solid',
  svelte: '@santi020k/eslint-config-svelte',
  'tanstack-start': '@santi020k/eslint-config-tanstack-start',
  vite: '@santi020k/eslint-config-vite',
  vue: '@santi020k/eslint-config-vue'
}

const FEATURE_EXPORTS: Record<keyof typeof FEATURE_PACKAGES, string[]> = {
  extensions: [
    'a11y',
    'astroDoctor',
    'bestPractices',
    'biome',
    'boundaries',
    'compat',
    'deMorgan',
    'depend',
    'noOnlyTests',
    'node',
    'oxlint',
    'perfectionist',
    'regexp',
    'security',
    'sonarjs',
    'unicorn'
  ],
  formats: [
    'css',
    'graphql',
    'html',
    'jsonc',
    'markdown',
    'mdx',
    'packageJson',
    'toml',
    'yaml'
  ],
  libraries: [
    'aiSdk',
    'autogen',
    'drizzle',
    'googleGenAi',
    'i18next',
    'langchain',
    'llamaIndex',
    'mastra',
    'mcp',
    'mikroOrm',
    'openAiAgents',
    'prisma',
    'sequelize',
    'stencil',
    'storybook',
    'tailwind',
    'tanstackQuery',
    'tanstackRouter',
    'typeorm',
    'turbo',
    'zod'
  ],
  testing: [
    'cypress',
    'jest',
    'jestDom',
    'playwright',
    'testingLibrary',
    'vitest'
  ],
  tools: [
    'command',
    'cspell',
    'docker',
    'githubActions',
    'jsdoc',
    'nx',
    'pnpm',
    'prettier',
    'swagger'
  ]
}

const EXPORT_TO_FEATURE_PACKAGE = new Map(
  Object.entries(FEATURE_EXPORTS).flatMap(([category, exports]) => exports.map(exportName => [
    exportName,
     
    FEATURE_PACKAGES[category as keyof typeof FEATURE_PACKAGES]
  ] as const))
)

const REMOVED_ALIAS_REPLACEMENTS: Record<string, string> = {
  angularConfig: 'angular',
  astroConfig: 'createAstroConfig',
  eslintConfig: 'defineConfig',
  expoConfig: 'expo',
  gitignore: 'createGitignoreConfig',
  jsConfig: 'coreConfig',
  nestConfig: 'nest',
  nextConfig: 'next',
  preactConfig: 'preact',
  reactConfig: 'react',
  solidConfig: 'solid',
  svelteConfig: 'svelte',
  tsConfig: 'typescriptConfig',
  vueConfig: 'vue'
}

const dependencyFields = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies'
] as const

const readPackageJson = (cwd: string): Record<string, unknown> => {
  const packagePath = join(cwd, 'package.json')

  if (!existsSync(packagePath)) throw new Error('package.json is required for a v3 migration.')

  try {
    return JSON.parse(readFileSync(packagePath, 'utf8')) as Record<string, unknown>
  } catch {
    throw new Error('package.json is invalid JSON.')
  }
}

const getConfigPath = (cwd: string): null | string => {
  const filenames = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts'
  ]

  return filenames.map(filename => join(cwd, filename)).find(path => existsSync(path)) ?? null
}

const getDependencyRecord = (
  packageJson: Record<string, unknown>,
  field: typeof dependencyFields[number]
): Record<string, string> => {
  const value = packageJson[field]

  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return value as Record<string, string>
}

const getDeclaredConfigPackages = (packageJson: Record<string, unknown>): Set<string> => {
  const names = new Set<string>()

  for (const field of dependencyFields) {
    for (const name of Object.keys(getDependencyRecord(packageJson, field))) {
      if (name.startsWith('@santi020k/eslint-config-')) names.add(name)
    }
  }

  return names
}

const replaceIdentifier = (content: string, from: string, to: string): string => (
  content.replaceAll(new RegExp(`\\b${from}\\b`, 'g'), to)
)

const splitBasicIntegrationImports = (
  content: string
): { changed: boolean, content: string, featurePackages: string[], moved: string[] } => {
  const moved = new Set<string>()
  const featurePackages = new Set<string>()
  const importPattern = /import\s*\{([^}]+)\}\s*from\s*(['"])@santi020k\/eslint-config-(?:basic|lite)\2/g

  const transformed = content.replace(importPattern, (statement, specifierText: string, quote: string) => {
    const specifiers = specifierText.split(',').map(value => value.trim()).filter(Boolean)
    const grouped = new Map<string, string[]>()

    const integrations = specifiers.filter(specifier => {
      const imported = specifier.split(/\s+as\s+/)[0]?.trim() ?? ''
      const packageName = EXPORT_TO_FEATURE_PACKAGE.get(imported)

      if (!packageName) return false

      const values = grouped.get(packageName) ?? []

      values.push(specifier)

      grouped.set(packageName, values)

      return true
    })

    if (integrations.length === 0) return statement

    for (const specifier of integrations) moved.add(specifier)

    const basic = specifiers.filter(specifier => !integrations.includes(specifier))
    const lines: string[] = []

    if (basic.length > 0) {
      lines.push(`import { ${basic.join(', ')} } from ${quote}${BASIC_PACKAGE}${quote}`)
    }

    for (const [packageName, values] of grouped) {
      featurePackages.add(packageName)

      lines.push(`import { ${values.join(', ')} } from ${quote}${packageName}${quote}`)
    }

    return lines.join('\n')
  })

  return {
    changed: transformed !== content,
    content: transformed,
    featurePackages: [...featurePackages],
    moved: [...moved]
  }
}

export const migrateConfigToV3 = (
  content: string,
  mode: 'full' | 'lean'
): { changes: string[], content: string, featurePackages: string[] } => {
  const changes: string[] = []
  const featurePackages = new Set<string>()
  let migrated = content

  if (migrated.includes(LITE_PACKAGE)) {
    migrated = migrated.replaceAll(LITE_PACKAGE, BASIC_PACKAGE)

    changes.push('Replaced the Lite compatibility import with Basic.')
  }

  if (mode === 'full' && migrated.includes(BASIC_PACKAGE)) {
    migrated = migrated.replaceAll(BASIC_PACKAGE, FULL_PACKAGE)

    changes.push('Switched the root config import to the full bundle.')
  }

  if (mode === 'lean') {
    const split = splitBasicIntegrationImports(migrated)

    migrated = split.content

    if (split.changed) {
      changes.push(`Moved feature factories to their granular packages: ${split.moved.join(', ')}.`)
    }

    for (const packageName of split.featurePackages) featurePackages.add(packageName)
  }

  for (const [removed, replacement] of Object.entries(REMOVED_ALIAS_REPLACEMENTS)) {
    const updated = replaceIdentifier(migrated, removed, replacement)

    if (updated !== migrated) {
      migrated = updated

      changes.push(`Replaced ${removed} with ${replacement}.`)
    }
  }

  if (/\bframeworks\s*:\s*\{[\s\S]*?\bremix\s*:/.test(migrated)) {
    migrated = migrated.replaceAll(/\bremix(\s*:)/g, '\'react-router\'$1')

    changes.push('Moved frameworks.remix to frameworks["react-router"].')
  }

  if (migrated.includes(REMIX_PACKAGE)) {
    migrated = migrated.replaceAll(REMIX_PACKAGE, FRAMEWORK_PACKAGES['react-router'])

    changes.push('Replaced the Remix package import with React Router.')
  }

  if (/\bloadModule\b/.test(migrated)) {
    changes.push('Manual action required: replace loadModule usage with createModuleLoader(resolver).')
  }

  return {
    changes,
    content: migrated,
    featurePackages: [...featurePackages]
  }
}

const shouldUseFullBundle = (
  configContent: null | string,
  packageJson: Record<string, unknown>,
  forceFull: boolean
): boolean => {
  if (forceFull) return true

  if (configContent?.includes(FULL_PACKAGE)) return true

  if (configContent && (
    /\bPreset\.All\b/.test(configContent) ||
    /preset\s*:\s*['"]all['"]/.test(configContent)
  )) return true

  return getDeclaredConfigPackages(packageJson).has(FULL_PACKAGE)
}

const createInstallCommand = (packageManager: string, packages: string[]): string => {
  const packageList = packages.join(' ')

  switch (packageManager) {
    case 'bun':
      return `bun add -d ${packageList}`

    case 'pnpm':
      return `pnpm add -D ${packageList}`

    case 'yarn':
      return `yarn add -D ${packageList}`

    default:
      return `npm install -D ${packageList}`
  }
}

const migratePackageJson = (
  packageJson: Record<string, unknown>,
  context: V3MigrationContext,
  mode: 'full' | 'lean',
  configFeaturePackages: string[]
): { changed: boolean, packageJson: Record<string, unknown>, packages: string[] } => {
  const next = structuredClone(packageJson)

  const devDependencies = {
    ...getDependencyRecord(next, 'devDependencies')
  }

  const previouslyDeclared = getDeclaredConfigPackages(next)

  for (const field of dependencyFields) {
    const dependencies = { ...getDependencyRecord(next, field) }

    for (const packageName of [
      BASIC_PACKAGE,
      FULL_PACKAGE,
      INTEGRATIONS_PACKAGE,
      LITE_PACKAGE,
      REMIX_PACKAGE,
      ...Object.values(FEATURE_PACKAGES),
      ...Object.values(FRAMEWORK_PACKAGES)
    ]) {
      delete dependencies[packageName]
    }

    if (Object.keys(dependencies).length > 0) next[field] = dependencies
    else delete next[field]
  }

  devDependencies.eslint = '^10.0.0'

  devDependencies[mode === 'full' ? FULL_PACKAGE : BASIC_PACKAGE] = '^3.0.0'

  if (mode === 'lean') {
    const frameworkNames = new Set(context.frameworks)

    if (previouslyDeclared.has(REMIX_PACKAGE)) frameworkNames.add('react-router')

    for (const [framework, packageName] of Object.entries(FRAMEWORK_PACKAGES)) {
      if (frameworkNames.has(framework) || previouslyDeclared.has(packageName)) {
        devDependencies[packageName] = '^3.0.0'
      }
    }

    const selectedFeaturePackages = new Set(configFeaturePackages)

    for (const category of Object.keys(FEATURE_PACKAGES) as (keyof typeof FEATURE_PACKAGES)[]) {
      if (context[category].length > 0) selectedFeaturePackages.add(FEATURE_PACKAGES[category])
    }

    for (const packageName of selectedFeaturePackages) {
      devDependencies[packageName] = '^3.0.0'
    }

    if (previouslyDeclared.has(INTEGRATIONS_PACKAGE)) {
      devDependencies[INTEGRATIONS_PACKAGE] = '^3.0.0'
    }
  }

  if (context.typescript && !Object.keys(devDependencies).includes('typescript')) {
    const declaredElsewhere = dependencyFields.some(field => 'typescript' in getDependencyRecord(next, field))

    if (!declaredElsewhere) devDependencies.typescript = '^5.0.0'
  }

  next.devDependencies = Object.fromEntries(
    Object.entries(devDependencies).sort(([a], [b]) => a.localeCompare(b))
  )

  const packages = Object.entries(next.devDependencies as Record<string, string>)
    .filter(([name]) => name === 'eslint' || name === 'typescript' || name.startsWith('@santi020k/eslint-config-'))
    .map(([name, version]) => `${name}@${version}`)

  return {
    changed: JSON.stringify(next) !== JSON.stringify(packageJson),
    packageJson: next,
    packages
  }
}

const outputMigration = (result: MigrationResult, json: boolean): void => {
  if (json) {
    console.log(JSON.stringify(result, null, 2))

    return
  }

  console.log(`v2 to v3 migration plan (${result.mode}):`)

  if (result.changes.length === 0) {
    console.log('- No v3 migration changes are required.')
  } else {
    for (const change of result.changes) console.log(`- ${change.target}: ${change.detail}`)
  }

  console.log(`- Install command: ${result.installCommand}`)

  if (result.written.length > 0) {
    console.log(`- Updated: ${result.written.join(', ')}`)
  } else {
    console.log('- Dry run only; pass --write to apply safe changes.')
  }
}

export const handleMigrateV3 = (
  cwd: string,
  context: V3MigrationContext,
  options: V3MigrationOptions = {}
): void => {
  const packagePath = join(cwd, 'package.json')
  const packageJson = readPackageJson(cwd)
  const configPath = getConfigPath(cwd)
  const configContent = configPath ? readFileSync(configPath, 'utf8') : null
  const mode = shouldUseFullBundle(configContent, packageJson, options.full ?? false) ? 'full' : 'lean'
  const configMigration = configContent ? migrateConfigToV3(configContent, mode) : null

  const packageMigration = migratePackageJson(
    packageJson,
    context,
    mode,
    configMigration?.featurePackages ?? []
  )

  const changes: MigrationChange[] = []
  const written: string[] = []

  for (const detail of configMigration?.changes ?? []) {
    changes.push({ detail, target: configPath ? basename(configPath) : 'eslint.config.*' })
  }

  if (packageMigration.changed) {
    changes.push({ detail: 'Updated the ESLint v3 dependency set.', target: 'package.json' })
  }

  const configChanged = Boolean(configPath && configMigration && configMigration.content !== configContent)

  if (options.write) {
    if (configPath && configMigration && configChanged) {
      writeFileSync(`${configPath}.v2.bak`, configContent ?? '')

      writeFileSync(configPath, configMigration.content)

      written.push(basename(configPath), `${basename(configPath)}.v2.bak`)
    }

    if (packageMigration.changed) {
      writeFileSync(`${packagePath}.v2.bak`, `${JSON.stringify(packageJson, null, 2)}\n`)

      writeFileSync(packagePath, `${JSON.stringify(packageMigration.packageJson, null, 2)}\n`)

      written.push('package.json', 'package.json.v2.bak')
    }
  }

  const result: MigrationResult = {
    changes,
    configFile: configPath ? basename(configPath) : null,
    installCommand: createInstallCommand(context.packageManager, packageMigration.packages),
    mode,
    packages: packageMigration.packages,
    written
  }

  outputMigration(result, options.json ?? false)

  if (options.check && changes.length > 0) process.exitCode = 1
}
