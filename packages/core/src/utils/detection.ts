import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { type EslintConfigOptions, Extension, Format, Library, NextMode, Preset, Runtime, Testing, Tool } from '../types.js'

type DependencyMap = Record<string, string | undefined>

interface PackageJson {
  dependencies?: Record<string, string | undefined>
  devDependencies?: Record<string, string | undefined>
  optionalDependencies?: Record<string, string | undefined>
  packageManager?: string
  peerDependencies?: Record<string, string | undefined>
  scripts?: Record<string, string | undefined>
  workspaces?: string[] | { packages?: string[] }
}

const runtimePriority = new Map<Runtime, number>([
  [Runtime.Browser, 1],
  [Runtime.Bun, 4],
  [Runtime.Cloudflare, 5],
  [Runtime.Deno, 4],
  [Runtime.Node, 2],
  [Runtime.Universal, 0],
  [Runtime.Worker, 3]
])

const createDefaultOptions = (): EslintConfigOptions => ({
  detectedFrameworks: [],
  extensions: [],
  formats: [],
  frameworks: {},
  libraries: [],
  runtime: Runtime.Universal,
  testing: [],
  tools: [],
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
  ...(pkg.devDependencies ?? {}),
  ...(pkg.peerDependencies ?? {}),
  ...(pkg.optionalDependencies ?? {})
})

const hasAnyDependency = (allDeps: DependencyMap, names: string[]): boolean => names.some(
  // eslint-disable-next-line security/detect-object-injection
  name => Boolean(allDeps[name])
)

const createRuntimeSetter = (options: EslintConfigOptions) => (runtime: Runtime): void => {
  const currentRuntime = (options.runtime ?? Runtime.Universal) as Runtime

  if ((runtimePriority.get(runtime) ?? 0) > (runtimePriority.get(currentRuntime) ?? 0)) {
    options.runtime = runtime
  }
}

const hasCloudflareSignal = (allDeps: DependencyMap, detectRootDir: string): boolean => (
  hasAnyDependency(allDeps, ['wrangler', '@cloudflare/workers-types', '@cloudflare/vitest-pool-workers']) ||
  pathExists(join(detectRootDir, 'wrangler.toml')) ||
  pathExists(join(detectRootDir, 'wrangler.json')) ||
  pathExists(join(detectRootDir, 'wrangler.jsonc'))
)

const detectRuntime = (
  allDeps: DependencyMap,
  detectRootDir: string,
  detectedFrameworks: EslintConfigOptions['detectedFrameworks'],
  setRuntime: (runtime: Runtime) => void
): void => {
  const hasDetectedFramework = (detectedFrameworks?.length ?? 0) > 0

  if (
    hasAnyDependency(allDeps, ['bun-types']) ||
    (!hasDetectedFramework && pathExists(join(detectRootDir, 'bunfig.toml')))
  ) {
    setRuntime(Runtime.Bun)
  }

  if (
    hasAnyDependency(allDeps, ['@deno/eslint-plugin']) ||
    (!hasDetectedFramework && (
      pathExists(join(detectRootDir, 'deno.json')) ||
      pathExists(join(detectRootDir, 'deno.jsonc'))
    ))
  ) {
    setRuntime(Runtime.Deno)
  }
}

type DetectedFrameworkName = NonNullable<EslintConfigOptions['detectedFrameworks']>[number]

interface FrameworkEntry {
  deps: string[]
  frameworks: DetectedFrameworkName[]
  runtime?: Runtime
}

const FRAMEWORK_ENTRIES: FrameworkEntry[] = [
  { deps: ['next'], frameworks: ['next', 'react'], runtime: Runtime.Universal },
  { deps: ['astro'], frameworks: ['astro'], runtime: Runtime.Browser },
  { deps: ['preact'], frameworks: ['preact'], runtime: Runtime.Browser },
  { deps: ['@nestjs/core'], frameworks: ['nest'], runtime: Runtime.Node },
  { deps: ['hono'], frameworks: ['hono'] },
  { deps: ['vue'], frameworks: ['vue'], runtime: Runtime.Browser },
  { deps: ['nuxt'], frameworks: ['nuxt', 'vue'], runtime: Runtime.Universal },
  { deps: ['lit', 'lit-element'], frameworks: ['lit'], runtime: Runtime.Browser },
  { deps: ['expo', 'react-native'], frameworks: ['expo', 'react'] },
  { deps: ['svelte'], frameworks: ['svelte'], runtime: Runtime.Browser },
  { deps: ['solid-js'], frameworks: ['solid'], runtime: Runtime.Browser },
  { deps: ['@angular/core'], frameworks: ['angular'], runtime: Runtime.Browser },
  { deps: ['@builder.io/qwik'], frameworks: ['qwik'], runtime: Runtime.Browser },
  { deps: ['@slidev/cli'], frameworks: ['slidev', 'vue'], runtime: Runtime.Browser },
  { deps: ['@remix-run/react', '@remix-run/node'], frameworks: ['remix'], runtime: Runtime.Browser },
  { deps: ['@react-router/dev'], frameworks: ['react-router', 'react'], runtime: Runtime.Browser },
  { deps: ['@tanstack/react-start'], frameworks: ['tanstack-start', 'react'], runtime: Runtime.Universal },
  { deps: ['@tanstack/solid-start'], frameworks: ['tanstack-start', 'solid'], runtime: Runtime.Universal },
]

const CLOUDFLARE_DEPS = ['wrangler', '@cloudflare/workers-types', '@cloudflare/vitest-pool-workers']
const REACT_EXCLUSIONS = ['next', 'expo', 'react-native', '@react-router/dev', '@remix-run/react', '@tanstack/react-start']
const VITE_EXCLUSION_FRAMEWORKS = ['astro', 'next', 'nuxt', 'qwik', 'react-router', 'remix', 'slidev', 'tanstack-start']

const isReactStandalone = (allDeps: DependencyMap): boolean =>
  Boolean(allDeps.react) && !hasAnyDependency(allDeps, REACT_EXCLUSIONS)

const isViteStandalone = (allDeps: DependencyMap, detected: DetectedFrameworkName[]): boolean =>
  Boolean(allDeps.vite) && !detected.some(fw => VITE_EXCLUSION_FRAMEWORKS.includes(fw))

const detectFrameworks = (
  allDeps: DependencyMap,
  detectRootDir: string,
  setRuntime: (runtime: Runtime) => void
): EslintConfigOptions['detectedFrameworks'] => {
  const detected: DetectedFrameworkName[] = []

  for (const { deps, frameworks, runtime } of FRAMEWORK_ENTRIES) {
    if (hasAnyDependency(allDeps, deps)) {
      detected.push(...frameworks)

      if (runtime !== undefined) setRuntime(runtime)
    }
  }

  if (isReactStandalone(allDeps)) {
    detected.push('react')

    setRuntime(Runtime.Browser)
  }

  if (allDeps.hono && hasAnyDependency(allDeps, CLOUDFLARE_DEPS)) {
    setRuntime(Runtime.Cloudflare)
  }

  if (isViteStandalone(allDeps, detected)) {
    detected.push('vite')

    setRuntime(Runtime.Browser)
  }

  if (detected.length === 0 && hasCloudflareSignal(allDeps, detectRootDir)) {
    setRuntime(Runtime.Cloudflare)
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

const detectTypescript = (detectRootDir: string): boolean => [
  'tsconfig.json',
  'tsconfig.base.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'tsconfig.eslint.json'
].some(fileName => pathExists(join(detectRootDir, fileName)))

const LIBRARY_DEP_MAPPINGS: [string[], Library][] = [
  [['ai', '@ai-sdk/anthropic', '@ai-sdk/azure', '@ai-sdk/google', '@ai-sdk/openai', '@ai-sdk/react', '@ai-sdk/vue', '@ai-sdk/svelte'], Library.AiSdk],
  [['@modelcontextprotocol/sdk'], Library.Mcp],
  [['@mastra/core'], Library.Mastra],
  [['@openai/agents'], Library.OpenAiAgents],
  [['@google/genai'], Library.GoogleGenAi],
  [['@microsoft/autogen', '@microsoft/autogen-core'], Library.Autogen],
  [['langchain', '@langchain/core'], Library.Langchain],
  [['llamaindex', '@llamaindex/core'], Library.LlamaIndex],
  [['typeorm'], Library.Typeorm],
  [['prisma', '@prisma/client'], Library.Prisma],
  [['drizzle-orm'], Library.Drizzle],
  [['@mikro-orm/core'], Library.MikroOrm],
  [['sequelize', '@sequelize/core'], Library.Sequelize],
  [['tailwindcss', '@tailwindcss/postcss', '@tailwindcss/vite', '@tailwindcss/typography', '@iconify/tailwind4'], Library.Tailwind],
  [['i18next'], Library.I18next],
  [['@stencil/core'], Library.Stencil],
  [['storybook', '@storybook/react', '@storybook/core', '@storybook/nextjs', '@storybook/vue3', '@storybook/svelte', '@storybook/angular', '@storybook/experimental-nextjs-vite'], Library.Storybook],
  [['@tanstack/react-query', '@tanstack/vue-query', '@tanstack/svelte-query', '@tanstack/angular-query', '@tanstack/eslint-plugin-query'], Library.TanstackQuery],
  [['@tanstack/react-router', '@tanstack/vue-router', '@tanstack/eslint-plugin-router'], Library.TanstackRouter],
  [['turbo', 'eslint-plugin-turbo'], Library.Turbo],
  [['zod', 'eslint-plugin-zod'], Library.Zod],
]

const detectLibraries = (allDeps: DependencyMap): Library[] => dedupe(
  LIBRARY_DEP_MAPPINGS
    .filter(([deps]) => hasAnyDependency(allDeps, deps))
    .map(([, library]) => library)
)

const TESTING_DEP_MAPPINGS: [string[], Testing][] = [
  [['vitest'], Testing.Vitest],
  [['playwright', '@playwright/test'], Testing.Playwright],
  [['jest', '@jest/core', 'jest-circus'], Testing.Jest],
  [['@testing-library/jest-dom', 'eslint-plugin-jest-dom'], Testing.JestDom],
  [['cypress'], Testing.Cypress],
  [['@testing-library/react', '@testing-library/vue', '@testing-library/angular', '@testing-library/svelte', '@testing-library/user-event', '@testing-library/jest-dom', '@testing-library/dom'], Testing.TestingLibrary],
]

const detectTesting = (allDeps: DependencyMap): Testing[] => dedupe(
  TESTING_DEP_MAPPINGS
    .filter(([deps]) => hasAnyDependency(allDeps, deps))
    .map(([, testing]) => testing)
)

const detectExtensions = (allDeps: DependencyMap): Extension[] => {
  const extensions: Extension[] = []

  if (allDeps['eslint-plugin-no-only-tests']) extensions.push(Extension.NoOnlyTests)

  return extensions
}

const GRAPHQL_DEPS = ['graphql', '@apollo/client', 'relay-runtime', 'urql', 'graphql-tag', '@graphql-typed-document-node/core']
const MDX_DEPS = ['@mdx-js/react', '@mdx-js/mdx', '@astrojs/mdx']
const MARKDOWN_DEPS = ['markdown', 'react-markdown', 'remark-gfm', 'markdownlint-cli2']
const YAML_SIGNALS = ['pnpm-workspace.yaml', 'cspell.config.yaml', 'cspell.config.yml', '.github/workflows']

const hasGraphqlSignal = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, GRAPHQL_DEPS) ||
  ['schema.graphql', 'schema.gql'].some(f => pathExists(join(detectRootDir, f)))

const hasMdxSignal = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, MDX_DEPS) ||
  hasFileMatching(detectRootDir, f => f.endsWith('.mdx'))

const hasMarkdownSignal = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, MARKDOWN_DEPS) ||
  ['.markdownlint.json', '.markdownlint.yaml'].some(f => pathExists(join(detectRootDir, f))) ||
  hasFileMatching(detectRootDir, f => f.endsWith('.md'))

const hasJsoncSignal = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['eslint-plugin-jsonc']) ||
  hasFileMatching(detectRootDir, f => f.endsWith('.jsonc'))

const hasYamlSignal = (detectRootDir: string): boolean =>
  YAML_SIGNALS.some(f => pathExists(join(detectRootDir, f)))

const hasTomlSignal = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['eslint-plugin-toml']) ||
  hasFileMatching(detectRootDir, f => f.endsWith('.toml'))

const detectFormats = (allDeps: DependencyMap, detectRootDir: string): Format[] => {
  const formats: Format[] = []

  if (hasGraphqlSignal(allDeps, detectRootDir)) formats.push(Format.Graphql)

  if (hasMdxSignal(allDeps, detectRootDir)) formats.push(Format.Mdx)

  if (hasMarkdownSignal(allDeps, detectRootDir)) formats.push(Format.Markdown)

  if (hasJsoncSignal(allDeps, detectRootDir)) formats.push(Format.Jsonc)

  if (allDeps['eslint-plugin-package-json']) formats.push(Format.PackageJson)

  if (hasYamlSignal(detectRootDir)) formats.push(Format.Yaml)

  if (hasTomlSignal(allDeps, detectRootDir)) formats.push(Format.Toml)

  return dedupe(formats)
}

const PRETTIER_CONFIGS = ['.prettierrc', '.prettierrc.json', '.prettierrc.yaml', '.prettierrc.yml', '.prettierrc.js', '.prettierrc.cjs', 'prettier.config.js', 'prettier.config.cjs', 'prettier.config.mjs']
const CSPELL_CONFIGS = ['cspell.config.yaml', 'cspell.config.yml', 'cspell.config.json']
const JSDOC_CONFIGS = ['jsdoc.json', 'jsdoc.config.js', 'jsdoc.config.cjs', 'jsdoc.config.mjs']

const hasPrettierConfig = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['prettier', 'prettier-plugin-astro', 'prettier-plugin-tailwindcss']) ||
  PRETTIER_CONFIGS.some(f => pathExists(join(detectRootDir, f)))

const hasCspellConfig = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['@cspell/eslint-plugin']) ||
  CSPELL_CONFIGS.some(f => pathExists(join(detectRootDir, f)))

const hasJsdocConfig = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['jsdoc', 'eslint-plugin-jsdoc']) ||
  JSDOC_CONFIGS.some(f => pathExists(join(detectRootDir, f)))

const hasNxConfig = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['nx', '@nx/js', '@nx/eslint', '@nrwl/workspace']) ||
  pathExists(join(detectRootDir, 'nx.json'))

const hasDockerConfig = (detectRootDir: string): boolean =>
  pathExists(join(detectRootDir, 'Dockerfile')) ||
  pathExists(join(detectRootDir, 'docker-compose.yml')) ||
  pathExists(join(detectRootDir, 'docker-compose.yaml')) ||
  hasFileMatching(detectRootDir, f => f === 'Dockerfile' || f.startsWith('Dockerfile.'))

const hasPnpmConfig = (allDeps: DependencyMap, detectRootDir: string): boolean =>
  hasAnyDependency(allDeps, ['eslint-plugin-pnpm']) ||
  pathExists(join(detectRootDir, 'pnpm-workspace.yaml'))

const detectTools = (allDeps: DependencyMap, detectRootDir: string): Tool[] => {
  const tools: Tool[] = []

  if (allDeps['@nestjs/swagger']) tools.push(Tool.Swagger)

  if (allDeps['eslint-plugin-command']) tools.push(Tool.Command)

  if (hasPrettierConfig(allDeps, detectRootDir)) tools.push(Tool.Prettier)

  if (hasCspellConfig(allDeps, detectRootDir)) tools.push(Tool.Cspell)

  if (hasJsdocConfig(allDeps, detectRootDir)) tools.push(Tool.Jsdoc)

  if (hasNxConfig(allDeps, detectRootDir)) tools.push(Tool.Nx)

  if (hasDockerConfig(detectRootDir)) tools.push(Tool.Docker)

  if (pathExists(join(detectRootDir, '.github/workflows'))) tools.push(Tool.GithubActions)

  if (hasPnpmConfig(allDeps, detectRootDir)) tools.push(Tool.Pnpm)

  return dedupe(tools)
}

const getWorkspacePatterns = (pkg: PackageJson): string[] => {
  if (Array.isArray(pkg.workspaces)) return pkg.workspaces

  return pkg.workspaces?.packages ?? []
}

const parsePnpmWorkspacePatterns = (detectRootDir: string): string[] => {
  const yamlPath = join(detectRootDir, 'pnpm-workspace.yaml')

  if (!pathExists(yamlPath)) return []

  try {
     
    const content = readFileSync(yamlPath, 'utf-8')
    const patterns: string[] = []
    let inPackages = false

    for (const line of content.split('\n')) {
      if (/^packages\s*:/.test(line)) { inPackages = true;

 continue }

      if (inPackages) {
        if (/^[a-zA-Z]/.test(line)) break

        const match = /^\s*-\s+['"]?([^'"#\s]+)['"]?/.exec(line)

        if (match?.[1]) patterns.push(match[1])
      }
    }

    return patterns
  } catch {
    return []
  }
}

const hasWorkspaceSignal = (pkg: PackageJson, detectRootDir: string): boolean => (
  getWorkspacePatterns(pkg).length > 0 ||
  pathExists(join(detectRootDir, 'pnpm-workspace.yaml')) ||
  pathExists(join(detectRootDir, 'turbo.json')) ||
  pathExists(join(detectRootDir, 'nx.json'))
)

const getWorkspaceBaseDirs = (pkg: PackageJson, detectRootDir: string): string[] => {
  const bases = [
    ...getWorkspacePatterns(pkg),
    ...parsePnpmWorkspacePatterns(detectRootDir)
  ]
    .map(pattern => pattern.replace(/^\.\//, '').split('*')[0]?.replace(/\/$/, ''))
    .filter((pattern): pattern is string => Boolean(pattern) && !pattern.startsWith('!'))

  if (bases.length > 0) return dedupe(bases)

  return ['apps', 'packages', 'workers', 'examples'].filter(base => pathExists(join(detectRootDir, base)))
}

const detectProjects = (pkg: PackageJson, detectRootDir: string): NonNullable<EslintConfigOptions['projects']> => {
  if (!hasWorkspaceSignal(pkg, detectRootDir)) return {}

  const projects: NonNullable<EslintConfigOptions['projects']> = {}

  for (const baseDir of getWorkspaceBaseDirs(pkg, detectRootDir)) {
    const fullBaseDir = join(detectRootDir, baseDir)

    try {
      for (const entry of readdirSync(fullBaseDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue

        const projectPath = `${baseDir}/${entry.name}`

        if (pathExists(join(detectRootDir, projectPath, 'package.json'))) {
          // eslint-disable-next-line security/detect-object-injection
          projects[projectPath] = {}
        }
      }
    } catch {
      // Missing or unreadable workspace folders are ignored; detection stays best-effort.
    }
  }

  return projects
}

const resolvePreset = (options: EslintConfigOptions): Preset => {
  if (!options.typescript) {
    return Preset.Basic
  }

  if (options.runtime === Runtime.Node || options.runtime === Runtime.Bun || options.runtime === Runtime.Deno) {
    return Preset.Node
  }

  if (options.runtime === Runtime.Browser) {
    return Preset.Browser
  }

  if (options.runtime === Runtime.Worker || options.runtime === Runtime.Cloudflare) {
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
  detectExtensions,
  detectFormats,
  detectFrameworks,
  detectLibraries,
  detectNextMode,
  detectProjects,
  detectRuntime,
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

    options.detectedFrameworks = detectFrameworks(allDeps, detectRootDir, setRuntime)

    detectRuntime(allDeps, detectRootDir, options.detectedFrameworks, setRuntime)

    options.nextMode = detectNextMode(allDeps, detectRootDir)

    options.typescript = detectTypescript(detectRootDir)

    options.libraries = detectLibraries(allDeps)

    options.testing = detectTesting(allDeps)

    options.formats = dedupe([...(options.formats ?? []), ...detectFormats(allDeps, detectRootDir)])

    options.tools = dedupe([...(options.tools ?? []), ...detectTools(allDeps, detectRootDir)])

    options.projects = detectProjects(pkg, detectRootDir)

    options.extensions = dedupe([...(options.extensions ?? []), ...detectExtensions(allDeps)])

    options.preset = resolvePreset(options)

    return options
  } catch (error) {
    if (process.env.ESLINT_BASIC_DEBUG) {
      process.stderr.write(`[ESLint Basic] Failed to detect project options from package.json: ${String(error)}\n`)
    }

    return options
  }
}
