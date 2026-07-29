---
title: "Formats"
description: "The formats option enables linting for non-code or mixed-content file formats."
---

The `formats` option enables linting for non-code or mixed-content file formats.

| Format | Enum | Use It When |
| :--- | :--- | :--- |
| Markdown | `Format.Markdown` | The project contains Markdown content that should be linted. |
| MDX | `Format.Mdx` | The project contains MDX files. |
| JSONC | `Format.Jsonc` | The project uses JSON with comments. |
| YAML | `Format.Yaml` | The project contains YAML configuration files. |
| TOML | `Format.Toml` | The project contains TOML configuration files. |
| Package.json | `Format.PackageJson` | The project's package.json should be semantically validated for npm standards. |
| GraphQL | `Format.Graphql` | The project contains GraphQL documents. |
| CSS | `Format.Css` | The project contains plain CSS files (uses the official `@eslint/css` plugin). |
| HTML | `Format.Html` | The project contains plain HTML files (uses `@html-eslint`). |

## Example

```js
import { defineConfig, Format } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  formats: [Format.Markdown, Format.Mdx, Format.Yaml]
})
```

## Notes

- Format integrations are always explicit.
- Markdown and MDX are especially useful when the repository includes docs, content, or developer guides that should follow the same standards as source code.

## Repository Examples

- Format Playgrounds: [packages/playground/formats](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/formats)
- Integrations Package Source: [packages/integrations](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
