// @ts-check
import { defineConfig, Library } from '../../../basic/dist/index.js'

export default await defineConfig({
  frameworks: {
    react: true
  },
  libraries: [Library.TanstackRouter],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
