import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import pluginLit from 'eslint-plugin-lit'
import pluginWc from 'eslint-plugin-wc'

type PluginWithFlatConfigs = TSESLint.FlatConfig.Plugins[string] & {
  configs: Record<string, TSESLint.FlatConfig.Config>
}

const litPlugin = pluginLit as unknown as PluginWithFlatConfigs
const wcPlugin = pluginWc as unknown as PluginWithFlatConfigs

/**
 * Lit ESLint configuration
 * Combines `eslint-plugin-lit` and `eslint-plugin-wc` recommended rules for
 * Lit elements and plain Web Components.
 */
export const lit: TSESLint.FlatConfig.ConfigArray = [
  {
    files: GLOB_JS_TS,
    name: 'eslint-config-lit/wc-recommended',
    plugins: {
      wc: wcPlugin
    },
    rules: {
      ...wcPlugin.configs['flat/recommended'].rules
    }
  },
  {
    files: GLOB_JS_TS,
    name: 'eslint-config-lit/lit-recommended',
    plugins: {
      lit: litPlugin
    },
    rules: {
      ...litPlugin.configs['flat/recommended'].rules
    }
  }
]

export default lit
