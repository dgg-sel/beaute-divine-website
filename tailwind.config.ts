import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error": "#ffffff",
        "surface": "#f9f9f7",
        "on-background": "#1a1c1b",
        "surface-variant": "#e2e3e1",
        "inverse-surface": "#2f3130",
        "on-secondary-container": "#6d6234",
        "surface-container-high": "#e8e8e6",
        "on-surface-variant": "#4e4638",
        "primary-fixed": "#ffdea3",
        "on-error-container": "#93000a",
        "surface-bright": "#f9f9f7",
        "secondary-fixed-dim": "#d5c68e",
        "surface-dim": "#dadad8",
        "surface-container-low": "#f4f4f2",
        "error": "#ba1a1a",
        "on-tertiary": "#ffffff",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "tertiary-container": "#d2b26f",
        "tertiary-fixed-dim": "#e4c27d",
        "outline-variant": "#d1c5b3",
        "on-primary-fixed": "#261900",
        "primary": "#B28612",
        "background": "#f9f9f7",
        "on-tertiary-fixed-variant": "#5a4309",
        "surface-container-lowest": "#ffffff",
        "inverse-on-surface": "#f1f1ef",
        "on-tertiary-container": "#5a440a",
        "error-container": "#ffdad6",
        "primary-fixed-dim": "#eac16f",
        "on-secondary-fixed": "#221b00",
        "tertiary-fixed": "#ffdf9e",
        "surface-container": "#eeeeec",
        "surface-tint": "#B28612",
        "secondary-fixed": "#f2e2a8",
        "on-tertiary-fixed": "#261a00",
        "on-secondary-fixed-variant": "#50461b",
        "on-surface": "#1a1c1b",
        "outline": "#807666",
        "secondary-container": "#efe0a5",
        "on-primary-container": "#5d4300",
        "secondary": "#957B36",
        "primary-container": "#E8C87A",
        "inverse-primary": "#eac16f",
        "surface-container-highest": "#e2e3e1",
        "tertiary": "#745b21",
        "on-primary-fixed-variant": "#5c4200"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "section-padding": "120px",
        "container-max": "1200px",
        "gutter": "24px",
        "unit": "8px",
        "margin-mobile": "20px"
      },
      fontFamily: {
        "headline-lg": ["Bodoni Moda", "serif"],
        "label-sm": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Bodoni Moda", "serif"],
        "headline-lg-mobile": ["Bodoni Moda", "serif"],
        "display-lg": ["Bodoni Moda", "serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["48px", { lineHeight: "1.2", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "400" }],
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    },
  },
  plugins: [],
};
export default config;
