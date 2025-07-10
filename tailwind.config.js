/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 3s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translate(-50%, -20px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        glow: {
          "0%": {
            "box-shadow": "0 0 5px #ff6b6b, 0 0 10px #ff6b6b, 0 0 15px #ff6b6b",
            "background-color": "#ff6b6b",
          },
          "100%": {
            "box-shadow":
              "0 0 20px #ff6b6b, 0 0 30px #ff6b6b, 0 0 40px #ff6b6b",
            "background-color": "#ff4747",
          },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
      },
      colors: {
        primary: "#fac24f",
        secondary: "#cd6e15",
        gothic: {
          dark: "#2a1810",
          light: "#8b4513",
          gold: "#ffd700",
        },
      },
      backgroundImage: {
        "golden-gradient": "linear-gradient(45deg, #ffd700, #ffa500, #ffd700)",
        "smoke-pattern": 'url("/smoke.png")',
        "temple-pattern": 'url("/temple-bg.webp")',
        statue: 'url("/statue.webp")',
      },
      backgroundColor: {
        page: "#fcecc8",
      },
    },
  },
  plugins: [],
};
