declare module 'eslint-plugin-svelte' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
    rules: Record<string, unknown>
  }

  export default plugin
}
