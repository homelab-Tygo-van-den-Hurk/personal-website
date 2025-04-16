import constructDocument from "./v1/document.js";
import createContext from "./context.js";
import * as FileSystem from "fs";
import path from "path";
import yaml from "yaml";

if (! process.env.REPOSITORY_OWNER) throw new Error("process.env.REPOSITORY_OWNER missing");

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

const document = await constructDocument(context);

console.log("Document constructed!");
console.log("Saving file...");

FileSystem.writeFileSync(path.join(process.cwd(), 'index.html'), document);

console.log("File saved!");
