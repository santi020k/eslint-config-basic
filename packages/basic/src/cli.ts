#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

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
  ].map(filename => join(cwd, filename)).find(existsSync)

  return existingConfigPath ?? join(cwd, getDefaultConfigFilename(cwd))
}

const getFrameworkKeys = (frameworks?: Record<string, unknown>): string[] => {
  const frameworkKeys = new Set(Object.keys(frameworks ?? {}))

  if (frameworkKeys.has('next') || frameworkKeys.has('expo')) {
    frameworkKeys.add('react')
  }

  return [...frameworkKeys]
}

const createConfigContent = (cwd: string): { configPath: string, configContent: string } => {
  const options = detectProjectOptions(cwd)
  const frameworkKeys = getFrameworkKeys(options.frameworks)
  const imports: string[] = ['import { eslintConfig } from \'@santi020k/eslint-config-basic\'']

  frameworkKeys.forEach(key => {
    imports.push(`import ${key} from '@santi020k/eslint-config-${key}'`)
  })

  const configContent = `${imports.join('\n')}

export default eslintConfig({
  typescript: ${JSON.stringify(options.typescript ?? false)},
  frameworks: {
    ${frameworkKeys.map(key => `${key}: ${key}`).join(',\n    ')}
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

const init = () => {
  const cwd = process.cwd()
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

const update = () => {
  const cwd = process.cwd()

  console.log('🔍 Detecting project settings...')

  const { configPath, configContent } = createConfigContent(cwd)

  writeFileSync(configPath, configContent)

  console.log(`✅ Updated ${basename(configPath)} with auto-detected settings!`)

  console.log('🚀 Ready to lint!')
}

const command = process.argv[2]

if (command === 'init') {
  init()
} else if (command === 'update') {
  update()
} else {
  console.log('Usage: basic-eslint <init|update>')
}
