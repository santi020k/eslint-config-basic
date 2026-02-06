declare module 'cross-dirname' {
  export function getDirname(): string
}

declare module '@stencil-community/eslint-plugin' {
  const plugin: {
    rules: Record<string, unknown>
  }
  export default plugin
}

declare module 'eslint-plugin-tailwindcss' {
  import type { TSESLint } from '@typescript-eslint/utils'
  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
  }
  export default plugin
}

declare module 'eslint-plugin-i18next' {
  const plugin: unknown
  export default plugin
}
