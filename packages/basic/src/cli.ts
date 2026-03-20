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

  const imports: string[] = ["import { eslintConfig } from '@santi020k/eslint-config-basic'"]
  const frameworkMappings: Record<string, string> = {
    react: 'react',
    next: 'next',
    astro: 'astro',
    expo: 'expo',
    vue: 'vue',
    svelte: 'svelte',
    solid: 'solid',
    angular: 'angular',
    nest: 'nest'
  }

  const frameworks: Record<string, string> = {}

  options.config?.forEach(opt => {
    if (frameworkMappings[opt]) {
      imports.push(`import ${opt} from '@santi020k/eslint-config-${frameworkMappings[opt]}'`)
      frameworks[opt] = opt
    }
  })

  let frameworksStr = ''
  if (Object.keys(frameworks).length > 0) {
    frameworksStr = `\n  frameworks: {
    ${Object.entries(frameworks).map(([k, v]) => `${k}: ${v}`).join(',\n    ')}
  },`
  }

  const configContent = `${imports.join('\n')}

export default eslintConfig({
  config: ${JSON.stringify(options.config, null, 2)},
  optionals: ${JSON.stringify(options.optionals, null, 2)},
  runtime: '${options.runtime}',${frameworksStr}
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
