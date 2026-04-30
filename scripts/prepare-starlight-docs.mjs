import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const docsRoot = new URL('../packages/docs/src/content/docs/', import.meta.url)

const titleCase = (value) =>
  value
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const escapeYaml = (value) => value.replaceAll('"', '\\"')

async function* markdownFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)

    if (entry.isDirectory()) {
      yield* markdownFiles(path)
      continue
    }

    if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      yield path
    }
  }
}

function deriveTitle(path, content) {
  const h1 = content.match(/^#\s+(.+)$/m)?.[1]

  if (h1) {
    return h1.replace(/\s*[{]#[^}]+[}]$/u, '').trim()
  }

  const relativePath = relative(docsRoot.pathname, path)
  const basename = relativePath.split('/').at(-1)?.replace(/\.mdx?$/, '')

  return basename === 'index' ? 'Overview' : titleCase(basename ?? 'Documentation')
}

function deriveDescription(content) {
  const body = content.replace(/^---[\s\S]*?---\s*/u, '')
  const paragraph = body
    .split(/\n{2,}/u)
    .find((block) => !block.startsWith('#') && !block.startsWith('```') && block.trim().length > 0)

  if (!paragraph) {
    return undefined
  }

  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1')
    .replace(/[`*_<>]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim()
    .slice(0, 156)
}

function normalizeMarkdown(content) {
  return content
    .replace(/^:::\s*code-group\s*$/gmu, '')
    .replace(/^::::\s*code-group\s*$/gmu, '')
    .replace(/^:::\s*$/gmu, '')
    .replace(/^::::\s*$/gmu, '')
    .replace(/^---(?=#)/gmu, '---\n\n')
    .replace(/^```(\w+)\s+\[([^\]]+)\]\s*$/gmu, '```$1 title="$2"')
    .replaceAll('<HomePageSections />', '')
}

function ensureFrontmatter(path, content) {
  if (content.startsWith('---')) {
    return content
  }

  const title = deriveTitle(path, content)
  const description = deriveDescription(content)
  const frontmatter = [
    '---',
    `title: "${escapeYaml(title)}"`,
    description ? `description: "${escapeYaml(description)}"` : undefined,
    '---',
    ''
  ]
    .filter(Boolean)
    .join('\n')

  return `${frontmatter}\n\n${content}`
}

for await (const file of markdownFiles(docsRoot.pathname)) {
  const before = await readFile(file, 'utf8')
  const after = ensureFrontmatter(file, normalizeMarkdown(before))

  if (after !== before) {
    await writeFile(file, after)
  }
}
