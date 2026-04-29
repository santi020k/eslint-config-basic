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

## Tailwind CSS Performance (v4)

Tailwind CSS v4 uses a heavy initialization process in its worker threads. In monorepos or complex projects, this can cause ESLint to time out with an error like `Atomics.wait() failed: timed-out`.

To fix this, it is highly recommended to provide an explicit `entryPoint` in your ESLint settings. This prevents the plugin from searching your entire workspace for a Tailwind configuration.

### How to configure

You can pass the `entryPoint` by appending a configuration object to the array returned by `eslintConfig`:

```js
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    libraries: [Library.Tailwind]
  }),
  {
    name: 'project/tailwind-settings',
    settings: {
      'better-tailwindcss': {
        // Point this to your main CSS file (v4) or tailwind.config.js (v3)
        entryPoint: './src/index.css'
      }
    }
  }
]
```

> [!TIP]
> If you are still experiencing timeouts after setting the `entryPoint`, you can increase the internal worker timeout by setting the `SYNCKIT_TIMEOUT` environment variable (e.g., `SYNCKIT_TIMEOUT=60000 eslint .`).

## Repository Examples

- Library Playgrounds: [packages/playground/libraries](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries)
- Optionals Package Source: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
