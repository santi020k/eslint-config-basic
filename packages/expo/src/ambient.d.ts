// cross-dirname ships types at dist/types/index.d.ts but does not expose a
// "types" condition in its package.json exports map, so TypeScript (moduleResolution: Node16)
// cannot resolve them automatically. Declaration kept until the package is fixed upstream.

declare module 'cross-dirname' {
  export const getDirname: () => string
  export const getFilename: () => string
}
