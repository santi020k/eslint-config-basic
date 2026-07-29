declare module 'eslint-plugin-security' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: {
        rules: TSESLint.FlatConfig.Rules
      }
    }
    rules: TSESLint.FlatConfig.Plugin['rules']
  }

  export default plugin
}

declare module 'eslint-plugin-vuejs-accessibility' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
  }

  export default plugin
}
