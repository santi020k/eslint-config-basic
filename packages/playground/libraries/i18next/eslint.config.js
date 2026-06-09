// @ts-check
import { defineConfig, Library } from '../../../basic/dist/index.js'

export default defineConfig({
  libraries: [Library.I18next],
  tsconfigRootDir: import.meta.dirname
})
