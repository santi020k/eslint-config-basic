/* eslint-disable @typescript-eslint/no-dynamic-delete, security/detect-object-injection -- migration rewrites validated package.json dependency records */
/* eslint-disable complexity -- migration planners intentionally cover dry-run, write, lean, full, and compatibility branches */
/* eslint-disable no-console -- CLI handlers own user-facing terminal output */
/* eslint-disable security/detect-non-literal-fs-filename -- all paths are scoped to the caller-selected project root */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

export interface V3MigrationContext {
  declaredConfigPackages?: string[]
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

const toKebabCase = (value: string): string => (
  value.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
)

const FEATURE_NAME_TO_PACKAGE = new Map(
  Object.entries(FEATURE_EXPORTS).flatMap(([category, exports]) => exports.flatMap(exportName => {
    const packageName = FEATURE_PACKAGES[category as keyof typeof FEATURE_PACKAGES]

    return [
      [exportName.toLowerCase(), packageName],
      [toKebabCase(exportName), packageName]
    ] as const
  }))
)

const PRESET_FEATURE_PACKAGES: Record<string, string[]> = {
  app: [
    FEATURE_PACKAGES.testing,
    FEATURE_PACKAGES.tools
  ],
  ci: [
    FEATURE_PACKAGES.extensions,
    FEATURE_PACKAGES.tools
  ],
  library: [
    FEATURE_PACKAGES.extensions,
    FEATURE_PACKAGES.tools
  ],
  monorepo: [
    FEATURE_PACKAGES.extensions,
    FEATURE_PACKAGES.tools
  ]
}

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

const REMOVED_ALIAS_OWNERS: Record<string, string> = {
  angularConfig: '@santi020k/eslint-config-angular',
  astroConfig: '@santi020k/eslint-config-astro',
  expoConfig: '@santi020k/eslint-config-expo',
  gitignore: '@santi020k/eslint-config-core',
  jsConfig: '@santi020k/eslint-config-core',
  nestConfig: '@santi020k/eslint-config-nest',
  nextConfig: '@santi020k/eslint-config-next',
  preactConfig: '@santi020k/eslint-config-preact',
  reactConfig: '@santi020k/eslint-config-react',
  solidConfig: '@santi020k/eslint-config-solid',
  svelteConfig: '@santi020k/eslint-config-svelte',
  tsConfig: '@santi020k/eslint-config-typescript',
  vueConfig: '@santi020k/eslint-config-vue'
}

const FACTORY_ALIAS_REPLACEMENTS = new Set([
  'astroConfig',
  'gitignore'
])

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

const createBackupPath = (filePath: string, suffix: string): string => {
  const preferred = `${filePath}.${suffix}.bak`

  if (!existsSync(preferred)) return preferred

  let index = 2

  while (existsSync(`${preferred}.${index}`)) index++

  return `${preferred}.${index}`
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

const getImportRanges = (content: string): { end: number, start: number }[] => (
  [...content.matchAll(/import\s*\{[\s\S]*?\}\s*from\s*(['"])[^'"]+\1/g)]
    .map(match => ({
      end: match.index + match[0].length,
      start: match.index
    }))
)

const maskNonCode = (content: string, preserveStrings = false): string => {
  const characters = Array<string>(content.length)
  let quote: null | string = null
  let blockComment = false
  let lineComment = false

  for (let index = 0; index < content.length; index++) {
    characters[index] = content[index]
  }

  for (let index = 0; index < characters.length; index++) {
    const character = characters[index]
    const next = characters[index + 1]

    if (lineComment) {
      if (character === '\n') {
        lineComment = false
      } else {
        characters[index] = ' '
      }

      continue
    }

    if (blockComment) {
      characters[index] = character === '\n' ? '\n' : ' '

      if (character === '*' && next === '/') {
        characters[index + 1] = ' '

        blockComment = false

        index++
      }

      continue
    }

    if (quote) {
      if (!preserveStrings) characters[index] = character === '\n' ? '\n' : ' '

      if (character === '\\') {
        if (!preserveStrings && index + 1 < characters.length) {
          characters[index + 1] = next === '\n' ? '\n' : ' '
        }

        index++
      } else if (character === quote) {
        quote = null
      }

      continue
    }

    if (character === '/' && next === '/') {
      characters[index] = ' '

      characters[index + 1] = ' '

      lineComment = true

      index++

      continue
    }

    if (character === '/' && next === '*') {
      characters[index] = ' '

      characters[index + 1] = ' '

      blockComment = true

      index++

      continue
    }

    if (character === '\'' || character === '"' || character === '`') {
      if (!preserveStrings) characters[index] = ' '

      quote = character
    }
  }

  return characters.join('')
}

const getEnclosingDelimiter = (content: string, offset: number): null | string => {
  const expectedOpeners: string[] = []

  const closingDelimiters: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  for (let index = offset - 1; index >= 0; index--) {
    const character = content[index]
    const expectedOpener = closingDelimiters[character]

    if (expectedOpener) {
      expectedOpeners.push(expectedOpener)

      continue
    }

    if (!['(', '[', '{'].includes(character)) continue

    if (expectedOpeners.at(-1) === character) {
      expectedOpeners.pop()
    } else if (expectedOpeners.length === 0) {
      return character
    }
  }

  return null
}

const replaceBindingReferences = (
  content: string,
  from: string,
  to: string,
  invokeReferences = false
): string => {
  const importRanges = getImportRanges(content)
  const masked = maskNonCode(content)
  // eslint-disable-next-line security/detect-non-literal-regexp -- binding names come from the internal migration map
  const identifierPattern = new RegExp(`\\b${from}\\b`, 'g')
  const matches = [...masked.matchAll(identifierPattern)]
  let updated = content

  for (const match of matches.reverse()) {
    const offset = match.index
    const isImportSpecifier = importRanges.some(range => offset >= range.start && offset < range.end)

    if (isImportSpecifier) continue

    const precedingContent = masked.slice(0, offset).trimEnd()
    const preceding = precedingContent.at(-1)
    const following = masked.slice(offset + from.length)
    const isMemberAccess = preceding === '.' && !precedingContent.endsWith('...')
    const isProperty = isMemberAccess || /^\s*:/.test(following)
    const isAlreadyInvoked = /^\s*\(/.test(following)

    const isObjectShorthand = (
      getEnclosingDelimiter(masked, offset) === '{' &&
      (preceding === '{' || preceding === ',') &&
      /^\s*[,}]/.test(following)
    )

    if (isProperty) continue

    let replacement = to

    if (invokeReferences && isObjectShorthand) {
      replacement = `${from}: ${to}()`
    } else if (invokeReferences && !isAlreadyInvoked) {
      replacement = `${to}()`
    }

    updated = `${updated.slice(0, offset)}${replacement}${updated.slice(offset + from.length)}`
  }

  return updated
}

const replaceImportedAlias = (
  content: string,
  from: string,
  to: string,
  invokeReferences = false
): string => {
  const bindings: { from: string, to: string }[] = []
  const owner = REMOVED_ALIAS_OWNERS[from]
  const acceptedPackages = new Set([BASIC_PACKAGE, FULL_PACKAGE, ...(owner ? [owner] : [])])
  const importPattern = /import\s*\{([^}]*)\}\s*from\s*(['"])(@santi020k\/eslint-config-[^'"]+)\2/g

  let updated = content.replace(importPattern, (statement, specifierText: string, _quote: string, packageName: string) => {
    if (!acceptedPackages.has(packageName)) return statement

    const specifiers = specifierText.split(',')

    const rewritten = specifiers.map(specifier => {
      const aliasMatch = /^(\s*)([a-zA-Z_$][\w$]*)\s+as\s+([a-zA-Z_$][\w$]*)(\s*)$/.exec(specifier)

      if (aliasMatch?.[2] === from) {
        const localName = aliasMatch[3]

        bindings.push({ from: localName, to: localName })

        return `${aliasMatch[1]}${to} as ${localName}${aliasMatch[4]}`
      }

      const directMatch = /^(\s*)([a-zA-Z_$][\w$]*)(\s*)$/.exec(specifier)

      if (directMatch?.[2] !== from) return specifier

      bindings.push({ from, to })

      return `${directMatch[1]}${to}${directMatch[3]}`
    })

    const rewrittenText = rewritten.join(',')

    return rewrittenText === specifierText ? statement : statement.replace(specifierText, rewrittenText)
  })

  for (const binding of bindings) {
    updated = replaceBindingReferences(updated, binding.from, binding.to, invokeReferences)
  }

  return updated
}

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

const hasCodePropertySeparator = (codeContent: string, match: RegExpMatchArray): boolean => {
  const separatorOffset = match[0].indexOf(':')
  const matchIndex = match.index ?? -1

  return matchIndex >= 0 && separatorOffset >= 0 && codeContent[matchIndex + separatorOffset] === ':'
}

const getConfigFeaturePackages = (content: string): string[] => {
  const packages = new Set<string>()
  const codeContent = maskNonCode(content)
  const searchableContent = maskNonCode(content, true)

  for (const category of Object.keys(FEATURE_PACKAGES) as (keyof typeof FEATURE_PACKAGES)[]) {
    const categorySelections = searchableContent.matchAll(
      // eslint-disable-next-line security/detect-non-literal-regexp -- category names come from the internal package registry
      new RegExp(`(?:\\b${category}\\b|['"]${category}['"])\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'g')
    )

    for (const selection of categorySelections) {
      if (
        hasCodePropertySeparator(codeContent, selection) &&
        selection[1].trim()
      ) {
        packages.add(FEATURE_PACKAGES[category])

        break
      }
    }
  }

  const featureSelections = /(?:\b(?:features|integrations)\b|['"](?:features|integrations)['"])\s*:\s*\{([\s\S]*?)\}/g

  for (const selection of searchableContent.matchAll(featureSelections)) {
    if (!hasCodePropertySeparator(codeContent, selection)) continue

    const enabledFeaturePattern = /(?:['"]([^'"]+)['"]|([a-zA-Z_$][\w$-]*))\s*:\s*true\b/g

    for (const match of selection[1].matchAll(enabledFeaturePattern)) {
      const featureName = (match[1] || match[2]).toLowerCase()
      const packageName = FEATURE_NAME_TO_PACKAGE.get(featureName)

      if (packageName) packages.add(packageName)
    }
  }

  const enumPresetPattern = /(?:\bpreset\b|['"]preset['"])\s*:\s*Preset\.(App|CI|Library|Monorepo)/g

  for (const match of searchableContent.matchAll(enumPresetPattern)) {
    if (!hasCodePropertySeparator(codeContent, match)) continue

    const presetName = match[1].toLowerCase()

    for (const packageName of PRESET_FEATURE_PACKAGES[presetName] ?? []) {
      packages.add(packageName)
    }
  }

  const stringPresetPattern = /(?:\bpreset\b|['"]preset['"])\s*:\s*(['"`])(app|ci|library|monorepo)\1/g

  for (const match of searchableContent.matchAll(stringPresetPattern)) {
    if (!hasCodePropertySeparator(codeContent, match)) continue

    for (const packageName of PRESET_FEATURE_PACKAGES[match[2]] ?? []) {
      packages.add(packageName)
    }
  }

  const strictPattern = /(?:\bstrict\b|['"]strict['"])\s*:\s*(['"`])pedantic\1/g

  for (const match of searchableContent.matchAll(strictPattern)) {
    if (hasCodePropertySeparator(codeContent, match)) {
      packages.add(FEATURE_PACKAGES.extensions)

      break
    }
  }

  return [...packages]
}

export const migrateConfigToV3 = (
  content: string,
  mode: 'full' | 'lean'
): { changes: string[], content: string, featurePackages: string[] } => {
  const changes: string[] = []
  const featurePackages = new Set(getConfigFeaturePackages(content))
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
    const invokeReferences = FACTORY_ALIAS_REPLACEMENTS.has(removed)
    const updated = replaceImportedAlias(migrated, removed, replacement, invokeReferences)

    if (updated !== migrated) {
      migrated = updated

      changes.push(`Replaced ${removed} with ${replacement}${invokeReferences ? '()' : ''}.`)
    }
  }

  const remixMigrated = migrated.replace(
    /(\bframeworks\s*:\s*\{)([\s\S]*?)(\})/,
    (_match, opening: string, body: string, closing: string) => (
      `${opening}${body.replaceAll(/\bremix(\s*:)/g, '\'react-router\'$1')}${closing}`
    )
  )

  if (remixMigrated !== migrated) {
    migrated = remixMigrated

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

  if (configContent) {
    const codeContent = maskNonCode(configContent)
    const searchableContent = maskNonCode(configContent, true)
    const enumPresetPattern = /(?:\bpreset\b|['"]preset['"])\s*:\s*Preset\.All/g

    for (const match of searchableContent.matchAll(enumPresetPattern)) {
      if (hasCodePropertySeparator(codeContent, match)) return true
    }

    const stringPresetPattern = /(?:\bpreset\b|['"]preset['"])\s*:\s*(['"`])all\1/g

    for (const match of searchableContent.matchAll(stringPresetPattern)) {
      if (hasCodePropertySeparator(codeContent, match)) return true
    }
  }

  return getDeclaredConfigPackages(packageJson).has(FULL_PACKAGE)
}

const createInstallCommand = (
  packageManager: string,
  packages: string[],
  workspaceRoot = false
): string => {
  const packageList = packages.join(' ')

  switch (packageManager) {
    case 'bun':
      return `bun add -d ${packageList}`

    case 'pnpm':
      return `pnpm add -D${workspaceRoot ? ' --workspace-root' : ''} ${packageList}`

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

  const previouslyDeclared = new Set([
    ...getDeclaredConfigPackages(next),
    ...(context.declaredConfigPackages ?? [])
  ])

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

  const devDependencies = {
    ...getDependencyRecord(next, 'devDependencies')
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
      const packageName = FEATURE_PACKAGES[category]

      if (context[category].length > 0 || previouslyDeclared.has(packageName)) {
        selectedFeaturePackages.add(packageName)
      }
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
      const backupPath = createBackupPath(configPath, 'v2')

      writeFileSync(backupPath, configContent ?? '')

      writeFileSync(configPath, configMigration.content)

      written.push(basename(configPath), basename(backupPath))
    }

    if (packageMigration.changed) {
      const backupPath = createBackupPath(packagePath, 'v2')

      writeFileSync(backupPath, `${JSON.stringify(packageJson, null, 2)}\n`)

      writeFileSync(packagePath, `${JSON.stringify(packageMigration.packageJson, null, 2)}\n`)

      written.push('package.json', basename(backupPath))
    }
  }

  const result: MigrationResult = {
    changes,
    configFile: configPath ? basename(configPath) : null,
    installCommand: createInstallCommand(
      context.packageManager,
      packageMigration.packages,
      context.packageManager === 'pnpm' && existsSync(join(cwd, 'pnpm-workspace.yaml'))
    ),
    mode,
    packages: packageMigration.packages,
    written
  }

  outputMigration(result, options.json ?? false)

  if (options.check && changes.length > 0) process.exitCode = 1
}
