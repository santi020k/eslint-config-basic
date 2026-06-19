// @ts-check
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    react: true
  },
  libraries: [Library.TanstackRouter],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
