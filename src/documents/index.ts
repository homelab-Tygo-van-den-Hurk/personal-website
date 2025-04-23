import * as FileSystem from "fs";
import createContext from "../lib/context.js";
import TypstDocument from "./typst-document.js";
import path from "path";
import yaml from "yaml";

if (!process.env.GITHUB_PAGES_URL) throw new Error("env var GITHUB_PAGES_URL not set.")

console.log("Fetching input file!");

const content = FileSystem.readFileSync(path.join(process.cwd(), 'curriculum-vitae.yaml'), 'utf8');

console.log("Input file fetched!");
console.log("Serializing input...");

const input = Object.freeze(yaml.parse(content));

console.log("Input Serialized!");
console.log("Parsing input...");

const context = createContext(input);

console.log("Input parsed!");
console.log("Constructing document...");

const document = await TypstDocument.create(context);

console.log("Document constructed!");
console.log("Saving file...");

FileSystem.writeFileSync(path.join(process.cwd(), 'main.typ'), document);

console.log("File saved!");
