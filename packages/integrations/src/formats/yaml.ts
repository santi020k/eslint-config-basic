import type { TSESLint } from '@typescript-eslint/utils'
import type PluginYml from 'eslint-plugin-yml'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * YAML ESLint configuration
 * Provides rules for YAML file linting
 */
export const yaml: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('yaml', async () => {
  const pluginYml = await loadDefault<typeof PluginYml>('eslint-plugin-yml')

  return [
    {
      ignores: [
        // Lockfiles are machine-generated; linting them is extremely slow (6+ s)
        '**/pnpm-lock.yaml',
        '**/yarn.lock'
      ],
      name: 'integrations/yaml/lockfile-ignores'
    },
    ...(pluginYml.configs['flat/recommended']),
    {
      files: ['**/*.{yml,yaml}'],
      name: 'integrations/yaml/rules',
      rules: {
        'yml/no-empty-mapping-value': 'warn',
        'yml/no-empty-sequence-entry': 'warn'
      }
    }
  ]
})
