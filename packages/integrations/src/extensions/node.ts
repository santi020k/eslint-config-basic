import { GLOB_JS_TS, GLOB_TS } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

/**
 * Node.js extension configuration
 * Applies `eslint-plugin-n` recommended rules for Node.js codebases.
 * Module-resolution rules are disabled for TypeScript files where the
 * TypeScript compiler already validates imports.
 */
export const node: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('node', async () => {
  const pluginNode = await loadDefault<PluginWithConfigs<'flat/recommended'>>('eslint-plugin-n')

  return [
    {
      ...pluginNode.configs['flat/recommended'],
      files: GLOB_JS_TS,
      name: 'integrations/node/recommended'
    },
    {
      files: GLOB_TS,
      name: 'integrations/node/typescript-overrides',
      rules: {
        // TypeScript already validates module resolution
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off'
      }
    }
  ]
})
