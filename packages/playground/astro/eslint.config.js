// @ts-check
import { ConfigOption, eslintConfig, SettingOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.Astro, ConfigOption.Ts],
    settings: [SettingOption.Gitignore]
  })
]
