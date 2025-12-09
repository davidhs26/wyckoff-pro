import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TradingView color palette
        tv: {
          black: "#131722",
          gray: "#5D6069",
          "gray-light": "#B2B5BE",
          blue: "#2962FF",
          "blue-dark": "#1E53E5",
          green: "#089981",
          red: "#F23645",
          border: "#E0E3EB",
          bg: "#F8F9FD",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Trebuchet MS",
          "Roboto",
          "Ubuntu",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "scale-up": "scaleUp 0.2s ease-out forwards",
        "pulse-red": "pulseRed 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseRed: {
          "0%": { boxShadow: "0 0 0 0 rgba(242, 54, 69, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(242, 54, 69, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(242, 54, 69, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

