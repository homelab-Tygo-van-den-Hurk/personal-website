import { differenceInYears } from "date-fns";
import { Version1Config } from "src/lib/schemas/v1/config.v1";
import Repository from "../../lib/schemas/pinned-repos.js";
import resumeSection from "./components/resume.section.js";
import contactSection from "./components/contact.section.js";

if (! process.env.GITHUB_PAGES_URL) throw new Error("env var GITHUB_PAGES_URL is not set");

export default async function constructDocument(context: Version1Config) { return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>${context.settings.website.title}</title>
      <meta charset="UTF-8">
      <meta name="darkreader-lock">
      <meta name="keywords" content="${context.settings.website.meta.keywords}">
      <meta name="description" content="${context.settings.website.meta.description}">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta property="og:title" content="${context.settings.website.title}">
      <meta property="og:description" content="${context.settings.website.meta.description}">
      <meta property="og:url" content="${process.env.GITHUB_PAGES_URL}">
      <meta property="og:image" content="${context.personal_information.image_url}">
      <meta property="og:type" content="website">
      <link rel="stylesheet" href="./tailwind.output.css">
      <link rel="canonical" href="${process.env.GITHUB_PAGES_URL}">
      <link rel="preload" href="${context.personal_information.image_url}" as="image">
      </head>
    <body class="min-h-screen flex flex-col bg-layer-0 p-0 *:!w-full *:*:!max-w-[60rem] *:*:mx-auto">
      <header class="bg-layer-1 p-0"> 
        <div class="p-6 md:grid grid-cols-[fit-content(100%)_1fr] gap-x-6">
          <div class="hidden md:flex flex-col max-w-44 lg:max-w-sm">
            <div class="flex-1"><!-- Spacer --></div>
            <img class="rounded-md aspect-square relative lg:bottom-[-4em]" 
              src="${context.personal_information.image_url}" 
              alt="A photo of ${context.personal_information.name.toString()}">
          </div>
          <div>
            <div class="h-[20vh] max-h-32"><!-- Spacer --></div>
            <h1 class="mt-0">${context.settings.website.prefer_break_after_first_name
              ? ( context.personal_information.name.middle
                ? `${context.personal_information.name.first} ${context.personal_information.name.middle?.replace(" ", "&nbsp;")}&nbsp;${context.personal_information.name.last.replace(" ", "&nbsp;")}`
                : `${context.personal_information.name.first} ${context.personal_information.name.last.replace(" ", "&nbsp;")}`
              )
              : context.personal_information.name.toString()
            }</h1>
            <p class="text-4xl text-text-header">${context.personal_information.job_title}</p>
            <div class="grid grid-cols-[fit-content(100%)_1fr] grid-rows-2 gap-x-6 gap-y-1">
              <p class="text-text-header uppercase m-0">Location</p> 
              <p class="text-text-header m-0">${context.personal_information.location}</p>
              <p class="text-text-header uppercase m-0">Age</p> 
              <p class="text-text-header m-0">${
                differenceInYears( new Date(Date.now()), context.personal_information.date_of_birth )
              }</p>
            </div>
            ${context.links.filter( link => link.icon ).length === 0 ? "" : ( /*html*/`
              <div class="flex flex-wrap justify-start w-full mt-3">
                ${context.links.filter( link => link.show.on_header && link.icon ).map( link => /*html*/`
                  <a href="${link.url}" class="mr-6 *:w-8 *:aspect-square">${link.icon?.svg 
                    ? `${link.icon.svg}` 
                    : /*html*/`<img class="inline-block text-text-header" src="${link.icon?.image?.url!}" alt="${link.icon?.image?.alt!}">`
                  }</a>`
                ).join("\n")}
              </div>`
            )}
            </div>
          </div>
        </div>
      </header>
      <main class="flex-1 lg:pt-16">
        ${resumeSection(context)}
        ${await (async ():Promise<string> => {
          const repositories: Repository[] = await Repository.getPinnedRepositories(context);
          if (repositories.length === 0) return "";
          else return (/*html*/`
            <section id="projects">
              <h2 class="line mt-16">Projects</h2>
              <p class="text-center">
                Here I've collected my pinned repositories straight from GitHub, updated weekly! To see more of my 
                work you can <a href="https://github.com/${context.settings.website.repositories.owner}/">visit my github profile</a>!
              </p>
              <ol class="mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                ${repositories.map( item => item.toHTML(context) ).join("\n")}
              </ol>
            </section>`
          );
        })()}
      </main>
      <footer class="bg-layer-1 p-0">
        <div class="p-6">
          ${contactSection(context)}
          <p class="break-words text-justify">
            This page is open source, and you can improve it or host it yourself! All you need to do is fork it and 
            fill in a yaml template. you 
            can <a href="https://github.com/homelab-tygo-van-den-Hurk/personal-website">check out the source code</a> on 
            GitHub.
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
