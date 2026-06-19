import type { TSESLint } from '@typescript-eslint/utils'

import { yaml } from '../formats/yaml.js'

/**
 * GitHub Actions ESLint configuration
 * Lints workflow YAML files with the shared YAML rules and workflow-specific
 * guardrails.
 */
export const githubActions = async (): Promise<TSESLint.FlatConfig.ConfigArray> => [
  ...await yaml(),
  {
    files: ['.github/workflows/*.{yml,yaml}', '**/.github/workflows/*.{yml,yaml}'],
    name: 'eslint-config-integrations/github-actions',
    rules: {
      'yml/no-empty-mapping-value': 'error',
      'yml/no-empty-sequence-entry': 'error'
    }
  }
]
