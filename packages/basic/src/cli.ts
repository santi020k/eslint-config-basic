import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { handleGenerateSkill } from './agent-skill-generator.js'
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

const createConfigContent = (cwd: string): { configPath: string, configContent: string } => {
  const options = detectProjectOptions(cwd)
  const frameworkKeys = getFrameworkKeys(options.detectedFrameworks)
  const imports: string[] = ['import { eslintConfig } from \'@santi020k/eslint-config-basic\'']

  const configContent = `${imports.join('\n')}

export default eslintConfig({
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
    configPath: resolveConfigPath(cwd),
    configContent
  }
}

const formatList = (values: unknown[] | undefined): string => {
  if (!values?.length) return 'none'

  return values.join(', ')
}

const getProjectSummary = (cwd: string) => {
  const options = detectProjectOptions(cwd)

  return {
    typescript: Boolean(options.typescript),
    preset: options.preset ?? 'basic',
    runtime: options.runtime ?? 'universal',
    nextMode: options.nextMode ?? 'n/a',
    frameworks: getFrameworkKeys(options.detectedFrameworks),
    libraries: options.libraries ?? [],
    testing: options.testing ?? [],
    formats: options.formats ?? [],
    tools: options.tools ?? [],
    extensions: options.extensions ?? []
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
    'export default eslintConfig()',
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
    '  docs            Generate ESLINT_STANDARDS.md from detection',
    '  migrate         Report v1-to-v2 migration suggestions',
    '  generate-skill  Generate AI agent standards files',
    '',
    'Options:',
    '  --force         Overwrite existing generated skill sections/files',
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

  const { configPath, configContent } = createConfigContent(cwd)

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

export const handleDocs = (cwd: string = process.cwd()) => {
  const outputPath = join(cwd, 'ESLINT_STANDARDS.md')

  writeFileSync(outputPath, createStandardsContent(cwd))

  console.log('✅ Generated ESLINT_STANDARDS.md')
}

export const handleMigrate = (cwd: string = process.cwd()) => {
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
  }

  console.log(suggestions.join('\n'))
}

export const runCli = (argv: string[] = process.argv, cwd: string = process.cwd()) => {
  const command = argv[2]
  const hasForce = argv.includes('--force')
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

  if (command === 'init') {
    handleInit(cwd)
  } else if (command === 'update') {
    handleUpdate(cwd)
  } else if (command === 'explain') {
    handleExplain(cwd)
  } else if (command === 'docs') {
    handleDocs(cwd)
  } else if (command === 'migrate') {
    handleMigrate(cwd)
  } else if (command === 'generate-skill') {
    handleGenerateSkill(cwd, hasForce).catch((err: unknown) => {
      console.error('❌ Failed to generate skill files:', err)

      process.exitCode = 1
    })
  } else {
    console.error(`Unknown command: ${command}`)

    printUsage()

    process.exitCode = 1
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
