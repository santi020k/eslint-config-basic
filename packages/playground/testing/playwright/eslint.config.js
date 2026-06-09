// @ts-check
import { defineConfig, Testing } from '../../../basic/dist/index.js'

export default await defineConfig({
  testing: [Testing.Playwright],
  tsconfigRootDir: import.meta.dirname
})
