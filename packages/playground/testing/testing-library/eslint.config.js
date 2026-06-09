// @ts-check
import { eslintConfig, Testing } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  testing: [Testing.TestingLibrary, Testing.Vitest],
  tsconfigRootDir: import.meta.dirname
})
