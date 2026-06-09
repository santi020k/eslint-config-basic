// @ts-check
import { eslintConfig, Format } from '../../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Yaml],
  tsconfigRootDir: import.meta.dirname
})
