import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadModule, type PluginWithConfigs } from '../lazy.js'

type AiSecurityPlugin = PluginWithConfigs<'recommended'> & {
  plugin?: PluginWithConfigs<'recommended'>
}

const hasRecommendedConfig = (value: unknown): value is PluginWithConfigs<'recommended'> => (
  typeof value === 'object' &&
  value !== null &&
  'configs' in value &&
  typeof (value as PluginWithConfigs<'recommended'>).configs.recommended === 'object'
)

const resolveAiSecurityPlugin = (module: unknown): PluginWithConfigs<'recommended'> => {
  if (hasRecommendedConfig(module)) return module

  const candidate = module as AiSecurityPlugin & { default?: unknown }

  if (hasRecommendedConfig(candidate.default)) return candidate.default

  if (hasRecommendedConfig(candidate.plugin)) return candidate.plugin

  throw new Error('eslint-plugin-vercel-ai-security did not expose a recommended config.')
}

/**
 * Vercel AI SDK security ESLint configuration.
 */
export const aiSdk: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('ai-sdk', async () => {
  const plugin = resolveAiSecurityPlugin(await loadModule('eslint-plugin-vercel-ai-security'))

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-integrations/ai-sdk',
      plugins: {
        'vercel-ai-security': plugin
      },
      rules: {
        ...plugin.configs.recommended.rules
      }
    }
  ]
})
