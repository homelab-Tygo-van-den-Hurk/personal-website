import { RedirectNode } from "#source/redirectNode";

const SUPPORTS_DARK_MODE = false;
const AUTHOR = "Tygo van den Hurk";
const DESCRIPTION = "Select your destination! from here, you can select any place you'd like to go! And you're be redirected there!!";
""
export default function htmlPage(title: string, node: RedirectNode): string {
  return (/*html*/`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="UTF-8">
        ${SUPPORTS_DARK_MODE?"":/*html*/`<meta name="darkreader-lock">`}
        <meta name="author" content="${AUTHOR}">
        <meta name="description" content="${DESCRIPTION}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/favicon.svg">
        <link rel="apple-touch-icon" href="/favicon.svg">
      </head>
      <body>
        <header>
          <h1>Redirection Station</h1>
          <p>
            Howdy there! From here, you can click on any of the links to get where you're supposed to be! As more 
            links become available they'll show up here! If you feel like there's one that's obviously missing, 
            then you can always get in touch <a href="/contact">here</a>.
          </p>
        </header>
        <main>
          ${node.toHtml()}
        </main>
        <footer>
          Copyright 
          &copy; 2023 - ${(new Date()).getFullYear()} 
          &middot; Tygo van den Hurk 
          &middot; All rights reserved
        </footer>
      </body>
    </html>`
  );
}
