// @ts-check
import { eslintConfig, Runtime } from '@santi020k/eslint-config-basic'
import hono from '@santi020k/eslint-config-hono'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  runtime: Runtime.Worker,
  frameworks: {
    hono
  }
})
