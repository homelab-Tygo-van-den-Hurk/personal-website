"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions = ["html", "ts", "tsx",];
const sourceDirectories = ["src"];
let result = sourceDirectories.map(directory => `./${directory}/**/*.{${extensions.join(',')}}`);
/** @type {import('tailwindcss').Config} */
exports.default = {
    content: result,
    theme: {
        extend: {
            fontFamily: {
                oswald: ['"Oswald"', 'sans-serif'],
                serif4: ['"Source Serif 4"', 'serif'],
            },
        },
    },
    plugins: [],
};
