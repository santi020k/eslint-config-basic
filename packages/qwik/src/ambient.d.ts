declare module 'eslint-plugin-qwik' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin

  export default plugin
}
