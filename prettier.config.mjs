const config = {
  $schema: "http://json.schemastore.org/prettierrc",
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  bracketSpacing: true,
  semi: true,
  endOfLine: "auto",

  tailwindFunctions: ["clsx", "cx"],

  tailwindConfig: "./tailwind.config.ts",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
