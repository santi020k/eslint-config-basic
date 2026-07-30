import type { TSESLint } from '@typescript-eslint/utils'
import type PluginYml from 'eslint-plugin-yml'

import { defineLazyConfig, loadDefault } from './lazy.js'

// cspell:ignore gollum
const GITHUB_EMPTY_EVENTS = [
  'branch_protection_rule',
  'check_run',
  'check_suite',
  'create',
  'delete',
  'deployment',
  'deployment_status',
  'discussion',
  'discussion_comment',
  'fork',
  'gollum',
  'issue_comment',
  'issues',
  'label',
  'merge_group',
  'milestone',
  'page_build',
  'project',
  'project_card',
  'project_column',
  'public',
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
  'pull_request_target',
  'push',
  'registry_package',
  'release',
  'repository_dispatch',
  'status',
  'watch',
  'workflow_call',
  'workflow_dispatch',
  'workflow_run'
] as const

const githubNonEventEmptyMappingSelector = [
  'YAMLPair[value=null]',
  ...GITHUB_EMPTY_EVENTS.map(event => `:not([key.value='${event}'])`)
].join('')

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
        '**/yarn.lock',
        '**/bun.lock'
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
    },
    {
      files: ['**/.github/workflows/*.{yml,yaml}', '.github/workflows/*.{yml,yaml}'],
      name: 'integrations/yaml/github-actions',
      rules: {
        'no-restricted-syntax': ['warn', {
          message: 'Empty values are only valid for known GitHub Actions event keys; use `{}` or provide a mapping.',
          selector: githubNonEventEmptyMappingSelector
        }],
        'yml/no-empty-mapping-value': 'off'
      }
    }
  ]
})
