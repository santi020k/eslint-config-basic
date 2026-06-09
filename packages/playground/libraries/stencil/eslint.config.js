// @ts-check
import { eslintConfig, Library } from '../../../basic/dist/index.js'

export default eslintConfig({
  libraries: [Library.Stencil],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
