import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/taponbon-card.ts",
  output: {
    file: "../custom_components/taponbon/frontend/taponbon-card.js",
    format: "es",
  },
  plugins: [resolve(), typescript(), terser({ format: { comments: false } })],
};
