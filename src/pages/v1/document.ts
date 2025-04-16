import { differenceInYears } from "date-fns";
import { Version1Config } from "src/lib/schemas/v1/config.v1";
import Repository from "../../lib/schemas/pinned-repos.js";
import resumeSection from "./components/resume.section.js";
import contactSection from "./components/contact.section.js";

const constrainWidth="max-w-[60rem] mx-auto";

export default async function constructDocument(context: Version1Config) { return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="darkreader-lock">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${context.settings.website.title}</title>
      <link rel="stylesheet" href="./tailwind.output.css">
    </head>
    <body class="min-h-screen flex flex-col bg-layer-0 p-0">
      <header class="bg-layer-1 p-0"> 
        <div class="${constrainWidth} lg:grid lg:grid-cols-2">
          <div class="hidden relative lg:block">
            <img class="rounded-md relative top-10 w-full" 
              src="${context.personal_information.image_url}" 
              alt="A photo of ${context.personal_information.name.toString()}">
          </div>  
          <div id="header-text" class="p-6">
            <div class="h-[20vh] max-h-32"><!-- Spacer --></div>
            <h1 class="mt-0">${context.personal_information.name.toString()}</h1>
            <p class="text-4xl text-text-header">${context.personal_information.job_title}</p>
            <div class="grid grid-cols-[fit-content(100%)_1fr] grid-rows-2 gap-x-6 gap-y-1">
              <p class="text-text-header uppercase m-0">Location</p> 
              <p class="text-text-header m-0">${context.personal_information.location}</p>
              <p class="text-text-header uppercase m-0">Age</p> 
              <p class="text-text-header m-0">${
                differenceInYears( new Date(Date.now()), context.personal_information.date_of_birth )
              }</p>
            </div>
          </div>
        </div>  
      </header>
      <main class="flex-1 ${constrainWidth} lg:pt-16">
        <section id="about">
          <div class="max-w-md mx-auto">
            <img class="lg:hidden w-full rounded-md" 
              src="${context.personal_information.image_url}" 
              alt="A photo of ${context.personal_information.name.toString()}">
          </div>  
          <h2 class="line">About me</h2>
          <p class="break-words w-full box-border text-justify">
            ${context.personal_information.about}
          </p>
        </section>
        ${resumeSection(context)}
        ${await (async ():Promise<string> => {
          const repositories: Repository[] = await Repository.getPinnedRepositories(context);
          if (repositories.length === 0) return "";
          else return (/*html*/`
            <section id="projects">
              <h2 class="line mt-16">Projects</h2>
              <p class="text-center">
                Here I've collected my pinned repositories straight from GitHub, updated weekly!
              </p>
              <ol class="mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                ${repositories.map( item => item.toHTML() ).join("\n")}
              </ol>
            </section>`
          );
        })()}
      </main>
      <footer class="bg-layer-1 p-0">
        <div class="${constrainWidth} p-6">
          ${contactSection(context)}
          <p class="break-words text-justify">
            This page is open source, and you can improve it or host it yourself! All you need to do is fork it and 
            fill in a yaml template. Check it 
            out <a href="https://github.com/homelab-tygo-van-den-Hurk/personal-website">here</a>.
          </p>
          <p class="text-center">
            Copyright &copy; 2023 - ${new Date(Date.now()).getFullYear()}
            &middot; ${context.personal_information.name.toString()}
            &middot; All rights reserved.
          </p>
        </div>  
      </footer>
      <div id="credits" class="hidden">
        Created by Tygo van den hurk and contributors. 
        See <a href="https://redirects.tygo.van.den.hurk.dev/github/personal/">my personal github</a>, or
        see <a href="https://tygo.van.den.hurk.dev/">my personal website</a> for more information.
      </div>
    </body>
  </html>`
}
