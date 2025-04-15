const extensions = ["html", "ts", "tsx", ].join(',');
const sourceDirectories = ["src" ];

/** @type {import('tailwindcss').Config} */
const config = {
  content: sourceDirectories.map(
    directory => `./${directory}/**/*.{${extensions}}`
  ),
  plugins: [ ],
  theme: { 
    extend: {
      fontFamily: {
        oswald: ['"Oswald"', 'sans-serif'],
        serif4: ['"Source Serif 4"', 'serif'],
      },
      colors: {
        "accent": "var(--color-accent)",
        // Text
        "text-primary": "var(--color-text-primary)",
        "text-header": "var(--color-text-header)",
        // Backgrounds
        "layer-0": "var(--color-layer-0)",
        "layer-1": "var(--color-layer-1)",
        "layer-2": "var(--color-layer-2)",

        color1: "var(--color-color1)",
        color2: "var(--color-color2)",
        color3: "var(--color-color3)",
      },
    },
  },
};

console.log(config);

export default config;
