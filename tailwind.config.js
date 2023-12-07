
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {

        // ----- Recommended -----
        // Use https://realtimecolors.com to pick your palette,
        // then supply https://tailwindshades.com with your colors
        // to generate the objects that are required below.

        primary: '#000'
      }
    }
  }
}
