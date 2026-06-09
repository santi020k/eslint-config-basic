// @ts-check
import { eslintConfig, Format } from '../../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Markdown],
  tsconfigRootDir: import.meta.dirname
})
