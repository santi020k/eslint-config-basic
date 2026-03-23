import { getDirname } from 'cross-dirname'

import { FlatCompat } from '@eslint/eslintrc'
import { groups } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

// Initialize FlatCompat with the base directory
const flatCompat = new FlatCompat({
  baseDirectory: getDirname(),
  recommendedConfig: {}
})

const rules: TSESLint.Linter.RulesRecord = {
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // Packages `react` related packages come first.
        ['^react'],
        ['^(expo)(/.*|$)?'],
        ...groups
      ]
    }
  ]
}

/**
 * Expo ESLint configuration
 * Extends the expo config with custom import sorting
 */
const compatConfigs = flatCompat.extends('expo') as unknown as TSESLint.FlatConfig.ConfigArray

const sanitizedConfigs = compatConfigs.map(config => {
  if (config.plugins) {
    const {
      import: _import,
      react: _react,
      'react-hooks': _reactHooks,
      '@typescript-eslint': _tsEslint,
      ...restPlugins
    } = config.plugins

    return { ...config, plugins: restPlugins }
  }

  return config
})

/**
 * Expo ESLint configuration
 * Extends the expo config with custom import sorting
 */
export const expoConfig: TSESLint.FlatConfig.ConfigArray = [
  ...sanitizedConfigs,
  {
    name: 'eslint-config-expo/custom',
    rules
  }
]

// Re-export rules for direct access
export { rules }

export default expoConfig
