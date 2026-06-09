// @ts-check
import { eslintConfig, Extension } from '../../../basic/dist/index.js'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  extensions: [Extension.Regexp]
})
