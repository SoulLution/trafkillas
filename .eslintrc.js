module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    parser: "babel-eslint",
  },
  // parser: "vue",
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    // "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "prettier"],
  rules: {
    semi: ["warn", "never"],
    'vue/no-mutating-props': 'off',
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/multi-word-component-names": "off",
    // "@typescript-eslint/no-empty-function": "off",
    "vue/html-self-closing": [
      "warn",
      {
        html: {
          void: "always",
          normal: "never",
          component: "any",
        },
      },
    ],
    "prettier/prettier": ["warn", { endOfLine: "auto", semi: false }],
  },
}
