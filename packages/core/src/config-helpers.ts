import { existsSync } from 'node:fs'
import { join } from 'node:path'

import type { TSESLint } from '@typescript-eslint/utils'

import {
  type DetectionOptions,
  type EslintConfigOptions,
  Extension,
  Format,
  type ImportedFramework,
  Library,
  type ProjectConfigOptions,
  Testing,
  Tool,
  type TypeScriptMode,
  type TypeScriptOptions
} from './types.js'

export const toUniqueArray = <T>(values: T[]): T[] => [...new Set(values)]

export const DEFAULT_IGNORES = [
  '**/dist/**',
  '**/build/**',
  '**/coverage/**',
  '**/.turbo/**',
  '**/.next/**',
  '**/.open-next/**',
  '**/.astro/**',
  '**/.svelte-kit/**',
  '**/.vercel/**',
  '**/.wrangler/**',
  '**/playwright-report/**',
  '**/test-results/**',
  '**/node_modules/**',
  '**/tsconfig.tsbuildinfo',
  // Package manager lock files (machine-generated, slow to lint)
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  '**/package-lock.json',
  '**/bun.lock',
  '**/bun.lockb',
  // AI coding-assistant artifacts (rule/skill folders managed by tools, not source code)
  '**/.agent/**',
  '**/.agents/**',
  '**/.aider*',
  '**/.aider*/**',
  '**/.claude/**',
  '**/.clinerules/**',
  '**/.codex/**',
  '**/.copilot/**',
  '**/.cursor/**',
  '**/.gemini/**',
  '**/.kiro/**',
  '**/.opencode/**',
  '**/.roo/**',
  '**/.windsurf/**'
]

export const GENERATED_CODE_IGNORES = [
  '**/__generated__/**',
  '**/generated/**',
  '**/codegen/**',
  '**/*.generated.*',
  '**/*.gen.*',
  '**/graphql.ts',
  '**/graphql.tsx',
  '**/gql/**',
  '**/.prisma/**'
]

export const TAILWIND_ENTRYPOINT_CANDIDATES = [
  'src/styles/global.css',
  'src/app/globals.css',
  'src/globals.css',
  'src/index.css',
  'app/globals.css',
  'styles/global.css'
]

export type OptionalBucket = 'extensions' | 'formats' | 'libraries' | 'testing' | 'tools'

export const OPTIONAL_BUCKETS = {
  extensions: Object.values(Extension),
  formats: Object.values(Format),
  libraries: Object.values(Library),
  testing: Object.values(Testing),
  tools: Object.values(Tool)
} as const

export type ConfigInput = false | null | TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray | undefined

export const flattenConfigInputs = (configs: ConfigInput[]): TSESLint.FlatConfig.ConfigArray => configs.flatMap(config => {
  if (!config) return []

  return Array.isArray(config) ? config : [config]
})

export const mergeArrayOption = <T>(
  detectedValues: T[],
  presetValues: T[] | undefined,
  explicitValues: T[] | undefined,
  strategy: 'merge' | 'replace'
): T[] => {
  if (strategy === 'replace') {
    if (explicitValues) return toUniqueArray(explicitValues)

    if (presetValues) return toUniqueArray(presetValues)

    return toUniqueArray(detectedValues)
  }

  return toUniqueArray([
    ...detectedValues,
    ...(presetValues ?? []),
    ...(explicitValues ?? [])
  ])
}

export const isOptionalBucketValue = (
  bucket: OptionalBucket,
  value: string
// eslint-disable-next-line security/detect-object-injection -- bucket is constrained to OptionalBucket union; all keys are statically known
): boolean => (OPTIONAL_BUCKETS[bucket] as readonly string[]).includes(value)

export const getFeatureEntries = (
  options: EslintConfigOptions | undefined,
  bucket: OptionalBucket,
  enabled: boolean
): string[] => [
  ...Object.entries(options?.features ?? {}),
  ...Object.entries(options?.integrations ?? {})
]
  .filter(([name, value]) => value === enabled && isOptionalBucketValue(bucket, name))
  .map(([name]) => name)

export const applyFeatureDisables = <T extends string>(
  values: T[],
  options: EslintConfigOptions | undefined,
  bucket: OptionalBucket
): T[] => {
  const disabled = new Set(getFeatureEntries(options, bucket, false))

  return values.filter(value => !disabled.has(value))
}

export const mergeOptionalBucket = <T extends string>(
  bucket: OptionalBucket,
  detectedValues: T[],
  presetValues: T[] | undefined,
  explicitValues: T[] | undefined,
  options: EslintConfigOptions | undefined,
  strategy: 'merge' | 'replace'
): T[] => {
  const featureEntries = getFeatureEntries(options, bucket, true) as T[]

  const combined = (explicitValues !== undefined || featureEntries.length > 0)
    ? [...(explicitValues ?? []), ...featureEntries]
    : undefined

  return applyFeatureDisables(
    mergeArrayOption(detectedValues, presetValues, combined, strategy),
    options,
    bucket
  )
}

export const mergeFrameworkOption = (
  detectedFrameworks: Record<string, ImportedFramework>,
  presetFrameworks: Record<string, ImportedFramework> | undefined,
  explicitFrameworks: Record<string, ImportedFramework> | undefined,
  strategy: 'merge' | 'replace'
): NonNullable<EslintConfigOptions['frameworks']> => {
  if (strategy === 'replace') {
    if (explicitFrameworks) return { ...explicitFrameworks }

    if (presetFrameworks) return { ...presetFrameworks }

    return { ...detectedFrameworks }
  }

  return {
    ...detectedFrameworks,
    ...(presetFrameworks ?? {}),
    ...(explicitFrameworks ?? {})
  }
}

const mergeInheritedArray = <T>(
  defaults: T[] | undefined,
  project: T[] | undefined,
  strategy: 'merge' | 'replace'
): T[] | undefined => {
  if (strategy === 'replace' && project !== undefined) return project

  if (defaults === undefined && project === undefined) return undefined

  return toUniqueArray([...(defaults ?? []), ...(project ?? [])])
}

const mergeInheritedObject = <T extends object>(
  defaults: T | undefined,
  project: T | undefined,
  strategy: 'merge' | 'replace'
): T | undefined => {
  if (strategy === 'replace' && project !== undefined) return project

  if (defaults === undefined && project === undefined) return undefined

  return { ...defaults, ...project } as T
}

/**
 * Applies shared monorepo defaults to one project configuration.
 * Scalar values are overridden by the project, while arrays and option maps
 * inherit and merge unless the project selects the replace strategy.
 */
export const mergeProjectOptions = (
  defaults: ProjectConfigOptions,
  project: ProjectConfigOptions
): ProjectConfigOptions => {
  const strategy = project.optionMergeStrategy ?? defaults.optionMergeStrategy ?? 'merge'

  return {
    ...defaults,
    ...project,
    detection: typeof defaults.detection === 'object' && typeof project.detection === 'object' ?
      mergeInheritedObject(defaults.detection, project.detection, strategy) :
      project.detection ?? defaults.detection,
    extensions: mergeInheritedArray(defaults.extensions, project.extensions, strategy),
    features: mergeInheritedObject(defaults.features, project.features, strategy),
    formats: mergeInheritedArray(defaults.formats, project.formats, strategy),
    frameworks: mergeInheritedObject(defaults.frameworks, project.frameworks, strategy),
    ignores: mergeInheritedArray(defaults.ignores, project.ignores, strategy),
    integrations: mergeInheritedObject(defaults.integrations, project.integrations, strategy),
    libraries: mergeInheritedArray(defaults.libraries, project.libraries, strategy),
    settings: mergeInheritedArray(defaults.settings, project.settings, strategy),
    testing: mergeInheritedArray(defaults.testing, project.testing, strategy),
    testingFiles: mergeInheritedObject(defaults.testingFiles, project.testingFiles, strategy),
    tools: mergeInheritedArray(defaults.tools, project.tools, strategy),
    ...(typeof defaults.tailwind === 'object' && typeof project.tailwind === 'object' ?
      { tailwind: { ...defaults.tailwind, ...project.tailwind } } :
      {}),
    ...(typeof defaults.typescript === 'object' && typeof project.typescript === 'object' ?
      { typescript: { ...defaults.typescript, ...project.typescript } } :
      {})
  }
}

export const resolveDetectionOptions = (
  detection: EslintConfigOptions['detection'],
  defaults: Partial<Required<DetectionOptions>> = {}
): Required<DetectionOptions> => {
  const defaultControls = {
    extensions: true,
    formats: true,
    frameworks: true,
    libraries: true,
    nextMode: true,
    projects: false,
    runtime: true,
    testing: true,
    tools: true,
    typescript: true,
    ...defaults
  }

  if (detection === false) {
    return Object.fromEntries(
      Object.keys(defaultControls).map(key => [key, false])
    ) as Required<DetectionOptions>
  }

  if (detection === true || detection === undefined) {
    return defaultControls
  }

  return {
    ...defaultControls,
    ...detection
  }
}

export const applyArrayControls = (controls: Required<DetectionOptions>, detected: EslintConfigOptions) => ({
  detectedFrameworks: controls.frameworks ? detected.detectedFrameworks : [],
  extensions: controls.extensions ? detected.extensions : [],
  formats: controls.formats ? detected.formats : [],
  libraries: controls.libraries ? detected.libraries : [],
  testing: controls.testing ? detected.testing : [],
  tools: controls.tools ? detected.tools : []
})

export const applyScalarControls = (controls: Required<DetectionOptions>, detected: EslintConfigOptions) => ({
  nextMode: controls.nextMode ? detected.nextMode : undefined,
  preset: controls.typescript && controls.runtime ? detected.preset : undefined,
  projects: controls.projects ? detected.projects : undefined,
  runtime: controls.runtime ? detected.runtime : undefined,
  typescript: controls.typescript ? detected.typescript : false
})

export const applyDetectionControls = (
  detected: EslintConfigOptions,
  detection: EslintConfigOptions['detection'],
  defaults?: Partial<Required<DetectionOptions>>
): EslintConfigOptions => {
  const controls = resolveDetectionOptions(detection, defaults)

  return { ...detected, ...applyArrayControls(controls, detected), ...applyScalarControls(controls, detected) }
}

export const getStrictMode = (
  explicitStrict: EslintConfigOptions['strict'],
  presetStrict: EslintConfigOptions['strict']
): EslintConfigOptions['strict'] => explicitStrict ?? presetStrict ?? false

export const applyStrictProfileDefaults = (
  extensions: Extension[],
  strict: EslintConfigOptions['strict']
): Extension[] => {
  if (strict !== 'pedantic') return extensions

  return toUniqueArray([...extensions, Extension.BestPractices])
}

export const hasTsconfig = (rootDir: string): boolean => [
  'tsconfig.eslint.json',
  'tsconfig.json',
  'tsconfig.base.json',
  'tsconfig.app.json',
  'tsconfig.node.json'
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- config root is user-selected project context
].some(fileName => existsSync(join(rootDir, fileName)))

export const resolveTypescriptOptions = (
  typescript: EslintConfigOptions['typescript']
): false | (TypeScriptOptions & { mode: Exclude<TypeScriptMode, 'off'> }) => {
  if (!typescript || typescript === 'off') return false

  if (typescript === true) return { mode: 'type-aware' }

  if (typeof typescript === 'string') return { mode: typescript }

  if (typescript.mode === 'off') return false

  return {
    ...typescript,
    mode: typescript.mode ?? 'type-aware'
  }
}

export const resolveTsconfigRootDir = (
  rootDir: string,
  typescript: EslintConfigOptions['typescript'],
  explicitRootDir: string | undefined
): string | undefined => {
  if (explicitRootDir) return explicitRootDir

  return resolveTypescriptOptions(typescript) && hasTsconfig(rootDir) ? rootDir : undefined
}

export const findTailwindEntryPoint = (rootDir: string): string | undefined => TAILWIND_ENTRYPOINT_CANDIDATES.find(
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- probes known stylesheet candidates under project root
  candidate => existsSync(join(rootDir, candidate))
)

export const scopeFilePattern = (projectPath: string, pattern: unknown): unknown => {
  if (typeof pattern === 'string') {
    const isNegated = pattern.startsWith('!')
    const basePattern = (isNegated ? pattern.slice(1) : pattern).replace(/^\.\//, '')
    const scoped = `${projectPath.replace(/\/$/, '')}/${basePattern}`

    return isNegated ? `!${scoped}` : scoped
  }

  if (Array.isArray(pattern)) {
    return pattern.map(item => scopeFilePattern(projectPath, item))
  }

  return pattern
}

export const scopeConfigToProject = (
  config: TSESLint.FlatConfig.Config,
  projectPath: string
): TSESLint.FlatConfig.Config => {
  if ('ignores' in config && !config.files) {
    return {
      ...config,
      ignores: config.ignores?.map(pattern => scopeFilePattern(projectPath, pattern) as string)
    }
  }

  return {
    ...config,
    files: Array.isArray(config.files) ?
      config.files.map((pattern: unknown) => scopeFilePattern(projectPath, pattern)) as TSESLint.FlatConfig.Config['files'] :
      [`${projectPath.replace(/\/$/, '')}/**/*`]
  }
}

export const patchImportGroupsConfig = (
  config: TSESLint.FlatConfig.Config,
  workspacePatterns: string[]
): TSESLint.FlatConfig.Config => {
  const rule = config.rules?.['simple-import-sort/imports']

  if (!Array.isArray(rule) || !rule[1]) return config

  const ruleOpts = rule[1] as { groups?: string[][] }
  const existingGroups = ruleOpts.groups ?? []

  if (existingGroups.length === 0) return config

  const externalIdx = existingGroups.findIndex(g => g.some(p => p.includes('^@?\\w')))
  const insertAt = externalIdx >= 0 ? externalIdx : existingGroups.length

  return {
    ...config,
    rules: {
      ...config.rules,
      'simple-import-sort/imports': [
        rule[0],
        { ...ruleOpts, groups: [...existingGroups.slice(0, insertAt), workspacePatterns, ...existingGroups.slice(insertAt)] }
      ] as TSESLint.FlatConfig.RuleEntry
    }
  }
}

export const patchImportGroups = (
  allConfigs: TSESLint.FlatConfig.ConfigArray,
  workspacePrefixes: string[]
): TSESLint.FlatConfig.ConfigArray => {
  const workspacePatterns = workspacePrefixes.map(
    p => `^${p.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/.*|$)`
  )

  return allConfigs.map(item =>
    Array.isArray(item) ? item : patchImportGroupsConfig(item, workspacePatterns)
  )
}
