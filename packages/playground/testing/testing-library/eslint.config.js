// @ts-check
import { defineConfig, Testing } from '../../../basic/dist/index.js'

export default defineConfig({
  ignores: ['**/*.json'],
  testing: [Testing.TestingLibrary, Testing.Vitest],
  tsconfigRootDir: import.meta.dirname
})
