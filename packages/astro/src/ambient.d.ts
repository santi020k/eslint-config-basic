declare module 'eslint-plugin-astro' {
  import type { TSESLint } from '@typescript-eslint/utils'
  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.ConfigArray
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
  }
  export default plugin
}
