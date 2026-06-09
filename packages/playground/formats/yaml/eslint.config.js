// @ts-check
import { defineConfig, Format } from '../../../basic/dist/index.js'

export default await defineConfig({
  formats: [Format.Yaml],
  tsconfigRootDir: import.meta.dirname
})
