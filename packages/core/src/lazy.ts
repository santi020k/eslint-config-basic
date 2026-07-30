// Dynamic-import helper for lazily loading optional packages.

// Resolve dynamic imports before loading them. Keeping import() in this module
// preserves its module base when multiple feature packs load concurrently.
const dynamicImport = async (specifier: string): Promise<unknown> => import(/* @vite-ignore */ specifier)

export const createModuleLoader = (
  resolveFn: (specifier: string) => string
) => async <T = unknown>(specifier: string): Promise<T> => {
  let resolved = specifier

  try {
    resolved = resolveFn(specifier)
  } catch {
    // Ignore and let dynamicImport throw natural error
  }

  return await dynamicImport(resolved) as T
}
