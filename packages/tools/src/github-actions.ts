import { yaml } from '@santi020k/eslint-config-formats'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * GitHub Actions ESLint configuration
 * Lints workflow YAML files with the shared YAML rules and workflow-specific
 * guardrails.
 */
export const githubActions = async (): Promise<TSESLint.FlatConfig.ConfigArray> => {
  const yamlConfig = await yaml()

  const workflowRules = yamlConfig.find(
    config => config.name === 'integrations/yaml/github-actions'
  )?.rules

  return [
    ...yamlConfig,
    {
      files: ['.github/workflows/*.{yml,yaml}', '**/.github/workflows/*.{yml,yaml}'],
      name: 'eslint-config-integrations/github-actions',
      rules: {
        ...workflowRules,
        'yml/no-empty-mapping-value': 'off',
        'yml/no-empty-sequence-entry': 'error'
      }
    }
  ]
}
