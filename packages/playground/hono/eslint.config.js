// @ts-check
import { eslintConfig, Runtime } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    hono: true
  },
  runtime: Runtime.Worker,
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
