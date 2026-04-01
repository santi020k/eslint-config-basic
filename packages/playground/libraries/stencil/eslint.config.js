// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  libraries: [Library.Stencil]
})
