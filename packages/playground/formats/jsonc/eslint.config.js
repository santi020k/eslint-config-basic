// @ts-check
import { eslintConfig, Format } from '../../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Jsonc],
  tsconfigRootDir: import.meta.dirname
})
