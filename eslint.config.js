import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Design-system adherence — ported from design-system/lint/adherence.oxlintrc.json
    // (the Claude Design export's own lint config). `warn`, not `error`: the
    // ~189 pre-existing hex/px literals across src/components/landing are
    // tracked debt, not a build-breaking requirement. See DESIGN.md.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/chart.tsx"],
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Cor hex solta — use um token do design system (var(--...) ou a classe Tailwind equivalente). Ver DESIGN.md.",
        },
        {
          selector: "Literal[value=/\\b\\d+px\\b/]",
          message: "Valor px solto — use um token de espaçamento/raio do design system. Ver DESIGN.md.",
        },
      ],
    },
  },
);
