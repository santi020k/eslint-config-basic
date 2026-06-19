import { getGlobalsForRuntime, GLOB_JS_TS, Runtime } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

export interface ViteConfigOptions {
  [key: string]: unknown
  runtime?: Runtime
}

const VITE_CONFIG_FILES = [
  '**/vite.config.{js,mjs,cjs,ts,mts,cts}',
  '**/vitest.config.{js,mjs,cjs,ts,mts,cts}'
]

/**
 * Vite ESLint configuration for browser apps and Vite/Vitest config files.
 */
export const createViteConfig = (
  options: ViteConfigOptions = {}
): TSESLint.FlatConfig.ConfigArray => {
  const runtime = options.runtime ?? Runtime.Browser

  return [
    {
      files: GLOB_JS_TS,
      languageOptions: {
        globals: getGlobalsForRuntime(runtime)
      },
      name: 'eslint-config-vite/runtime'
    },
    {
      files: VITE_CONFIG_FILES,
      languageOptions: {
        globals: getGlobalsForRuntime(Runtime.Node)
      },
      name: 'eslint-config-vite/config-files',
      rules: {
        'n/no-extraneous-import': 'off',
        'n/no-process-env': 'off',
        'n/no-unpublished-import': 'off'
      }
    }
  ]
}

export const viteConfig = createViteConfig()

export { createViteConfig as vite }

export default viteConfig
