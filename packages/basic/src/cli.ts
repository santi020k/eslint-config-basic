#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { detectProjectOptions } from './index.js'

const init = async () => {
  const cwd = process.cwd()
  const configPath = join(cwd, 'eslint.config.js')

  if (existsSync(configPath)) {
    console.warn('⚠️  eslint.config.js already exists. Skipping...')

    return
  }

  console.log('🔍 Detecting project settings...')

  const options = detectProjectOptions(cwd)

  const configContent = `import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
`

  writeFileSync(configPath, configContent)

  console.log('✅ Created eslint.config.js with auto-detected settings!')

  console.log('🚀 Ready to lint!')
}

const command = process.argv[2]

if (command === 'init') {
  init().catch(console.error)
} else {
  console.log('Usage: santi-eslint init')
}
