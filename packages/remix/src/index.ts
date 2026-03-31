import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

import type { TSESLint } from '@typescript-eslint/utils'

export const remix: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-remix/jsx-a11y',
    plugins: {
      'jsx-a11y': pluginJsxA11y
    },
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules
    }
  },
  {
    name: 'eslint-config-remix/ignores',
    ignores: ['.cache/*', 'build/*', 'public/build/*']
  }
]

export default remix
