// @ts-check
import { defineConfig, Extension } from '../../../basic/dist/index.js'

export default defineConfig({
  tsconfigRootDir: import.meta.dirname,
  extensions: [Extension.Regexp]
})
