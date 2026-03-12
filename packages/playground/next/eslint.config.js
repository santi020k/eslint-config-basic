// @ts-check
import { ConfigOption, eslintConfig, SettingOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.Next, ConfigOption.Ts],
    settings: [SettingOption.Gitignore]
  })
]
