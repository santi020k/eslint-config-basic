// @ts-check
import { eslintConfig, Extension } from '../../../basic/dist/index.js'

export default eslintConfig({
  extensions: [Extension.Perfectionist],
  tsconfigRootDir: import.meta.dirname
})
