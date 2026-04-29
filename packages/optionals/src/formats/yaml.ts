import type PluginYml from 'eslint-plugin-yml'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * YAML ESLint configuration
 * Provides rules for YAML file linting
 */
export const yaml: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('yaml', () => {
  const pluginYml = loadDefault<typeof PluginYml>('eslint-plugin-yml')

  return [
    ...(pluginYml.configs['flat/recommended']),
    {
      name: 'optionals/yaml/rules',
      files: ['**/*.{yml,yaml}'],
      rules: {
        'yml/no-empty-mapping-value': 'warn'
      }
    }
  ]
})
