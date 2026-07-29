import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * OpenAI Agents SDK ESLint configuration.
 */
export const openAiAgents = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/openai-agents',
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          {
            message: 'Use the dedicated "@openai/agents" SDK for agent workflows instead of importing agents from the base OpenAI client.',
            name: 'openai/agents'
          }
        ],
        patterns: [
          {
            group: [
              '@openai/agents/dist/*',
              '@openai/agents/dist/**',
              '@openai/agents/src/*',
              '@openai/agents/src/**'
            ],
            message: 'Import OpenAI Agents SDK APIs from "@openai/agents" or documented subpath entry points instead of internals.'
          }
        ]
      }]
    }
  }
]
