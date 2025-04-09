const extensions = ["html", "ts", "tsx", ];
const sourceDirectories = ["assets", "backend", "frontend", "redirects" ];

/** @type {import('tailwindcss').Config} */
export default {
  content: sourceDirectories.map(directory => `./${directory}/**/*.{${extensions.join(',')}}`),
  theme: { 
    extend: { }
  },
  plugins: [ ],
}
