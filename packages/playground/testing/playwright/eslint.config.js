// @ts-check
import { defineConfig, Testing } from '../../../basic/dist/index.js'

export default defineConfig({
  testing: [Testing.Playwright],
  tsconfigRootDir: import.meta.dirname
})
