# @santi020k/eslint-config-full

The batteries-included v3 package. It installs every supported framework and
integration config for teams that prefer one dependency over a smaller install.

```js
export { default } from '@santi020k/eslint-config-full/recommended'
```

“Batteries included” describes dependency availability, not rule activation.
The recommended entry uses the same composer and detection as Basic, so it
enables only the frameworks and feature packs detected for the current project.
Use explicit `features` or `frameworks` options when detection should not decide.
A disable directive for an inactive plugin rule is invalid ESLint configuration;
remove stale directives or explicitly enable the feature that owns the rule.

Package minor and patch versions are independent within the v3 family. The
resolved `@santi020k/eslint-config-basic` version determines composer behavior,
even when the Full package has a different minor version.

## Runtime support

| Dependency | Supported range | Release verification |
| --- | --- | --- |
| ESLint | `^10.0.0` | Exact `10.0.0` and the latest matching release |
| TypeScript | `>=5.0.0 <7.0.0` (optional) | Earliest published 5.x release (`5.0.2`) and the latest matching release |
| Node.js | `>=22.19.0` | Enforced by package engines and compatibility checks |

The packed-consumer release gate installs both ESLint/TypeScript matrix edges,
loads the one-line recommended config, lints a detected React file, verifies
Full's resolved Basic composer, and applies the repository's narrowly owned
upstream peer-warning policy. An accepted warning is not treated as active
feature support: Full installs every companion package, while detection decides
which configurations execute.

Use `@santi020k/eslint-config-basic` for the lean, modular default.
