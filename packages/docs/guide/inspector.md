# Inspector

The repository includes the ESLint config inspector so you can see the final merged config instead of guessing which layer is responsible for a rule.

## Run It

```bash
npm run inspector
```

## What It Is Useful For

- Confirming whether a rule comes from the core package, a framework package, or an optional integration.
- Verifying the order of config layers.
- Debugging conflicts between TypeScript, framework packages, and formatting tools.
- Understanding what `strict: true` or a preset changed in the final output.

## Recommended Workflow

- Start with the inspector when the final rule value is surprising.
- Compare the result with the docs page for the relevant framework or optional integration.
- Use playgrounds to reproduce the issue in a real project shape.

## Repository Links

- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)

## Related Pages

- [Configuration](/guide/configuration)
- [Playgrounds](/guide/playgrounds)
- [API Reference](/api/)
