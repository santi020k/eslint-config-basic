import type { TSESLint } from '@typescript-eslint/utils'
import expoFlatConfig from 'eslint-config-expo/flat.js'

/**
 * Expo ESLint configuration
 * Uses Expo's native flat config while removing rule families owned by the
 * shared TypeScript, import, and React presets.
 */
const sanitizedConfigs = expoFlatConfig.map(config => {
  const { name: _upstreamName, ...configWithoutName } = config

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
      '@typescript-eslint': _tsEslint,
      import: _import,
      react: _react,
      'react-hooks': _reactHooks,
      ...restPlugins
    } = config.plugins

    return { ...configWithoutName, plugins: restPlugins, rules: rulesWithoutLegacyPlugins }
  }

  return rulesWithoutLegacyPlugins ?
    { ...configWithoutName, rules: rulesWithoutLegacyPlugins } :
    configWithoutName
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
