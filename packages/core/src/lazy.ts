// Dynamic-import helper for lazily loading optional packages.

// Resolve dynamic imports before loading them. Keeping import() in this module
// preserves its module base when multiple feature packs load concurrently.
const dynamicImport = async (specifier: string): Promise<unknown> => import(/* @vite-ignore */ specifier)
const isVitest = typeof process !== 'undefined' && Boolean(process.env.VITEST)

export const createModuleLoader = (
  resolveFn: (specifier: string) => string
) => async <T = unknown>(specifier: string): Promise<T> => {
  if (isVitest) {
    try {
      return await dynamicImport(specifier) as T
    } catch (error) {
      if ((error as { code?: string }).code !== 'ERR_MODULE_NOT_FOUND') throw error
    }
  }

  let resolved = specifier

  try {
    resolved = resolveFn(specifier)
  } catch {
    // Ignore and let dynamicImport throw natural error
  }

  return await dynamicImport(resolved) as T
}
