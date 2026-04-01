// @ts-check
import { eslintConfig, Extension } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  extensions: [Extension.Unicorn]
})
