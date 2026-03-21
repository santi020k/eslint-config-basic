declare module '@darraghor/eslint-plugin-nestjs-typed' {
  import type { TSESLint } from '@typescript-eslint/utils'

  declare const plugin: {
    plugin: TSESLint.FlatConfig.Plugin
    configs: {
      flatRecommended: TSESLint.FlatConfig.ConfigArray
      recommended: {
        rules: TSESLint.Linter.RulesRecord
      }
    }
  }

  export default plugin
}
