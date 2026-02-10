/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: [
    'packages/core/src/index.ts',
    'packages/typescript/src/index.ts',
    'packages/react/src/index.ts',
    'packages/next/src/index.ts',
    'packages/astro/src/index.ts',
    'packages/expo/src/index.ts',
    'packages/nest/src/index.ts',
    'packages/optionals/src/index.ts',
    'packages/basic/src/index.ts'
  ],
  out: 'docs',
  tsconfig: './tsconfig.docs.json',
  name: '@santi020k/eslint-config-basic',
  readme: './README.md',
  excludePrivate: true,
  excludeInternal: true,
  categorizeByGroup: true,
  navigationLinks: {
    GitHub: 'https://github.com/santi020k/eslint-config-basic',
    npm: 'https://www.npmjs.com/package/@santi020k/eslint-config-basic'
  }
}
