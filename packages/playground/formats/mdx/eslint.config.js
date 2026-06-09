// @ts-check
import { defineConfig, Format } from '../../../basic/dist/index.js'

export default defineConfig({
  formats: [Format.Mdx],
  tsconfigRootDir: import.meta.dirname
})
