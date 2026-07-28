declare module 'eslint-plugin-better-tailwindcss' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}

declare module 'eslint-plugin-zod' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}
