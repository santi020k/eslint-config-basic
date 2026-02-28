import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  ConfigOption,
  eslintConfig,
  SettingOption
} from '@santi020k/eslint-config-basic'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
  ...eslintConfig({
    // Enable Vue and TypeScript
    config: [ConfigOption.Vue, ConfigOption.Ts],
    // Include standard gitignore handling
    settings: [SettingOption.Gitignore]
  }),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue']
      }
    }
  }
]
