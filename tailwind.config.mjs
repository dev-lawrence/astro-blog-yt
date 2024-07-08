/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    colors: {
      primary: {
        400: "#D75934",
      },
      grey: {
        100: "#F2F4F7",
        200: "#808080;",
      },

      neutral: {
        900: "#090D1F",
      },

      black: "#000",
      white: "#fff",
    },

    fontSize: {
      50: ".9rem",
      100: "1rem",
      200: "1.125rem",
      300: "1.25rem",
      400: "1.375rem",
      500: "1.5rem",
      600: "2rem",
      650: "2.25rem",
      700: "2.5rem",
      800: "3rem",
      900: "3.5rem",
      950: "4rem",
      1000: "4.5rem",
    },

    fontWeight: {
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
    },

    fontFamily: {
      sans: ["Poppins", "Helvetica", "Arial", "sans-serif"],
    },

    screens: {
      sm: "36rem",
      md: "48rem",
      lg: "64rem",
      xl: "68.75rem",
      "2xl": "90rem",
    },
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },

      animation: {
        bounce: "bounce 5s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
