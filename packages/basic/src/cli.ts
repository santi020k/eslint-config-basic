import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { analyzeEslintConfig, handleGenerateSkill } from './agent-skill-generator.js'
import { handleMigrateV3 } from './cli-migration.js'
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
  const existingConfigPath = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts'
  ].map(filename => join(cwd, filename)).find(p => existsSync(p))

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

const FRAMEWORK_KEY_TO_PACKAGE = Object.fromEntries(
  Object.entries(FRAMEWORK_PACKAGE_TO_KEY).map(([packageName, framework]) => [framework, packageName])
) as Record<string, string>

const LITE_PACKAGE_NAME = '@santi020k/eslint-config-lite'
const INTEGRATIONS_PACKAGE_NAME = '@santi020k/eslint-config-integrations'
const ASTRO_DOCTOR_PACKAGE_NAME = '@santi020k/eslint-plugin-astro-doctor'
const TYPESCRIPT_PACKAGE_NAME = 'typescript'

const getConfigPathIfPresent = (cwd: string): null | string => {
  const configPath = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts'
  ].map(filename => join(cwd, filename)).find(p => existsSync(p))

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

const createInstallCommand = (packageManager: string, packages: string[]): string => {
  const packageList = packages.join(' ')

  switch (packageManager) {
    case 'bun':
      return `bun add -d ${packageList}`

    case 'npm':
      return `npm install -D ${packageList}`

    case 'yarn':
      return `yarn add -D ${packageList}`

    default:
      return `pnpm add -D ${packageList}`
  }
}

const detectPackageManager = (cwd: string): string => {
  if (existsSync(join(cwd, 'pnpm-lock.yaml')) || existsSync(join(cwd, 'pnpm-workspace.yaml'))) return 'pnpm'

  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'

  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'

  return 'npm'
}

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

const createConfigContent = (cwd: string): { configContent: string, configPath: string } => {
  const configContent = [
    'import { defineConfig } from \'@santi020k/eslint-config-basic\'',
    '',
    'export default defineConfig()',
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
    '  doctor          Check project setup for common v3 adoption issues',
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
    '  --file          profile/snapshot/diff: representative file or lint target (repeatable)',
    '  --full          migrate --to v3: choose the batteries-included package',
    '  --json          Print JSON for commands that support it',
    '  --lite-install  doctor: print the detected lite install command',
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

export const handleInit = (cwd: string = process.cwd(), check = false) => {
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

  const { configContent } = createConfigContent(cwd)

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

  if (summary.workspaceProjects.length > 0 && !configContent.includes('projects:')) {
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
  liteInstallCommand: string,
  issues: string[],
  warnings: string[]
): void => {
  let status = 'passed'

  if (issues.length > 0) {
    status = 'failed'
  } else if (warnings.length > 0) {
    status = 'passed with warnings'
  }

  const payload = {
    configFile: configPath ? basename(configPath) : null,
    issues,
    liteInstallCommand,
    packageManager,
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
    ...(issues.length > 0 ? ['', 'Issues:', ...issues.map(issue => `- ${issue}`)] : []),
    ...(warnings.length > 0 ? ['', 'Warnings:', ...warnings.map(warning => `- ${warning}`)] : [])
  ].join('\n'))

  if (issues.length > 0) process.exitCode = 1
}

export const handleDoctor = async (cwd: string = process.cwd(), json = false, liteInstall = false) => {
  const configPath = getConfigPathIfPresent(cwd)
  const packageJson = readPackageJson(cwd)
  const declaredDependencies = getDeclaredDependencyNames(packageJson)
  const summary = getProjectSummary(cwd)
  const activeConfig = await analyzeEslintConfig(cwd)
  const configContent = configPath ? readFileSync(configPath, 'utf8') : null
  const packageManager = detectPackageManager(cwd)
  const liteInstallPackages = getLiteInstallPackages(summary, declaredDependencies)
  const liteInstallCommand = createInstallCommand(packageManager, liteInstallPackages)

  const hasV1FrameworkImports = configContent ?
    Object.keys(FRAMEWORK_PACKAGE_TO_KEY).some(packageName => configContent.includes(packageName)) :
    false

  if (liteInstall) {
    if (json) {
      console.log(JSON.stringify({ command: liteInstallCommand, packageManager, packages: liteInstallPackages }, null, 2))
    } else {
      console.log(liteInstallCommand)
    }

    return
  }

  const { issues, warnings } = buildDoctorDiagnosis(cwd, configPath, configContent, hasV1FrameworkImports, activeConfig, declaredDependencies, summary)

  outputDoctorResult(json, configPath, packageManager, summary, liteInstallCommand, issues, warnings)
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
    const summary = getProjectSummary(cwd)

    handleMigrateV3(cwd, {
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
    hasForce: boolean
    hasFull: boolean
    hasJson: boolean
    hasLiteInstall: boolean
    hasPrune: boolean
    hasWrite: boolean
    hasWithEslintMcp: boolean
    preset?: string
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
      handleDoctor(cwd, flags.hasJson, flags.hasLiteInstall).catch((error: unknown) => {
        console.error(`❌ Failed to run doctor: ${String(error)}`)

        process.exitCode = 1
      })

      break
    }

    case 'explain': {
      handleExplain(cwd, flags.hasJson)

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
      handleInit(cwd, flags.hasCheck)

      break
    }

    case 'inspect': {
      handleInspect(cwd, flags.hasJson).catch((error: unknown) => {
        console.error(`❌ Failed to inspect project: ${String(error)}`)

        process.exitCode = 1
      })

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
          json: flags.hasJson
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

export const runCli = (argv: string[] = process.argv, cwd: string = process.cwd()) => {
  const command = argv[2]
  const isHelp = command === '--help' || command === '-h'
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
    hasForce: argv.includes('--force'),
    hasFull: argv.includes('--full'),
    hasJson: argv.includes('--json'),
    hasLiteInstall: argv.includes('--lite-install'),
    hasPrune: argv.includes('--prune'),
    hasWithEslintMcp: argv.includes('--with-eslint-mcp'),
    hasWrite: argv.includes('--write'),
    preset: getFlagValue(argv, '--preset'),
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
