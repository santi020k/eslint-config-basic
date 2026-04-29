import {
  defineLazyConfig,
  type FlatParser,
  loadDefault,
  type PluginWithConfigs
} from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

type GraphqlPlugin = PluginWithConfigs<
  'flat/schema-recommended' | 'flat/operations-recommended'
> & {
  parser: FlatParser
}

/**
 * GraphQL ESLint configuration
 * Provides linting rules for GraphQL schema and operations
 */
export const graphql: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('graphql', () => {
  const graphqlPlugin = loadDefault<GraphqlPlugin>('@graphql-eslint/eslint-plugin')

  return [
    {
      name: 'optionals/graphql/schema',
      files: ['**/*.schema.graphql', '**/*.schema.gql', '**/schema.graphql', '**/schema.gql'],
      languageOptions: {
        parser: graphqlPlugin.parser
      },
      plugins: {
        '@graphql-eslint': graphqlPlugin
      },
      rules: {
        ...graphqlPlugin.configs['flat/schema-recommended'].rules,
        '@graphql-eslint/no-unreachable-types': 'off'
      }
    },
    {
      name: 'optionals/graphql/operations',
      files: ['**/*.graphql', '**/*.gql'],
      ignores: ['**/*.schema.graphql', '**/*.schema.gql', '**/schema.graphql', '**/schema.gql'],
      languageOptions: {
        parser: graphqlPlugin.parser
      },
      plugins: {
        '@graphql-eslint': graphqlPlugin
      },
      rules: {
        ...graphqlPlugin.configs['flat/operations-recommended'].rules
      }
    }
  ]
})
