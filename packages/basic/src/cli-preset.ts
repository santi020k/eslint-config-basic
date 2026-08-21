/* eslint-disable no-console -- CLI handlers own user-facing terminal output */
/* eslint-disable complexity -- report comparison and formatting intentionally cover multiple result branches */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire, findPackageJSON } from 'node:module'
import { dirname, extname, join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  type DetectedFrameworkName,
  detectProjectOptions,
  type EslintConfigOptions,
  Preset
} from '@santi020k/eslint-config-core'

import { type CommandRunner, defaultCommandRunner } from './cli-workflows.js'
import { type DefineConfigMetadata, getDefineConfigMetadata } from './define-config-metadata.js'
import { defineConfig } from './index.js'
import { isMissingRequestedPackage } from './optional-package-errors.js'
import { resolvePreset } from './resolvers.js'

interface EffectiveConfig {
  rules?: Partial<Record<string, unknown>>
}

interface ProjectLintMessage {
  fatal?: boolean
  fix?: unknown
  ruleId: null | string
  severity: number
}

interface ProjectRuleMetadata {
  fixable?: 'code' | 'whitespace'
  type?: 'layout' | 'problem' | 'suggestion'
}

interface ProjectLintResult {
  errorCount: number
  filePath: string
  messages: ProjectLintMessage[]
  output?: string
  warningCount: number
}

interface ProjectEslint {
  calculateConfigForFile: (filePath: string) => Promise<EffectiveConfig | null>
  getRulesMetaForResults: (results: ProjectLintResult[]) => Record<string, ProjectRuleMetadata | undefined>
  lintFiles: (patterns: string[]) => Promise<ProjectLintResult[]>
}

type ProjectEslintConstructor = new(options: {
  cwd: string
  fix?: boolean | ((message: ProjectLintMessage) => boolean)
  overrideConfig?: unknown
  overrideConfigFile?: boolean
}) => ProjectEslint

export interface ExplainPresetOptions {
  analyzeSource?: boolean
  compatibility?: boolean
  file?: string
  files?: string[]
  json?: boolean
  output?: string
  semanticOnly?: boolean
  write?: boolean
}

interface CreatePresetReportOptions {
  analyzeSource?: boolean
  semanticOnly?: boolean
  sourceFiles?: string[]
  typescriptRunner?: CommandRunner
  write?: boolean
}

const PRESETS = new Set<string>(Object.values(Preset))

const CONFIG_FILENAMES = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.ts',
  'eslint.config.mts',
  'eslint.config.cts'
]

const loadDefineConfigMetadata = async (cwd: string): Promise<DefineConfigMetadata | undefined> => {
  const configPath = CONFIG_FILENAMES.map(name => join(cwd, name)).find(path => existsSync(path))

  if (!configPath) return undefined

  try {
    const loaded = await import(`${pathToFileURL(configPath).href}?basic-eslint-preset=${Date.now()}`) as {
      default?: unknown
    }

    return getDefineConfigMetadata(await loaded.default)
  } catch {
    return undefined
  }
}

const PRESET_FEATURE_PACKAGES = {
  extensions: '@santi020k/eslint-config-extensions',
  formats: '@santi020k/eslint-config-formats',
  libraries: '@santi020k/eslint-config-libraries',
  testing: '@santi020k/eslint-config-testing',
  tools: '@santi020k/eslint-config-tools'
} as const

const FRAMEWORK_PACKAGES: Record<DetectedFrameworkName, string> = {
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

const FRAMEWORK_PREFIXES = new Set([
  '@angular-eslint',
  '@eslint-react',
  '@next/next',
  'astro',
  'lit',
  'qwik',
  'react',
  'react-hooks',
  'react-refresh',
  'solid',
  'svelte',
  'vue'
])

const DOMAIN_PREFIXES = new Set([
  'better-tailwindcss',
  'drizzle',
  'graphql-eslint',
  'i18next',
  'prisma',
  'storybook',
  'tailwindcss',
  'tanstack-query',
  'turbo',
  'zod'
])

const FORMAT_PREFIXES = new Set([
  '@stylistic',
  'css',
  'html',
  'jsonc',
  'markdown',
  'mdx',
  'perfectionist',
  'prettier',
  'toml',
  'yaml'
])

const FORMAT_RULES = new Set([
  'import/first',
  'sort-imports',
  'simple-import-sort/exports',
  'simple-import-sort/imports'
])

const MULTI_SEGMENT_RULE_PREFIXES = new Set(['@next/next'])

const getRulePrefix = (rule: string): string => {
  const segments = rule.split('/')

  if (!rule.startsWith('@')) return segments[0]

  const multiSegmentPrefix = segments.slice(0, 2).join('/')

  return MULTI_SEGMENT_RULE_PREFIXES.has(multiSegmentPrefix) ? multiSegmentPrefix : segments[0]
}

const getRuleGroup = (rule: string): 'correctness' | 'domain' | 'formatting' | 'framework' | 'security' => {
  const prefix = getRulePrefix(rule)

  if (
    prefix === 'security' ||
    prefix === 'no-secrets' ||
    rule.includes('security') ||
    rule.includes('no-unsanitized')
  ) return 'security'

  if (FRAMEWORK_PREFIXES.has(prefix)) return 'framework'

  if (DOMAIN_PREFIXES.has(prefix)) return 'domain'

  if (
    FORMAT_PREFIXES.has(prefix) ||
    FORMAT_RULES.has(rule) ||
    rule.includes('format') ||
    rule.includes('spacing')
  ) return 'formatting'

  return 'correctness'
}

const getSeverity = (value: unknown): unknown => Array.isArray(value) ? value[0] : value

const isEnabled = (value: unknown): boolean => {
  const severity = getSeverity(value)

  return severity !== 0 && severity !== 'off' && severity !== undefined
}

const normalizeRule = (value: unknown): string => JSON.stringify(value)

const loadProjectEslint = (
  cwd: string,
  overrideConfig?: unknown,
  fix: boolean | ((message: ProjectLintMessage) => boolean) = false
): ProjectEslint => {
  const projectRequire = createRequire(join(cwd, 'package.json'))
  const eslintModule = projectRequire('eslint') as { ESLint?: ProjectEslintConstructor }

  if (!eslintModule.ESLint) throw new Error('The installed eslint package does not expose the ESLint API.')

  return new eslintModule.ESLint({
    cwd,
    ...(fix ? { fix } : {}),
    ...(overrideConfig ? { overrideConfig, overrideConfigFile: true } : {})
  })
}

const getResolvablePresetOptions = (
  cwd: string,
  presetOptions: Partial<EslintConfigOptions>
): { missingPackages: string[], options: Partial<EslintConfigOptions> } => {
  const projectPackageUrl = pathToFileURL(join(cwd, 'package.json'))
  const options = { ...presetOptions }
  const detectedOptions = detectProjectOptions(cwd)
  const missingPackages = new Set<string>()
  const detection = options.detection
  const detectionControls = typeof detection === 'object' ? detection : {}

  const detectionEnabled = (category: keyof typeof PRESET_FEATURE_PACKAGES): boolean => (
    detection !== false && detectionControls[category] !== false
  )

  for (const [category, specifier] of Object.entries(PRESET_FEATURE_PACKAGES)) {
    const categoryKey = category as keyof typeof PRESET_FEATURE_PACKAGES
    const explicit = options[categoryKey]
    const detected = detectionEnabled(categoryKey) ? detectedOptions[categoryKey] : []

    const selected = [...new Set([
      ...(Array.isArray(explicit) ? explicit : []),
      ...(Array.isArray(detected) ? detected : [])
    ])]

    if (selected.length === 0) continue

    try {
      findPackageJSON(specifier, projectPackageUrl)
    } catch (error) {
      if (!isMissingRequestedPackage(error, specifier)) throw error

      Object.assign(options, {
        [category]: [],
        detection: {
          ...(typeof options.detection === 'object' ? options.detection : detectionControls),
          [category]: false
        },
        features: {
          ...options.features,
          ...Object.fromEntries(selected.map(feature => [feature, false]))
        }
      })

      missingPackages.add(specifier)
    }
  }

  const frameworkDetectionEnabled = detection !== false && detectionControls.frameworks !== false
  const detectedFrameworks = frameworkDetectionEnabled ? detectedOptions.detectedFrameworks ?? [] : []

  const configuredFrameworks = Object.entries(options.frameworks ?? {})
    .filter((entry): entry is [DetectedFrameworkName, true] => entry[1] === true)
    .map(([framework]) => framework)

  const selectedFrameworks = [...new Set([...detectedFrameworks, ...configuredFrameworks])]

  const resolvableFrameworks: NonNullable<EslintConfigOptions['frameworks']> = {
    ...options.frameworks
  }

  for (const framework of selectedFrameworks) {
    const specifier = FRAMEWORK_PACKAGES[framework]

    try {
      findPackageJSON(specifier, projectPackageUrl)

      resolvableFrameworks[framework] = true
    } catch (error) {
      if (!isMissingRequestedPackage(error, specifier)) throw error

      Reflect.deleteProperty(resolvableFrameworks, framework)

      missingPackages.add(specifier)
    }
  }

  if (!resolvableFrameworks.react) {
    delete resolvableFrameworks.expo

    delete resolvableFrameworks.next

    delete resolvableFrameworks['react-router']

    if (!resolvableFrameworks.solid) delete resolvableFrameworks['tanstack-start']
  }

  if (!resolvableFrameworks.vue) {
    delete resolvableFrameworks.nuxt

    delete resolvableFrameworks.slidev
  }

  if (selectedFrameworks.length > 0) {
    options.autoFrameworks = false

    options.frameworks = resolvableFrameworks
  }

  return { missingPackages: [...missingPackages], options }
}

const createCompatibilityConfig = (
  preset: string,
  addedRules: Record<string, unknown>,
  changedRules: Record<string, { from: unknown, to: unknown }>
): string => [
  `// Temporary compatibility override generated for Preset.${preset.charAt(0).toUpperCase()}${preset.slice(1)}.`,
  '// Remove entries as the project adopts the preset findings.',
  'export default {',
  `  name: 'eslint-config-basic/preset-${preset}-compatibility',`,
  '  rules: {',
  ...Object.keys(addedRules).sort().map(rule => `    ${JSON.stringify(rule)}: 'off',`),
  ...Object.keys(changedRules).sort().map(rule => (
    `    ${JSON.stringify(rule)}: ${JSON.stringify(changedRules[rule].from)},`
  )),
  '  },',
  '}',
  ''
].join('\n')

interface FindingSummary {
  errors: number
  fixable: number
  total: number
  warnings: number
}

const createFindingSummary = (): FindingSummary => ({
  errors: 0,
  fixable: 0,
  total: 0,
  warnings: 0
})

const addFinding = (
  summaries: Record<string, FindingSummary>,
  key: string,
  message: ProjectLintMessage
): void => {
  const summary = summaries[key] ?? createFindingSummary()

  summary.total++

  if (message.severity === 2) summary.errors++
  else summary.warnings++

  if (message.fix !== undefined) summary.fixable++

  summaries[key] = summary
}

const estimateChangedLines = (before: string, after: string): number => {
  const beforeLines = before.split('\n')
  const afterLines = after.split('\n')
  const comparableLines = Math.min(beforeLines.length, afterLines.length)
  let changed = Math.abs(beforeLines.length - afterLines.length)

  for (let index = 0; index < comparableLines; index++) {
    if (beforeLines[index] !== afterLines[index]) changed++
  }

  return changed
}

const readOriginalSource = (filePath: string): string | undefined => {
  try {
    return readFileSync(filePath, 'utf8')
  } catch {
    return undefined
  }
}

interface SourceFormatParserCandidate {
  file: string
  lines: number[]
}

const SOURCE_FILE_READ_PATTERN = /\b(?:Bun\.file|Deno\.readTextFile|readFile|readFileSync|readTextFile)\b/

const SOURCE_REGEXP_PATTERN = new RegExp([
  String.raw`\.match(?:All)?\s*\(`,
  String.raw`\.replace(?:All)?\s*\(`,
  String.raw`\.search\s*\(`,
  String.raw`\bRegExp\s*\(`,
  String.raw`\.(?:exec|test)\s*\(`
].join('|'))

const findSourceFormatParserCandidates = (
  cwd: string,
  filePaths: string[]
): SourceFormatParserCandidate[] => filePaths.flatMap(filePath => {
  const content = readOriginalSource(filePath)

  if (!content || !SOURCE_FILE_READ_PATTERN.test(content)) return []

  const lines = content.split('\n')
    .flatMap((line, index) => SOURCE_REGEXP_PATTERN.test(line) ? [index + 1] : [])

  return lines.length > 0 ? [{ file: relative(cwd, filePath), lines }] : []
})

const TYPESCRIPT_CONFIG_FILENAMES = [
  'tsconfig.json',
  'tsconfig.base.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'tsconfig.eslint.json'
]

const TYPESCRIPT_ROOT_DIAGNOSTIC_CODES = new Set([
  'TS2307',
  'TS2688',
  'TS2792',
  'TS6053'
])

const resolveTypeScriptCli = (cwd: string): null | string => {
  try {
    const projectRequire = createRequire(join(cwd, 'package.json'))
    const packagePath = projectRequire.resolve('typescript/package.json')

    const manifest = JSON.parse(readFileSync(packagePath, 'utf8')) as {
      bin?: Record<string, string> | string
    }

    const bin = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.tsc

    return bin ? join(dirname(packagePath), bin) : null
  } catch {
    return null
  }
}

const getTypeScriptConfigs = (
  cwd: string,
  configuredProjects: string[]
): string[] => {
  const detectedProjects = Object.keys(detectProjectOptions(cwd).projects ?? {})
  const projectRoots = [...new Set([...detectedProjects, ...configuredProjects])]

  const roots = [
    cwd,
    ...projectRoots.map(project => join(cwd, project))
  ]

  return [...new Set(roots.flatMap(root => {
    const config = TYPESCRIPT_CONFIG_FILENAMES.find(file => existsSync(join(root, file)))

    return config ? [join(root, config)] : []
  }))]
}

interface TypeScriptDiagnostic {
  code: string
  config: string
  message: string
}

const parseTypeScriptDiagnostics = (
  cwd: string,
  config: string,
  output: string
): TypeScriptDiagnostic[] => output
  .split(/\r?\n/)
  .flatMap(line => {
    const match = /\berror (TS\d+):\s*(.+)$/.exec(line)

    if (!match) return []

    return [{
      code: match[1],
      config: relative(cwd, config),
      message: match[2]
    }]
  })

export const createTypeScriptPreflight = (
  cwd: string,
  configuredProjects: string[] = [],
  runner: CommandRunner = defaultCommandRunner
) => {
  const executable = resolveTypeScriptCli(cwd)
  const configs = getTypeScriptConfigs(cwd, configuredProjects)

  if (!executable || configs.length === 0) {
    return {
      configs: [],
      diagnosticCount: 0,
      rootDiagnostics: [] as TypeScriptDiagnostic[],
      status: 'skipped' as const
    }
  }

  const diagnostics: TypeScriptDiagnostic[] = []

  const results = configs.map(config => {
    const result = runner(process.execPath, [
      executable,
      '--noEmit',
      '--pretty',
      'false',
      '--project',
      config
    ], cwd)

    diagnostics.push(...parseTypeScriptDiagnostics(
      cwd,
      config,
      `${result.stdout}\n${result.stderr}`
    ))

    return {
      config: relative(cwd, config),
      status: result.status
    }
  })

  const rootDiagnostics = diagnostics.filter(
    diagnostic => TYPESCRIPT_ROOT_DIAGNOSTIC_CODES.has(diagnostic.code)
  )

  return {
    configs: results,
    diagnosticCount: diagnostics.length,
    rootDiagnostics: (rootDiagnostics.length > 0 ? rootDiagnostics : diagnostics).slice(0, 20),
    status: results.some(result => result.status !== 0) ? 'failed' as const : 'passed' as const
  }
}

const analyzePresetSource = async (
  cwd: string,
  selectedConfig: unknown,
  sourceFiles: string[],
  configuredProjects: string[],
  typescriptRunner: CommandRunner,
  semanticOnly = false,
  write = false
) => {
  const lintTargets = sourceFiles.length > 0 ? sourceFiles : ['.']
  const analysisEslint = loadProjectEslint(cwd, selectedConfig)
  const lintResults = await analysisEslint.lintFiles(lintTargets)
  const rulesMeta = analysisEslint.getRulesMetaForResults(lintResults)

  const fix = semanticOnly ?
    (message: ProjectLintMessage): boolean => {
      if (message.ruleId === null) return false

      const metadata = rulesMeta[message.ruleId]

      if (metadata?.type === 'layout' || metadata?.fixable === 'whitespace') return false

      return getRuleGroup(message.ruleId) !== 'formatting'
    } :
    true

  const previewResults = await loadProjectEslint(cwd, selectedConfig, fix).lintFiles(lintTargets)
  const byCategory: Record<string, FindingSummary> = {}
  const byFileType: Record<string, FindingSummary> = {}
  const byRule: Record<string, FindingSummary> = {}
  const nonFormattingErrorRules = new Set<string>()
  let nonFormattingErrors = 0

  for (const result of lintResults) {
    const fileType = extname(result.filePath) || '[no extension]'

    for (const message of result.messages) {
      const rule = message.ruleId ?? (message.fatal ? '[fatal]' : '[unknown]')
      const category = message.ruleId ? getRuleGroup(message.ruleId) : 'correctness'

      addFinding(byCategory, category, message)

      addFinding(byFileType, fileType, message)

      addFinding(byRule, rule, message)

      if (message.severity === 2 && category !== 'formatting') {
        nonFormattingErrors++

        nonFormattingErrorRules.add(rule)
      }
    }
  }

  const changedFiles: string[] = []
  const remainingFixableRules = new Set<string>()
  let estimatedChangedLines = 0
  let remainingErrors = 0
  let remainingWarnings = 0
  let writtenFileCount = 0

  for (const result of previewResults) {
    remainingErrors += result.errorCount

    remainingWarnings += result.warningCount

    for (const message of result.messages) {
      if (message.fix !== undefined) remainingFixableRules.add(message.ruleId ?? '[fatal]')
    }

    if (result.output === undefined) continue

    changedFiles.push(relative(cwd, result.filePath))

    const original = readOriginalSource(result.filePath)

    if (original !== undefined) estimatedChangedLines += estimateChangedLines(original, result.output)

    if (write) {
      writeFileSync(result.filePath, result.output)

      writtenFileCount++
    }
  }

  return {
    autofixPreview: {
      changedFileCount: changedFiles.length,
      changedFiles: changedFiles.sort(),
      estimatedChangedLines,
      remainingErrors,
      remainingFixableRules: [...remainingFixableRules].sort(),
      remainingWarnings,
      scope: semanticOnly ? 'semantic' as const : 'all' as const,
      writtenFileCount
    },
    byCategory,
    byFileType,
    byRule,
    lintTargets,
    nonFormattingErrors: {
      count: nonFormattingErrors,
      rules: [...nonFormattingErrorRules].sort()
    },
    sourceFormatParserCandidates: findSourceFormatParserCandidates(
      cwd,
      [...new Set(lintResults.map(result => result.filePath))]
    ),
    typescriptPreflight: createTypeScriptPreflight(cwd, configuredProjects, typescriptRunner),
    totals: {
      errors: lintResults.reduce((total, result) => total + result.errorCount, 0),
      files: lintResults.length,
      findings: lintResults.reduce(
        (total, result) => total + result.errorCount + result.warningCount,
        0
      ),
      warnings: lintResults.reduce((total, result) => total + result.warningCount, 0)
    }
  }
}

type PresetSourceAnalysis = Awaited<ReturnType<typeof analyzePresetSource>>

const formatSourceAnalysis = (
  analysis: null | PresetSourceAnalysis
): string[] => {
  if (!analysis) {
    return [
      '',
      'Pass --analyze-source to lint with the selected preset and preview autofix without writing files.'
    ]
  }

  const nonFormattingRuleSuffix = analysis.nonFormattingErrors.rules.length > 0 ?
    ` (${analysis.nonFormattingErrors.rules.join(', ')})` :
    ''

  const remainingFixableRules = analysis.autofixPreview.remainingFixableRules.length > 0 ?
    analysis.autofixPreview.remainingFixableRules.join(', ') :
    'none'

  const parserCandidates = analysis.sourceFormatParserCandidates.length > 0 ?
    analysis.sourceFormatParserCandidates.map(candidate => (
      `  - ${candidate.file}:${candidate.lines.join(',')}`
    )) :
    ['  - none']

  const previewLabel = analysis.autofixPreview.scope === 'semantic' ? 'Semantic autofix' : 'Autofix'

  const typescriptLines = analysis.typescriptPreflight.status === 'failed' ?
    [
      `- TypeScript preflight: failed with ${analysis.typescriptPreflight.diagnosticCount} diagnostics`,
      ...analysis.typescriptPreflight.rootDiagnostics.map(diagnostic => (
        `  - ${diagnostic.config} ${diagnostic.code}: ${diagnostic.message}`
      )),
      '- Fix TypeScript compiler errors before reviewing cascading type-aware unsafe-rule findings.'
    ] :
    [
      `- TypeScript preflight: ${analysis.typescriptPreflight.status}` +
      (analysis.typescriptPreflight.status === 'passed' ?
        ` (${analysis.typescriptPreflight.configs.length} configs)` :
        ' (TypeScript or a supported tsconfig was not found)')
    ]

  return [
    '',
    `Source analysis (selected preset, ${analysis.autofixPreview.writtenFileCount > 0 ?
      `${analysis.autofixPreview.writtenFileCount} files written` :
      'no files written'}):`,
    `- Lint targets: ${analysis.lintTargets.join(', ')}`,
    `- Files analyzed: ${analysis.totals.files}`,
    `- Findings: ${analysis.totals.findings} ` +
    `(${analysis.totals.errors} errors, ${analysis.totals.warnings} warnings)`,
    `- Non-formatting errors to resolve first: ${analysis.nonFormattingErrors.count}${nonFormattingRuleSuffix}`,
    `- ${previewLabel} preview: ${analysis.autofixPreview.changedFileCount} files, ` +
    `about ${analysis.autofixPreview.estimatedChangedLines} changed lines`,
    `- Findings remaining after preview: ${analysis.autofixPreview.remainingErrors} errors, ` +
    `${analysis.autofixPreview.remainingWarnings} warnings`,
    `- Fixable rules still remaining: ${remainingFixableRules}`,
    '- Formatting-sensitive source-parser candidates:',
    ...parserCandidates,
    ...typescriptLines
  ]
}

const formatCompatibilityGuidance = (
  compatibilityFile: null | string
): string[] => {
  if (compatibilityFile) {
    return [
      '',
      `Compatibility override written to ${compatibilityFile}. Import it after the preset config.`,
      'It preserves the current effective configuration, not existing source violations.'
    ]
  }

  return [
    '',
    'Pass --compatibility to write a temporary override that disables newly enabled rules.',
    'Compatibility output preserves effective configuration, not current source behavior.'
  ]
}

export const createPresetReport = async (
  cwd: string,
  presetName: string,
  file = 'eslint.config.js',
  options: CreatePresetReportOptions = {}
) => {
  if (options.write && !options.semanticOnly) {
    throw new Error('Writing preset fixes requires semanticOnly to avoid an unchecked formatting rewrite.')
  }

  const normalizedPreset = presetName.toLowerCase()

  if (!PRESETS.has(normalizedPreset)) {
    throw new Error(
      `Unknown preset "${presetName}". Use one of: ${[...PRESETS].sort().join(', ')}.`
    )
  }

  const preset = normalizedPreset as Preset
  const presetOptions = resolvePreset(preset)
  const current = await loadProjectEslint(cwd).calculateConfigForFile(file)
  const currentMetadata = await loadDefineConfigMetadata(cwd)
  const currentOptions = currentMetadata?.options ?? {}

  const targetOptions = {
    ...presetOptions,
    ...currentOptions,
    features: {
      ...presetOptions.features,
      ...currentOptions.features
    },
    frameworks: {
      ...presetOptions.frameworks,
      ...currentOptions.frameworks
    },
    preset,
    root: currentOptions.root ?? cwd
  }

  const { missingPackages, options: resolvablePresetOptions } = getResolvablePresetOptions(cwd, targetOptions)

  if (!current) {
    throw new Error(`ESLint did not calculate a current configuration for ${file}. Check that the file is not ignored.`)
  }

  const selectedConfig = await defineConfig(
    resolvablePresetOptions,
    ...(currentMetadata?.extraConfigs ?? [])
  )

  const selected = await loadProjectEslint(cwd, selectedConfig).calculateConfigForFile(file)

  if (!selected) {
    throw new Error(`The ${normalizedPreset} preset did not produce a configuration for ${file}.`)
  }

  const currentRules = current.rules ?? {}
  const selectedRules = selected.rules ?? {}
  const added: Record<string, unknown> = {}
  const changed: Record<string, { from: unknown, to: unknown }> = {}
  const removed: Record<string, unknown> = {}

  for (const [rule, value] of Object.entries(selectedRules)) {
    const currentValue = currentRules[rule]

    if (isEnabled(value) && !isEnabled(currentValue)) {
      added[rule] = value
    } else if (
      isEnabled(value) &&
      isEnabled(currentValue) &&
      normalizeRule(value) !== normalizeRule(currentValue)
    ) {
      changed[rule] = { from: currentValue, to: value }
    }
  }

  for (const [rule, value] of Object.entries(currentRules)) {
    if (isEnabled(value) && !isEnabled(selectedRules[rule])) removed[rule] = value
  }

  const groups = Object.fromEntries(
    ['formatting', 'correctness', 'security', 'framework', 'domain'].map(group => [
      group,
      Object.keys(added).filter(rule => getRuleGroup(rule) === group).sort()
    ])
  )

  const sourceAnalysis = options.analyzeSource ?
    await analyzePresetSource(
      cwd,
      selectedConfig,
      options.sourceFiles ?? [],
      Object.keys(resolvablePresetOptions.projects ?? {}),
      options.typescriptRunner ?? defaultCommandRunner,
      options.semanticOnly,
      options.write
    ) :
    null

  return {
    added,
    changed,
    compatibilityScope: 'effective-config',
    file,
    groups,
    missingPackages,
    preset: normalizedPreset,
    presetOptions,
    removed,
    sourceAnalysis,
    totals: {
      added: Object.keys(added).length,
      changed: Object.keys(changed).length,
      removed: Object.keys(removed).length
    }
  }
}

export const handleExplainPreset = async (
  cwd: string = process.cwd(),
  preset: string,
  options: ExplainPresetOptions = {}
): Promise<void> => {
  if (options.write && !options.semanticOnly) {
    throw new Error('explain-preset --write requires --semantic-only to avoid an unchecked formatting rewrite.')
  }

  if (options.semanticOnly && !options.analyzeSource) {
    throw new Error('explain-preset --semantic-only requires --analyze-source.')
  }

  const report = await createPresetReport(cwd, preset, options.file, {
    analyzeSource: options.analyzeSource,
    semanticOnly: options.semanticOnly,
    sourceFiles: options.files,
    write: options.write
  })

  let compatibilityFile: null | string = null

  if (options.compatibility) {
    const output = options.output ?? `.eslint-preset-${report.preset}-compat.mjs`
    const outputPath = join(cwd, output)

    if (existsSync(outputPath)) {
      throw new Error(`${output} already exists; remove it or choose another path with --output.`)
    }

    writeFileSync(outputPath, createCompatibilityConfig(report.preset, report.added, report.changed))

    compatibilityFile = relative(cwd, outputPath)
  }

  const payload = { ...report, compatibilityFile }

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2))

    return
  }

  console.log([
    `Preset adoption report: ${report.preset}`,
    `- Representative file: ${report.file}`,
    '- Config comparison: effective rules and options',
    `- Newly enabled rules: ${report.totals.added}`,
    `- Changed rule options: ${report.totals.changed}`,
    `- Rules no longer enabled: ${report.totals.removed}`,
    `- Optional packs not installed (excluded from comparison): ${report.missingPackages.length > 0 ? report.missingPackages.join(', ') : 'none'}`,
    '',
    ...Object.entries(report.groups).map(([group, rules]) => (
      `- ${group}: ${rules.length}${rules.length > 0 ? ` (${rules.join(', ')})` : ''}`
    )),
    ...formatSourceAnalysis(report.sourceAnalysis),
    ...formatCompatibilityGuidance(compatibilityFile)
  ].join('\n'))
}
