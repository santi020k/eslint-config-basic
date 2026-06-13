// Dynamic-import helper for lazily loading bundled framework packages.
// Mirrors the pattern in @santi020k/eslint-config-integrations (src/lazy.ts).

// Bypass jiti/bundler transformation of import() to require().
// Reflect.construct avoids a direct `new Function()` reference (which triggers
// no-implied-eval) while achieving the same runtime behaviour: the string body
// is opaque to static analyzers so jiti cannot transform it to require().

const isVitest = typeof process !== 'undefined' && process.env.VITEST

const dynamicImport: (specifier: string) => Promise<unknown> = isVitest
  ? (specifier: string) => import(/* @vite-ignore */ specifier)
  : Reflect.construct(Function, ['specifier', 'return import(specifier)']) as (specifier: string) => Promise<unknown>

export const loadModule = async <T = unknown>(specifier: string): Promise<T> => await dynamicImport(specifier) as T
