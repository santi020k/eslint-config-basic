import { getDirname } from 'cross-dirname'

import { FlatCompat } from '@eslint/eslintrc'
import type { TSESLint } from '@typescript-eslint/utils'

// Initialize FlatCompat with the base directory
const flatCompat = new FlatCompat({
  baseDirectory: getDirname(),
  recommendedConfig: {}
})

/**
 * Expo ESLint configuration
 * Extends the expo config with custom import sorting
 */
const compatConfigs = flatCompat.extends('expo') as unknown as TSESLint.FlatConfig.ConfigArray

const sanitizedConfigs = compatConfigs.map(config => {
  const rulesWithoutLegacyPlugins = config.rules ?
    Object.fromEntries(
      Object.entries(config.rules).filter(([ruleName]) => ![
        '@typescript-eslint/',
        'import/',
        'react-hooks/',
        'react/'
      ].some(prefix => ruleName.startsWith(prefix)))
    ) :
    undefined

  if (config.plugins) {
    const {
      import: _import,
      react: _react,
      'react-hooks': _reactHooks,
      '@typescript-eslint': _tsEslint,
      ...restPlugins
    } = config.plugins

    return { ...config, plugins: restPlugins, rules: rulesWithoutLegacyPlugins }
  }

  return rulesWithoutLegacyPlugins ? { ...config, rules: rulesWithoutLegacyPlugins } : config
})

/**
 * Expo ESLint configuration
 * Extends the expo config with React Native/Expo rules.
 */
export const expoConfig: TSESLint.FlatConfig.ConfigArray = [
  ...sanitizedConfigs,
  {
    name: 'eslint-config-expo/custom',
    settings: {
      'import/ignore': [
        'react-native'
      ]
    }
  }
]

export default expoConfig
