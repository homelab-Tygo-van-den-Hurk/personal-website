const extensions = ["html", "ts", "tsx", ];
const sourceDirectories = ["src" ];
let result = sourceDirectories.map(directory => `./${directory}/**/*.{${extensions.join(',')}}`)

console.log(result);

/** @type {import('tailwindcss').Config} */
export default {
  content: result,
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
