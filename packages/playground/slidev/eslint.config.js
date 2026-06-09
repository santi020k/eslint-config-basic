// @ts-check
import { defineConfig, Format } from '../../basic/dist/index.js'

export default await defineConfig({
  formats: [Format.Markdown],
  frameworks: {
    slidev: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
