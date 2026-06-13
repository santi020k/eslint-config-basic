import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadModule } from '../lazy.js'

interface PnpmPluginModule {
  configs: Record<'json' | 'recommended' | 'yaml', TSESLint.FlatConfig.ConfigArray>
}

/**
 * pnpm tooling ESLint configuration
 * Enforces pnpm catalogs and workspace settings in `package.json` and
 * `pnpm-workspace.yaml` using `eslint-plugin-pnpm`
 */
export const pnpm: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('pnpm', async () => {
  const pluginPnpm = await loadModule<PnpmPluginModule>('eslint-plugin-pnpm')

  return [
    ...pluginPnpm.configs.recommended
  ]
})
