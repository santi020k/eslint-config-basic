// @ts-check
import { eslintConfig, Format } from '../../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Mdx],
  tsconfigRootDir: import.meta.dirname
})
