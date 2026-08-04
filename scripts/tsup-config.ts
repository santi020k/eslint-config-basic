import type { Options } from 'tsup'

const sharedExternal = [/^node:/, /^@santi020k\//]

/**
 * Keep the publishable packages on one build contract. Package configs should
 * supply only their entry points and genuine package-specific exceptions.
 */
export const createPackageBuildConfig = (options: Options): Options => ({
  bundle: false,
  clean: true,
  // TODO(tsup): remove this once tsup's DTS pipeline supports TypeScript 6
  // without injecting deprecated baseUrl. See egoist/tsup#1388 and #1389.
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  external: sharedExternal,
  format: ['esm'],
  sourcemap: true,
  splitting: false,
  target: 'es2022',
  ...options
})
