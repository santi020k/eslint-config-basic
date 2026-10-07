import { existsSync } from 'node:fs'
import { isAbsolute, relative, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

/** Resolve source Markdown references against their published documentation routes. */
export const resolveDocsMarkdownLink = (href, sourcePath, docsRoot, base = '/') => {
  if (!/\.mdx?(?:[?#]|$)/iu.test(href) || /^(?:[a-z][a-z\d+.-]*:|\/|#)/iu.test(href)) {
    return href
  }

  let target
  let targetPath

  try {
    target = new URL(href, pathToFileURL(sourcePath))

    targetPath = fileURLToPath(target)
  } catch {
    return href
  }

  const sourceRelativePath = relative(resolve(docsRoot), targetPath)

  if (isAbsolute(sourceRelativePath) || sourceRelativePath === '..' || sourceRelativePath.startsWith(`..${sep}`) || !existsSync(targetPath)) {
    return href
  }

  const route = sourceRelativePath
    .split(sep)
    .map(part => encodeURIComponent(part.toLowerCase()))
    .join('/')
    .replace(/\.mdx?$/iu, '')
    .replace(/(?:^|\/)index$/u, '')

  const prefix = base.replace(/\/$/u, '')

  return `${prefix}/${route}${route ? '/' : ''}${target.search}${target.hash}`
}

/** Rewrite only rendered anchors, leaving code examples and archive sources intact. */
export const rewriteDocsMarkdownLinks = (tree, sourcePath, docsRoot, base = '/') => {
  if (tree.type === 'element' && tree.tagName === 'a' && typeof tree.properties?.href === 'string') {
    tree.properties.href = resolveDocsMarkdownLink(tree.properties.href, sourcePath, docsRoot, base)
  }

  for (const child of tree.children ?? []) {
    rewriteDocsMarkdownLinks(child, sourcePath, docsRoot, base)
  }
}
