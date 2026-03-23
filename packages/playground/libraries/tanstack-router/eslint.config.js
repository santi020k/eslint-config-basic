// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  libraries: [Library.TanstackRouter]

})
