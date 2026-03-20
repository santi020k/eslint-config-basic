declare module '@angular-eslint/eslint-plugin' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin

  export default plugin
}

declare module '@angular-eslint/eslint-plugin-template' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin

  export default plugin
}

declare module '@angular-eslint/template-parser' {
  const parser: unknown

  export default parser
}
