const getPackageRoot = (specifier: string): string => {
  const segments = specifier.split('/')

  return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0]
}

export const isMissingRequestedPackage = (error: unknown, specifier: string): boolean => {
  if (!(error instanceof Error)) return false

  const code = 'code' in error ? String(error.code) : ''

  if (code !== 'ERR_MODULE_NOT_FOUND' && code !== 'MODULE_NOT_FOUND') return false

  const missingSpecifier = /Cannot find (?:module|package) ['"]([^'"]+)['"]/.exec(error.message)?.[1]

  return missingSpecifier !== undefined && getPackageRoot(missingSpecifier) === getPackageRoot(specifier)
}
