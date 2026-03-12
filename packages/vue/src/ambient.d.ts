declare module 'eslint-plugin-vue' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
  }

  export default plugin
}

declare module 'vue-eslint-parser' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const parser: TSESLint.FlatConfig.Parser

  export default parser
}
