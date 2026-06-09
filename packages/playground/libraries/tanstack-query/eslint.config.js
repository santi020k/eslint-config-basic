// @ts-check
import { defineConfig, Library } from '../../../basic/dist/index.js'

export default await defineConfig({
  libraries: [Library.TanstackQuery],
  tsconfigRootDir: import.meta.dirname
})
