/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint", "tailwindcss"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off", 
    "react-hooks/exhaustive-deps": "off",
    "tailwindcss/no-custom-classname": "error",
    "tailwindcss/classnames-order": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "no-unused-vars": "off",
  },
  ignorePatterns: [
    ".eslintrc.cjs",  // 添加这个文件以忽略其检查
    "next.config.mjs" // 保持对 next.config.mjs 的忽略
  ],
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.js",
    },
    next: {
      rootDir: true,
    },
  },
};
