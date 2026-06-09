// @ts-check
import { defineConfig, Testing } from '../../../basic/dist/index.js'

export default await defineConfig({
  testing: [Testing.Vitest],
  tsconfigRootDir: import.meta.dirname
})
