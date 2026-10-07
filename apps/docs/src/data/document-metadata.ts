const readTextProperty = (value: unknown, key: string): string | undefined => {
  if (value === null || typeof value !== 'object') return undefined

  const property: unknown = Reflect.get(value, key)

  return typeof property === 'string' ? property : undefined
}

export const readDocumentMetadata = (entry: unknown, fallbackTitle: string): { description: string, title: string } => {
  const value = entry !== null && typeof entry === 'object' && 'data' in entry ? entry.data : undefined
  const title = readTextProperty(value, 'title') ?? fallbackTitle
  const description = readTextProperty(value, 'description')

  return { description: description?.trim() ? description : `${title} documentation.`, title }
}
