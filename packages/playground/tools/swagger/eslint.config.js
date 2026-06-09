// @ts-check
import { defineConfig, Tool } from '../../../basic/dist/index.js'

export default defineConfig({
  tools: [Tool.Swagger],
  tsconfigRootDir: import.meta.dirname
})
