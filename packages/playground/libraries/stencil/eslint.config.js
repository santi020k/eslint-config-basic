// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  libraries: [Library.Stencil],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
