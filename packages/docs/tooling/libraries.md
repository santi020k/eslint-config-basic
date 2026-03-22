# Libraries

The `libraries` option enables integrations that usually correspond to major project dependencies.

| Integration | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| Tailwind CSS | `Library.Tailwind` | The project uses Tailwind CSS. | Yes |
| I18next | `Library.I18next` | The project uses I18next. | Yes |
| Stencil | `Library.Stencil` | The project uses Stencil. | Yes |
| TanStack Query | `Library.TanstackQuery` | The project uses TanStack Query. | Yes |
| TanStack Router | `Library.TanstackRouter` | The project uses TanStack Router. | Yes |
| Storybook | `Library.Storybook` | The project uses Storybook. | Yes |

## Example

```js
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  libraries: [Library.Tailwind, Library.Storybook]
})
```

## Notes

- The library integrations stay optional, so projects only install and enable what they use.
- Detection helps the CLI and zero-argument config path, but you can still choose the final composition explicitly.

## Repository Examples

- Library Playgrounds: [packages/playground/libraries](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries)
- Optionals Package Source: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
