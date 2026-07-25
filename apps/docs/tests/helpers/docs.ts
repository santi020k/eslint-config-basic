import fs from 'node:fs'
import path from 'node:path'

export const getDocUrls = (dir: string, baseDir = dir): string[] => {
  const urls: string[] = []

  if (!fs.existsSync(dir)) return urls

  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const resolvedPath = path.resolve(dir, file.name)

    if (file.isDirectory()) {
      urls.push(...getDocUrls(resolvedPath, baseDir))

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
