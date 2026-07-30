/* eslint-disable no-console -- CLI handlers own user-facing terminal output */
/* eslint-disable complexity -- report builders intentionally cover compatibility and config-source branches */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire, findPackageJSON } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

interface SemverApi {
  satisfies: (version: string, range: string) => boolean
  subset: (subRange: string, superRange: string) => boolean
  validRange: (range: string) => null | string
}

interface PackageManifest {
  engines?: { node?: string }
  name?: string
  peerDependencies?: Record<string, string>
  version?: string
}

interface ResolvedPackageManifest {
  manifest: PackageManifest
  path: string
}

interface FlatConfigEntry {
  files?: unknown
  name?: string
  rules?: Record<string, unknown>
}

interface ProjectEslint {
  calculateConfigForFile: (filePath: string) => Promise<unknown>
  lintFiles: (patterns: string[]) => Promise<LintResult[]>
}

interface LintResult {
  filePath: string
  messages: {
    column?: number
    endColumn?: number
    endLine?: number
    line?: number
    message: string
    ruleId: null | string
  }[]
}

interface RuleDiagnostic {
  column: null | number
  endColumn: null | number
  endLine: null | number
  file: string
  line: null | number
  message: string
}

type ProjectEslintConstructor = new(options: { cwd: string }) => ProjectEslint

export interface ExplainRuleOptions {
  file?: string
  json?: boolean
  rule: string
}

const CONFIG_FILENAMES = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.ts',
  'eslint.config.mts',
  'eslint.config.cts'
]

const BASIC_PACKAGE_NAME = '@santi020k/eslint-config-basic'
const FULL_PACKAGE_NAME = '@santi020k/eslint-config-full'

const RULE_PACKAGE_HINTS: Partial<Record<string, string>> = {
  '@angular-eslint': '@santi020k/eslint-config-angular',
  '@eslint-react': '@santi020k/eslint-config-react',
  '@next/next': '@santi020k/eslint-config-next',
  '@typescript-eslint': '@santi020k/eslint-config-typescript',
  astro: '@santi020k/eslint-config-astro',
  cypress: '@santi020k/eslint-config-testing',
  jest: '@santi020k/eslint-config-testing',
  jsonc: '@santi020k/eslint-config-formats',
  playwright: '@santi020k/eslint-config-testing',
  react: '@santi020k/eslint-config-react',
  'testing-library': '@santi020k/eslint-config-testing',
  unicorn: '@santi020k/eslint-config-extensions',
  vue: '@santi020k/eslint-config-vue'
}

const semver = createRequire(import.meta.url)('semver') as SemverApi

const readJson = (filePath: string): null | Record<string, unknown> => {
  if (!existsSync(filePath)) return null

  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>
  } catch {
    return null
  }
}

const findConfigPath = (cwd: string): null | string => (
  CONFIG_FILENAMES.map(file => join(cwd, file)).find(file => existsSync(file)) ?? null
)

const flattenConfig = async (value: unknown): Promise<FlatConfigEntry[]> => {
  const resolved = await value

  if (Array.isArray(resolved)) {
    const nested = await Promise.all(resolved.map(entry => flattenConfig(entry)))

    return nested.flat()
  }

  if (resolved && typeof resolved === 'object') return [resolved]

  return []
}

const loadConfigEntries = async (configPath: null | string): Promise<FlatConfigEntry[]> => {
  if (!configPath) return []

  try {
    const loaded: unknown = await import(`${pathToFileURL(configPath).href}?basic-eslint-explain=${Date.now()}`)

    if (!loaded || typeof loaded !== 'object' || !('default' in loaded)) return []

    return await flattenConfig((loaded).default)
  } catch {
    return []
  }
}

const loadProjectEslint = (cwd: string): ProjectEslint => {
  const projectRequire = createRequire(join(cwd, 'package.json'))
  const eslintModule = projectRequire('eslint') as { ESLint?: ProjectEslintConstructor }

  if (!eslintModule.ESLint) throw new Error('The installed eslint package does not expose the ESLint API.')

  return new eslintModule.ESLint({ cwd })
}

const getRuleSeverity = (ruleValue: unknown): unknown => (
  Array.isArray(ruleValue) ? ruleValue[0] : ruleValue
)

const isRuleEnabled = (ruleValue: unknown): boolean => {
  const severity = getRuleSeverity(ruleValue)

  return severity !== 0 && severity !== 'off'
}

const getPackageHint = (rule: string): null | string => {
  const prefix = rule.includes('/') ? rule.slice(0, rule.indexOf('/')) : rule
  const scopedPrefix = rule.startsWith('@') ? rule.split('/').slice(0, 2).join('/') : prefix

  return RULE_PACKAGE_HINTS[scopedPrefix] ?? RULE_PACKAGE_HINTS[prefix] ?? null
}

const getRuleDiagnostics = async (
  eslint: ProjectEslint,
  file: string,
  rule: string
): Promise<RuleDiagnostic[]> => {
  if (rule !== 'complexity') return []

  try {
    const results = await eslint.lintFiles([file])

    return results.flatMap(result => result.messages
      .filter(message => message.ruleId === rule)
      .map(message => ({
        column: message.column ?? null,
        endColumn: message.endColumn ?? null,
        endLine: message.endLine ?? null,
        file: result.filePath,
        line: message.line ?? null,
        message: message.message
      })))
  } catch {
    return []
  }
}

export const handleExplainRule = async (
  cwd: string = process.cwd(),
  options: ExplainRuleOptions
): Promise<void> => {
  const configPath = findConfigPath(cwd)
  const file = options.file ?? 'eslint.config.js'
  const eslint = loadProjectEslint(cwd)
  const effective = await eslint.calculateConfigForFile(file) as null | { rules?: Record<string, unknown> }
  const effectiveValue = effective?.rules?.[options.rule]
  const entries = await loadConfigEntries(configPath)
  const diagnostics = await getRuleDiagnostics(eslint, file, options.rule)

  const sources = entries.flatMap((entry, index) => {
    if (!entry.rules || !Object.hasOwn(entry.rules, options.rule)) return []

    return [{
      files: entry.files ?? null,
      index,
      name: entry.name ?? `anonymous config #${index + 1}`,
      value: entry.rules[options.rule]
    }]
  })

  const payload = {
    configFile: configPath ? basename(configPath) : null,
    diagnostics,
    effective: effectiveValue ?? null,
    enabled: effectiveValue !== undefined && isRuleEnabled(effectiveValue),
    file,
    packageHint: getPackageHint(options.rule),
    rule: options.rule,
    severity: effectiveValue === undefined ? null : getRuleSeverity(effectiveValue),
    sources
  }

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2))
  } else {
    console.log([
      `ESLint rule explanation: ${payload.rule}`,
      `- File: ${payload.file}`,
      `- Config: ${payload.configFile ?? 'none'}`,
      `- Effective value: ${JSON.stringify(payload.effective)}`,
      `- Enabled: ${payload.enabled ? 'yes' : 'no'}`,
      `- Likely package: ${payload.packageHint ?? 'core or custom config'}`,
      `- Defining entries: ${payload.sources.length}`,
      ...(payload.diagnostics.length > 0 ?
        [`- Current findings: ${payload.diagnostics.length}`] :
        [])
    ].join('\n'))

    for (const source of payload.sources) {
      console.log(`  - ${source.name}: ${JSON.stringify(source.value)}`)
    }

    for (const diagnostic of payload.diagnostics) {
      console.log(
        `  - ${diagnostic.file}:${diagnostic.line ?? '?'}:${diagnostic.column ?? '?'} ` +
        diagnostic.message
      )
    }
  }

  if (effectiveValue === undefined) process.exitCode = 1
}

const getDependencyVersions = (manifest: null | Record<string, unknown>): Record<string, string> => {
  const fields = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']
  const dependencies: Record<string, string> = {}

  for (const field of fields) {
    const values = manifest?.[field]

    if (!values || typeof values !== 'object' || Array.isArray(values)) continue

    for (const [name, version] of Object.entries(values)) {
      if (typeof version === 'string') dependencies[name] = version
    }
  }

  return dependencies
}

const readResolvedManifest = (
  basePath: string,
  packageName: string
): null | ResolvedPackageManifest => {
  try {
    const manifestPath = findPackageJSON(packageName, pathToFileURL(basePath))

    const manifest = manifestPath ?
      readJson(manifestPath) as null | PackageManifest :
      null

    if (manifestPath && manifest?.name === packageName) return { manifest, path: manifestPath }
  } catch {
    // Fall through for runtimes where package-JSON resolution is unavailable.
  }

  try {
    let directory = dirname(createRequire(basePath).resolve(packageName))

    for (let depth = 0; depth < 6; depth++) {
      const manifestPath = join(directory, 'package.json')
      const manifest = readJson(manifestPath) as null | PackageManifest

      if (manifest?.name === packageName) return { manifest, path: manifestPath }

      directory = dirname(directory)
    }
  } catch {
    return null
  }

  return null
}

const readWorkspaceManifest = (cwd: string, packageName: string): null | ResolvedPackageManifest => {
  const packagesPath = join(cwd, 'packages')

  if (!existsSync(packagesPath)) return null

  for (const entry of readdirSync(packagesPath, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const manifestPath = join(packagesPath, entry.name, 'package.json')
    const manifest = readJson(manifestPath) as null | PackageManifest

    if (manifest?.name === packageName) return { manifest, path: manifestPath }
  }

  return null
}

export const createCompatibilityReport = (cwd: string = process.cwd()) => {
  const rootManifestPath = join(cwd, 'package.json')
  const rootManifest = readJson(rootManifestPath)
  const declared = getDependencyVersions(rootManifest)
  const consumerNodeRange = (rootManifest as null | PackageManifest)?.engines?.node ?? null

  const configPackages = Object.keys(declared)
    .filter(name => name.startsWith('@santi020k/eslint-config-'))
    .sort()

  const runtimeVersions = {
    consumerNodeRange,
    eslint: readResolvedManifest(rootManifestPath, 'eslint')?.manifest.version ?? null,
    node: process.versions.node,
    typescript: readResolvedManifest(rootManifestPath, 'typescript')?.manifest.version ?? null
  }

  const packages = configPackages.map(name => {
    const resolvedPackage = readResolvedManifest(rootManifestPath, name) ?? readWorkspaceManifest(cwd, name)
    const manifest = resolvedPackage?.manifest
    const issues: string[] = []

    const aggregatedBasic = name === FULL_PACKAGE_NAME && resolvedPackage ?
      readResolvedManifest(resolvedPackage.path, BASIC_PACKAGE_NAME) :
      null

    if (!manifest) {
      issues.push('declared but not installed')
    } else {
      const nodeRange = manifest.engines?.node

      if (nodeRange && !semver.satisfies(runtimeVersions.node, nodeRange)) {
        issues.push(`requires Node ${nodeRange}`)
      }

      if (nodeRange && consumerNodeRange) {
        if (!semver.validRange(consumerNodeRange)) {
          issues.push(`consumer engines.node ${consumerNodeRange} is not a valid semver range`)
        } else if (!semver.subset(consumerNodeRange, nodeRange)) {
          issues.push(
            `consumer engines.node ${consumerNodeRange} permits unsupported runtimes; requires ${nodeRange}`
          )
        }
      }

      for (const peer of ['eslint', 'typescript']) {
        const range = manifest.peerDependencies?.[peer]
        const version = runtimeVersions[peer as 'eslint' | 'typescript']

        if (range && version && !semver.satisfies(version, range)) {
          issues.push(`requires ${peer} ${range}, resolved ${version}`)
        }
      }
    }

    return {
      aggregatedBasic: name === FULL_PACKAGE_NAME ?
        {
          name: BASIC_PACKAGE_NAME,
          resolved: aggregatedBasic?.manifest.version ?? null,
          resolvedPath: aggregatedBasic?.path ?? null
        } :
        null,
      declared: declared[name],
      issues,
      name,
      resolved: manifest?.version ?? null,
      resolvedPath: resolvedPackage?.path ?? null
    }
  })

  return {
    compatible: packages.every(item => item.issues.length === 0),
    packages,
    runtime: runtimeVersions
  }
}

export const handleCompatibility = (
  cwd: string = process.cwd(),
  json = false
): void => {
  const report = createCompatibilityReport(cwd)

  if (json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log([
      `ESLint compatibility: ${report.compatible ? 'compatible' : 'issues found'}`,
      `- Node: ${report.runtime.node}`,
      `- Consumer Node range: ${report.runtime.consumerNodeRange ?? 'not declared'}`,
      `- ESLint: ${report.runtime.eslint ?? 'not installed'}`,
      `- TypeScript: ${report.runtime.typescript ?? 'not installed'}`
    ].join('\n'))

    for (const item of report.packages) {
      console.log(
        `- ${item.name}: ${item.resolved ?? 'not installed'}` +
        (item.resolvedPath ? ` at ${item.resolvedPath}` : '') +
        (item.issues.length > 0 ? ` (${item.issues.join('; ')})` : '')
      )

      if (item.aggregatedBasic) {
        console.log(
          `  - Composer ${item.aggregatedBasic.name}: ` +
          (item.aggregatedBasic.resolved ?? 'not resolved') +
          (item.aggregatedBasic.resolvedPath ? ` at ${item.aggregatedBasic.resolvedPath}` : '')
        )
      }
    }
  }

  if (!report.compatible) process.exitCode = 1
}
