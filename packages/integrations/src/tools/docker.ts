import type { TSESLint } from '@typescript-eslint/utils'

import { yaml } from '../formats/yaml.js'

/**
 * Docker tooling ESLint configuration
 * Covers Docker Compose YAML files. Dockerfile linting is intentionally left to
 * dedicated Dockerfile linters until a stable ESLint parser/plugin is added.
 */
export const docker = async (): Promise<TSESLint.FlatConfig.ConfigArray> => [
  ...await yaml(),
  {
    files: [
      '**/compose.{yml,yaml}',
      '**/compose.*.{yml,yaml}',
      '**/docker-compose.{yml,yaml}',
      '**/docker-compose.*.{yml,yaml}'
    ],
    name: 'eslint-config-integrations/docker',
    rules: {
      'yml/no-empty-mapping-value': 'error',
      'yml/no-empty-sequence-entry': 'error'
    }
  }
]
