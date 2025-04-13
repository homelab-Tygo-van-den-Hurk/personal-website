const extensions = ["html", "ts", "tsx", ];
const sourceDirectories = ["assets/public", "backend/src", "frontend/src", "redirects/src" ];
let result = sourceDirectories.map(directory => `./${directory}/**/*.{${extensions.join(',')}}`)

/** @type {import('tailwindcss').Config} */
export default {
  content: result, //.push("./tailwind.*"),
  theme: { 
    extend: { 
      fontFamily: {
        oswald: ['"Oswald"', 'sans-serif'],
        serif4: ['"Source Serif 4"', 'serif'],
      },
    },
  },
  plugins: [ ],
}
