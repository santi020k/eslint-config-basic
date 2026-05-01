/* eslint func-style: off -- generator + recursive helpers read clearly as declarations */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const docsRoot = new URL('../packages/docs/src/content/docs/', import.meta.url)

const titleCase = value => value
  .replaceAll('-', ' ')
  .replaceAll('_', ' ')
  .replace(/\b\w/g, char => char.toUpperCase())

const escapeYaml = value => value.replaceAll('"', '\\"')

const normalizeTitle = value => value
  .replace(/\\([_`*[\]])/gu, '$1')
  .replace(/[`*_]/gu, '')
  .replace(/\s+/gu, ' ')
  .trim()
  .toLowerCase()

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
    .find(block => !block.startsWith('#') && !block.startsWith('```') && block.trim().length > 0)

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

function normalizeMarkdown(path, content) {
  let normalized = content
    .replace(/^:::\s*code-group\s*$/gmu, '')
    .replace(/^::::\s*code-group\s*$/gmu, '')
    .replace(/^:::\s*$/gmu, '')
    .replace(/^::::\s*$/gmu, '')
    .replace(/^---(?=#)/gmu, '---\n\n')
    .replace(/^```(\w+)\s+\[([^\]]+)\]\s*$/gmu, '```$1 title="$2"')
    .replaceAll('<HomePageSections />', '')

  return normalized
}

function splitFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    return undefined
  }

  const endIndex = content.indexOf('\n---', 4)

  if (endIndex === -1) {
    return undefined
  }

  const blockEnd = endIndex + '\n---'.length

  return {
    frontmatter: content.slice(0, blockEnd),
    body: content.slice(blockEnd).replace(/^\s*\n/u, '')
  }
}

function frontmatterTitle(frontmatter) {
  const quoted = frontmatter.match(/^title:\s*"([^"]+)"\s*$/mu)?.[1]
  const plain = frontmatter.match(/^title:\s*([^"\n][^\n]*)$/mu)?.[1]

  return quoted ?? plain?.trim()
}

function removeDuplicateTitle(content) {
  const parts = splitFrontmatter(content)

  if (!parts) {
    return content
  }

  const title = frontmatterTitle(parts.frontmatter)

  if (!title) {
    return content
  }

  const normalizedTitle = normalizeTitle(title)
  let body = parts.body

  body = body.replace(/^\[[^\n]+\]\([^)]+\)\n\n\*\*\*\n\n/u, '')

  body = body.replace(/^\*\*([^*]+)\*\*\n\n\*\*\*\n\n/u, (match, label) => normalizeTitle(label) === normalizedTitle ? '' : match)

  body = body.replace(/^#\s+(.+?)\s*\n+/u, (match, heading) => normalizeTitle(heading.replace(/\s*[{]#[^}]+[}]$/u, '')) === normalizedTitle ? '' : match)

  return `${parts.frontmatter}\n\n${body}`
}

function withV1Banner(path, content) {
  const relativePath = relative(docsRoot.pathname, path).replaceAll('\\', '/')

  if (!relativePath.startsWith('v1/')) {
    return content
  }

  const parts = splitFrontmatter(content)

  if (!parts || parts.frontmatter.includes('\nbanner:')) {
    return content
  }

  const banner =
    'banner:\n' +
    '  content: "You are viewing the v1 archive. For current setup guidance, use the <a href=\\"/guide/getting-started\\">v2 docs</a>."\n'

  return `${parts.frontmatter.replace(/\n---$/u, `\n${banner}---`)}\n\n${parts.body}`
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
  const after = withV1Banner(file, removeDuplicateTitle(ensureFrontmatter(file, normalizeMarkdown(file, before))))

  if (after !== before) {
    await writeFile(file, after)
  }
}
