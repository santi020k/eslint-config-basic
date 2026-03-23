// @ts-check
import angular from '@santi020k/eslint-config-angular'
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    angular
  }

})
