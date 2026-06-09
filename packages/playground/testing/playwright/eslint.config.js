// @ts-check
import { eslintConfig, Testing } from '../../../basic/dist/index.js'

export default eslintConfig({
  testing: [Testing.Playwright],
  tsconfigRootDir: import.meta.dirname
})
