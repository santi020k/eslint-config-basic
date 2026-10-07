export interface LiveDocsOptions {
  baseURL: string
  expectedCommit: string
  fetcher?: typeof fetch
}
export function verifyLiveDocs(options: LiveDocsOptions): Promise<void>
