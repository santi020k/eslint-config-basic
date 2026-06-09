// @ts-check
import { defineConfig, Library } from '../../../basic/dist/index.js'

export default defineConfig({
  libraries: [Library.Stencil],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
