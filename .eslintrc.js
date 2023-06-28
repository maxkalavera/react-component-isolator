module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
