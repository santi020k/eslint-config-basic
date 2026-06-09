// @ts-check
import { eslintConfig, Format } from '../../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Toml],
  tsconfigRootDir: import.meta.dirname
})
