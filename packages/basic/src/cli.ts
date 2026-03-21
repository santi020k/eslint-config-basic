#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { detectProjectOptions } from './index.js'

const init = () => {
  const cwd = process.cwd()
  const configPath = join(cwd, 'eslint.config.js')

  if (existsSync(configPath)) {
    console.warn('⚠️  eslint.config.js already exists. Skipping...')

    return
  }

  console.log('🔍 Detecting project settings...')

  const options = detectProjectOptions(cwd)
  const imports: string[] = ['import { eslintConfig } from \'@santi020k/eslint-config-basic\'']

  if (options.frameworks) {
    Object.keys(options.frameworks).forEach(key => {
      imports.push(`import ${key} from '@santi020k/eslint-config-${key}'`)
    })
  }

  const configContent = `${imports.join('\n')}

export default eslintConfig({
  typescript: ${options.typescript},
  frameworks: {
    ${Object.keys(options.frameworks ?? {}).map(key => `${key}: ${key}`).join(',\n    ')}
  },
  optionals: ${JSON.stringify(options.optionals, null, 2)},
  runtime: '${options.runtime}',
  settings: ${JSON.stringify(options.settings ?? [], null, 2)}
})
`

  writeFileSync(configPath, configContent)

  console.log('✅ Created eslint.config.js with auto-detected settings!')

  console.log('🚀 Ready to lint!')
}

const command = process.argv[2]

if (command === 'init') {
  init()
} else {
  console.log('Usage: santi-eslint init')
}
