# AI Agent Guidelines

## Dependencies and Environment Requirements

* **Node.js Engine Floor**: The `engines.node` requirement in `package.json` files should be `"^20.19.0 || >=22.18.0"`. Do NOT recommend or automatically change it to allow versions like `>=20.0.0` or `>=22.0.0`. While this package supports Node 20 and 22, its required ESLint 10 peer is resolved to `eslint@10.5.0` (which requires `^20.19.0 || ^22.13.0 || >=24`), and its Tailwind plugin requires `^20.19.0 || ^22.12.0 || >=23.0.0`. Allowing lower versions within these major releases will cause package managers with engine checks to reject installs.
