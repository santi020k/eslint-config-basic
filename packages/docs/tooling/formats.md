# Formats

The `formats` option enables linting for non-code or mixed-content file formats.

| Format | Enum | Use It When |
| :--- | :--- | :--- |
| Markdown | `Format.Markdown` | The project contains Markdown content that should be linted. |
| MDX | `Format.Mdx` | The project contains MDX files. |
| JSONC | `Format.Jsonc` | The project uses JSON with comments. |
| YAML | `Format.Yaml` | The project contains YAML configuration files. |
| TOML | `Format.Toml` | The project contains TOML configuration files. |
| GraphQL | `Format.Graphql` | The project contains GraphQL documents. |

## Example

```js
import { eslintConfig, Format } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  formats: [Format.Markdown, Format.Mdx, Format.Yaml]
})
```

## Notes

- Format integrations are always explicit.
- Markdown and MDX are especially useful when the repository includes docs, content, or developer guides that should follow the same standards as source code.

## Repository Examples

- Format Playgrounds: [packages/playground/formats](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/formats)
- Optionals Package Source: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
