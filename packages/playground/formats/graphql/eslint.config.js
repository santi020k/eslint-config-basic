// @ts-check
import { defineConfig, Format } from '../../../basic/dist/index.js'

export default await defineConfig({
  formats: [Format.Graphql],
  tsconfigRootDir: import.meta.dirname
})
