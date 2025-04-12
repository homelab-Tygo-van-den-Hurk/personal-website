const extensions = ["html", "ts", "tsx", ];
const sourceDirectories = ["assets/src", "backend/src", "frontend/src", "redirects/src" ];
let result = sourceDirectories.map(directory => `./${directory}/**/*.{${extensions.join(',')}}`)

/** @type {import('tailwindcss').Config} */
export default {
  content: result, //.push("./tailwind.*"),
  theme: { 
    extend: { }
  },
  plugins: [ ],
}
