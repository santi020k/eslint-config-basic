import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// Changesets indents paragraph separators in multiline release notes. Preserve
// meaningful Markdown hard breaks and code indentation; normalize blank lines only.
export const normalizeChangelogWhitespace = content => content.replace(/^[\t ]+(?=\r?$)/gmu, '')

export const formatGeneratedChangelogs = cwd => {
  const changedFiles = []

  for (const entry of readdirSync(join(cwd, 'packages'), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const path = join(cwd, 'packages', entry.name, 'CHANGELOG.md')

    if (!existsSync(path)) continue

    const content = readFileSync(path, 'utf8')
    const formatted = normalizeChangelogWhitespace(content)

    if (content === formatted) continue

    writeFileSync(path, formatted)

    changedFiles.push(path)
  }

  return changedFiles
}

if (process.argv[1]?.endsWith('format-changelogs.mjs')) {
  const changedFiles = formatGeneratedChangelogs(process.argv[2] ?? process.cwd())

  console.log(`Normalized generated blank lines in ${changedFiles.length} package changelog(s).`)
}
