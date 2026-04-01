// Type declarations for ESLint plugins that don't ship their own types

declare module 'eslint-plugin-promise' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin & {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.Config
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}
