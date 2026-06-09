// @ts-check
import { eslintConfig, Format } from '../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Markdown],
  frameworks: {
    slidev: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
