/* eslint-disable complexity -- workflow handlers intentionally cover CLI output and compatibility branches */
/* eslint-disable no-console -- CLI handlers own user-facing terminal output */
/* eslint-disable security/detect-non-literal-fs-filename -- all paths are scoped to the caller-selected project root */
/* eslint-disable security/detect-non-literal-regexp -- strict preset names are validated against an internal allowlist */
/* eslint-disable security/detect-object-injection -- snapshot keys come from enumerated file and rule names */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'

export interface CommandResult {
  status: number
  stderr: string
  stdout: string
}

export type CommandRunner = (
  executable: string,
  args: string[],
  cwd: string
) => CommandResult

export interface BaselineOptions {
  json?: boolean
  preset?: string
  prune?: boolean
}

export interface ProfileOptions {
  concurrency?: string
  files?: string[]
  json?: boolean
  maxDurationMs?: number
  maxRuleTimeMs?: number
  maxWarnings?: number
}

export interface SnapshotOptions {
  check?: boolean
  files?: string[]
  json?: boolean
  snapshotPath?: string
}

export interface SnapshotDiff {
  added: string[]
  changed: { after: unknown, before: unknown, rule: string }[]
  file: string
  removed: string[]
}

interface EslintSnapshotFile {
  globals: Record<string, unknown>
  languageOptions: {
    ecmaVersion?: unknown
    sourceType?: unknown
  }
  plugins: string[]
  rules: Record<string, unknown>
}

interface EslintSnapshot {
  files: Record<string, EslintSnapshotFile>
  version: 1
}

interface EslintStats {
  times?: {
    passes?: {
      fix?: { total?: number }
      parse?: { total?: number }
      rules?: Record<string, { total?: number }>
      total?: number
    }[]
  }
}

interface EslintResult {
  errorCount?: number
  filePath?: string
  fatalErrorCount?: number
  stats?: EslintStats
  warningCount?: number
}

interface ProfileRun {
  concurrency: string
  durationMs: number
  errorCount: number
  fatalErrorCount: number
  fileCount: number
  parseMs: number
  ruleMs: number
  slowestRules: { rule: string, timeMs: number }[]
  status: number
  warningCount: number
}

interface ProjectEslint {
  calculateConfigForFile: (filePath: string) => Promise<unknown>
}

type ProjectEslintConstructor = new(options: { cwd: string }) => ProjectEslint

const SNAPSHOT_FILENAME = '.eslint-config-snapshot.json'

const SOURCE_EXTENSIONS = new Set([
  '.astro',
  '.cjs',
  '.css',
  '.cts',
  '.gql',
  '.graphql',
  '.html',
  '.js',
  '.json',
  '.json5',
  '.jsonc',
  '.jsx',
  '.md',
  '.mdx',
  '.mjs',
  '.mts',
  '.svelte',
  '.toml',
  '.ts',
  '.tsx',
  '.vue',
  '.yaml',
  '.yml'
])

const IGNORED_DIRECTORIES = new Set([
  '.git',
  '.next',
  '.nuxt',
  '.output',
  '.turbo',
  'build',
  'coverage',
  'dist',
  'node_modules'
])

export const defaultCommandRunner: CommandRunner = (executable, args, cwd) => {
  const result = spawnSync(executable, args, {
    cwd,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 50 * 1024 * 1024
  })

  return {
    status: result.status ?? 1,
    stderr: result.stderr,
    stdout: result.stdout
  }
}

const readJson = (filePath: string): unknown => {
  if (!existsSync(filePath)) return null

  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as unknown
  } catch {
    return null
  }
}

const resolveProjectRequire = (cwd: string) => createRequire(join(cwd, 'package.json'))

const resolveEslintCli = (cwd: string): string => {
  const projectRequire = resolveProjectRequire(cwd)
  const packagePath = projectRequire.resolve('eslint/package.json')
  const metadata = readJson(packagePath) as null | { bin?: string | Record<string, string> }
  const bin = typeof metadata?.bin === 'string' ? metadata.bin : metadata?.bin?.eslint

  if (!bin) throw new Error('The project ESLint CLI could not be resolved. Install eslint before running this command.')

  return resolve(dirname(packagePath), bin)
}

const runEslint = (
  cwd: string,
  args: string[],
  runner: CommandRunner
): CommandResult => runner(process.execPath, [resolveEslintCli(cwd), ...args], cwd)

const outputCommandFailure = (label: string, result: CommandResult): never => {
  const details = result.stderr.trim() || result.stdout.trim() || `exit code ${result.status}`

  throw new Error(`${label} failed: ${details}`)
}

const createBackupPath = (filePath: string, suffix: string): string => {
  const preferred = `${filePath}.${suffix}.bak`

  if (!existsSync(preferred)) return preferred

  let index = 2

  while (existsSync(`${preferred}.${index}`)) index++

  return `${preferred}.${index}`
}

const updateConfigStrictPreset = (cwd: string, preset: string): null | string => {
  if (!['ci', 'pedantic'].includes(preset)) {
    throw new Error(`Unsupported baseline preset "${preset}". Use "ci" or "pedantic".`)
  }

  const configPath = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts'
  ].map(name => join(cwd, name)).find(path => existsSync(path))

  if (!configPath) throw new Error('No eslint.config.* file was found. Run basic-eslint init first.')

  const content = readFileSync(configPath, 'utf8')

  if (new RegExp(`strict\\s*:\\s*['"]${preset}['"]`).test(content)) return null

  const zeroArgumentPattern = /\bdefineConfig\(\s*\)/

  if (!zeroArgumentPattern.test(content)) {
    throw new Error(
      `Cannot safely add strict: "${preset}" to a customized config. ` +
      'Add it manually, then run basic-eslint baseline without --preset.'
    )
  }

  const backupPath = createBackupPath(configPath, 'baseline')

  writeFileSync(backupPath, content)

  writeFileSync(configPath, content.replace(zeroArgumentPattern, `defineConfig({ strict: '${preset}' })`))

  return basename(backupPath)
}

export const handleBaseline = (
  cwd: string = process.cwd(),
  options: BaselineOptions = {},
  runner: CommandRunner = defaultCommandRunner
): void => {
  const backup = options.preset ? updateConfigStrictPreset(cwd, options.preset) : null

  const args = options.prune ?
    ['.', '--prune-suppressions'] :
    ['.', '--fix', '--suppress-all']

  const result = runEslint(cwd, args, runner)

  if (result.status !== 0) outputCommandFailure('ESLint baseline', result)

  const payload = {
    action: options.prune ? 'pruned' : 'created',
    backup,
    preset: options.preset ?? null,
    suppressionsFile: join(cwd, 'eslint-suppressions.json')
  }

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2))

    return
  }

  console.log(options.prune ?
    '✅ Pruned unused ESLint suppressions.' :
    '✅ Created or refreshed eslint-suppressions.json for existing violations.')

  if (backup) console.log(`📦 Backed up the previous config to ${backup}.`)
}

const getStatsPasses = (result: EslintResult) => result.stats?.times?.passes ?? []

const summarizeProfileResults = (
  concurrency: string,
  results: EslintResult[],
  durationMs: number,
  status: number
): ProfileRun => {
  const ruleTimes = new Map<string, number>()
  let parseMs = 0
  let ruleMs = 0

  for (const result of results) {
    for (const pass of getStatsPasses(result)) {
      parseMs += pass.parse?.total ?? 0

      for (const [rule, timing] of Object.entries(pass.rules ?? {})) {
        const time = timing.total ?? 0

        ruleMs += time

        ruleTimes.set(rule, (ruleTimes.get(rule) ?? 0) + time)
      }
    }
  }

  return {
    concurrency,
    durationMs,
    errorCount: results.reduce((total, result) => total + (result.errorCount ?? 0), 0),
    fatalErrorCount: results.reduce((total, result) => total + (result.fatalErrorCount ?? 0), 0),
    fileCount: results.length,
    parseMs,
    ruleMs,
    slowestRules: [...ruleTimes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([rule, timeMs]) => ({ rule, timeMs })),
    status,
    warningCount: results.reduce((total, result) => total + (result.warningCount ?? 0), 0)
  }
}

const runProfile = (
  cwd: string,
  files: string[],
  concurrency: string,
  runner: CommandRunner
): ProfileRun => {
  const startedAt = performance.now()

  const result = runEslint(
    cwd,
    [...files, '--stats', '--format', 'json', '--concurrency', concurrency],
    runner
  )

  const durationMs = performance.now() - startedAt
  let parsed: EslintResult[] = []

  try {
    parsed = JSON.parse(result.stdout) as EslintResult[]
  } catch {
    outputCommandFailure('ESLint profile', result)
  }

  return summarizeProfileResults(concurrency, parsed, durationMs, result.status)
}

const round = (value: number): number => Math.round(value * 100) / 100

export const handleProfile = (
  cwd: string = process.cwd(),
  options: ProfileOptions = {},
  runner: CommandRunner = defaultCommandRunner
): void => {
  for (const [name, value] of [
    ['max-duration', options.maxDurationMs],
    ['max-rule-time', options.maxRuleTimeMs],
    ['max-warnings', options.maxWarnings]
  ] as const) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      throw new Error(`--${name} must be a non-negative number.`)
    }
  }

  const files = options.files?.length ? options.files : ['.']
  const concurrencyModes = options.concurrency ? [options.concurrency] : ['off', 'auto']
  const runs = concurrencyModes.map(concurrency => runProfile(cwd, files, concurrency, runner))
  const successfulRuns = runs.filter(run => run.fatalErrorCount === 0 && run.status < 2)

  const recommendation = successfulRuns.length > 0 ?
    successfulRuns.toSorted((a, b) => a.durationMs - b.durationMs)[0].concurrency :
    null

  const budgetRun = successfulRuns.toSorted((a, b) => a.durationMs - b.durationMs)[0] ?? runs[0]


  const violations: string[] = successfulRuns.length === 0 ?
    ['ESLint profiling did not produce a successful run.'] :
    []

  if (options.maxDurationMs !== undefined && budgetRun.durationMs > options.maxDurationMs) {
    violations.push(
      `Duration ${round(budgetRun.durationMs)}ms exceeds the ${options.maxDurationMs}ms budget.`
    )
  }

  if (options.maxWarnings !== undefined && budgetRun.warningCount > options.maxWarnings) {
    violations.push(
      `Warnings ${budgetRun.warningCount} exceed the ${options.maxWarnings} warning budget.`
    )
  }

  const slowestRule = budgetRun.slowestRules.at(0)

  if (options.maxRuleTimeMs !== undefined && slowestRule && slowestRule.timeMs > options.maxRuleTimeMs) {
    violations.push(
      `${slowestRule.rule} took ${round(slowestRule.timeMs)}ms, exceeding the ${options.maxRuleTimeMs}ms rule budget.`
    )
  }

  const payload = {
    budget: {
      limits: {
        maxDurationMs: options.maxDurationMs ?? null,
        maxRuleTimeMs: options.maxRuleTimeMs ?? null,
        maxWarnings: options.maxWarnings ?? null
      },
      passed: violations.length === 0,
      violations
    },
    recommendation,
    runs: runs.map(run => ({
      ...run,
      durationMs: round(run.durationMs),
      parseMs: round(run.parseMs),
      ruleMs: round(run.ruleMs),
      slowestRules: run.slowestRules.map(item => ({ ...item, timeMs: round(item.timeMs) }))
    }))
  }

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2))

    if (!payload.budget.passed) process.exitCode = 1

    return
  }

  console.log('ESLint performance profile:')

  for (const run of payload.runs) {
    console.log(
      `- concurrency=${run.concurrency}: ${run.durationMs}ms, ${run.fileCount} files, ` +
      `${run.errorCount} errors, ${run.warningCount} warnings`
    )
  }

  if (payload.recommendation) console.log(`- Recommended concurrency: ${payload.recommendation}`)

  if (!payload.budget.passed) {
    console.log('Budget violations:')

    for (const violation of payload.budget.violations) console.log(`- ${violation}`)

    process.exitCode = 1
  }

  const slowestRules = payload.runs[0]?.slowestRules ?? []

  if (slowestRules.length > 0) {
    console.log('Slowest rules:')

    for (const item of slowestRules.slice(0, 10)) {
      console.log(`- ${item.rule}: ${item.timeMs}ms`)
    }
  }
}

const walkSourceFiles = (cwd: string, directory = cwd, output: string[] = []): string[] => {
  if (output.length >= 5000) return output

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (output.length >= 5000) break

    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) {
        walkSourceFiles(cwd, join(directory, entry.name), output)
      }

      continue
    }

    if (SOURCE_EXTENSIONS.has(extname(entry.name))) {
      output.push(relative(cwd, join(directory, entry.name)))
    }
  }

  return output
}

const classifyRepresentativeFile = (filePath: string): string => {
  if (/eslint\.config\.[cm]?[jt]s$/.test(filePath)) return 'config'

  if (/\.(test|spec)\.[cm]?[jt]sx?$/.test(filePath)) return 'test'

  return extname(filePath)
}

export const findRepresentativeFiles = (cwd: string): string[] => {
  const selected = new Map<string, string>()

  for (const filePath of walkSourceFiles(cwd)) {
    const category = classifyRepresentativeFile(filePath)

    if (!selected.has(category)) selected.set(category, filePath)
  }

  return [...selected.values()].sort()
}

const loadProjectEslint = (cwd: string): ProjectEslint => {
  const projectRequire = resolveProjectRequire(cwd)
  const eslintModule = projectRequire('eslint') as { ESLint?: ProjectEslintConstructor }

  if (!eslintModule.ESLint) throw new Error('The installed eslint package does not expose the ESLint API.')

  return new eslintModule.ESLint({ cwd })
}

const normalizeSerializableObject = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entry]) => {
        try {
          JSON.stringify(entry)

          return true
        } catch {
          return false
        }
      })
      .sort(([a], [b]) => a.localeCompare(b))
  )
}

const normalizeConfig = (config: unknown): EslintSnapshotFile => {
  const resolved = config && typeof config === 'object' ? config as {
    languageOptions?: {
      ecmaVersion?: unknown
      globals?: unknown
      sourceType?: unknown
    }
    plugins?: unknown
    rules?: unknown
  } : {}

  return {
    globals: normalizeSerializableObject(resolved.languageOptions?.globals),
    languageOptions: {
      ecmaVersion: resolved.languageOptions?.ecmaVersion,
      sourceType: resolved.languageOptions?.sourceType
    },
    plugins: Object.keys(normalizeSerializableObject(resolved.plugins)).sort(),
    rules: normalizeSerializableObject(resolved.rules)
  }
}

export const createConfigSnapshot = async (
  cwd: string,
  files?: string[],
  eslint: ProjectEslint = loadProjectEslint(cwd)
): Promise<EslintSnapshot> => {
  const representativeFiles = files?.length ? files : findRepresentativeFiles(cwd)

  if (representativeFiles.length === 0) {
    throw new Error('No representative source files were found. Pass one or more --file paths.')
  }

  const entries = await Promise.all(representativeFiles.map(async filePath => {
    const config = await eslint.calculateConfigForFile(filePath)

    return [filePath, normalizeConfig(config)] as const
  }))

  return {
    files: Object.fromEntries(entries),
    version: 1
  }
}

const sameValue = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right)

const getSnapshotValues = (snapshot?: EslintSnapshotFile): Record<string, unknown> => {
  if (!snapshot) return {}

  return {
    ...snapshot.rules,
    ...Object.fromEntries(
      Object.entries(snapshot.globals).map(([name, value]) => [`globals:${name}`, value])
    ),
    ...Object.fromEntries(
      Object.entries(snapshot.languageOptions)
        .filter(([, value]) => value !== undefined)
        .map(([name, value]) => [`languageOptions:${name}`, value])
    ),
    ...Object.fromEntries(snapshot.plugins.map(name => [`plugins:${name}`, true]))
  }
}

export const diffConfigSnapshots = (
  previous: EslintSnapshot,
  current: EslintSnapshot
): SnapshotDiff[] => {
  const files = new Set([...Object.keys(previous.files), ...Object.keys(current.files)])
  const diffs: SnapshotDiff[] = []

  for (const file of [...files].sort()) {
    const before = getSnapshotValues(previous.files[file])
    const after = getSnapshotValues(current.files[file])
    const added = Object.keys(after).filter(rule => !(rule in before)).sort()
    const removed = Object.keys(before).filter(rule => !(rule in after)).sort()

    const changed = Object.keys(after)
      .filter(rule => rule in before && !sameValue(before[rule], after[rule]))
      .sort()
      .map(rule => ({ after: after[rule], before: before[rule], rule }))

    if (added.length > 0 || removed.length > 0 || changed.length > 0) {
      diffs.push({ added, changed, file, removed })
    }
  }

  return diffs
}

const outputSnapshotDiff = (diffs: SnapshotDiff[]): void => {
  if (diffs.length === 0) {
    console.log('✅ Effective ESLint configuration matches the saved snapshot.')

    return
  }

  console.log(`ESLint configuration changed for ${diffs.length} representative file(s):`)

  for (const diff of diffs) {
    console.log(`- ${diff.file}`)

    if (diff.added.length > 0) console.log(`  Added: ${diff.added.join(', ')}`)

    if (diff.removed.length > 0) console.log(`  Removed: ${diff.removed.join(', ')}`)

    for (const change of diff.changed) {
      console.log(`  Changed ${change.rule}: ${JSON.stringify(change.before)} → ${JSON.stringify(change.after)}`)
    }
  }
}

export const handleSnapshot = async (
  cwd: string = process.cwd(),
  options: SnapshotOptions = {},
  eslint?: ProjectEslint
): Promise<void> => {
  const snapshotPath = resolve(cwd, options.snapshotPath ?? SNAPSHOT_FILENAME)
  const previous = readJson(snapshotPath) as EslintSnapshot | null

  if (options.check) {
    if (!previous) {
      if (options.json) {
        console.log(JSON.stringify({ exists: false, snapshotPath }, null, 2))
      } else {
        console.error(`❌ Snapshot is missing: ${relative(cwd, snapshotPath)}`)
      }

      process.exitCode = 1

      return
    }

    const files = options.files?.length ? options.files : Object.keys(previous.files)
    const current = await createConfigSnapshot(cwd, files, eslint)
    const diffs = diffConfigSnapshots(previous, current)

    if (options.json) console.log(JSON.stringify({ diffs, snapshotPath }, null, 2))
    else outputSnapshotDiff(diffs)

    if (diffs.length > 0) process.exitCode = 1

    return
  }

  const current = await createConfigSnapshot(cwd, options.files, eslint)

  writeFileSync(snapshotPath, `${JSON.stringify(current, null, 2)}\n`)

  if (options.json) {
    console.log(JSON.stringify({
      files: Object.keys(current.files),
      snapshotPath
    }, null, 2))
  } else {
    console.log(`✅ Saved effective ESLint configuration to ${relative(cwd, snapshotPath)}.`)
  }
}

export const handleSnapshotDiff = async (
  cwd: string = process.cwd(),
  options: SnapshotOptions = {},
  eslint?: ProjectEslint
): Promise<void> => {
  const snapshotPath = resolve(cwd, options.snapshotPath ?? SNAPSHOT_FILENAME)
  const previous = readJson(snapshotPath) as EslintSnapshot | null

  if (!previous) throw new Error(`Snapshot is missing: ${relative(cwd, snapshotPath)}. Run basic-eslint snapshot first.`)

  const files = options.files?.length ? options.files : Object.keys(previous.files)
  const current = await createConfigSnapshot(cwd, files, eslint)
  const diffs = diffConfigSnapshots(previous, current)

  if (options.json) console.log(JSON.stringify({ diffs, snapshotPath }, null, 2))
  else outputSnapshotDiff(diffs)

  if (diffs.length > 0) process.exitCode = 1
}

export const isDirectory = (path: string): boolean => {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}
