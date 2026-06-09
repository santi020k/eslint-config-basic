// @ts-check
import { eslintConfig, Library } from '../../../basic/dist/index.js'

export default eslintConfig({
  libraries: [Library.Storybook],
  tsconfigRootDir: import.meta.dirname
})
