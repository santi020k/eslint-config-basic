// @ts-check
import { eslintConfig, Format } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  formats: [Format.Yaml],
  tsconfigRootDir: import.meta.dirname
})
