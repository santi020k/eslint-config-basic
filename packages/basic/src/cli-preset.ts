/* eslint-disable no-console -- CLI handlers own user-facing terminal output */
/* eslint-disable security/detect-non-literal-fs-filename -- output is scoped to the caller-selected project root */
/* eslint-disable complexity, security/detect-object-injection -- report comparison indexes validated ESLint rule maps */
import { existsSync, writeFileSync } from 'node:fs'
import { createRequire, findPackageJSON } from 'node:module'
import { basename, join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type EslintConfigOptions, Preset } from '@santi020k/eslint-config-core'

import { defineConfig } from './index.js'
import { isMissingRequestedPackage } from './optional-package-errors.js'
import { resolvePreset } from './resolvers.js'

interface EffectiveConfig {
  rules?: Partial<Record<string, unknown>>
}

interface ProjectEslint {
  calculateConfigForFile: (filePath: string) => Promise<EffectiveConfig | null>
}

type ProjectEslintConstructor = new(options: {
  cwd: string
  overrideConfig?: unknown
  overrideConfigFile?: boolean
}) => ProjectEslint

export interface ExplainPresetOptions {
  compatibility?: boolean
  file?: string
  json?: boolean
  output?: string
}

const PRESETS = new Set<string>(Object.values(Preset))

const PRESET_FEATURE_PACKAGES = {
  extensions: '@santi020k/eslint-config-extensions',
  formats: '@santi020k/eslint-config-formats',
  libraries: '@santi020k/eslint-config-libraries',
  testing: '@santi020k/eslint-config-testing',
  tools: '@santi020k/eslint-config-tools'
} as const

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
  'prettier',
  'toml',
  'yaml'
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

  if (FORMAT_PREFIXES.has(prefix) || rule.includes('format') || rule.includes('spacing')) return 'formatting'

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
  overrideConfig?: unknown
): ProjectEslint => {
  const projectRequire = createRequire(join(cwd, 'package.json'))
  const eslintModule = projectRequire('eslint') as { ESLint?: ProjectEslintConstructor }

  if (!eslintModule.ESLint) throw new Error('The installed eslint package does not expose the ESLint API.')

  return new eslintModule.ESLint({
    cwd,
    ...(overrideConfig ? { overrideConfig, overrideConfigFile: true } : {})
  })
}

const getResolvablePresetOptions = (
  cwd: string,
  presetOptions: Partial<EslintConfigOptions>
): { missingPackages: string[], options: Partial<EslintConfigOptions> } => {
  const projectPackageUrl = pathToFileURL(join(cwd, 'package.json'))
  const options = { ...presetOptions }
  const missingPackages: string[] = []

  for (const [category, specifier] of Object.entries(PRESET_FEATURE_PACKAGES)) {
    const selected = options[category as keyof typeof PRESET_FEATURE_PACKAGES]

    if (!Array.isArray(selected) || selected.length === 0) continue

    try {
      findPackageJSON(specifier, projectPackageUrl)
    } catch (error) {
      if (!isMissingRequestedPackage(error, specifier)) throw error

      Object.assign(options, {
        [category]: [],
        features: {
          ...options.features,
          ...Object.fromEntries(selected.map(feature => [feature, false]))
        }
      })

      missingPackages.push(specifier)
    }
  }

  return { missingPackages, options }
}

const createCompatibilityConfig = (
  preset: string,
  addedRules: Record<string, unknown>
): string => [
  `// Temporary compatibility override generated for Preset.${preset.charAt(0).toUpperCase()}${preset.slice(1)}.`,
  '// Remove entries as the project adopts the preset findings.',
  'export default {',
  `  name: 'eslint-config-basic/preset-${preset}-compatibility',`,
  '  rules: {',
  ...Object.keys(addedRules).sort().map(rule => `    ${JSON.stringify(rule)}: 'off',`),
  '  },',
  '}',
  ''
].join('\n')

export const createPresetReport = async (
  cwd: string,
  presetName: string,
  file = 'eslint.config.js'
) => {
  const normalizedPreset = presetName.toLowerCase()

  if (!PRESETS.has(normalizedPreset)) {
    throw new Error(
      `Unknown preset "${presetName}". Use one of: ${[...PRESETS].sort().join(', ')}.`
    )
  }

  const preset = normalizedPreset as Preset
  const presetOptions = resolvePreset(preset)
  const { missingPackages, options: resolvablePresetOptions } = getResolvablePresetOptions(cwd, presetOptions)
  const current = await loadProjectEslint(cwd).calculateConfigForFile(file)

  const selectedConfig = await defineConfig({
    preset,
    ...resolvablePresetOptions,
    root: cwd
  })

  const selected = await loadProjectEslint(cwd, selectedConfig).calculateConfigForFile(file)
  const currentRules = current?.rules ?? {}
  const selectedRules = selected?.rules ?? {}
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

  return {
    added,
    changed,
    file,
    groups,
    missingPackages,
    preset: normalizedPreset,
    presetOptions,
    removed,
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
  const report = await createPresetReport(cwd, preset, options.file)
  let compatibilityFile: null | string = null

  if (options.compatibility) {
    const output = options.output ?? `.eslint-preset-${report.preset}-compat.mjs`
    const outputPath = join(cwd, output)

    if (existsSync(outputPath)) {
      throw new Error(`${output} already exists; remove it or choose another path with --output.`)
    }

    writeFileSync(outputPath, createCompatibilityConfig(report.preset, report.added))

    compatibilityFile = basename(outputPath)
  }

  const payload = { ...report, compatibilityFile }

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2))

    return
  }

  console.log([
    `Preset adoption report: ${report.preset}`,
    `- Representative file: ${report.file}`,
    `- Newly enabled rules: ${report.totals.added}`,
    `- Changed rule options: ${report.totals.changed}`,
    `- Rules no longer enabled: ${report.totals.removed}`,
    `- Optional packs not installed (excluded from comparison): ${report.missingPackages.length > 0 ? report.missingPackages.join(', ') : 'none'}`,
    '',
    ...Object.entries(report.groups).map(([group, rules]) => (
      `- ${group}: ${rules.length}${rules.length > 0 ? ` (${rules.join(', ')})` : ''}`
    )),
    ...(compatibilityFile
      ? ['', `Compatibility override written to ${compatibilityFile}. Import it after the preset config.`]
      : ['', 'Pass --compatibility to write a temporary override that disables newly enabled rules.'])
  ].join('\n'))
}
