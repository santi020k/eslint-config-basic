import { reactRouter } from '@santi020k/eslint-config-react-router'
import type { TSESLint } from '@typescript-eslint/utils'

const remixConfig: TSESLint.FlatConfig.ConfigArray = reactRouter.map(config => ({
  ...config,
  name: config.name?.replace('eslint-config-react-router', 'eslint-config-remix')
}))

/**
 * Remix ESLint configuration
 *
 * @deprecated Remix merged into React Router v7. Use
 * `@santi020k/eslint-config-react-router` (the `react-router` framework key)
 * instead. This alias re-exports the React Router config and will be removed
 * in the next major version.
 */
export const remix = remixConfig

export default remixConfig
