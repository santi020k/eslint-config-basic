// @ts-check
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.Next, ConfigOption.Ts]
  })
]
