import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { handleGenerateSkill } from './agent-skill-generator.js'
import { detectProjectOptions } from './index.js'

const getDefaultConfigFilename = (cwd: string): string => {
  const packageJsonPath = join(cwd, 'package.json')

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!existsSync(packageJsonPath)) return 'eslint.config.mjs'

  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
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
    // eslint-disable-next-line security/detect-non-literal-fs-filename
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

export const handleInit = (cwd: string = process.cwd()) => {
  const configPath = resolveConfigPath(cwd)

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (existsSync(configPath)) {
    console.warn(`⚠️  ${basename(configPath)} already exists. Skipping...`)

    return
  }

  console.log('🔍 Detecting project settings...')

  const { configContent } = createConfigContent(cwd)

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  writeFileSync(configPath, configContent)

  console.log(`✅ Created ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

export const handleUpdate = (cwd: string = process.cwd()) => {
  console.log('🔍 Detecting project settings...')

  const { configPath, configContent } = createConfigContent(cwd)

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  writeFileSync(configPath, configContent)

  console.log(`✅ Updated ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

const run = () => {
  const command = process.argv[2]
  const hasForce = process.argv.includes('--force')

  if (command === 'init') {
    handleInit()
  } else if (command === 'update') {
    handleUpdate()
  } else if (command === 'generate-skill') {
    handleGenerateSkill(process.cwd(), hasForce).catch((err: unknown) => {
      console.error('❌ Failed to generate skill files:', err)

      process.exitCode = 1
    })
  } else {
    console.log('Usage: basic-eslint <init|update|generate-skill> [--force]')
  }
}

// Only run if this is the entry point
if (process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('cli.js') ||
  process.argv[1].endsWith('cli.ts')
)) {
  run()
}
