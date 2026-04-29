import { getGlobalsForRuntime, GLOB_JS_TS, Runtime } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export interface HonoConfigOptions {
  runtime?: Runtime
  [key: string]: unknown
}

export const createHonoConfig = (
  options: HonoConfigOptions = {}
): TSESLint.FlatConfig.ConfigArray => {
  const runtime = options.runtime ?? Runtime.Worker

  return [
    {
      name: 'eslint-config-hono/runtime',
      files: GLOB_JS_TS,
      languageOptions: {
        globals: getGlobalsForRuntime(runtime)
      }
    },
    {
      name: 'eslint-config-hono/server-handlers',
      files: ['**/*.{ts,mts,cts,tsx,js,mjs,cjs,jsx}'],
      rules: {
        'n/no-process-env': 'off'
      }
    }
  ]
}

export const honoConfig = createHonoConfig()

export { createHonoConfig as hono }

export default honoConfig
