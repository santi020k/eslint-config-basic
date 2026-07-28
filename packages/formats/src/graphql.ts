import {
  defineLazyConfig,
  type FlatParser,
  loadDefault,
  type PluginWithConfigs
} from './lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

type GraphqlPlugin = PluginWithConfigs<
  'flat/operations-recommended' | 'flat/schema-recommended'
> & {
  parser: FlatParser
}

/**
 * GraphQL ESLint configuration
 * Provides linting rules for GraphQL schema and operations
 */
export const graphql: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('graphql', async () => {
  const graphqlPlugin = await loadDefault<GraphqlPlugin>('@graphql-eslint/eslint-plugin')

  return [
    {
      files: ['**/*.schema.graphql', '**/*.schema.gql', '**/schema.graphql', '**/schema.gql'],
      languageOptions: {
        parser: graphqlPlugin.parser
      },
      name: 'integrations/graphql/schema',
      plugins: {
        '@graphql-eslint': graphqlPlugin
      },
      rules: {
        ...graphqlPlugin.configs['flat/schema-recommended'].rules,
        '@graphql-eslint/no-unreachable-types': 'off'
      }
    },
    {
      files: ['**/*.graphql', '**/*.gql'],
      ignores: ['**/*.schema.graphql', '**/*.schema.gql', '**/schema.graphql', '**/schema.gql'],
      languageOptions: {
        parser: graphqlPlugin.parser
      },
      name: 'integrations/graphql/operations',
      plugins: {
        '@graphql-eslint': graphqlPlugin
      },
      rules: {
        ...graphqlPlugin.configs['flat/operations-recommended'].rules
      }
    }
  ]
})
