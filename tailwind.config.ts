import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand greens
        green: {
          900: "var(--green-900)",
          700: "var(--green-700)",
          500: "var(--green-500)",
          100: "var(--green-100)",
          50: "var(--green-50)",
        },
        // Status colours
        emergency: {
          DEFAULT: "var(--emergency)",
          light: "var(--emergency-light)",
        },
        urgent: {
          DEFAULT: "var(--urgent)",
          light: "var(--urgent-light)",
        },
        purple: {
          DEFAULT: "var(--purple)",
          light: "var(--purple-light)",
        },
        info: {
          DEFAULT: "var(--blue)",
          light: "var(--blue-light)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          light: "var(--paper-light)",
        },
        // Surfaces
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          400: "var(--gray-400)",
          600: "var(--gray-600)",
          900: "var(--gray-900)",
        },
        // Text
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-disabled": "var(--text-disabled)",
        "text-inverse": "var(--text-inverse)",
        // Availability status (facility bed status)
        status: {
          "open-accepting": "var(--status-open-accepting)",
          limited: "var(--status-limited)",
          "emergency-only": "var(--status-emergency-only)",
          unavailable: "var(--status-unavailable)",
        },
        // Urgency classification
        urgency: {
          emergency: "var(--urgency-emergency)",
          critical: "var(--urgency-critical)",
          urgent: "var(--urgency-urgent)",
          routine: "var(--urgency-routine)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        // [fontSize, { lineHeight?, fontWeight, letterSpacing? }]
        "display-xl": ["40px", { fontWeight: "700" }],
        "display-lg": ["32px", { fontWeight: "700" }],
        "heading-xl": ["24px", { fontWeight: "600" }],
        "heading-lg": ["20px", { fontWeight: "600" }],
        "heading-md": ["17px", { fontWeight: "600" }],
        "heading-sm": ["15px", { fontWeight: "600" }],
        "body-lg": ["16px", { fontWeight: "400" }],
        "body-md": ["14px", { fontWeight: "400" }],
        "body-sm": ["13px", { fontWeight: "400" }],
        caption: ["12px", { fontWeight: "400" }],
        overline: ["11px", { fontWeight: "600", letterSpacing: "1.2px" }],
        code: ["15px", { fontWeight: "500" }],
        "code-lg": ["24px", { fontWeight: "500" }],
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        base: "var(--space-base)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        "5xl": "var(--space-5xl)",
        // touch targets
        tap: "var(--tap-min)",
        "tap-preferred": "var(--tap-preferred)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        flat: "var(--shadow-flat)",
        raised: "var(--shadow-raised)",
        floating: "var(--shadow-floating)",
      },
    },
  },
  plugins: [],
};

export default config;
