import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

/**
 * JSDoc ESLint configuration
 * Provides rules for TSDoc/JSDoc validation and formatting.
 */
export const jsdoc: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('jsdoc', async () => {
  const pluginJsdoc = await loadDefault<PluginWithConfigs<'flat/recommended-error'>>('eslint-plugin-jsdoc')
  const pluginTsdoc = await loadDefault<{ rules: TSESLint.FlatConfig.Plugin['rules'] }>('eslint-plugin-tsdoc')

  const configs: TSESLint.FlatConfig.ConfigArray = [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/jsdoc',
      plugins: {
        jsdoc: pluginJsdoc
      },
      rules: {
        ...pluginJsdoc.configs['flat/recommended-error'].rules
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      name: 'eslint-config-integrations/tsdoc',
      plugins: {
        tsdoc: pluginTsdoc
      },
      rules: {
        'tsdoc/syntax': 'warn'
      }
    }
  ]

  return configs
})
