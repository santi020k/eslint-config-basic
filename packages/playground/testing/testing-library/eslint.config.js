// @ts-check
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: ['**/*.json'],
  testing: [Testing.TestingLibrary, Testing.Vitest],
  tsconfigRootDir: import.meta.dirname
})
