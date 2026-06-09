// @ts-check
import { eslintConfig, Library } from '../../../basic/dist/index.js'

export default eslintConfig({
  libraries: [Library.TanstackQuery],
  tsconfigRootDir: import.meta.dirname
})
