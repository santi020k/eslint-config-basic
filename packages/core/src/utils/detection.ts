import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, Format, Library, NextMode, Preset, Runtime, Testing, Tool } from '../types.js'

interface PackageJson {
  dependencies?: Record<string, string | undefined>
  devDependencies?: Record<string, string | undefined>
}

type DependencyMap = Record<string, string | undefined>

const runtimePriority: Record<Runtime, number> = {
  [Runtime.Universal]: 0,
  [Runtime.Browser]: 1,
  [Runtime.Node]: 2,
  [Runtime.Worker]: 3
}

const createDefaultOptions = (): EslintConfigOptions => ({
  typescript: false,
  frameworks: {},
  detectedFrameworks: [],
  libraries: [],
  testing: [],
  formats: [],
  tools: [],
  extensions: [],
  runtime: Runtime.Universal
})

const dedupe = <T>(values: T[] = []): T[] => [...new Set(values)]

const pathExists = (path: string): boolean => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return existsSync(path)
}

const collectAllDependencies = (pkg: PackageJson): DependencyMap => ({
  ...(pkg.dependencies ?? {}),
  ...(pkg.devDependencies ?? {})
})

const createRuntimeSetter = (options: EslintConfigOptions) => (runtime: Runtime): void => {
  const currentRuntime = options.runtime ?? Runtime.Universal

  if (runtimePriority[runtime] > runtimePriority[currentRuntime]) {
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

  if (allDeps['@remix-run/react'] || allDeps['@remix-run/node']) {
    detected.push('remix')
    setRuntime(Runtime.Browser)
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

const detectTypescript = (detectRootDir: string): boolean => {
  return pathExists(join(detectRootDir, 'tsconfig.json')) || pathExists(join(detectRootDir, 'tsconfig.base.json'))
}

const detectLibraries = (allDeps: DependencyMap): Library[] => {
  const libraries: Library[] = []

  if (allDeps.tailwindcss) libraries.push(Library.Tailwind)
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

  return dedupe(formats)
}

const detectTools = (allDeps: DependencyMap): Tool[] => {
  const tools: Tool[] = []

  if (allDeps['@nestjs/swagger']) tools.push(Tool.Swagger)
  if (allDeps.prettier) tools.push(Tool.Prettier)

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
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson
    const allDeps = collectAllDependencies(pkg)
    const setRuntime = createRuntimeSetter(options)

    options.detectedFrameworks = detectFrameworks(allDeps, setRuntime)
    options.nextMode = detectNextMode(allDeps, detectRootDir)
    options.typescript = detectTypescript(detectRootDir)
    options.libraries = detectLibraries(allDeps)
    options.testing = detectTesting(allDeps)
    options.formats = detectFormats(allDeps, detectRootDir)
    options.tools = detectTools(allDeps)
    options.extensions = dedupe(options.extensions)
    options.preset = resolvePreset(options)

    return options
  } catch (err) {
    if (process.env.ESLINT_BASIC_DEBUG) {
      console.warn('[ESLint Basic] Failed to detect project options from package.json:', err)
    }

    return options
  }
}
