import { differenceInYears } from "date-fns";
import * as FileSystem from "fs";
import path from "path";
import yaml from "yaml";

import Context from "../lib/schemas/input/context.js";
import Repository from "../lib/schemas/pinned-repos.js";

const repoURL = `https://github.com/${process.env.REPOSITORY_OWNER}/${process.env.REPOSITORY_NAME}`
const imageURL = process.env.PICTURE_URL || `https://github.com/${process.env.REPOSITORY_OWNER}.png`
console.log("Fetching input...");

const inputDir = process.env.INPUT_DIR || process.cwd()
const inputPath = process.env.INPUT_FILE || path.join(inputDir, 'input.yaml');
const content = FileSystem.readFileSync(inputPath, 'utf8');
const input = yaml.parse(content);

console.log("Input fetched!");
console.debug("input = ", input, "\n");
console.log("Constructing context...");

const context = Context.from(input);

console.log("Context constructed!");
console.debug("context = ", context, "\n");
console.log("Constructing document...");

const document = await (/*html*/`
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${context.personal_information.name.toString()}</title>
        <link rel="stylesheet" href="/tailwind.output.css">
    </head>
    <body class="min-h-screen flex flex-col">
      <header class="bg-slate-700"> 
        <img class="rounded-md" src="${imageURL}" alt="A photo of ${context.personal_information.name.toString()}">
        <h1>${context.personal_information.name.toString()}</h1>
        <p class="text-4xl">${context.personal_information.job_title}</p>
        <div class="grid grid-cols-[fit-content(100%)_1fr] grid-rows-2 gap-x-4 gap-y-1">
          <p class="uppercase m-0">Location</p> 
          <p class="m-0">${context.personal_information.location}</p>
          <p class="uppercase m-0">Age</p> 
          <p class="m-0">${differenceInYears(new Date(Date.now()), context.personal_information.date_of_birth)}</p>
        </div>
      </header>
      <main class="flex-1 bg-slate-500">
        <section id="about">
          <h2>About me</h2>
          <p class="break-words text-justify">
            ${context.personal_information.about}
          </p>
        </section>
        <section id="resume">
          <h2>Resume</h2>
            ${(():string => {
              if (context.career.jobs.length === 0) return "";
              else return ( /*html*/`
                <h3 class="" id="experience">Experience</h3>
                <p>Here are the jobs I've worked at:</p>
                <ol>
                  ${context.career.jobs.map(item => item.toHTML()).join("\n")}
                </ol>`
              );
            })()}
            ${(():string => {
              if (context.career.education.length === 0) return "";
              else return ( /*html*/`
                <h3 class="mt-12" id="education">Education</h3>
                <p>Here is the education I've followed:</p>
                <ol>
                  ${context.career.education.map(item => item.toHTML()).join("\n")}
                </ol>`
              );
            })()}
            ${(():string => {
              if (context.career.charity.length === 0) return "";
              else return ( /*html*/`
                <h3 class="mt-12" id="charity">Charity</h3>
                <p>Here is some charity I've done:</p>
                <ol>
                  ${context.career.charity.map(item => item.toHTML()).join("\n")}
                </ol>`
              );
            })()}
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <p>Here are my pinned repositories:</p>
          <ol class="p-0">
            ${await (async ():Promise<string> => {
              const repositories: Repository[] = await Repository.getPinnedRepositories(3);
              const result = repositories.map( item => item.toHTML() ).join("\n");
              console.log(result);
              return result;
            })()}
          </ol>
        </section>
      </main>
      <footer class="bg-slate-700">
        <p class="break-words text-justify">
          This page is open source, and you can improve it or host it yourself! All you need to do is fork it and 
          fill in a template. Check it out <a class="underline" href="${repoURL}">here</a>.
        </p>
        <p>
          Copyright &copy; 2023 - ${new Date().getFullYear()}
          &middot; ${context.personal_information.name.toString()}
          &middot; All rights reserved.
        </p>
      </footer>
    </body>
  </html>`
);

console.log("Document constructed!");
console.debug("document = ", document, "\n");
console.log("Saving file...");

const outputDir = process.env.OUTPUT_DIR || process.cwd()
const outputPath = process.env.OUTPUT_FILE || path.join(outputDir, 'index.html');
FileSystem.writeFileSync(outputPath, document);

console.log("File saved!");
console.debug("outputPath = ", outputPath, "\n");
