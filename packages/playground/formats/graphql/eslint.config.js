// @ts-check
import { eslintConfig, Format } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  formats: [Format.Graphql],
  tsconfigRootDir: import.meta.dirname
})
