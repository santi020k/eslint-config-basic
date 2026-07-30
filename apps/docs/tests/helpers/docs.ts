import fs from 'node:fs'
import path from 'node:path'

const frozenDocDirectories = new Set(['v1', 'v2'])

export const getDocUrls = (dir: string, baseDir = dir): string[] => {
  const urls: string[] = []

  if (!fs.existsSync(dir)) return urls

  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const resolvedPath = path.resolve(dir, file.name)

    if (file.isDirectory()) {
      const relativeDirectory = path.relative(baseDir, resolvedPath)
      const topLevelDirectory = relativeDirectory.split(path.sep)[0]

      if (!frozenDocDirectories.has(topLevelDirectory)) {
        urls.push(...getDocUrls(resolvedPath, baseDir))
      }

      continue
    }

    if (!file.name.endsWith('.md') && !file.name.endsWith('.mdx')) continue

    const relativePath = path.relative(baseDir, resolvedPath)
    const withoutExtension = relativePath.replace(/\.(md|mdx)$/u, '')
    let urlPath = '/' + withoutExtension.split(path.sep).join('/').toLowerCase()

    if (urlPath === '/index') {
      urlPath = '/'
    } else if (urlPath.endsWith('/index')) {
      urlPath = urlPath.slice(0, -5)
    } else {
      urlPath += '/'
    }

    urls.push(urlPath)
  }

  return urls
}
