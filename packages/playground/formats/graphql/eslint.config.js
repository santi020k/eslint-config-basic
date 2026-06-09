// @ts-check
import { eslintConfig, Format } from '../../../basic/dist/index.js'

export default eslintConfig({
  formats: [Format.Graphql],
  tsconfigRootDir: import.meta.dirname
})
