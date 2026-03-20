declare module 'eslint-plugin-solid' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.Config
    }
    rules: Record<string, unknown>
  }

  export default plugin
}
