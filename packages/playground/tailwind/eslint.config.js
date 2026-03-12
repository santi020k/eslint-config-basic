// @ts-check
import { ConfigOption, eslintConfig, OptionalOption, SettingOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.React],
    settings: [SettingOption.Gitignore],
    optionals: [OptionalOption.Tailwind]
  })
]
