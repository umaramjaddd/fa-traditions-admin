/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9B5DE5",   // Rich Purple
        secondary: "#F15BB5", // Vibrant Pink
        softPurple: "#D8B4F8", // Light Lavender
        blush: "#FDCEDF",     // Soft Blush Pink
        cream: "#FFF5E1",     // Warm Cream
        deepRose: "#E63946",  // Elegant Deep Rose
        gold: "#FFD700",      // Luxury Gold
        darkGray: "#2A2A2A",  // Stylish Dark Gray
        softGray: "#F3F3F3",  // Gentle Soft Gray

      },
    },
  },
  plugins: [],
};
