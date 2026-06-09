// @ts-check
import { eslintConfig, Testing } from '../../../basic/dist/index.js'

export default eslintConfig({
  ignores: ['**/*.json'],
  testing: [Testing.TestingLibrary, Testing.Vitest],
  tsconfigRootDir: import.meta.dirname
})
