export interface DocsLinkNode {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: DocsLinkNode[]
}

export declare const resolveDocsMarkdownLink: (
  href: string,
  sourcePath: string,
  docsRoot: string,
  base?: string
) => string

export declare const rewriteDocsMarkdownLinks: (
  tree: DocsLinkNode,
  sourcePath: string,
  docsRoot: string,
  base?: string
) => void
