// Type declarations for ESLint plugins that don't ship their own types

declare module 'eslint-plugin-react/configs/recommended.js' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const config: TSESLint.FlatConfig.Config

  export default config
}
