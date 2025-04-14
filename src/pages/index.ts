import { differenceInYears } from "date-fns";
import * as FileSystem from "fs";
import path from "path";
import yaml from "yaml";

import Context from "../lib/schemas/input/context.js";
import Repository from "../lib/schemas/pinned-repos.js";

console.log("Fetching input...");

const inputDir = process.env.INPUT_DIR || process.cwd()
const inputPath = process.env.INPUT_FILE || path.join(inputDir, 'curriculum-vitae.yaml');
const content = FileSystem.readFileSync(inputPath, 'utf8');
const input = Object.freeze(yaml.parse(content));

console.log("Input fetched!");
console.debug("input = ", input, "\n");
console.log("Constructing context...");

const context = Object.freeze(Context.from(input));

console.log("Context constructed!");
console.debug("context = ", context, "\n");
console.log("Constructing document...");

const constrainWidth="max-w-[60rem] mx-auto"
const document = await (/*html*/`
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${context.personal_information.name.toString()}</title>
        <link rel="stylesheet" href="/tailwind.output.css">
    </head>
    <body class="min-h-screen flex flex-col bg-slate-500 p-0">
      <header class="bg-slate-700 p-0"> 
        <div class="${constrainWidth} p-6">
          <img class="rounded-md" 
            src="${input?.settings?.image_url || `https://github.com/${process.env.REPOSITORY_OWNER}.png`}" 
            alt="A photo of ${context.personal_information.name.toString()}">
          <h1>${context.personal_information.name.toString()}</h1>
          <p class="text-4xl">${context.personal_information.job_title}</p>
          <div class="grid grid-cols-[fit-content(100%)_1fr] grid-rows-2 gap-x-6 gap-y-1">
            <p class="uppercase m-0">Location</p> 
            <p class="m-0">${context.personal_information.location}</p>
            <p class="uppercase m-0">Age</p> 
            <p class="m-0">${differenceInYears(new Date(Date.now()), context.personal_information.date_of_birth)}</p>
          </div>
        </div>  
      </header>
      <main class="flex-1 ${constrainWidth}">
        <section id="about">
          <h2>About me</h2>
          <p class="break-words w-full box-border text-justify">
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
              const repositories: Repository[] = await Repository.getPinnedRepositories(input?.settings?.amount_of_repos || 3);
              return (/*html*/`
                <ol class="px-6">
                  ${repositories.map( item => item.toHTML() ).join("\n")}
                </ol>`
              );
            })()}
          </ol>
        </section>
      </main>
      <footer class="bg-slate-700 p-0">
        <div class="${constrainWidth} p-6">
          ${(():string => {
            const links = Object.keys(input?.links);
            if (links.length === 0) return "";
            else return ( /*html*/`
              <h2 id="contact">Contact</h2>
              <ul class="p-0">
                ${links.map( key => /*html*/ `
                  <li class="list-none">
                    <a href="${input.links[key]}">${key}</a>
                  </li>`
                ).join("\n")}
              </ul>`
            );
          })()}
          <p class="break-words text-justify">
            This page is open source, and you can improve it or host it yourself! All you need to do is fork it and 
            fill in a template. Check it 
            out <a href="https://github.com/homelab-tygo-van-den-Hurk/personal-website">here</a>.
          </p>
          <p class="text-center">
            Copyright &copy; 2023 - ${new Date(Date.now()).getFullYear()}
            &middot; ${context.personal_information.name.toString()}
            &middot; All rights reserved.
          </p>
        </div>  
      </footer>
      <div class=hidden>
        Created by Tygo van den hurk. 
        See <a href="https://redirects.tygo.van.den.hurk.dev/github/personal/">my personal github</a>, or
        see <a href="https://tygo.van.den.hurk.dev/">my personal website</a> for more information.
      </div>
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
