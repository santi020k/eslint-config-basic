import type { Dirent } from 'node:fs'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, isAbsolute, join, resolve } from 'node:path'

import type { TailwindOptions } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

const CSS_ESCAPE_PATTERN = String.raw`\\(?:[\dA-Fa-f]{1,6}\s?|[^\f\n\r])`

const CSS_CLASS_PATTERN = new RegExp(
  String.raw`\.((?:${CSS_ESCAPE_PATTERN}|[A-Za-z_])(?:${CSS_ESCAPE_PATTERN}|[\w-])*)`,
  'g'
)

const CSS_UTILITY_PATTERN = /@utility\s+([A-Za-z_][\w-]*)\s*\{/g
const CSS_IMPORT_PATTERN = /@import\s+(?:url\(\s*)?["']([^"']+)["']/g
const CSS_PLUGIN_PATTERN = /@plugin\s+["']([^"']+)["']/g
const CSS_COMMENT_PATTERN = /\/\*[\s\S]*?\*\//g
const CSS_STRING_PATTERN = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g
const ASTRO_STYLE_PATTERN = /<style(?:\s[^>]*)?>([\s\S]*?)<\/style\s*>/gi
const TAILWIND_CONFIG_PATTERN = /^tailwind\.config\.(?:cjs|cts|js|mjs|mts|ts)$/
const MAX_COMPONENT_PATTERN_LENGTH = 3000

const IGNORED_COMPONENT_DIRECTORIES = new Set([
  '.astro',
  '.git',
  '.next',
  '.nuxt',
  '.output',
  '.svelte-kit',
  'build',
  'coverage',
  'dist',
  'node_modules'
])

const PLUGIN_CLASS_PATTERNS: Readonly<Record<string, readonly string[]>> = {
  '@tailwindcss/aspect-ratio': ['^aspect-(?:h|w)-\\d+$'],
  '@tailwindcss/forms': [
    '^form-(?:checkbox|input|multiselect|radio|select|textarea)$'
  ],
  '@tailwindcss/typography': ['^not-prose$']
}

const decodeCssIdentifier = (value: string): string => value
  .replaceAll(/\\([\dA-Fa-f]{1,6})\s?/g, (_, codePoint: string) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
  .replaceAll(/\\([^\f\n\r])/g, '$1')

const resolveLocalCssImport = (filePath: string, specifier: string): string | undefined => {
  if (!specifier.startsWith('.') && !isAbsolute(specifier)) return undefined

  const cleanSpecifier = specifier.split(/[?#]/, 1)[0]

  if (!cleanSpecifier) return undefined

  const candidate = isAbsolute(cleanSpecifier) ? cleanSpecifier : resolve(dirname(filePath), cleanSpecifier)
  const candidates = extname(candidate) ? [candidate] : [candidate, `${candidate}.css`, join(candidate, 'index.css')]

  return candidates.find(path => existsSync(path))
}

const getImportedCssFiles = (filePath: string, content: string): string[] => (
  [...content.replaceAll(CSS_COMMENT_PATTERN, '').matchAll(CSS_IMPORT_PATTERN)].flatMap(match => {
    const importedFile = match[1] ? resolveLocalCssImport(filePath, match[1]) : undefined

    return importedFile ? [importedFile] : []
  })
)

const getCssSelectorClasses = (content: string): string[] => {
  const classes = new Set<string>()
  const source = content.replaceAll(CSS_COMMENT_PATTERN, '')

  for (const blockStart of source.matchAll(/\{/g)) {
    const index = blockStart.index

    const boundary = Math.max(
      source.lastIndexOf(';', index - 1),
      source.lastIndexOf('{', index - 1),
      source.lastIndexOf('}', index - 1)
    )

    const selector = source.slice(boundary + 1, index).trim()

    if (!selector || selector.startsWith('@')) continue

    for (const match of selector.replaceAll(CSS_STRING_PATTERN, '').matchAll(CSS_CLASS_PATTERN)) {
      if (match[1]) classes.add(decodeCssIdentifier(match[1]))
    }
  }

  return [...classes]
}

const getCssUtilityClasses = (content: string): string[] => (
  [...content.replaceAll(CSS_COMMENT_PATTERN, '').matchAll(CSS_UTILITY_PATTERN)]
    .flatMap(match => match[1] ? [match[1]] : [])
)

const getCssPlugins = (content: string): string[] => (
  [...content.replaceAll(CSS_COMMENT_PATTERN, '').matchAll(CSS_PLUGIN_PATTERN)]
    .flatMap(match => match[1] ? [match[1]] : [])
)

const readDirectory = (directory: string): Dirent[] => {
  try {
    return readdirSync(directory, { withFileTypes: true, encoding: 'utf8' })
  } catch {
    return []
  }
}

const readTextFile = (path: string): string | undefined => {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return undefined
  }
}

const collectCssComponentClasses = (
  filePath: string,
  visited: Set<string>,
  classes: Set<string>,
  plugins: Set<string>
): void => {
  if (visited.has(filePath)) return

  visited.add(filePath)

  const content = readTextFile(filePath)

  if (content === undefined) return

  for (const className of getCssSelectorClasses(content)) classes.add(className)

  for (const className of getCssUtilityClasses(content)) classes.add(className)

  for (const plugin of getCssPlugins(content)) plugins.add(plugin)

  for (const importedFile of getImportedCssFiles(filePath, content)) {
    collectCssComponentClasses(importedFile, visited, classes, plugins)
  }
}

const collectAstroComponentClasses = (cwd: string, classes: Set<string>): void => {
  const visit = (directory: string): void => {
    const entries = readDirectory(directory)

    for (const entry of entries.filter(entry => (
      entry.isDirectory() && !IGNORED_COMPONENT_DIRECTORIES.has(entry.name)
    ))) visit(join(directory, entry.name))

    for (const entry of entries.filter(entry => entry.isFile() && entry.name.endsWith('.astro'))) {
      const astroPath = join(directory, entry.name)
      const content = readTextFile(astroPath)

      if (content === undefined) continue

      for (const style of content.matchAll(ASTRO_STYLE_PATTERN)) {
        const stylesheet = style[1]

        if (!stylesheet) continue

        for (const className of getCssSelectorClasses(stylesheet)) classes.add(className)

        for (const className of getCssUtilityClasses(stylesheet)) classes.add(className)

        for (const importedFile of getImportedCssFiles(astroPath, stylesheet)) {
          collectCssComponentClasses(importedFile, new Set(), classes, new Set())
        }
      }
    }
  }

  visit(cwd)
}

const getConfiguredTailwindPlugins = (cwd: string): string[] => {
  const plugins = new Set<string>()

  for (const entry of readDirectory(cwd)) {
    if (!entry.isFile() || !TAILWIND_CONFIG_PATTERN.test(entry.name)) continue

    const content = readTextFile(join(cwd, entry.name))

    if (content === undefined) continue

    const uncommentedContent = content
      .replaceAll(/\/\*[\s\S]*?\*\//g, '')
      .replaceAll(/^\s*\/\/.*$/gm, '')

    for (const plugin of Object.keys(PLUGIN_CLASS_PATTERNS)) {
      if (uncommentedContent.includes(plugin)) plugins.add(plugin)
    }
  }

  return [...plugins]
}

const escapeRegex = (value: string): string => value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')

const createExactClassPatterns = (classes: string[]): string[] => {
  const patterns: string[] = []
  let alternatives: string[] = []

  const flush = (): void => {
    if (alternatives.length === 0) return

    patterns.push(`^(?:${alternatives.join('|')})$`)

    alternatives = []
  }

  for (const className of classes.toSorted()) {
    const escapedClass = escapeRegex(className)
    const nextLength = alternatives.join('|').length + escapedClass.length + 6

    if (nextLength > MAX_COMPONENT_PATTERN_LENGTH) flush()

    alternatives.push(escapedClass)
  }

  flush()

  return patterns
}

export const findCssComponentClasses = (
  cwd: string,
  entryPoint: string
): string[] => {
  const entryPath = isAbsolute(entryPoint) ? entryPoint : join(cwd, entryPoint)
  const classes = new Set<string>()

  collectCssComponentClasses(entryPath, new Set(), classes, new Set())

  collectAstroComponentClasses(cwd, classes)

  return [...classes].toSorted()
}

export const findTailwindPluginClassPatterns = (
  cwd: string,
  entryPoint: string
): string[] => {
  const entryPath = isAbsolute(entryPoint) ? entryPoint : join(cwd, entryPoint)
  const plugins = new Set(getConfiguredTailwindPlugins(cwd))

  collectCssComponentClasses(entryPath, new Set(), new Set(), plugins)

  return [...plugins]
    .flatMap(plugin => PLUGIN_CLASS_PATTERNS[plugin] ?? [])
    .filter((pattern, index, patterns) => patterns.indexOf(pattern) === index)
    .toSorted()
}

export const findCssComponentClassPatterns = (
  cwd: string,
  entryPoint: string
): string[] => createExactClassPatterns(findCssComponentClasses(cwd, entryPoint))

const getIgnoredClasses = (tailwindOptions: TailwindOptions): string[] => {
  const configuredClasses = tailwindOptions.ignore ?? []

  if (!tailwindOptions.entryPoint || tailwindOptions.detectComponentClasses === false) {
    return configuredClasses
  }

  const detectedClasses = findCssComponentClassPatterns(
    tailwindOptions.cwd ?? process.cwd(),
    tailwindOptions.entryPoint
  )

  const pluginClasses = findTailwindPluginClassPatterns(
    tailwindOptions.cwd ?? process.cwd(),
    tailwindOptions.entryPoint
  )

  return [...new Set([...configuredClasses, ...detectedClasses, ...pluginClasses])]
}

const getUnknownClassRule = (
  tailwindOptions: TailwindOptions,
  ignoredClasses: string[]
): TSESLint.FlatConfig.RuleEntry | undefined => {
  const options = {
    ...(tailwindOptions.entryPoint ? { entryPoint: tailwindOptions.entryPoint } : {}),
    ...(ignoredClasses.length ? { ignore: ignoredClasses } : {})
  }

  const hasOptions = Object.keys(options).length > 0
  const severity = tailwindOptions.noUnknownClasses ?? 'error'

  if (!hasOptions && tailwindOptions.noUnknownClasses === undefined) return undefined

  if (severity === false) return 'off'

  return hasOptions ? [severity, options] : severity
}

export const buildTailwindSettingsConfig = (
  tailwindOptions: TailwindOptions
): TSESLint.FlatConfig.Config => {
  const ignoredClasses = getIgnoredClasses(tailwindOptions)
  const noUnknownClassesRule = getUnknownClassRule(tailwindOptions, ignoredClasses)

  const settingsOptions = {
    ...(tailwindOptions.cwd ? { cwd: tailwindOptions.cwd } : {}),
    ...(tailwindOptions.detectComponentClasses === undefined ?
      {} :
      { detectComponentClasses: tailwindOptions.detectComponentClasses }),
    ...(tailwindOptions.entryPoint ? { entryPoint: tailwindOptions.entryPoint } : {}),
    ...(tailwindOptions.ignore?.length ? { ignore: tailwindOptions.ignore } : {})
  }

  return {
    name: 'eslint-config-basic/tailwind-settings',
    ...(noUnknownClassesRule === undefined ?
      {} :
      { rules: { 'better-tailwindcss/no-unknown-classes': noUnknownClassesRule } }),
    settings: { 'better-tailwindcss': settingsOptions }
  }
}
