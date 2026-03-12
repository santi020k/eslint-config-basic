// @ts-check
import { ConfigOption, eslintConfig, SettingOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.React],
    settings: [SettingOption.Gitignore]
  })
]
