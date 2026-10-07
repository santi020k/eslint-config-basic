import { repositoryOrigin } from './docs-packages.mjs'

/** Resolve repository assets and guides when the README is published to npm. */
export const resolvePublishedReadmeLinks = content => content
  .replaceAll('(LICENSE)', `(${repositoryOrigin}/blob/main/LICENSE)`)
  .replaceAll('href="LICENSE"', `href="${repositoryOrigin}/blob/main/LICENSE"`)
  .replaceAll('(.github/', `(${repositoryOrigin}/blob/main/.github/`)
  .replaceAll('src="assets/', `src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/`)
  .replaceAll('srcset="assets/', `srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/`)
