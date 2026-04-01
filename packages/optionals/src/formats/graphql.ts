import graphqlPlugin from '@graphql-eslint/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * GraphQL ESLint configuration
 * Provides linting rules for GraphQL schema and operations
 */
export const graphql: TSESLint.FlatConfig.ConfigArray = [
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
