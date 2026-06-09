// @ts-check

import { eslintConfig, NextMode } from '../../basic/dist/index.js'

export default eslintConfig({
  detection: { libraries: false },
  frameworks: {
    next: true
  },
  // Root package.json lists tailwindcss for docs/tooling; when ESLint runs from the monorepo
  // root it still uses this config for these files — do not pull Tailwind ESLint in here.
  libraries: [],
  nextMode: NextMode.AppRouter,
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
