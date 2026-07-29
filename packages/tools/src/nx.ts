import { jsonc } from '@santi020k/eslint-config-formats'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Nx ESLint configuration
 * Lints Nx workspace JSON/JSONC files using the shared JSONC parser rules.
 */
export const nx = async (): Promise<TSESLint.FlatConfig.ConfigArray> => [
  ...await jsonc(),
  {
    files: ['**/nx.json', '**/project.json'],
    name: 'eslint-config-integrations/nx',
    rules: {
      'jsonc/sort-keys': ['warn', {
        order: ['extends', 'npmScope', 'affected', 'tasksRunnerOptions', 'targetDefaults', 'namedInputs', 'generators', 'plugins'],
        pathPattern: '^$'
      }]
    }
  }
]
