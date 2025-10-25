/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ui: ['var(--font-ui)'], // теперь className="font-ui" = Inter Variable
      },
      colors: {
        // Foreground
        "fg-1": "var(--fg-1)",
        "fg-2": "var(--fg-2)",
        "fg-3": "var(--fg-3)",
        "fg-inverted": "var(--fg-inverted)",
        "fg-disabled": "var(--fg-disabled)",
        "fg-brand": "var(--fg-brand)",
        "fg-success": "var(--fg-success)",
        "fg-error": "var(--fg-error)",

        // Background
        "bg-1": "var(--bg-1)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        "bg-inverted": "var(--bg-inverted)",
        "bg-controls": "var(--bg-controls)",
        "bg-disabled": "var(--bg-disabled)",
        "bg-brand": "var(--bg-brand)",
        "bg-success": "var(--bg-success)",
        "bg-error": "var(--bg-error)",

        // Stroke
        "stroke-1": "var(--stroke-1)",
        "stroke-controls": "var(--stroke-controls)",
        "stroke-disabled": "var(--stroke-disabled)",
        "stroke-brand": "var(--stroke-brand)",
        "stroke-success": "var(--stroke-success)",
        "stroke-error": "var(--stroke-error)",

        // Focus ring
        "focus-outside": "var(--focus-outside)",

        // States (готовые HSLA)
        "state-default-hover": "var(--state-default-hover)",
        "state-default-pressed": "var(--state-default-pressed)",
        "state-inverted-hover": "var(--state-inverted-hover)",
        "state-inverted-pressed": "var(--state-inverted-pressed)",
        "state-brand-hover": "var(--state-brand-hover)",
        "state-brand-pressed": "var(--state-brand-pressed)",
        "state-error-hover": "var(--state-error-hover)",
        "state-error-pressed": "var(--state-error-pressed)"
      },
      borderRadius: { lg: "12px", xl: "16px" }
    }
  },
  plugins: []
};