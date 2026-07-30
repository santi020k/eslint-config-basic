import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Model Context Protocol SDK ESLint configuration.
 */
export const mcp = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/mcp',
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          {
            importNames: ['McpServer'],
            message: 'Import McpServer from "@modelcontextprotocol/sdk/server/mcp.js" so server code stays on the public SDK entry point.',
            name: '@modelcontextprotocol/sdk'
          }
        ],
        patterns: [
          {
            group: [
              '@modelcontextprotocol/sdk/dist/*',
              '@modelcontextprotocol/sdk/dist/**',
              '@modelcontextprotocol/sdk/shared/*',
              '@modelcontextprotocol/sdk/shared/**'
            ],
            message: 'Import MCP SDK APIs from documented server, client, or types entry points instead of internal package modules.'
          }
        ]
      }]
    }
  }
]
