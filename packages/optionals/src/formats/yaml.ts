import pluginYml from 'eslint-plugin-yml'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * YAML ESLint configuration
 * Provides rules for YAML file linting
 */
export const yaml: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginYml.configs['flat/recommended']),
  {
    name: 'optionals/yaml/rules',
    files: ['**/*.{yml,yaml}'],
    rules: {
      'yml/no-empty-mapping-value': 'warn'
    }
  }
]
