import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { analyzeEslintConfig, handleGenerateSkill } from './agent-skill-generator.js'
import { detectProjectOptions } from './index.js'

const getDefaultConfigFilename = (cwd: string): string => {
  const packageJsonPath = join(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) return 'eslint.config.mjs'

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { type?: string }

    return packageJson.type === 'module' ? 'eslint.config.js' : 'eslint.config.mjs'
  } catch {
    return 'eslint.config.mjs'
  }
}

const resolveConfigPath = (cwd: string): string => {
  const existingConfigPath = [
    'eslint.config.js',
    'eslint.config.mjs'
  ].map(filename => join(cwd, filename)).find(p => existsSync(p))

  return existingConfigPath ?? join(cwd, getDefaultConfigFilename(cwd))
}

const getFrameworkKeys = (detectedFrameworks?: string[]): string[] => {
  const frameworkKeys = new Set(detectedFrameworks ?? [])

  if (frameworkKeys.has('next') || frameworkKeys.has('expo')) {
    frameworkKeys.add('react')
  }

  return [...frameworkKeys].sort()
}

const FRAMEWORK_PACKAGE_TO_KEY: Record<string, string> = {
  '@santi020k/eslint-config-angular': 'angular',
  '@santi020k/eslint-config-astro': 'astro',
  '@santi020k/eslint-config-expo': 'expo',
  '@santi020k/eslint-config-hono': 'hono',
  '@santi020k/eslint-config-nest': 'nest',
  '@santi020k/eslint-config-next': 'next',
  '@santi020k/eslint-config-qwik': 'qwik',
  '@santi020k/eslint-config-react': 'react',
  '@santi020k/eslint-config-remix': 'remix',
  '@santi020k/eslint-config-slidev': 'slidev',
  '@santi020k/eslint-config-solid': 'solid',
  '@santi020k/eslint-config-svelte': 'svelte',
  '@santi020k/eslint-config-vite': 'vite',
  '@santi020k/eslint-config-vue': 'vue'
}

const getConfigPathIfPresent = (cwd: string): null | string => {
  const configPath = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs'
  ].map(filename => join(cwd, filename)).find(p => existsSync(p))

  return configPath ?? null
}

const readPackageJson = (cwd: string): null | Record<string, unknown> => {
  const packageJsonPath = join(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) return null

  try {
    return JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as Record<string, unknown>
  } catch {
    return null
  }
}

const detectPackageManager = (cwd: string): string => {
  if (existsSync(join(cwd, 'pnpm-lock.yaml')) || existsSync(join(cwd, 'pnpm-workspace.yaml'))) return 'pnpm'

  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'

  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'

  return 'npm'
}

const hasLintScript = (cwd: string): boolean => {
  const packageJson = readPackageJson(cwd) as null | { scripts?: Record<string, string> }

  return Boolean(packageJson?.scripts?.lint)
}

const getWorkspacePatternsFromPackageJson = (packageJson: null | Record<string, unknown>): string[] => {
  const workspaces = packageJson?.workspaces

  if (Array.isArray(workspaces)) {
    return workspaces.filter((value): value is string => typeof value === 'string')
  }

  if (workspaces && typeof workspaces === 'object' && Array.isArray((workspaces as { packages?: unknown }).packages)) {
    return (workspaces as { packages: unknown[] }).packages.filter((value): value is string => typeof value === 'string')
  }

  return []
}

const getWorkspacePatternsFromPnpm = (cwd: string): string[] => {
  const workspacePath = join(cwd, 'pnpm-workspace.yaml')

  if (!existsSync(workspacePath)) return []

  const content = readFileSync(workspacePath, 'utf8')
  const patterns: string[] = []
  let inPackages = false

  for (const line of content.split(/\r?\n/)) {
    if (/^packages:\s*$/.test(line)) {
      inPackages = true

      continue
    }

    if (inPackages && /^\S/.test(line)) break

    const match = inPackages ? /^\s*-\s*['"]?([^'"]+)['"]?\s*$/.exec(line) : null

    if (match?.[1] && !match[1].startsWith('!')) patterns.push(match[1])
  }

  return patterns
}

const expandWorkspacePattern = (cwd: string, pattern: string): string[] => {
  const normalized = pattern.replace(/\/$/, '')

  if (!normalized.endsWith('/*')) return []

  const base = normalized.slice(0, -2)
  const basePath = join(cwd, base)

  if (!existsSync(basePath)) return []

  return readdirSync(basePath, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => `${base}/${entry.name}`)
    .filter(projectPath => existsSync(join(cwd, projectPath, 'package.json')))
}

const detectWorkspaceProjects = (cwd: string): string[] => {
  const patterns = [
    ...getWorkspacePatternsFromPackageJson(readPackageJson(cwd)),
    ...getWorkspacePatternsFromPnpm(cwd)
  ]

  return [...new Set(patterns.flatMap(pattern => expandWorkspacePattern(cwd, pattern)))].sort()
}

const createConfigContent = (cwd: string): { configContent: string, configPath: string } => {
  const options = detectProjectOptions(cwd)
  const frameworkKeys = getFrameworkKeys(options.detectedFrameworks)
  const imports: string[] = ['import { eslintConfig } from \'@santi020k/eslint-config-basic\'']

  const configContent = `${imports.join('\n')}

export default await eslintConfig({
  typescript: ${JSON.stringify(options.typescript ?? false)},
  frameworks: {
    ${frameworkKeys.map(key => `${key}: true`).join(',\n    ')}
  },
  libraries: ${JSON.stringify(options.libraries ?? [], null, 2)},
  testing: ${JSON.stringify(options.testing ?? [], null, 2)},
  formats: ${JSON.stringify(options.formats ?? [], null, 2)},
  tools: ${JSON.stringify(options.tools ?? [], null, 2)},
  extensions: ${JSON.stringify(options.extensions ?? [], null, 2)},
  runtime: ${JSON.stringify(options.runtime ?? 'universal')},
  settings: ${JSON.stringify(options.settings ?? [], null, 2)}
})
`

  return {
    configContent,
    configPath: resolveConfigPath(cwd)
  }
}

const formatList = (values: undefined | unknown[]): string => {
  if (!values?.length) return 'none'

  return values.join(', ')
}

const getProjectSummary = (cwd: string) => {
  const options = detectProjectOptions(cwd)
  const workspaceProjects = detectWorkspaceProjects(cwd)

  return {
    extensions: options.extensions ?? [],
    formats: options.formats ?? [],
    frameworks: getFrameworkKeys(options.detectedFrameworks),
    libraries: options.libraries ?? [],
    nextMode: options.nextMode ?? 'n/a',
    preset: options.preset ?? 'basic',
    runtime: options.runtime ?? 'universal',
    testing: options.testing ?? [],
    tools: options.tools ?? [],
    typescript: Boolean(options.typescript),
    workspaceProjects
  }
}

const createStandardsContent = (cwd: string): string => {
  const summary = getProjectSummary(cwd)

  return [
    '# ESLint Standards',
    '',
    'This document was generated from the active project dependencies detected by `@santi020k/eslint-config-basic`.',
    '',
    '## Active Profile',
    '',
    `- TypeScript: ${summary.typescript ? 'enabled' : 'disabled'}`,
    `- Preset: ${summary.preset}`,
    `- Runtime: ${summary.runtime}`,
    `- Next.js mode: ${summary.nextMode}`,
    `- Frameworks: ${formatList(summary.frameworks)}`,
    `- Libraries: ${formatList(summary.libraries)}`,
    `- Testing: ${formatList(summary.testing)}`,
    `- Formats: ${formatList(summary.formats)}`,
    `- Tools: ${formatList(summary.tools)}`,
    `- Extensions: ${formatList(summary.extensions)}`,
    '',
    '## Recommended Config',
    '',
    '```js',
    'import { eslintConfig } from \'@santi020k/eslint-config-basic\'',
    '',
    'export default await eslintConfig()',
    '```',
    '',
    'Use `basic-eslint explain` when you want to inspect what the zero-config setup detects.'
  ].join('\n')
}

const getCliVersion = (): string => {
  const cliDir = dirname(fileURLToPath(import.meta.url))
  const packageJsonPath = join(cliDir, '..', 'package.json')

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { version?: string }

    return packageJson.version ?? 'unknown'
  } catch {
    return 'unknown'
  }
}

const printUsage = () => {
  console.log([
    'Usage: basic-eslint <command> [options]',
    '',
    'Commands:',
    '  init            Create eslint.config.js/mjs if missing',
    '  update          Regenerate eslint.config.js/mjs from detection',
    '  explain         Print detected v2 config inputs',
    '  inspect         Print detected inputs and active config features',
    '  doctor          Check project setup for common v2 adoption issues',
    '  docs            Generate ESLINT_STANDARDS.md from detection',
    '  migrate         Report v1-to-v2 migration suggestions',
    '  generate-skill  Generate AI agent standards files',
    '',
    'Options:',
    '  --force         Overwrite existing generated skill sections/files',
    '  --check         generate-skill: verify skill files are up to date (CI mode, exits 1 when stale)',
    '  --create        generate-skill: scaffold a root AGENTS.md when missing',
    '  --json          Print JSON for commands that support it',
    '  --write         Apply safe migrations for commands that support it',
    '  --help, -h      Show this help message',
    '  --version, -v   Show CLI version'
  ].join('\n'))
}

export const handleInit = (cwd: string = process.cwd()) => {
  const configPath = resolveConfigPath(cwd)

  if (existsSync(configPath)) {
    console.warn(`⚠️  ${basename(configPath)} already exists. Skipping...`)

    return
  }

  console.log('🔍 Detecting project settings...')

  const { configContent } = createConfigContent(cwd)

  writeFileSync(configPath, configContent)

  console.log(`✅ Created ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

export const handleUpdate = (cwd: string = process.cwd()) => {
  console.log('🔍 Detecting project settings...')

  const { configContent, configPath } = createConfigContent(cwd)

  writeFileSync(configPath, configContent)

  console.log(`✅ Updated ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

export const handleExplain = (cwd: string = process.cwd()) => {
  const summary = getProjectSummary(cwd)

  console.log([
    'ESLint Basic detected configuration:',
    `- TypeScript: ${summary.typescript ? 'enabled' : 'disabled'}`,
    `- Preset: ${summary.preset}`,
    `- Runtime: ${summary.runtime}`,
    `- Next.js mode: ${summary.nextMode}`,
    `- Frameworks: ${formatList(summary.frameworks)}`,
    `- Libraries: ${formatList(summary.libraries)}`,
    `- Testing: ${formatList(summary.testing)}`,
    `- Formats: ${formatList(summary.formats)}`,
    `- Tools: ${formatList(summary.tools)}`,
    `- Extensions: ${formatList(summary.extensions)}`
  ].join('\n'))
}

export const handleInspect = async (cwd: string = process.cwd(), json = false) => {
  const summary = getProjectSummary(cwd)
  const activeConfig = await analyzeEslintConfig(cwd)

  const payload = {
    activeConfig,
    detected: summary,
    packageManager: detectPackageManager(cwd)
  }

  if (json) {
    console.log(JSON.stringify(payload, null, 2))

    return
  }

  console.log([
    'ESLint Basic inspection:',
    `- Package manager: ${payload.packageManager}`,
    `- Config source: ${activeConfig?.source ?? 'not found'}`,
    `- Config file: ${activeConfig?.configFile ?? 'none'}`,
    `- TypeScript: ${summary.typescript ? 'enabled' : 'disabled'}`,
    `- Preset: ${summary.preset}`,
    `- Runtime: ${summary.runtime}`,
    `- Frameworks: ${formatList(summary.frameworks)}`,
    `- Libraries: ${formatList(summary.libraries)}`,
    `- Testing: ${formatList(summary.testing)}`,
    `- Formats: ${formatList(summary.formats)}`,
    `- Tools: ${formatList(summary.tools)}`,
    `- Extensions: ${formatList(summary.extensions)}`,
    `- Workspace projects: ${formatList(summary.workspaceProjects)}`
  ].join('\n'))
}

interface DuplicateEslintInfo {
  configVersion: string
  projectVersion: string
}

/**
 * Detects whether the project and the config packages resolve two different
 * physical copies of ESLint (e.g. an ESLint 9 project pulling in the config's
 * ESLint 10 dependency). Both major versions are supported, but two parallel
 * copies can apply subtly different rule behavior between editor and CLI.
 */
export const findDuplicateEslint = (cwd: string = process.cwd()): DuplicateEslintInfo | null => {
  try {
    const projectRequire = createRequire(join(cwd, 'package.json'))
    const projectEslintPkgPath = projectRequire.resolve('eslint/package.json')
    const corePkgPath = projectRequire.resolve('@santi020k/eslint-config-core/package.json')
    const coreRequire = createRequire(corePkgPath)
    const coreEslintPkgPath = coreRequire.resolve('eslint/package.json')

    if (projectEslintPkgPath === coreEslintPkgPath) return null

    const projectVersion = (JSON.parse(readFileSync(projectEslintPkgPath, 'utf8')) as { version?: string }).version ?? 'unknown'
    const configVersion = (JSON.parse(readFileSync(coreEslintPkgPath, 'utf8')) as { version?: string }).version ?? 'unknown'

    if (projectVersion === configVersion) return null

    return { configVersion, projectVersion }
  } catch {
    return null
  }
}

export const handleDoctor = async (cwd: string = process.cwd()) => {
  const issues: string[] = []
  const warnings: string[] = []
  const configPath = getConfigPathIfPresent(cwd)
  const summary = getProjectSummary(cwd)
  const activeConfig = await analyzeEslintConfig(cwd)

  if (!readPackageJson(cwd)) {
    issues.push('package.json is missing or invalid.')
  }

  if (!configPath) {
    warnings.push('No eslint.config.js/mjs/cjs file found. Run `basic-eslint init` to create one.')
  } else if (!activeConfig) {
    issues.push(`${basename(configPath)} could not be loaded. Run ESLint directly to see the import error.`)
  }

  if (!hasLintScript(cwd)) {
    warnings.push('No `lint` script found in package.json.')
  }

  if (configPath) {
    const configContent = readFileSync(configPath, 'utf8')

    if (Object.keys(FRAMEWORK_PACKAGE_TO_KEY).some(packageName => configContent.includes(packageName))) {
      warnings.push('Config still imports v1 framework packages. Run `basic-eslint migrate --write` or switch to framework booleans.')
    }

    if (summary.workspaceProjects.length > 0 && !configContent.includes('projects:')) {
      warnings.push('Workspace packages were detected, but the root config does not use `projects` scoping.')
    }
  }

  const duplicateEslint = findDuplicateEslint(cwd)

  if (duplicateEslint) {
    warnings.push(
      `Two ESLint copies are installed: the project resolves ${duplicateEslint.projectVersion} while the config packages resolve ${duplicateEslint.configVersion}. ` +
      'Both ESLint 9 and 10 are supported, but parallel copies can apply different rule behavior between your editor and CLI. ' +
      'Align the project\'s eslint version with the config\'s (or dedupe via your package manager).'
    )
  }

  let status = 'passed'

  if (issues.length > 0) {
    status = 'failed'
  } else if (warnings.length > 0) {
    status = 'passed with warnings'
  }

  console.log([
    `ESLint Basic doctor: ${status}`,
    `- Package manager: ${detectPackageManager(cwd)}`,
    `- Config file: ${configPath ? basename(configPath) : 'none'}`,
    `- Workspace projects: ${formatList(summary.workspaceProjects)}`,
    ...(issues.length > 0 ? ['', 'Issues:', ...issues.map(issue => `- ${issue}`)] : []),
    ...(warnings.length > 0 ? ['', 'Warnings:', ...warnings.map(warning => `- ${warning}`)] : [])
  ].join('\n'))

  if (issues.length > 0) process.exitCode = 1
}

export const handleDocs = (cwd: string = process.cwd()) => {
  const outputPath = join(cwd, 'ESLINT_STANDARDS.md')

  writeFileSync(outputPath, createStandardsContent(cwd))

  console.log('✅ Generated ESLINT_STANDARDS.md')
}

const migrateConfigContent = (content: string): { changed: boolean, content: string, frameworks: string[] } => {
  const importedFrameworks = Object.entries(FRAMEWORK_PACKAGE_TO_KEY)
    .filter(([packageName]) => content.includes(packageName))
    .map(([, framework]) => framework)

  if (importedFrameworks.length === 0) {
    return { changed: false, content, frameworks: [] }
  }

  const frameworks = getFrameworkKeys(importedFrameworks)

  const migrated = [
    'import { eslintConfig } from \'@santi020k/eslint-config-basic\'',
    '',
    'export default await eslintConfig({',
    '  frameworks: {',
    `    ${frameworks.map(key => `${key}: true`).join(',\n    ')}`,
    '  }',
    '})',
    ''
  ].join('\n')

  return { changed: true, content: migrated, frameworks }
}

export const handleMigrate = (cwd: string = process.cwd(), write = false) => {
  const configPath = resolveConfigPath(cwd)

  const suggestions = [
    'v1 to v2 migration suggestions:',
    '- Install only @santi020k/eslint-config-basic for the public config API.',
    '- Replace framework imports with bundled booleans such as frameworks: { react: true, next: true }.',
    '- Remove app-level @santi020k/eslint-config-react/next/vue/etc. config package imports.',
    '- Try eslintConfig() first; v2 auto-detects supported frameworks and integrations.',
    '- Use basic-eslint explain to review what v2 detects before committing the migration.'
  ]

  if (existsSync(configPath)) {
    const configContent = readFileSync(configPath, 'utf8')

    if (configContent.includes('@santi020k/eslint-config-') && !configContent.includes('frameworks:')) {
      suggestions.push('- This config appears to import v1 framework packages; replace those imports with framework booleans.')
    }

    if (write) {
      const result = migrateConfigContent(configContent)

      if (result.changed) {
        writeFileSync(configPath, result.content)

        suggestions.push(`- Rewrote ${basename(configPath)} with v2 framework booleans: ${result.frameworks.join(', ')}.`)
      } else {
        suggestions.push('- No v1 framework imports were found to rewrite.')
      }
    }
  } else if (write) {
    suggestions.push('- No ESLint config file was found to rewrite.')
  }

  console.log(suggestions.join('\n'))
}

export const runCli = (argv: string[] = process.argv, cwd: string = process.cwd()) => {
  const command = argv[2]
  const hasForce = argv.includes('--force')
  const hasCheck = argv.includes('--check')
  const hasCreate = argv.includes('--create')
  const hasJson = argv.includes('--json')
  const hasWrite = argv.includes('--write')
  const isHelp = command === '--help' || command === '-h'
  const isVersion = command === '--version' || command === '-v'

  if (!command || isHelp) {
    printUsage()

    return
  }

  if (isVersion) {
    console.log(getCliVersion())

    return
  }

  switch (command) {
    case 'docs': {
      handleDocs(cwd)

      break
    }

    case 'doctor': {
      handleDoctor(cwd).catch((error: unknown) => {
        console.error('❌ Failed to run doctor:', error)

        process.exitCode = 1
      })

      break
    }

    case 'explain': {
      handleExplain(cwd)

      break
    }

    case 'generate-skill': {
      handleGenerateSkill(cwd, hasForce, { check: hasCheck, createAgentsMd: hasCreate }).catch((error: unknown) => {
        console.error('❌ Failed to generate skill files:', error)

        process.exitCode = 1
      })

      break
    }

    case 'init': {
      handleInit(cwd)

      break
    }

    case 'inspect': {
      handleInspect(cwd, hasJson).catch((error: unknown) => {
        console.error('❌ Failed to inspect project:', error)

        process.exitCode = 1
      })

      break
    }

    case 'migrate': {
      handleMigrate(cwd, hasWrite)

      break
    }

    case 'update': {
      handleUpdate(cwd)

      break
    }

    default: {
      console.error(`Unknown command: ${command}`)

      printUsage()

      process.exitCode = 1
    }
  }
}

// Only run if this is the entry point
if (process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('cli.js') ||
  process.argv[1].endsWith('cli.ts')
)) {
  runCli()
}
