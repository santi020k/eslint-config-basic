import core from "@santi020k/eslint-config-core";
import astro from "eslint-plugin-astro";

export default [
  ...core,
  ...astro.configs.recommended
];
