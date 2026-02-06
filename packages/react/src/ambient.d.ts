// Type declarations for ESLint plugins that don't ship their own types

declare module 'eslint-plugin-react/configs/recommended.js' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const config: TSESLint.FlatConfig.Config

  export default config
}

declare module 'eslint-plugin-react-hooks' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin & {
    configs: {
      recommended: {
        rules: TSESLint.Linter.RulesRecord
      }
    }
  }

  export default plugin
}
