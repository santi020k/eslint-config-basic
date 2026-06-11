import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, Extension, Format, Library, NextMode, Preset, Runtime, Testing, Tool } from '../types.js'

type DependencyMap = Record<string, string | undefined>

interface PackageJson {
  dependencies?: Record<string, string | undefined>
  devDependencies?: Record<string, string | undefined>
}

const runtimePriority = new Map<Runtime, number>([
  [Runtime.Browser, 1],
  [Runtime.Node, 2],
  [Runtime.Universal, 0],
  [Runtime.Worker, 3]
])

const createDefaultOptions = (): EslintConfigOptions => ({
  detectedFrameworks: [],
  extensions: [Extension.Unicorn, Extension.Perfectionist, Extension.Security],
  formats: [Format.Mdx, Format.Markdown, Format.Jsonc, Format.Yaml, Format.Toml],
  frameworks: {},
  libraries: [],
  runtime: Runtime.Universal,
  testing: [],
  tools: [Tool.Prettier],
  typescript: false
})

const dedupe = <T>(values: T[] = []): T[] => [...new Set(values)]
const pathExists = (path: string): boolean => existsSync(path)

const hasFileMatching = (
  rootDir: string,
  predicate: (fileName: string) => boolean
): boolean => {
  try {
    return readdirSync(rootDir, { withFileTypes: true }).some(
      entry => entry.isFile() && predicate(entry.name)
    )
  } catch {
    return false
  }
}

const collectAllDependencies = (pkg: PackageJson): DependencyMap => ({
  ...(pkg.dependencies ?? {}),
  ...(pkg.devDependencies ?? {})
})

const createRuntimeSetter = (options: EslintConfigOptions) => (runtime: Runtime): void => {
  const currentRuntime = options.runtime ?? Runtime.Universal

  if ((runtimePriority.get(runtime) ?? 0) > (runtimePriority.get(currentRuntime) ?? 0)) {
    options.runtime = runtime
  }
}

const detectFrameworks = (allDeps: DependencyMap, setRuntime: (runtime: Runtime) => void): EslintConfigOptions['detectedFrameworks'] => {
  const detected: NonNullable<EslintConfigOptions['detectedFrameworks']> = []

  if (allDeps.next) {
    detected.push('next', 'react')

    setRuntime(Runtime.Universal)
  }

  if (allDeps.astro) {
    detected.push('astro')

    setRuntime(Runtime.Browser)
  }

  if (allDeps.react && !allDeps.next && !allDeps.expo && !allDeps['react-native']) {
    detected.push('react')

    setRuntime(Runtime.Browser)
  }

  if (allDeps['@nestjs/core']) {
    detected.push('nest')

    setRuntime(Runtime.Node)
  }

  if (allDeps.hono) {
    detected.push('hono')

    if (allDeps.wrangler || allDeps['@cloudflare/workers-types'] || allDeps['@cloudflare/vitest-pool-workers']) {
      setRuntime(Runtime.Worker)
    }
  }

  if (allDeps.vue) {
    detected.push('vue')

    setRuntime(Runtime.Browser)
  }

  if (allDeps.expo || allDeps['react-native']) {
    detected.push('expo', 'react')
  }

  if (allDeps.svelte) {
    detected.push('svelte')

    setRuntime(Runtime.Browser)
  }

  if (allDeps['solid-js']) {
    detected.push('solid')

    setRuntime(Runtime.Browser)
  }

  if (allDeps['@angular/core']) {
    detected.push('angular')

    setRuntime(Runtime.Browser)
  }

  if (allDeps['@builder.io/qwik']) {
    detected.push('qwik')

    setRuntime(Runtime.Browser)
  }

  if (allDeps['@slidev/cli']) {
    detected.push('slidev', 'vue')

    setRuntime(Runtime.Browser)
  }

  if (allDeps['@remix-run/react'] || allDeps['@remix-run/node']) {
    detected.push('remix')

    setRuntime(Runtime.Browser)
  }

  if (
    allDeps.vite &&
    !detected.some(framework => [
      'astro',
      'next',
      'qwik',
      'remix',
      'slidev'
    ].includes(framework))
  ) {
    detected.push('vite')

    setRuntime(Runtime.Browser)
  }

  if (
    (
      allDeps.wrangler ||
      allDeps['@cloudflare/workers-types'] ||
      allDeps['@cloudflare/vitest-pool-workers']
    ) &&
    !detected.some(framework => [
      'angular',
      'astro',
      'expo',
      'next',
      'qwik',
      'react',
      'remix',
      'slidev',
      'solid',
      'svelte',
      'vite',
      'vue'
    ].includes(framework))
  ) {
    setRuntime(Runtime.Worker)
  }

  return dedupe(detected)
}

const detectNextMode = (allDeps: DependencyMap, detectRootDir: string): NextMode | undefined => {
  if (!allDeps.next) {
    return undefined
  }

  if (pathExists(join(detectRootDir, 'app')) || pathExists(join(detectRootDir, 'src/app'))) {
    return NextMode.AppRouter
  }

  return NextMode.Pages
}

const detectTypescript = (detectRootDir: string): boolean => pathExists(join(detectRootDir, 'tsconfig.json')) || pathExists(join(detectRootDir, 'tsconfig.base.json'))

const detectLibraries = (allDeps: DependencyMap): Library[] => {
  const libraries: Library[] = []

  if (allDeps.typeorm) libraries.push(Library.Typeorm)

  if (allDeps.prisma || allDeps['@prisma/client']) libraries.push(Library.Prisma)

  if (allDeps['drizzle-orm']) libraries.push(Library.Drizzle)

  if (allDeps['@mikro-orm/core']) libraries.push(Library.MikroOrm)

  if (allDeps.sequelize || allDeps['@sequelize/core']) libraries.push(Library.Sequelize)

  if (
    allDeps.tailwindcss ||
    allDeps['@tailwindcss/postcss'] ||
    allDeps['@tailwindcss/vite'] ||
    allDeps['@tailwindcss/typography'] ||
    allDeps['@iconify/tailwind4']
  ) libraries.push(Library.Tailwind)

  if (allDeps.i18next) libraries.push(Library.I18next)

  if (allDeps['@stencil/core']) libraries.push(Library.Stencil)

  if (
    allDeps.storybook ||
    allDeps['@storybook/react'] ||
    allDeps['@storybook/core'] ||
    allDeps['@storybook/nextjs'] ||
    allDeps['@storybook/vue3'] ||
    allDeps['@storybook/svelte'] ||
    allDeps['@storybook/angular'] ||
    allDeps['@storybook/experimental-nextjs-vite']
  ) {
    libraries.push(Library.Storybook)
  }

  if (
    allDeps['@tanstack/react-query'] ||
    allDeps['@tanstack/vue-query'] ||
    allDeps['@tanstack/svelte-query'] ||
    allDeps['@tanstack/angular-query'] ||
    allDeps['@tanstack/eslint-plugin-query']
  ) {
    libraries.push(Library.TanstackQuery)
  }

  if (
    allDeps['@tanstack/react-router'] ||
    allDeps['@tanstack/vue-router'] ||
    allDeps['@tanstack/eslint-plugin-router']
  ) {
    libraries.push(Library.TanstackRouter)
  }

  return dedupe(libraries)
}

const detectTesting = (allDeps: DependencyMap): Testing[] => {
  const testing: Testing[] = []

  if (allDeps.vitest) testing.push(Testing.Vitest)

  if (allDeps.playwright || allDeps['@playwright/test']) testing.push(Testing.Playwright)

  if (allDeps.jest || allDeps['@jest/core'] || allDeps['jest-circus']) testing.push(Testing.Jest)

  if (allDeps.cypress) testing.push(Testing.Cypress)

  if (
    allDeps['@testing-library/react'] ||
    allDeps['@testing-library/vue'] ||
    allDeps['@testing-library/angular'] ||
    allDeps['@testing-library/svelte'] ||
    allDeps['@testing-library/user-event'] ||
    allDeps['@testing-library/jest-dom'] ||
    allDeps['@testing-library/dom']
  ) {
    testing.push(Testing.TestingLibrary)
  }

  return dedupe(testing)
}

const detectFormats = (allDeps: DependencyMap, detectRootDir: string): Format[] => {
  const formats: Format[] = []

  if (
    allDeps.graphql ||
    allDeps['@apollo/client'] ||
    allDeps['relay-runtime'] ||
    allDeps.urql ||
    allDeps['graphql-tag'] ||
    allDeps['@graphql-typed-document-node/core'] ||
    pathExists(join(detectRootDir, 'schema.graphql')) ||
    pathExists(join(detectRootDir, 'schema.gql'))
  ) {
    formats.push(Format.Graphql)
  }

  if (
    allDeps['@mdx-js/react'] ||
    allDeps['@mdx-js/mdx'] ||
    allDeps['@astrojs/mdx'] ||
    hasFileMatching(detectRootDir, fileName => fileName.endsWith('.mdx'))
  ) {
    formats.push(Format.Mdx)
  }

  if (
    allDeps.markdown ||
    allDeps['react-markdown'] ||
    allDeps['remark-gfm'] ||
    allDeps['markdownlint-cli2'] ||
    pathExists(join(detectRootDir, '.markdownlint.json')) ||
    pathExists(join(detectRootDir, '.markdownlint.yaml')) ||
    hasFileMatching(detectRootDir, fileName => fileName.endsWith('.md'))
  ) {
    formats.push(Format.Markdown)
  }

  if (
    allDeps['eslint-plugin-jsonc'] ||
    hasFileMatching(detectRootDir, fileName => fileName.endsWith('.jsonc'))
  ) {
    formats.push(Format.Jsonc)
  }

  if (
    pathExists(join(detectRootDir, 'pnpm-workspace.yaml')) ||
    pathExists(join(detectRootDir, 'cspell.config.yaml')) ||
    pathExists(join(detectRootDir, 'cspell.config.yml')) ||
    pathExists(join(detectRootDir, '.github/workflows'))
  ) {
    formats.push(Format.Yaml)
  }

  if (
    allDeps['eslint-plugin-toml'] ||
    hasFileMatching(detectRootDir, fileName => fileName.endsWith('.toml'))
  ) {
    formats.push(Format.Toml)
  }

  return dedupe(formats)
}

const detectTools = (allDeps: DependencyMap, detectRootDir: string): Tool[] => {
  const tools: Tool[] = []

  if (allDeps['@nestjs/swagger']) tools.push(Tool.Swagger)

  if (
    allDeps.prettier ||
    allDeps['prettier-plugin-astro'] ||
    allDeps['prettier-plugin-tailwindcss'] ||
    pathExists(join(detectRootDir, '.prettierrc')) ||
    pathExists(join(detectRootDir, '.prettierrc.json')) ||
    pathExists(join(detectRootDir, '.prettierrc.yaml')) ||
    pathExists(join(detectRootDir, '.prettierrc.yml')) ||
    pathExists(join(detectRootDir, '.prettierrc.js')) ||
    pathExists(join(detectRootDir, '.prettierrc.cjs')) ||
    pathExists(join(detectRootDir, 'prettier.config.js')) ||
    pathExists(join(detectRootDir, 'prettier.config.cjs')) ||
    pathExists(join(detectRootDir, 'prettier.config.mjs'))
  ) tools.push(Tool.Prettier)

  if (
    allDeps.cspell ||
    allDeps['@cspell/eslint-plugin'] ||
    pathExists(join(detectRootDir, 'cspell.config.yaml')) ||
    pathExists(join(detectRootDir, 'cspell.config.yml')) ||
    pathExists(join(detectRootDir, 'cspell.config.json'))
  ) tools.push(Tool.Cspell)

  if (
    allDeps.jsdoc ||
    allDeps['eslint-plugin-jsdoc'] ||
    pathExists(join(detectRootDir, 'jsdoc.json')) ||
    pathExists(join(detectRootDir, 'jsdoc.config.js')) ||
    pathExists(join(detectRootDir, 'jsdoc.config.cjs')) ||
    pathExists(join(detectRootDir, 'jsdoc.config.mjs'))
  ) tools.push(Tool.Jsdoc)

  return dedupe(tools)
}

const resolvePreset = (options: EslintConfigOptions): Preset => {
  if (!options.typescript) {
    return Preset.Basic
  }

  if (options.runtime === Runtime.Node) {
    return Preset.Node
  }

  if (options.runtime === Runtime.Browser) {
    return Preset.Browser
  }

  if (options.runtime === Runtime.Worker) {
    return Preset.Worker
  }

  return Preset.Basic
}

/**
 * Internal detection helpers exposed for focused unit tests.
 * Do not use these in application code.
 */
export const __detectionInternals = {
  collectAllDependencies,
  createDefaultOptions,
  createRuntimeSetter,
  dedupe,
  detectFormats,
  detectFrameworks,
  detectLibraries,
  detectNextMode,
  detectTesting,
  detectTools,
  detectTypescript,
  pathExists,
  resolvePreset
}

/**
 * Automatically detects project settings based on package.json content
 * @param detectRootDir Root directory used for dependency/file detection (defaults to process.cwd())
 * @returns Detected ESLint configuration options
 */
export const detectProjectOptions = (detectRootDir: string = process.cwd()): EslintConfigOptions => {
  const packageJsonPath = join(detectRootDir, 'package.json')
  const options = createDefaultOptions()

  if (!pathExists(packageJsonPath)) {
    return options
  }

  try {
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson
    const allDeps = collectAllDependencies(pkg)
    const setRuntime = createRuntimeSetter(options)

    options.detectedFrameworks = detectFrameworks(allDeps, setRuntime)

    options.nextMode = detectNextMode(allDeps, detectRootDir)

    options.typescript = detectTypescript(detectRootDir)

    options.libraries = detectLibraries(allDeps)

    options.testing = detectTesting(allDeps)

    options.formats = dedupe([...(options.formats ?? []), ...detectFormats(allDeps, detectRootDir)])

    options.tools = dedupe([...(options.tools ?? []), ...detectTools(allDeps, detectRootDir)])

    options.extensions = dedupe(options.extensions)

    options.preset = resolvePreset(options)

    return options
  } catch (error) {
    if (process.env.ESLINT_BASIC_DEBUG) {
      console.warn('[ESLint Basic] Failed to detect project options from package.json:', error)
    }

    return options
  }
}
