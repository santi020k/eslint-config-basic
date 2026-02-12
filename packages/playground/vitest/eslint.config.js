// @ts-check
import { eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    optionals: [OptionalOption.Vitest]
  })
]
