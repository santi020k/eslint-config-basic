// @ts-check
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  libraries: [Library.TanstackQuery],
  tsconfigRootDir: import.meta.dirname
})
