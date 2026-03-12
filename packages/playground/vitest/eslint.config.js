// @ts-check
import { eslintConfig, OptionalOption, SettingOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    optionals: [OptionalOption.Vitest],
    settings: [SettingOption.Gitignore]
  })
]
