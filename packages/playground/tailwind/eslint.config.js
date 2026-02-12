// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    config: [ConfigOption.React],
    optionals: [OptionalOption.Tailwind]
  })
]
