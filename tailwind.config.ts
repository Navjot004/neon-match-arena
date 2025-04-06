
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Game rank colors
        bronze: "#CD7F32",
        silver: "#C0C0C0",
        gold: "#FFD700",
        platinum: "#E5E4E2",
        diamond: "#B9F2FF",
        master: "#9678D3",
        grandmaster: "#FF4500",
        // Neon colors for gaming theme
        neon: {
          blue: "#00BFFF",
          purple: "#8B5CF6",
          pink: "#D946EF",
          cyan: "#0ef",
          green: "#4ade80",
          red: "#f43f5e",
          yellow: "#facc15",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1) drop-shadow(0 0 5px var(--neon-color))",
          },
          "50%": {
            opacity: "0.8",
            filter: "brightness(0.8) drop-shadow(0 0 2px var(--neon-color))",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "background-shine": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon-blue": "pulse-neon 2s infinite",
        "pulse-neon-purple": "pulse-neon 2s infinite",
        "pulse-neon-cyan": "pulse-neon 2.5s infinite",
        "float": "float 3s ease-in-out infinite",
        "background-shine": "background-shine 2s linear infinite",
        "text-gradient": "text-gradient 3s ease infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-game":
          "linear-gradient(to right, var(--neon-primary), var(--neon-secondary))",
        "gradient-shine":
          "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 20%, transparent 40%)",
        "gradient-dark":
          "linear-gradient(to bottom, rgba(9, 9, 11, 0.8), rgba(0, 0, 0, 0.8))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
