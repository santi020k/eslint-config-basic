declare module 'cross-dirname' {
  export function getDirname(): string
}

declare module '@stencil-community/eslint-plugin' {
  const plugin: {
    rules: Record<string, unknown>
  }

  export default plugin
}

declare module 'eslint-plugin-better-tailwindcss' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}

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
