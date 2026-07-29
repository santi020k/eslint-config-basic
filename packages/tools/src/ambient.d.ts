declare module 'eslint-plugin-tsdoc' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    rules: TSESLint.FlatConfig.Plugin['rules']
  }

  export default plugin
}
