// @ts-check
import { eslintConfig, Format } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  formats: [Format.Markdown]
})
