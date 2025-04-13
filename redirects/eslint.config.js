import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** The config that ESlint uses to check code. */
const eslintConfig = [
  {

    files: [
      "./src/**/*.ts", 
      "./src/**/*.tsx",
    ],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
    },

    rules: {
      "no-unused-vars": ["error"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "block-spacing": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "brace-style": [ "error", "stroustrup" ],
      "wrap-iife": ["error", "inside"],
      "space-unary-ops": ["error", { "words": true, "nonwords": true }],
      "lines-around-comment": ["error", { beforeBlockComment: true, }],
      "semi": ["error", "always"],
      "eol-last": ["error", "always"],
      "indent": ["error", 2],
      "prefer-const": ["error"],
      "comma-dangle": ["error", {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never"
      }],
    },
  },
];

export default eslintConfig;
