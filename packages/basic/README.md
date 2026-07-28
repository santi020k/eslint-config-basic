# @santi020k/eslint-config-basic

The lean v3 default for ESLint 10 flat config.

```sh
npm install -D eslint @santi020k/eslint-config-basic
```

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig()
```

Add only the framework and granular feature-pack packages that the project
uses. Choose `@santi020k/eslint-config-full` for the batteries-included
dependency model.

```sh
basic-eslint migrate --to v3
basic-eslint baseline --preset pedantic
basic-eslint profile
basic-eslint snapshot
basic-eslint diff
basic-eslint generate-skill --with-eslint-mcp
```

- [Documentation](https://eslint.santi020k.com/)
- [Migration from v2](https://eslint.santi020k.com/guide/migration-v2-to-v3/)
- [Repository](https://github.com/santi020k/eslint-config-basic)
