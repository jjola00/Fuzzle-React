const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactNative = require("eslint-plugin-react-native");
const prettier = require("eslint-plugin-prettier");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", ".expo/**", "coverage/**", "dist/**"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      "react-native": reactNative,
      prettier,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off", // Turn off JS version in favor of TS version

      // React rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Native rules
      "react-native/no-unused-styles": "error",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "warn",

      // General rules
      "no-console": "warn",
      "prettier/prettier": "error",

      // Disable some rules that are too strict
      "no-undef": "off", // TypeScript handles this
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Configuration for Node.js config files
  {
    files: ["*.config.js", "babel.config.js", "jest.setup.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    },
  },
  // Configuration for Jest test files
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*", "jest.setup.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    },
  },
];
