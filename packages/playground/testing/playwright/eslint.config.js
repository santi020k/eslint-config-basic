// @ts-check
import { eslintConfig, Testing } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  testing: [Testing.Playwright]

})
