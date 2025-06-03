/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',       // blanc de fond
        foreground: '#111827',       // texte très foncé
        border: '#e5e7eb',           // gris clair pour les bordures
      },
    },
  },
  plugins: [],
}
