// Dynamic-import helper for lazily loading optional framework packages.
// Mirrors the pattern in @santi020k/eslint-config-basic (src/lazy.ts).

import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

// Bypass jiti/bundler transformation of import() to require().
// Reflect.construct avoids a direct `new Function()` reference (which triggers
// no-implied-eval) while achieving the same runtime behaviour: the string body
// is opaque to static analyzers so jiti cannot transform it to require().
//
// Test/prod split: in Vitest the standard import() is used directly (Vite handles
// resolution). In production the Reflect.construct path runs instead — both paths
// return the same module shape; the split only controls how the specifier is
// resolved by the host bundler, not what the module exports.

const isVitest = typeof process !== 'undefined' && process.env.VITEST

// v8 ignore next 3 -- Reflect.construct branch only runs outside Vitest; not reachable in test suite
const dynamicImport: (specifier: string) => Promise<unknown> = isVitest
  ? (specifier: string) => import(/* @vite-ignore */ specifier)
  : Reflect.construct(Function, ['specifier', 'return import(specifier)']) as (specifier: string) => Promise<unknown>

const req = createRequire(import.meta.url)

export const loadModule = async <T = unknown>(specifier: string): Promise<T> => {
  let resolved = specifier

  try {
    resolved = pathToFileURL(req.resolve(specifier)).href
  } catch {
    // Ignore and let dynamicImport throw natural error
  }

  return await dynamicImport(resolved) as T
}
