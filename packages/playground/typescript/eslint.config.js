// @ts-check
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  ...eslintConfig({
    config: [ConfigOption.Ts]
  }),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname
      }
    }
  }
]
