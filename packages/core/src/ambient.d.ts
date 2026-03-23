// Type declarations for ESLint plugins that don't ship their own types

declare module 'eslint-config-standard' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const config: {
    rules: TSESLint.Linter.RulesRecord
  }

  export default config
}

declare module 'eslint-plugin-promise' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin

  export default plugin
}

declare module 'eslint-plugin-unused-imports' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin

  export default plugin
}
