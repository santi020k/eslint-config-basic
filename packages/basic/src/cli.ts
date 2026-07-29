import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  analyzeEslintConfig,
  ESLINT_CONFIG_FILENAMES,
  handleGenerateSkill
} from './agent-skill-generator.js'
import { handleCompatibility, handleExplainRule } from './cli-advanced.js'
import { getExplicitConfigFeaturePackages, handleMigrateV3 } from './cli-migration.js'
import {
  handleBaseline,
  handleProfile,
  handleSnapshot,
  handleSnapshotDiff
} from './cli-workflows.js'
import { detectProjectOptions } from './index.js'

const getDefaultConfigFilename = (cwd: string): string => {
  const packageJsonPath = join(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) return 'eslint.config.mjs'

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { type?: string }

    return packageJson.type === 'module' ? 'eslint.config.js' : 'eslint.config.mjs'
  } catch {
    return 'eslint.config.mjs'
  }
}

const resolveConfigPath = (cwd: string): string => {
  const existingConfigPath = ESLINT_CONFIG_FILENAMES
    .map(filename => join(cwd, filename))
    .find(p => existsSync(p))

  return existingConfigPath ?? join(cwd, getDefaultConfigFilename(cwd))
}

const getFrameworkKeys = (detectedFrameworks?: string[]): string[] => {
  const frameworkKeys = new Set(detectedFrameworks ?? [])

  if (
    frameworkKeys.has('next') ||
    frameworkKeys.has('expo') ||
    frameworkKeys.has('react-router') ||
    (frameworkKeys.has('tanstack-start') && !frameworkKeys.has('solid'))
  ) {
    frameworkKeys.add('react')
  }

  return [...frameworkKeys].sort()
}

const toPropertyKey = (key: string): string => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`

const FRAMEWORK_PACKAGE_TO_KEY: Record<string, string> = {
  '@santi020k/eslint-config-angular': 'angular',
  '@santi020k/eslint-config-astro': 'astro',
  '@santi020k/eslint-config-expo': 'expo',
  '@santi020k/eslint-config-hono': 'hono',
  '@santi020k/eslint-config-lit': 'lit',
  '@santi020k/eslint-config-nest': 'nest',
  '@santi020k/eslint-config-next': 'next',
  '@santi020k/eslint-config-nuxt': 'nuxt',
  '@santi020k/eslint-config-preact': 'preact',
  '@santi020k/eslint-config-qwik': 'qwik',
  '@santi020k/eslint-config-react': 'react',
  '@santi020k/eslint-config-react-router': 'react-router',
  '@santi020k/eslint-config-remix': 'react-router',
  '@santi020k/eslint-config-slidev': 'slidev',
  '@santi020k/eslint-config-solid': 'solid',
  '@santi020k/eslint-config-svelte': 'svelte',
  '@santi020k/eslint-config-tanstack-start': 'tanstack-start',
  '@santi020k/eslint-config-vite': 'vite',
  '@santi020k/eslint-config-vue': 'vue'
}

const FRAMEWORK_KEY_TO_PACKAGE = {
  ...Object.fromEntries(
    Object.entries(FRAMEWORK_PACKAGE_TO_KEY)
      .filter(([packageName]) => packageName !== '@santi020k/eslint-config-remix')
      .map(([packageName, framework]) => [framework, packageName])
  ),
  'react-router': '@santi020k/eslint-config-react-router'
} as Record<string, string>

const LITE_PACKAGE_NAME = '@santi020k/eslint-config-lite'
const INTEGRATIONS_PACKAGE_NAME = '@santi020k/eslint-config-integrations'
const ASTRO_DOCTOR_PACKAGE_NAME = '@santi020k/eslint-plugin-astro-doctor'
const BASIC_PACKAGE_NAME = '@santi020k/eslint-config-basic'
const FULL_PACKAGE_NAME = '@santi020k/eslint-config-full'
const TYPESCRIPT_PACKAGE_NAME = 'typescript'

const CATEGORY_PACKAGES = {
  extensions: '@santi020k/eslint-config-extensions',
  formats: '@santi020k/eslint-config-formats',
  libraries: '@santi020k/eslint-config-libraries',
  testing: '@santi020k/eslint-config-testing',
  tools: '@santi020k/eslint-config-tools'
} as const

const getConfigPathIfPresent = (cwd: string): null | string => {
  const configPath = ESLINT_CONFIG_FILENAMES
    .map(filename => join(cwd, filename))
    .find(p => existsSync(p))

  return configPath ?? null
}

const readPackageJson = (cwd: string): null | Record<string, unknown> => {
  const packageJsonPath = join(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) return null

  try {
    return JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as Record<string, unknown>
  } catch {
    return null
  }
}

const getDeclaredDependencyNames = (packageJson: null | Record<string, unknown>): Set<string> => {
  const dependencyFields = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies'
  ]

  const names = new Set<string>()

  for (const field of dependencyFields) {
    // eslint-disable-next-line security/detect-object-injection -- field is restricted to dependencyFields above
    const dependencies = packageJson?.[field]

    if (!dependencies || typeof dependencies !== 'object' || Array.isArray(dependencies)) continue

    for (const name of Object.keys(dependencies)) {
      names.add(name)
    }
  }

  return names
}

const needsIntegrationPackage = (summary: ReturnType<typeof getProjectSummary>): boolean => (
  summary.libraries.length > 0 ||
  summary.testing.length > 0 ||
  summary.formats.length > 0 ||
  summary.tools.length > 0 ||
  summary.extensions.some(extension => extension !== 'boundaries')
)

const hasPresetAll = (configContent: null | string): boolean => Boolean(
  configContent && (
    /\bPreset\.All\b/.test(configContent) ||
    /preset\s*:\s*['"]all['"]/.test(configContent)
  )
)

const getLiteInstallPackages = (
  summary: ReturnType<typeof getProjectSummary>,
  declaredDependencies: Set<string>
): string[] => {
  const packages = new Set<string>([
    'eslint',
    LITE_PACKAGE_NAME
  ])

  for (const framework of summary.frameworks) {
    // eslint-disable-next-line security/detect-object-injection -- framework values come from known detection keys
    const packageName = FRAMEWORK_KEY_TO_PACKAGE[framework]

    if (packageName) packages.add(packageName)
  }

  if (needsIntegrationPackage(summary)) {
    packages.add(INTEGRATIONS_PACKAGE_NAME)
  }

  if (summary.typescript && !declaredDependencies.has(TYPESCRIPT_PACKAGE_NAME)) {
    packages.add(TYPESCRIPT_PACKAGE_NAME)
  }

  return [...packages]
}

const getInstallPackages = (
  summary: ReturnType<typeof getProjectSummary>,
  declaredDependencies: Set<string>,
  explicitFeaturePackages: string[] = []
): string[] => {
  const usesFullPackage = declaredDependencies.has(FULL_PACKAGE_NAME)
  const packages = new Set<string>(['eslint'])

  if (!usesFullPackage) packages.add(BASIC_PACKAGE_NAME)

  if (!usesFullPackage) {
    for (const framework of summary.frameworks) {
      // eslint-disable-next-line security/detect-object-injection -- framework values come from known detection keys
      const packageName = FRAMEWORK_KEY_TO_PACKAGE[framework]

      if (packageName) packages.add(packageName)
    }

    const categorySelections = [
      [summary.extensions, CATEGORY_PACKAGES.extensions],
      [summary.formats, CATEGORY_PACKAGES.formats],
      [summary.libraries, CATEGORY_PACKAGES.libraries],
      [summary.testing, CATEGORY_PACKAGES.testing],
      [summary.tools, CATEGORY_PACKAGES.tools]
    ] as const

    for (const [features, packageName] of categorySelections) {
      if (features.length > 0) packages.add(packageName)
    }

    for (const packageName of explicitFeaturePackages) {
      packages.add(packageName)
    }
  }

  if (summary.typescript) packages.add(TYPESCRIPT_PACKAGE_NAME)

  return [...packages].filter(packageName => !declaredDependencies.has(packageName))
}

const createInstallCommand = (
  packageManager: string,
  packages: string[],
  workspaceRoot = false,
  catalog: false | string | true = false
): string => {
  const packageList = packages.join(' ')

  switch (packageManager) {
    case 'bun':
      return `bun add -d ${packageList}`

    case 'npm':
      return `npm install -D ${packageList}`

    case 'yarn':
      return `yarn add -D ${packageList}`

    default:
      return `pnpm add -D${workspaceRoot ? ' --workspace-root' : ''}` +
        (catalog === true ? ' --save-catalog' : '') +
        `${typeof catalog === 'string' ? ` --save-catalog-name=${catalog}` : ''} ${packageList}`
  }
}

const createInstallInvocation = (
  packageManager: string,
  packages: string[],
  workspaceRoot = false,
  catalog: false | string | true = false
): [string, string[]] => {
  switch (packageManager) {
    case 'bun':
      return ['bun', ['add', '-d', ...packages]]

    case 'npm':
      return ['npm', ['install', '-D', ...packages]]

    case 'yarn':
      return ['yarn', ['add', '-D', ...packages]]

    default:
      return ['pnpm', [
        'add',
        '-D',
        ...(workspaceRoot ? ['--workspace-root'] : []),
        ...(catalog === true ? ['--save-catalog'] : []),
        ...(typeof catalog === 'string' ? [`--save-catalog-name=${catalog}`] : []),
        ...packages
      ]]
  }
}

const findPnpmWorkspaceRoot = (cwd: string): string | undefined => {
  let current = cwd

  for (;;) {
    if (existsSync(join(current, 'pnpm-workspace.yaml'))) return current

    const parent = dirname(current)

    if (parent === current) return undefined

    current = parent
  }
}

const detectPackageManager = (cwd: string): string => {
  if (findPnpmWorkspaceRoot(cwd) || existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'

  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'

  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'

  return 'npm'
}

const getCatalogPreference = (
  packageJson: null | Record<string, unknown>
): false | string | true => {
  const dependencyFields = ['devDependencies', 'dependencies'] as const

  for (const field of dependencyFields) {
    // eslint-disable-next-line security/detect-object-injection -- field is constrained to known dependency records
    const dependencies = packageJson?.[field]

    if (!dependencies || typeof dependencies !== 'object' || Array.isArray(dependencies)) continue

    for (const value of Object.values(dependencies)) {
      if (typeof value !== 'string' || !value.startsWith('catalog:')) continue

      const name = value.slice('catalog:'.length)

      return name && name !== 'default' ? name : true
    }
  }

  return false
}

const getCatalogVersion = (workspaceRoot: string, packageName: string): string | undefined => {
  const workspacePath = join(workspaceRoot, 'pnpm-workspace.yaml')

  if (!existsSync(workspacePath)) return undefined

  const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // eslint-disable-next-line security/detect-non-literal-regexp -- packageName is escaped before interpolation
  const match = new RegExp(`^\\s*['"]?${escapedName}['"]?\\s*:\\s*['"]?([^'"\\s#]+)`, 'm')
    .exec(readFileSync(workspacePath, 'utf8'))

  return match?.[1]
}

const getCompatibleConfigVersion = (
  packageJson: null | Record<string, unknown>,
  workspaceRoot?: string
): string => {
  const dependencyFields = ['devDependencies', 'dependencies', 'peerDependencies'] as const
  let basicSpec: string | undefined

  for (const field of dependencyFields) {
    // eslint-disable-next-line security/detect-object-injection -- field is constrained to known dependency records
    const dependencies = packageJson?.[field]

    if (!dependencies || typeof dependencies !== 'object' || Array.isArray(dependencies)) continue

    const value = Object.entries(dependencies as Record<string, unknown>)
      .find(([packageName]) => packageName === BASIC_PACKAGE_NAME)?.[1]

    if (typeof value === 'string') {
      basicSpec = value

      break
    }
  }

  const resolvedSpec = basicSpec?.startsWith('catalog:') && workspaceRoot
    ? getCatalogVersion(workspaceRoot, BASIC_PACKAGE_NAME)
    : basicSpec

  const match = /(\d+)\.(\d+)\.(\d+)/.exec(resolvedSpec ?? getCliVersion())

  return match ? `^${match[1]}.${match[2]}.${match[3]}` : '^3.1.0'
}

const addCompatibleConfigVersions = (
  packages: string[],
  version: string
): string[] => packages.map(packageName =>
  packageName.startsWith('@santi020k/eslint-config-') &&
  packageName !== LITE_PACKAGE_NAME &&
  packageName !== INTEGRATIONS_PACKAGE_NAME
    ? `${packageName}@${version}`
    : packageName
)

const hasLintScript = (cwd: string): boolean => {
  const packageJson = readPackageJson(cwd) as null | { scripts?: Record<string, string> }

  return Boolean(packageJson?.scripts?.lint)
}

const getWorkspacePatternsFromPackageJson = (packageJson: null | Record<string, unknown>): string[] => {
  const workspaces = packageJson?.workspaces

  if (Array.isArray(workspaces)) {
    return workspaces.filter((value): value is string => typeof value === 'string')
  }

  if (workspaces && typeof workspaces === 'object' && Array.isArray((workspaces as { packages?: unknown }).packages)) {
    return (workspaces as { packages: unknown[] }).packages.filter((value): value is string => typeof value === 'string')
  }

  return []
}

const getWorkspacePatternsFromPnpm = (cwd: string): string[] => {
  const workspacePath = join(cwd, 'pnpm-workspace.yaml')

  if (!existsSync(workspacePath)) return []

  const content = readFileSync(workspacePath, 'utf8')
  const patterns: string[] = []
  let inPackages = false

  for (const line of content.split(/\r?\n/)) {
    if (/^packages:\s*$/.test(line)) {
      inPackages = true

      continue
    }

    if (inPackages && /^\S/.test(line)) break

    const match = inPackages ? /^\s*-\s*['"]?([^'"]+)['"]?\s*$/.exec(line) : null

    if (match?.[1] && !match[1].startsWith('!')) patterns.push(match[1])
  }

  return patterns
}

const expandWorkspacePattern = (cwd: string, pattern: string): string[] => {
  const normalized = pattern.replace(/\/$/, '')

  if (!normalized.endsWith('/*')) return []

  const base = normalized.slice(0, -2)
  const basePath = join(cwd, base)

  if (!existsSync(basePath)) return []

  return readdirSync(basePath, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => `${base}/${entry.name}`)
    .filter(projectPath => existsSync(join(cwd, projectPath, 'package.json')))
}

const detectWorkspaceProjects = (cwd: string): string[] => {
  const patterns = [
    ...getWorkspacePatternsFromPackageJson(readPackageJson(cwd)),
    ...getWorkspacePatternsFromPnpm(cwd)
  ]

  return [...new Set(patterns.flatMap(pattern => expandWorkspacePattern(cwd, pattern)))].sort()
}

const createExplicitOptions = (cwd: string): string[] => {
  const summary = getProjectSummary(cwd)
  const options: string[] = []

  const features = [...new Set([
    ...summary.extensions,
    ...summary.formats,
    ...summary.libraries,
    ...summary.testing,
    ...summary.tools
  ])].sort()

  if (summary.typescript) options.push('  typescript: true,')

  if (summary.frameworks.length > 0) {
    options.push(
      '  frameworks: {',
      ...summary.frameworks.map(framework => `    ${toPropertyKey(framework)}: true,`),
      '  },'
    )
  }

  if (features.length > 0) {
    options.push(
      '  features: {',
      ...features.map(feature => `    ${toPropertyKey(feature)}: true,`),
      '  },'
    )
  }

  return options
}

const createConfigContent = (cwd: string, explicit = false): { configContent: string, configPath: string } => {
  const explicitOptions = explicit ? createExplicitOptions(cwd) : []

  const invocation = explicitOptions.length > 0 ?
    ['export default defineConfig({', ...explicitOptions, '})'] :
    ['export default defineConfig()']

  const configContent = [
    'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
    '',
    ...invocation,
    ''
  ].join('\n')

  return {
    configContent,
    configPath: resolveConfigPath(cwd)
  }
}

const formatList = (values: undefined | unknown[]): string => {
  if (!values?.length) return 'none'

  return values.join(', ')
}

const getProjectSummary = (cwd: string) => {
  const options = detectProjectOptions(cwd)
  const workspaceProjects = detectWorkspaceProjects(cwd)

  return {
    detectedProjects: Object.keys(options.projects ?? {}).sort(),
    extensions: options.extensions ?? [],
    formats: options.formats ?? [],
    frameworks: getFrameworkKeys(options.detectedFrameworks),
    libraries: options.libraries ?? [],
    nextMode: options.nextMode ?? 'n/a',
    preset: options.preset ?? 'basic',
    runtime: options.runtime ?? 'universal',
    testing: options.testing ?? [],
    tools: options.tools ?? [],
    typescript: Boolean(options.typescript),
    workspaceProjects
  }
}

const getInstallProjectSummary = (cwd: string): ReturnType<typeof getProjectSummary> => {
  const rootSummary = getProjectSummary(cwd)

  const projectPaths = [...new Set([
    ...rootSummary.detectedProjects,
    ...rootSummary.workspaceProjects
  ])]

  const projectSummaries = projectPaths.map(projectPath => (
    getProjectSummary(join(cwd, projectPath))
  ))

  const summaries = [rootSummary, ...projectSummaries]

  return {
    ...rootSummary,
    extensions: [...new Set(summaries.flatMap(summary => summary.extensions))],
    formats: [...new Set(summaries.flatMap(summary => summary.formats))],
    frameworks: [...new Set(summaries.flatMap(summary => summary.frameworks))].sort(),
    libraries: [...new Set(summaries.flatMap(summary => summary.libraries))],
    testing: [...new Set(summaries.flatMap(summary => summary.testing))],
    tools: [...new Set(summaries.flatMap(summary => summary.tools))],
    typescript: summaries.some(summary => summary.typescript)
  }
}

const getWorkspaceDeclaredConfigPackages = (
  cwd: string,
  summary: ReturnType<typeof getProjectSummary>
): string[] => {
  const packages = new Set<string>()

  for (const projectPath of summary.detectedProjects) {
    for (const packageName of getDeclaredDependencyNames(readPackageJson(join(cwd, projectPath)))) {
      if (packageName.startsWith('@santi020k/eslint-config-')) packages.add(packageName)
    }
  }

  return [...packages]
}

const createStandardsContent = (cwd: string): string => {
  const summary = getProjectSummary(cwd)

  return [
    '# ESLint Standards',
    '',
    'This document was generated from the active project dependencies detected by `@santi020k/eslint-config-basic`.',
    '',
    '## Active Profile',
    '',
    `- TypeScript: ${summary.typescript ? 'enabled' : 'disabled'}`,
    `- Preset: ${summary.preset}`,
    `- Runtime: ${summary.runtime}`,
    `- Next.js mode: ${summary.nextMode}`,
    `- Frameworks: ${formatList(summary.frameworks)}`,
    `- Libraries: ${formatList(summary.libraries)}`,
    `- Testing: ${formatList(summary.testing)}`,
    `- Formats: ${formatList(summary.formats)}`,
    `- Tools: ${formatList(summary.tools)}`,
    `- Extensions: ${formatList(summary.extensions)}`,
    '',
    '## Recommended Config',
    '',
    '```js',
    'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
    '',
    'export default await defineConfig()',
    '```',
    '',
    'Use `basic-eslint explain` when you want to inspect what the zero-config setup detects.'
  ].join('\n')
}

const getCliVersion = (): string => {
  const cliDir = dirname(fileURLToPath(import.meta.url))
  const packageJsonPath = join(cliDir, '..', 'package.json')

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { version?: string }

    return packageJson.version ?? 'unknown'
  } catch {
    return 'unknown'
  }
}

const printUsage = () => {
  console.log([
    'Usage: basic-eslint <command> [options]',
    '',
    'Commands:',
    '  init            Create eslint.config.js/mjs if missing',
    '  update          Regenerate eslint.config.js/mjs from detection',
    '  explain         Print detected v3 config inputs',
    '  inspect         Print detected inputs and active config features',
    '  install         Install missing packages for detected v3 features',
    '  doctor          Check project setup for common v3 adoption issues',
    '  compatibility   Check runtime and config package compatibility',
    '  docs            Generate ESLINT_STANDARDS.md from detection',
    '  migrate         Plan or apply v1-to-v2 and v2-to-v3 migrations',
    '  baseline        Suppress existing violations for incremental adoption',
    '  profile         Compare ESLint performance and report slow rules',
    '  snapshot        Save the effective rules for representative files',
    '  diff            Compare effective rules with the saved snapshot',
    '  generate-skill  Generate AI agent standards files',
    '',
    'Options:',
    '  --force         Overwrite existing generated skill sections/files',
    '  --check         Verify generated files, migrations, or snapshots without writing',
    '  --concurrency   profile: off, auto, or a worker count',
    '  --create        generate-skill: scaffold a root AGENTS.md when missing',
    '  --dry-run       install: print the detected install command without running it',
    '  --explicit      init: write detected settings explicitly',
    '  --file          profile/snapshot/diff: representative file or lint target (repeatable)',
    '  --fix           doctor: safely repair generated config and package metadata',
    '  --full          migrate --to v3: choose the batteries-included package',
    '  --json          Print JSON for commands that support it',
    '  --lite-install  doctor: print the deprecated v2 Lite install command (removed in v4)',
    '  --max-duration  profile: maximum duration in milliseconds',
    '  --max-rule-time profile: maximum time for the slowest rule in milliseconds',
    '  --max-warnings  profile: maximum warning count',
    '  --preset        baseline: enable ci or pedantic strict mode before suppressing',
    '  --prune         baseline: remove suppressions for resolved violations',
    '  --snapshot-path snapshot/diff: override .eslint-config-snapshot.json',
    '  --to            migrate: target version (v2 or v3)',
    '  --with-eslint-mcp generate-skill: scaffold the official ESLint MCP server',
    '  --write         Apply safe migrations for commands that support it',
    '  --help, -h      Show this help message',
    '  --version, -v   Show CLI version'
  ].join('\n'))
}

export const handleInit = (cwd: string = process.cwd(), check = false, explicit = false) => {
  const configPath = resolveConfigPath(cwd)

  if (check) {
    const exists = existsSync(configPath)

    console.log(JSON.stringify({
      configFile: exists ? basename(configPath) : null,
      exists,
      ok: exists
    }, null, 2))

    if (!exists) process.exitCode = 1

    return
  }

  if (existsSync(configPath)) {
    console.error(`⚠️  ${basename(configPath)} already exists. Skipping...`)

    return
  }

  console.log('🔍 Detecting project settings...')

  const { configContent } = createConfigContent(cwd, explicit)

  writeFileSync(configPath, configContent)

  console.log(`✅ Created ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

export const handleUpdate = (cwd: string = process.cwd()) => {
  console.log('🔍 Detecting project settings...')

  const { configContent, configPath } = createConfigContent(cwd)

  if (existsSync(configPath)) {
    const backupPath = `${configPath}.bak`
    const existing = readFileSync(configPath, 'utf8')

    writeFileSync(backupPath, existing)

    console.log(`📦 Backed up existing config to ${basename(backupPath)}`)
  }

  writeFileSync(configPath, configContent)

  console.log(`✅ Updated ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

export const handleExplain = (cwd: string = process.cwd(), json = false) => {
  const summary = getProjectSummary(cwd)

  if (json) {
    console.log(JSON.stringify(summary, null, 2))

    return
  }

  console.log([
    'ESLint Basic detected configuration:',
    `- TypeScript: ${summary.typescript ? 'enabled' : 'disabled'}`,
    `- Preset: ${summary.preset}`,
    `- Runtime: ${summary.runtime}`,
    `- Next.js mode: ${summary.nextMode}`,
    `- Frameworks: ${formatList(summary.frameworks)}`,
    `- Libraries: ${formatList(summary.libraries)}`,
    `- Testing: ${formatList(summary.testing)}`,
    `- Formats: ${formatList(summary.formats)}`,
    `- Tools: ${formatList(summary.tools)}`,
    `- Extensions: ${formatList(summary.extensions)}`
  ].join('\n'))
}

export const handleInspect = async (cwd: string = process.cwd(), json = false) => {
  const summary = getProjectSummary(cwd)
  const activeConfig = await analyzeEslintConfig(cwd)

  const payload = {
    activeConfig,
    detected: summary,
    packageManager: detectPackageManager(cwd)
  }

  if (json) {
    console.log(JSON.stringify(payload, null, 2))

    return
  }

  console.log([
    'ESLint Basic inspection:',
    `- Package manager: ${payload.packageManager}`,
    `- Config source: ${activeConfig?.source ?? 'not found'}`,
    `- Config file: ${activeConfig?.configFile ?? 'none'}`,
    `- TypeScript: ${summary.typescript ? 'enabled' : 'disabled'}`,
    `- Preset: ${summary.preset}`,
    `- Runtime: ${summary.runtime}`,
    `- Frameworks: ${formatList(summary.frameworks)}`,
    `- Libraries: ${formatList(summary.libraries)}`,
    `- Testing: ${formatList(summary.testing)}`,
    `- Formats: ${formatList(summary.formats)}`,
    `- Tools: ${formatList(summary.tools)}`,
    `- Extensions: ${formatList(summary.extensions)}`,
    `- Workspace projects: ${formatList(summary.workspaceProjects)}`
  ].join('\n'))
}

interface DuplicateEslintInfo {
  configVersion: string
  projectVersion: string
}

interface PackageMetadata {
  engines?: { node?: string }
  name?: string
  peerDependencies?: { eslint?: string }
  version?: string
}

interface SemverApi {
  satisfies: (version: string, range: string) => boolean
}

const semver = createRequire(import.meta.url)('semver') as SemverApi

const readPackageMetadataFromMain = (mainPath: string, packageName: string): null | PackageMetadata => {
  let directory = dirname(mainPath)

  for (let depth = 0; depth < 4; depth++) {
    const packagePath = join(directory, 'package.json')

    if (existsSync(packagePath)) {
      const metadata = JSON.parse(readFileSync(packagePath, 'utf8')) as PackageMetadata

      if (metadata.name === packageName) return metadata
    }

    directory = dirname(directory)
  }

  return null
}

const resolvePackageMetadata = (cwd: string, packageName: string): null | PackageMetadata => {
  try {
    const projectRequire = createRequire(join(cwd, 'package.json'))

    try {
      return readPackageMetadataFromMain(projectRequire.resolve(packageName), packageName)
    } catch {
      const integrationsMain = projectRequire.resolve(INTEGRATIONS_PACKAGE_NAME)
      const integrationsRequire = createRequire(integrationsMain)

      return readPackageMetadataFromMain(integrationsRequire.resolve(packageName), packageName)
    }
  } catch {
    return null
  }
}

const getAstroDoctorNodeWarning = (metadata: PackageMetadata): null | string => {
  const nodeRange = metadata.engines?.node

  if (!nodeRange || semver.satisfies(process.versions.node, nodeRange)) return null

  return `Astro Doctor ${metadata.version ?? ''} requires Node ${nodeRange}, ` +
    `but the current runtime is ${process.versions.node}.`
}

const getAstroDoctorEslintWarning = (
  metadata: PackageMetadata,
  eslintMetadata: null | PackageMetadata
): null | string => {
  const eslintRange = metadata.peerDependencies?.eslint
  const eslintVersion = eslintMetadata?.version

  if (!eslintRange || !eslintVersion || semver.satisfies(eslintVersion, eslintRange)) return null

  return `Astro Doctor ${metadata.version ?? ''} requires ESLint ${eslintRange}, ` +
    `but this project resolves ${eslintVersion}.`
}

const getAstroDoctorCompatibilityWarnings = (cwd: string, enabled: boolean): string[] => {
  if (!enabled) return []

  const pluginMetadata = resolvePackageMetadata(cwd, ASTRO_DOCTOR_PACKAGE_NAME)

  if (!pluginMetadata) {
    return [
      `Astro Doctor is enabled, but ${ASTRO_DOCTOR_PACKAGE_NAME} could not be resolved. ` +
      'Reinstall dependencies or disable the `astro-doctor` feature.'
    ]
  }

  const eslintMetadata = resolvePackageMetadata(cwd, 'eslint')

  return [
    getAstroDoctorNodeWarning(pluginMetadata),
    getAstroDoctorEslintWarning(pluginMetadata, eslintMetadata)
  ].filter((warning): warning is string => warning !== null)
}

/**
 * Detects whether the project and the config packages resolve two different
 * physical copies of ESLint (e.g. a project pinning an older ESLint while the
 * config packages resolve their own ESLint 10 dependency). Only ESLint 10 is
 * supported; two parallel copies can also apply subtly different rule behavior
 * between editor and CLI.
 */
export const findDuplicateEslint = (cwd: string = process.cwd()): DuplicateEslintInfo | null => {
  try {
    const projectRequire = createRequire(join(cwd, 'package.json'))
    const projectEslintPkgPath = projectRequire.resolve('eslint/package.json')
    const coreMainPath = projectRequire.resolve('@santi020k/eslint-config-core')
    const coreRequire = createRequire(coreMainPath)
    const coreEslintPkgPath = coreRequire.resolve('eslint/package.json')

    if (projectEslintPkgPath === coreEslintPkgPath) return null

    const projectVersion = (JSON.parse(readFileSync(projectEslintPkgPath, 'utf8')) as { version?: string }).version ?? 'unknown'
    const configVersion = (JSON.parse(readFileSync(coreEslintPkgPath, 'utf8')) as { version?: string }).version ?? 'unknown'

    if (projectVersion === configVersion) return null

    return { configVersion, projectVersion }
  } catch {
    return null
  }
}

const validateConfigContent = (
  configContent: string,
  hasV1FrameworkImports: boolean,
  declaredDependencies: Set<string>,
  summary: ReturnType<typeof getProjectSummary>
): string[] => {
  const warnings: string[] = []

  if (hasV1FrameworkImports) {
    warnings.push('Config still imports v1 framework packages. Run `basic-eslint migrate --write` or switch to framework booleans.')
  }

  const usesBasicComposer = /from\s*['"]@santi020k\/eslint-config-(?:basic|full|lite)['"]/.test(configContent) &&
    /\b(?:defineConfig|eslintConfig)\s*\(/.test(configContent)

  const hasDetectedProjectScopes = summary.workspaceProjects.every(project => (
    summary.detectedProjects.includes(project)
  ))

  if (
    summary.workspaceProjects.length > 0 &&
    !configContent.includes('projects:') &&
    !(usesBasicComposer && hasDetectedProjectScopes)
  ) {
    warnings.push('Workspace packages were detected, but the root config does not use `projects` scoping.')
  }

  if (configContent.includes(LITE_PACKAGE_NAME)) {
    const missingFrameworkPackages = summary.frameworks
      // eslint-disable-next-line security/detect-object-injection -- framework values come from known detection keys
      .map(framework => FRAMEWORK_KEY_TO_PACKAGE[framework])
      .filter((packageName): packageName is string => Boolean(packageName))
      .filter(packageName => !declaredDependencies.has(packageName))

    if (missingFrameworkPackages.length > 0) {
      warnings.push(
        `Lite config detected ${formatList(summary.frameworks)}, but these framework config packages are not declared: ` +
        `${missingFrameworkPackages.join(', ')}. Install them or disable those frameworks.`
      )
    }

    if (needsIntegrationPackage(summary) && !declaredDependencies.has(INTEGRATIONS_PACKAGE_NAME)) {
      warnings.push(
        `Lite config detected optional integrations, but ${INTEGRATIONS_PACKAGE_NAME} is not declared. ` +
        'Install it or remove the selected libraries, testing tools, formats, tools, and extension integrations.'
      )
    }

    if (hasPresetAll(configContent)) {
      warnings.push(
        'Lite config uses Preset.All, which enables every optional integration and reduces the dependency benefits of lite. ' +
        'Prefer enabling only the integrations this project uses.'
      )
    }
  }

  const missingPackages = getInstallPackages(
    summary,
    declaredDependencies,
    getExplicitConfigFeaturePackages(configContent)
  )

  if (missingPackages.length > 0) {
    warnings.push(
      `The active configuration requires undeclared packages: ${missingPackages.join(', ')}. ` +
      'Run `basic-eslint install` to add the modular v3 dependency set.'
    )
  }

  return warnings
}

const validateProjectSetup = (
  cwd: string,
  configPath: null | string,
  activeConfig: Awaited<ReturnType<typeof analyzeEslintConfig>>,
  hasV1FrameworkImports: boolean
) => {
  const issues: string[] = []
  const warnings: string[] = []

  if (!readPackageJson(cwd)) {
    issues.push('package.json is missing or invalid.')
  }

  if (!configPath) {
    warnings.push('No eslint.config.js/mjs/cjs file found. Run `basic-eslint init` to create one.')
  } else if (!activeConfig && !hasV1FrameworkImports) {
    issues.push(`${basename(configPath)} could not be loaded. Run ESLint directly to see the import error.`)
  }

  if (!hasLintScript(cwd)) {
    warnings.push('No `lint` script found in package.json.')
  }

  return { issues, warnings }
}

const isAstroDoctorConfigured = (
  activeConfig: Awaited<ReturnType<typeof analyzeEslintConfig>>,
  configContent: null | string
): boolean => [
  activeConfig?.extensions.includes('Astro Doctor') ?? false,
  configContent?.includes('astro-doctor') ?? false,
  configContent?.includes('AstroDoctor') ?? false
].includes(true)

const isAstroConfigured = (
  activeConfig: Awaited<ReturnType<typeof analyzeEslintConfig>>,
  summary: ReturnType<typeof getProjectSummary>
): boolean => [
  activeConfig?.frameworks.includes('Astro') ?? false,
  summary.frameworks.includes('astro')
].some(Boolean)

const checkAstroDoctorStatus = (
  activeConfig: Awaited<ReturnType<typeof analyzeEslintConfig>>,
  configContent: null | string,
  summary: ReturnType<typeof getProjectSummary>,
  warnings: string[]
): boolean => {
  const astroDoctorEnabled = isAstroDoctorConfigured(activeConfig, configContent)
  const astroEnabled = isAstroConfigured(activeConfig, summary)

  if (astroDoctorEnabled && !astroEnabled) {
    warnings.push(
      'Astro Doctor is enabled without Astro. Enable `frameworks: { astro: true }` or remove the `astro-doctor` feature.'
    )
  } else if (astroEnabled && !astroDoctorEnabled) {
    warnings.push(
      'Astro was detected without Astro Doctor. Enable `features: { "astro-doctor": true }` for additional Astro diagnostics.'
    )
  }

  return astroDoctorEnabled
}

const checkDuplicateEslint = (cwd: string, warnings: string[]) => {
  const duplicateEslint = findDuplicateEslint(cwd)

  if (duplicateEslint) {
    warnings.push(
      `Two ESLint copies are installed: the project resolves ${duplicateEslint.projectVersion} while the config packages resolve ${duplicateEslint.configVersion}. ` +
      'Only ESLint 10 is supported, and parallel copies can apply different rule behavior between your editor and CLI. ' +
      'Align the project\'s eslint version with the config\'s (or dedupe via your package manager).'
    )
  }
}

const buildDoctorDiagnosis = (
  cwd: string,
  configPath: null | string,
  configContent: null | string,
  hasV1FrameworkImports: boolean,
  activeConfig: Awaited<ReturnType<typeof analyzeEslintConfig>>,
  declaredDependencies: Set<string>,
  summary: ReturnType<typeof getProjectSummary>
): { issues: string[], warnings: string[] } => {
  const { issues, warnings } = validateProjectSetup(cwd, configPath, activeConfig, hasV1FrameworkImports)

  if (configContent) {
    warnings.push(...validateConfigContent(configContent, hasV1FrameworkImports, declaredDependencies, summary))
  }

  const astroDoctorEnabled = checkAstroDoctorStatus(activeConfig, configContent, summary, warnings)

  warnings.push(...getAstroDoctorCompatibilityWarnings(cwd, astroDoctorEnabled))

  checkDuplicateEslint(cwd, warnings)

  return { issues, warnings }
}

const outputDoctorResult = (
  json: boolean,
  configPath: null | string,
  packageManager: string,
  summary: ReturnType<typeof getProjectSummary>,
  installCommand: string | undefined,
  requiredPackages: string[],
  issues: string[],
  warnings: string[],
  fixes: string[] = []
): void => {
  let status = 'passed'

  if (issues.length > 0) {
    status = 'failed'
  } else if (warnings.length > 0) {
    status = 'passed with warnings'
  }

  const payload = {
    configFile: configPath ? basename(configPath) : null,
    fixes,
    ...(installCommand ? { installCommand } : {}),
    issues,
    packageManager,
    requiredPackages,
    status,
    warnings,
    workspaceProjects: summary.workspaceProjects
  }

  if (json) {
    console.log(JSON.stringify(payload, null, 2))

    if (issues.length > 0) process.exitCode = 1

    return
  }

  console.log([
    `ESLint Basic doctor: ${status}`,
    `- Package manager: ${payload.packageManager}`,
    `- Config file: ${payload.configFile ?? 'none'}`,
    `- Workspace projects: ${formatList(summary.workspaceProjects)}`,
    `- Required packages: ${formatList(requiredPackages)}`,
    ...(installCommand ? [`- Install command: ${installCommand}`] : []),
    ...(fixes.length > 0 ? ['', 'Fixes applied:', ...fixes.map(fix => `- ${fix}`)] : []),
    ...(issues.length > 0 ? ['', 'Issues:', ...issues.map(issue => `- ${issue}`)] : []),
    ...(warnings.length > 0 ? ['', 'Warnings:', ...warnings.map(warning => `- ${warning}`)] : [])
  ].join('\n'))

  if (issues.length > 0) process.exitCode = 1
}

const createDoctorBackupPath = (filePath: string): string => {
  const preferred = `${filePath}.doctor.bak`

  if (!existsSync(preferred)) return preferred

  let index = 2

  while (existsSync(`${preferred}.${index}`)) index++

  return `${preferred}.${index}`
}

const getDoctorDependencyVersion = (packageName: string): string => {
  if (packageName === 'eslint') return '^10.0.0'

  if (packageName === TYPESCRIPT_PACKAGE_NAME) return '^5.0.0'

  return '^3.0.0'
}

const applyDoctorFixes = (
  cwd: string,
  packageJson: null | Record<string, unknown>,
  configPath: null | string,
  configContent: null | string,
  summary: ReturnType<typeof getProjectSummary>
): string[] => {
  const fixes: string[] = []

  if (packageJson) {
    const updated = structuredClone(packageJson) as {
      devDependencies?: Record<string, string>
      scripts?: Record<string, string>
    }

    let packageChanged = false

    updated.scripts ??= {}

    if (!updated.scripts.lint) {
      updated.scripts.lint = 'eslint .'

      packageChanged = true

      fixes.push('Added the `lint` script.')
    }

    updated.devDependencies ??= {}

    const declared = getDeclaredDependencyNames(packageJson)

    const explicitFeaturePackages = configContent
      ? getExplicitConfigFeaturePackages(configContent)
      : []

    const missingPackages = getInstallPackages(summary, declared, explicitFeaturePackages)

    const missingDependencies = Object.fromEntries(
      missingPackages.map(packageName => [packageName, getDoctorDependencyVersion(packageName)])
    )

    updated.devDependencies = {
      ...updated.devDependencies,
      ...missingDependencies
    }

    for (const packageName of missingPackages) {
      fixes.push(`Declared ${packageName}.`)

      packageChanged = true
    }

    if (packageChanged) {
      const packagePath = join(cwd, 'package.json')
      const backupPath = createDoctorBackupPath(packagePath)

      writeFileSync(backupPath, `${JSON.stringify(packageJson, null, 2)}\n`)

      writeFileSync(packagePath, `${JSON.stringify(updated, null, 2)}\n`)

      fixes.push(`Backed up package.json to ${basename(backupPath)}.`)
    }
  }

  if (!configPath) {
    const generated = createConfigContent(cwd)

    writeFileSync(generated.configPath, generated.configContent)

    fixes.push(`Created ${basename(generated.configPath)}.`)
  } else if (
    configContent &&
    Object.keys(FRAMEWORK_PACKAGE_TO_KEY).some(packageName => configContent.includes(packageName))
  ) {
    const result = migrateConfigContent(configContent)

    if (result.changed) {
      const backupPath = createDoctorBackupPath(configPath)

      writeFileSync(backupPath, configContent)

      writeFileSync(configPath, result.content)

      fixes.push(`Migrated v1 framework imports and backed up the config to ${basename(backupPath)}.`)
    }
  }

  return fixes
}

const hasV1FrameworkPackageImports = (configContent: null | string): boolean => (
  configContent !== null &&
  Object.keys(FRAMEWORK_PACKAGE_TO_KEY).some(packageName => configContent.includes(packageName))
)

export const handleDoctor = async (
  cwd: string = process.cwd(),
  json = false,
  liteInstall = false,
  fix = false
) => {
  const pnpmWorkspaceRoot = findPnpmWorkspaceRoot(cwd)
  const projectRoot = pnpmWorkspaceRoot ?? cwd
  const packageManager = detectPackageManager(projectRoot)
  const workspaceRoot = packageManager === 'pnpm' && pnpmWorkspaceRoot !== undefined
  const catalog = workspaceRoot ? getCatalogPreference(readPackageJson(projectRoot)) : false
  let configPath = getConfigPathIfPresent(projectRoot)
  let packageJson = readPackageJson(projectRoot)
  let declaredDependencies = getDeclaredDependencyNames(packageJson)
  let summary = getInstallProjectSummary(projectRoot)
  let activeConfig = await analyzeEslintConfig(projectRoot)
  let configContent = configPath ? readFileSync(configPath, 'utf8') : null
  let hasV1FrameworkImports = hasV1FrameworkPackageImports(configContent)

  if (liteInstall) {
    const liteInstallPackages = getLiteInstallPackages(summary, declaredDependencies)

    const liteInstallCommand = createInstallCommand(
      packageManager,
      addCompatibleConfigVersions(
        liteInstallPackages,
        getCompatibleConfigVersion(packageJson, pnpmWorkspaceRoot)
      ),
      workspaceRoot,
      catalog
    )

    if (json) {
      console.log(JSON.stringify({ command: liteInstallCommand, packageManager, packages: liteInstallPackages }, null, 2))
    } else {
      console.log(liteInstallCommand)
    }

    return
  }

  const fixes = fix ? applyDoctorFixes(projectRoot, packageJson, configPath, configContent, summary) : []

  if (fixes.length > 0) {
    configPath = getConfigPathIfPresent(projectRoot)

    packageJson = readPackageJson(projectRoot)

    declaredDependencies = getDeclaredDependencyNames(packageJson)

    summary = getInstallProjectSummary(projectRoot)

    activeConfig = await analyzeEslintConfig(projectRoot)

    configContent = configPath ? readFileSync(configPath, 'utf8') : null

    hasV1FrameworkImports = hasV1FrameworkPackageImports(configContent)
  }

  const explicitFeaturePackages = configContent
    ? getExplicitConfigFeaturePackages(configContent)
    : []

  const requiredPackages = getInstallPackages(summary, declaredDependencies, explicitFeaturePackages)

  const installCommand = requiredPackages.length > 0
    ? createInstallCommand(
      packageManager,
      addCompatibleConfigVersions(
        requiredPackages,
        getCompatibleConfigVersion(packageJson, pnpmWorkspaceRoot)
      ),
      workspaceRoot,
      catalog
    )
    : undefined

  const { issues, warnings } = buildDoctorDiagnosis(
    projectRoot, configPath, configContent, hasV1FrameworkImports, activeConfig, declaredDependencies, summary
  )

  outputDoctorResult(
    json,
    configPath,
    packageManager,
    summary,
    installCommand,
    requiredPackages,
    issues,
    warnings,
    fixes
  )
}

export const handleInstall = (cwd: string = process.cwd(), dryRun = false) => {
  const pnpmWorkspaceRoot = findPnpmWorkspaceRoot(cwd)
  const projectRoot = pnpmWorkspaceRoot ?? cwd
  const packageJson = readPackageJson(projectRoot)

  if (!packageJson) {
    console.error('❌ package.json is missing or invalid.')

    process.exitCode = 1

    return
  }

  const packageManager = detectPackageManager(projectRoot)
  const configPath = getConfigPathIfPresent(projectRoot)

  const explicitFeaturePackages = configPath
    ? getExplicitConfigFeaturePackages(readFileSync(configPath, 'utf8'))
    : []

  const packages = getInstallPackages(
    getInstallProjectSummary(projectRoot),
    getDeclaredDependencyNames(packageJson),
    explicitFeaturePackages
  )

  const workspaceRoot = packageManager === 'pnpm' && pnpmWorkspaceRoot !== undefined
  const catalog = workspaceRoot ? getCatalogPreference(packageJson) : false

  const installPackages = addCompatibleConfigVersions(
    packages,
    getCompatibleConfigVersion(packageJson, pnpmWorkspaceRoot)
  )

  if (packages.length === 0) {
    console.log('✅ All packages required by the detected ESLint configuration are already declared.')

    return
  }

  const installCommand = createInstallCommand(packageManager, installPackages, workspaceRoot, catalog)

  if (dryRun) {
    console.log(installCommand)

    return
  }

  console.log(`Installing detected ESLint dependencies:\n${installCommand}`)

  const [command, args] = createInstallInvocation(packageManager, installPackages, workspaceRoot, catalog)
  const result = spawnSync(command, args, { cwd: projectRoot, stdio: 'inherit' })

  if (result.error) {
    console.error(`❌ Failed to run ${packageManager}: ${result.error.message}`)

    process.exitCode = 1
  } else if (result.status !== 0) {
    process.exitCode = result.status ?? 1
  }
}

export const handleDocs = (cwd: string = process.cwd()) => {
  const outputPath = join(cwd, 'ESLINT_STANDARDS.md')

  writeFileSync(outputPath, createStandardsContent(cwd))

  console.log('✅ Generated ESLINT_STANDARDS.md')
}

const migrateConfigContent = (content: string): { changed: boolean, content: string, frameworks: string[] } => {
  const importedFrameworks = Object.entries(FRAMEWORK_PACKAGE_TO_KEY)
    .filter(([packageName]) => content.includes(packageName))
    .map(([, framework]) => framework)

  if (importedFrameworks.length === 0) {
    return { changed: false, content, frameworks: [] }
  }

  const frameworks = getFrameworkKeys(importedFrameworks)

  const migrated = [
    'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
    '',
    'export default await defineConfig({',
    '  frameworks: {',
    `    ${frameworks.map(key => `${toPropertyKey(key)}: true`).join(',\n    ')}`,
    '  }',
    '})',
    ''
  ].join('\n')

  return { changed: true, content: migrated, frameworks }
}

const processConfigMigration = (configPath: string, write: boolean, suggestions: string[]): string[] => {
  const applied: string[] = []

  if (!existsSync(configPath)) {
    if (write) suggestions.push('- No ESLint config file was found to rewrite.')

    return applied
  }

  const configContent = readFileSync(configPath, 'utf8')

  if (configContent.includes('@santi020k/eslint-config-') && !configContent.includes('frameworks:')) {
    suggestions.push('- This config appears to import v1 framework packages; replace those imports with framework booleans.')
  }

  if (!write) return applied

  const result = migrateConfigContent(configContent)

  if (result.changed) {
    const backupPath = `${configPath}.bak`

    writeFileSync(backupPath, configContent)

    writeFileSync(configPath, result.content)

    const message = `Rewrote ${basename(configPath)} with framework booleans: ${result.frameworks.join(', ')}. Original backed up to ${basename(backupPath)}.`

    applied.push(message)

    suggestions.push(`- ${message}`)
  } else {
    suggestions.push('- No v1 framework imports were found to rewrite.')
  }

  return applied
}

export const handleMigrate = (
  cwd: string = process.cwd(),
  write = false,
  json = false,
  target = 'v2',
  check = false,
  full = false
) => {
  if (target === 'v3' || target === '3') {
    const summary = getInstallProjectSummary(cwd)

    handleMigrateV3(cwd, {
      declaredConfigPackages: getWorkspaceDeclaredConfigPackages(cwd, summary),
      extensions: summary.extensions,
      formats: summary.formats,
      frameworks: summary.frameworks,
      libraries: summary.libraries,
      packageManager: detectPackageManager(cwd),
      testing: summary.testing,
      tools: summary.tools,
      typescript: summary.typescript
    }, { check, full, json, write })

    return
  }

  if (target !== 'v2' && target !== '2') {
    throw new Error(`Unsupported migration target "${target}". Use --to v2 or --to v3.`)
  }

  const configPath = getConfigPathIfPresent(cwd) ?? join(cwd, getDefaultConfigFilename(cwd))

  const suggestions = [
    'v1 to v2 migration suggestions:',
    '- Install only @santi020k/eslint-config-basic for the public config API.',
    '- Replace framework imports with bundled booleans such as frameworks: { react: true, next: true }.',
    '- Remove app-level @santi020k/eslint-config-react/next/vue/etc. config package imports.',
    '- Try defineConfig() first; v3 auto-detects supported frameworks and integrations.',
    '- Use basic-eslint explain to review what v3 detects before committing the migration.'
  ]

  const applied = processConfigMigration(configPath, write, suggestions)

  if (json) {
    console.log(JSON.stringify({
      applied,
      configFile: existsSync(configPath) ? basename(configPath) : null,
      suggestions: suggestions.slice(1),
      title: suggestions[0],
      write
    }, null, 2))

    return
  }

  console.log(suggestions.join('\n'))
}

const dispatchCommand = (
  command: string,
  cwd: string,
  flags: {
    concurrency?: string
    files: string[]
    hasCheck: boolean
    hasCreate: boolean
    hasDryRun: boolean
    hasExplicit: boolean
    hasFix: boolean
    hasForce: boolean
    hasFull: boolean
    hasJson: boolean
    hasLiteInstall: boolean
    hasPrune: boolean
    hasWrite: boolean
    hasWithEslintMcp: boolean
    maxDurationMs?: number
    maxRuleTimeMs?: number
    maxWarnings?: number
    preset?: string
    rule?: string
    snapshotPath?: string
    target?: string
  }
) => {
  switch (command) {
    case 'baseline': {
      try {
        handleBaseline(cwd, {
          json: flags.hasJson,
          preset: flags.preset,
          prune: flags.hasPrune
        })
      } catch (error) {
        console.error(`❌ Failed to create ESLint baseline: ${String(error)}`)

        process.exitCode = 1
      }

      break
    }

    case 'compatibility': {
      handleCompatibility(cwd, flags.hasJson)

      break
    }

    case 'diff': {
      handleSnapshotDiff(cwd, {
        files: flags.files,
        json: flags.hasJson,
        snapshotPath: flags.snapshotPath
      }).catch((error: unknown) => {
        console.error(`❌ Failed to diff ESLint configuration: ${String(error)}`)

        process.exitCode = 1
      })

      break
    }

    case 'docs': {
      handleDocs(cwd)

      break
    }

    case 'doctor': {
      handleDoctor(cwd, flags.hasJson, flags.hasLiteInstall, flags.hasFix).catch((error: unknown) => {
        console.error(`❌ Failed to run doctor: ${String(error)}`)

        process.exitCode = 1
      })

      break
    }

    case 'explain': {
      if (flags.rule) {
        handleExplainRule(cwd, {
          file: flags.files[0],
          json: flags.hasJson,
          rule: flags.rule
        }).catch((error: unknown) => {
          console.error(`❌ Failed to explain ESLint rule: ${String(error)}`)

          process.exitCode = 1
        })
      } else {
        handleExplain(cwd, flags.hasJson)
      }

      break
    }

    case 'generate-skill': {
      handleGenerateSkill(cwd, flags.hasForce, {
        check: flags.hasCheck,
        createAgentsMd: flags.hasCreate,
        withEslintMcp: flags.hasWithEslintMcp
      }).catch((error: unknown) => {
        console.error(`❌ Failed to generate skill files: ${String(error)}`)

        process.exitCode = 1
      })

      break
    }

    case 'init': {
      handleInit(cwd, flags.hasCheck, flags.hasExplicit)

      break
    }

    case 'inspect': {
      handleInspect(cwd, flags.hasJson).catch((error: unknown) => {
        console.error(`❌ Failed to inspect project: ${String(error)}`)

        process.exitCode = 1
      })

      break
    }

    case 'install': {
      handleInstall(cwd, flags.hasDryRun)

      break
    }

    case 'migrate': {
      try {
        handleMigrate(
          cwd,
          flags.hasWrite,
          flags.hasJson,
          flags.target ?? 'v2',
          flags.hasCheck,
          flags.hasFull
        )
      } catch (error) {
        console.error(`❌ Failed to migrate ESLint configuration: ${String(error)}`)

        process.exitCode = 1
      }

      break
    }

    case 'profile': {
      try {
        handleProfile(cwd, {
          concurrency: flags.concurrency,
          files: flags.files,
          json: flags.hasJson,
          maxDurationMs: flags.maxDurationMs,
          maxRuleTimeMs: flags.maxRuleTimeMs,
          maxWarnings: flags.maxWarnings
        })
      } catch (error) {
        console.error(`❌ Failed to profile ESLint: ${String(error)}`)

        process.exitCode = 1
      }

      break
    }

    case 'snapshot': {
      handleSnapshot(cwd, {
        check: flags.hasCheck,
        files: flags.files,
        json: flags.hasJson,
        snapshotPath: flags.snapshotPath
      }).catch((error: unknown) => {
        console.error(`❌ Failed to snapshot ESLint configuration: ${String(error)}`)

        process.exitCode = 1
      })

      break
    }

    case 'update': {
      handleUpdate(cwd)

      break
    }

    default: {
      console.error(`Unknown command: ${command}`)

      printUsage()

      process.exitCode = 1
    }
  }
}

const getFlagValue = (argv: string[], flag: string): string | undefined => {
  const inline = argv.find(argument => argument.startsWith(`${flag}=`))

  if (inline) return inline.slice(flag.length + 1)

  const index = argv.indexOf(flag)

  return index >= 0 ? argv[index + 1] : undefined
}

const getFlagValues = (argv: string[], flag: string): string[] => argv.flatMap((argument, index) => {
  if (argument.startsWith(`${flag}=`)) return [argument.slice(flag.length + 1)]

  if (argument === flag && argv[index + 1]) return [argv[index + 1]]

  return []
})

const getNumericFlagValue = (argv: string[], flag: string): number | undefined => {
  const value = getFlagValue(argv, flag)
  const present = argv.includes(flag) || argv.some(argument => argument.startsWith(`${flag}=`))

  if (!present) return undefined


  if (value === undefined || value.trim() === '' || value.startsWith('--')) return Number.NaN

  return Number(value)
}

export const runCli = (argv: string[] = process.argv, cwd: string = process.cwd()) => {
  const command = argv[2]
  const isHelp = argv.slice(2).some(argument => argument === '--help' || argument === '-h')
  const isVersion = command === '--version' || command === '-v'

  if (!command || isHelp) {
    printUsage()

    return
  }

  if (isVersion) {
    console.log(getCliVersion())

    return
  }

  dispatchCommand(command, cwd, {
    concurrency: getFlagValue(argv, '--concurrency'),
    files: getFlagValues(argv, '--file'),
    hasCheck: argv.includes('--check'),
    hasCreate: argv.includes('--create'),
    hasDryRun: argv.includes('--dry-run'),
    hasExplicit: argv.includes('--explicit'),
    hasFix: argv.includes('--fix'),
    hasForce: argv.includes('--force'),
    hasFull: argv.includes('--full'),
    hasJson: argv.includes('--json'),
    hasLiteInstall: argv.includes('--lite-install'),
    hasPrune: argv.includes('--prune'),
    hasWithEslintMcp: argv.includes('--with-eslint-mcp'),
    hasWrite: argv.includes('--write'),
    maxDurationMs: getNumericFlagValue(argv, '--max-duration'),
    maxRuleTimeMs: getNumericFlagValue(argv, '--max-rule-time'),
    maxWarnings: getNumericFlagValue(argv, '--max-warnings'),
    preset: getFlagValue(argv, '--preset'),
    rule: argv[3] && !argv[3].startsWith('-') ? argv[3] : undefined,
    snapshotPath: getFlagValue(argv, '--snapshot-path'),
    target: getFlagValue(argv, '--to')
  })
}

// Only run if this is the entry point
if (process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('cli.js') ||
  process.argv[1].endsWith('cli.ts')
)) {
  runCli()
}
