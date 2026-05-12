import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["system-ui", "-apple-system", "Segoe UI", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        border: "hsl(var(--border-default))",
        input: "hsl(var(--border-default))",
        ring: "var(--cyan-500)",
        background: "var(--bg-deep)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--purple-500)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "transparent",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "#ffffff",
        },
        amber: {
          DEFAULT: "var(--accent-amber)",
          foreground: "var(--bg-deep)",
        },
        muted: {
          DEFAULT: "var(--text-muted)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--cyan-500)",
          foreground: "var(--bg-deep)",
        },
        popover: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--text-primary)",
        },
        sidebar: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-primary)",
          primary: "var(--cyan-500)",
          "primary-foreground": "var(--bg-deep)",
          accent: "var(--bg-elevated)",
          "accent-foreground": "var(--text-primary)",
          border: "var(--border-default)",
          ring: "var(--cyan-500)",
        },
      },
      borderRadius: {
        pill: "100px",
        "2xl": "20px",
        xl: "16px",
        lg: "12px",
        md: "8px",
        sm: "6px",
        xs: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "typing": {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.3" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up-fade": "slide-up-fade 0.7s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2.5s ease-in-out infinite",
        "typing": "typing 1.2s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
