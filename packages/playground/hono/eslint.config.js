// @ts-check
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    hono: true
  },
  runtime: Runtime.Worker,
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
