// @ts-check
import { eslintConfig, Testing } from '../../../basic/dist/index.js'

export default eslintConfig({
  testing: [Testing.Vitest],
  tsconfigRootDir: import.meta.dirname
})
