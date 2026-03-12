---
"@santi020k/eslint-config-basic": patch
"@santi020k/eslint-config-core": patch
---

feat: add GitHub-linked changelogs and automatic GitHub releases with tags

- Switched changelog generator to `@changesets/changelog-github` for richer changelogs with PR links, commit references, and contributor credits
- Configured release workflow to create GitHub releases with git tags on publish
