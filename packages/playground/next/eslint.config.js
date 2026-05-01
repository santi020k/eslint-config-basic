// @ts-check

import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  nextMode: NextMode.AppRouter,
  // Root package.json lists tailwindcss for docs/tooling; when ESLint runs from the monorepo
  // root it still uses this config for these files — do not pull Tailwind ESLint in here.
  libraries: [],
  detection: { libraries: false },
  frameworks: {
    next: true
  }

})
