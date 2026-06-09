// @ts-check
import { defineConfig, Testing } from '../../../basic/dist/index.js'

export default await defineConfig({
  testing: [Testing.Jest],
  tsconfigRootDir: import.meta.dirname
})
