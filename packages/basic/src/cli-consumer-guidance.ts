import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire, findPackageJSON } from 'node:module'
import { dirname, join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type FlatConfigArray, flattenConfigInputs } from '@santi020k/eslint-config-core'

import { getDefineConfigMetadata } from './define-config-metadata.js'
import type { defineConfig } from './index.js'

interface EffectiveConfig {
  languageOptions?: { parserOptions?: Record<string, unknown> }
  rules?: Record<string, unknown>
  settings?: Record<string, unknown>
}

interface ConfigInspector {
  calculateConfigForFile: (file: string) => Promise<EffectiveConfig | undefined>
}

type InspectorConstructor = new(options: {
  cwd: string
  overrideConfig: FlatConfigArray
  overrideConfigFile: true
}) => ConfigInspector

const isRecord = (value: unknown): value is Record<string, unknown> => (
  value !== null && typeof value === 'object' && !Array.isArray(value)
)

const isFlatConfig = (value: unknown): value is FlatConfigArray => (
  Array.isArray(value) && value.every(isRecord)
)

const isComposer = (value: unknown): value is { defineConfig: typeof defineConfig } => (
  isRecord(value) && typeof value.defineConfig === 'function'
)

const isEslint = (value: unknown): value is { ESLint: InspectorConstructor } => (
  isRecord(value) && typeof value.ESLint === 'function'
)

/** Narrow ESLint's dynamic effective-config result at the API boundary. */
export const toEffectiveConfig = (value: unknown): EffectiveConfig | undefined => {
  if (!isRecord(value)) return undefined

  const languageOptions = isRecord(value.languageOptions) ? value.languageOptions : undefined
  const parserOptions = isRecord(languageOptions?.parserOptions) ? languageOptions.parserOptions : undefined

  return {
    languageOptions: { parserOptions },
    rules: isRecord(value.rules) ? value.rules : undefined,
    settings: isRecord(value.settings) ? value.settings : undefined
  }
}

const ASTRO_WORKAROUND_RULES = new Set([
  '@stylistic/indent',
  '@stylistic/jsx-closing-tag-location',
  '@stylistic/jsx-indent',
  '@stylistic/jsx-indent-props',
  '@typescript-eslint/no-unused-vars',
  '@typescript-eslint/no-unused-expressions',
  'no-undef',
  'no-unused-vars',
  'no-unused-expressions'
])

const collectAstroFiles = (root: string, files: string[], depth = 0): void => {
  if (depth > 8) return

  const entries = readdirSync(root, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))

  for (const entry of entries) {
    if (files.length >= 32) break

    const path = join(root, entry.name)

    if (entry.isFile() && entry.name.endsWith('.astro')) files.push(path)

    if (entry.isDirectory() && !entry.name.startsWith('.') &&
      !['node_modules', 'dist', 'build', 'coverage'].includes(entry.name)) collectAstroFiles(path, files, depth + 1)
  }
}

const severity = (value: unknown): unknown => {
  const first: unknown = Array.isArray(value) ? value[0] : value

  return first === 'off' ? 0 : first
}

type ConfigEntry = FlatConfigArray[number]

interface Candidate {
  entry: ConfigEntry
  inspector: ConfigInspector
  key: string
}

const createCandidates = (
  cwd: string,
  extras: FlatConfigArray,
  baseline: FlatConfigArray,
  Inspector: InspectorConstructor
): Candidate[] => (
  extras.filter(entry => entry.files?.some(pattern => typeof pattern === 'string' && pattern.includes('.astro')))
    .filter(entry => entry.languageOptions?.parserOptions?.parser ||
      Object.keys(entry.rules ?? {}).some(rule => ASTRO_WORKAROUND_RULES.has(rule)))
    .map((entry, index) => ({
      entry,
      inspector: new Inspector({
        cwd,
        overrideConfig: [...baseline, {
          ...entry,
          settings: { ...entry.settings, 'eslint-config-basic/doctor-scope': true }
        }],
        overrideConfigFile: true
      }),
      key: `${index}:${entry.name ?? 'override'}`
    }))
)

const isRedundantRule = (
  rule: string,
  value: unknown,
  current: EffectiveConfig,
  baseline: EffectiveConfig
): boolean => (
  ASTRO_WORKAROUND_RULES.has(rule) && severity(value) === 0 &&
  severity(current.rules?.[rule]) === 0 && severity(baseline.rules?.[rule]) === 0
)

const getParser = (config: EffectiveConfig): unknown => config.languageOptions?.parserOptions?.parser

// ESLint clones nested parser options; entry-point function identity survives that merge.
const sameParser = (left: unknown, right: unknown): boolean => (
  left === right || (isRecord(left) && isRecord(right) &&
    typeof left.parseForESLint === 'function' && left.parseForESLint === right.parseForESLint && left.parse === right.parse)
)

const isRedundantParser = (entry: ConfigEntry, current: EffectiveConfig, baseline: EffectiveConfig): boolean => {
  const parser = getParser(entry)

  return Boolean(parser) && sameParser(parser, getParser(current)) && sameParser(parser, getParser(baseline))
}

const recordCandidate = (
  candidate: Candidate,
  current: EffectiveConfig,
  baseline: EffectiveConfig,
  file: string,
  guidance: Map<string, string>
): void => {
  const { entry, key } = candidate

  for (const [rule, value] of Object.entries(entry.rules ?? {})) {
    if (!isRedundantRule(rule, value, current, baseline)) continue

    const id = `${key}:${rule}`

    guidance.set(id, guidance.get(id) ??
    `Review Astro workaround ${rule}: installed generated and current effective configs both disable it ` +
    `for ${file}. Remove only that field after checking all override globs; ` +
    'rerun lint, typecheck, and repeated autofix before removing the override.')
  }

  if (isRedundantParser(entry, current, baseline)) {
    const id = `${key}:parser`

    guidance.set(id, guidance.get(id) ??
    'Review the explicit Astro TypeScript parser: the installed generated config already supplies the ' +
    `same parser for ${file}. Check every override glob and rerun lint, typecheck, ` +
    'and repeated autofix before removing only the parser field.')
  }
}

const inspectTarget = async (
  cwd: string,
  target: string,
  current: ConfigInspector,
  generated: ConfigInspector,
  candidates: Candidate[],
  guidance: Map<string, string>
): Promise<void> => {
  const [effective, defaults] = await Promise.all([
    current.calculateConfigForFile(target),
    generated.calculateConfigForFile(target)
  ])

  if (!effective || !defaults) return

  for (const candidate of candidates) {
    const scoped = await candidate.inspector.calculateConfigForFile(target)

    if (scoped?.settings?.['eslint-config-basic/doctor-scope'] !== true) continue

    recordCandidate(candidate, effective, defaults, relative(cwd, target), guidance)
  }
}

/** Only report fields proven redundant for a sampled file; never remove a whole override block. */
export const compareConsumerOverrides = async (
  cwd: string,
  config: FlatConfigArray,
  baseline: FlatConfigArray,
  Inspector: InspectorConstructor
): Promise<string[]> => {
  const metadata = getDefineConfigMetadata(config)

  if (!metadata) return []

  const candidates = createCandidates(cwd, flattenConfigInputs(metadata.extraConfigs), baseline, Inspector)

  if (candidates.length === 0) return []

  const current = new Inspector({ cwd, overrideConfig: config, overrideConfigFile: true })
  const generated = new Inspector({ cwd, overrideConfig: baseline, overrideConfigFile: true })
  const guidance = new Map<string, string>()
  const files: string[] = []

  collectAstroFiles(cwd, files)

  for (const file of files) {
    await inspectTarget(cwd, file, current, generated, candidates, guidance)

    await inspectTarget(cwd, `${file}/consumer-script.js`, current, generated, candidates, guidance)
  }

  return [...guidance.values()]
}

const resolveComposerEntry = (cwd: string): string => {
  const manifestPath = findPackageJSON(
    '@santi020k/eslint-config-basic',
    pathToFileURL(join(cwd, 'package.json'))
  )

  if (!manifestPath) throw new Error('The installed Basic package manifest could not be resolved.')

  const manifest: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const exports = isRecord(manifest) && isRecord(manifest.exports) ? manifest.exports : undefined
  const entry = isRecord(exports?.['.']) ? exports['.'].import : undefined

  if (typeof entry !== 'string' || !entry.startsWith('./')) {
    throw new Error('The installed Basic package does not declare a supported public root import export.')
  }

  return pathToFileURL(join(dirname(manifestPath), entry)).href
}

const compareInstalledComposer = async (cwd: string, config: FlatConfigArray): Promise<string[]> => {
  const metadata = getDefineConfigMetadata(config)

  if (!metadata || metadata.extraConfigs.length === 0) return []

  const projectRequire = createRequire(join(cwd, 'package.json'))
  const composer: unknown = await import(resolveComposerEntry(cwd))
  const eslint: unknown = projectRequire('eslint')

  if (!isComposer(composer) || !isEslint(eslint)) return []

  const legacyRoot: unknown = Reflect.get(metadata.options ?? {}, 'detectRootDir')
  const root = metadata.root ?? metadata.options?.root ?? (typeof legacyRoot === 'string' ? legacyRoot : cwd)
  const baseline = await composer.defineConfig({ ...metadata.options, root })

  return await compareConsumerOverrides(cwd, config, baseline, eslint.ESLint)
}

export const getConsumerOverrideGuidance = async (cwd: string, configPath: null | string): Promise<string[]> => {
  if (!configPath || !existsSync(configPath)) return []

  try {
    const loaded: unknown = await import(pathToFileURL(configPath).href)
    const config: unknown = isRecord(loaded) ? await loaded.default : undefined

    return isFlatConfig(config) ? await compareInstalledComposer(cwd, config) : []
  } catch (error) {
    return [`Could not compare consumer overrides with the installed generated config: ${
      error instanceof Error ? error.message : String(error)
    }. Keep existing overrides until effective-config comparison succeeds.`]
  }
}
