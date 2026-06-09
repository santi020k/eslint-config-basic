// @ts-check
import { eslintConfig, Testing } from '../../../basic/dist/index.js'

export default eslintConfig({
  testing: [Testing.Cypress],
  tsconfigRootDir: import.meta.dirname
})
