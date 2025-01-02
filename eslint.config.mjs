import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Define ignored files or directories
  {
    ignores: ["node_modules/", ".next/", "public/"],
  },

  // Use Next.js recommended configuration
  ...compat.extends("next/core-web-vitals"),

  // Add custom rules
  {
    files: ["**/*.js", "**/*.jsx"], // Match JavaScript files
    languageOptions: {
      ecmaVersion: 2023, // Latest ECMAScript version
      sourceType: "module", // Use ES Modules
    },
    rules: {
      "no-unused-vars": "error", // Disallow unused variables
      "no-unused-expressions": "error", // Disallow unused expressions
      "prefer-const": "error", // Enforce use of const for variables that are never reassigned
      // 'no-console': 'warn', // Warn on console usage (optional, uncomment if needed)
      "no-undef": "error", // Disallow use of undefined variables
    },
  },
];

export default eslintConfig;
