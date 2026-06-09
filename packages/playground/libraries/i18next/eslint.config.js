// @ts-check
import { eslintConfig, Library } from '../../../basic/dist/index.js'

export default eslintConfig({
  libraries: [Library.I18next],
  tsconfigRootDir: import.meta.dirname
})
