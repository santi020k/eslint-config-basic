// @ts-check
import { defineConfig, Runtime } from '../../basic/dist/index.js'

export default await defineConfig({
  frameworks: {
    hono: true
  },
  runtime: Runtime.Worker,
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
