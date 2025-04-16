import { Version1Config } from "src/lib/schemas/v1/config.v1";

/** Creates a contact section with links, and forms based on the context. */
export default function contactSection(context: Version1Config): string {
  return ( /*html*/`
    <section id="contact">
      <h2 >Contact</h2>
      ${createForm(context)}
      ${createLinks(context)}
    </section>
    `);
}

/** Creates a contact form based on the context. */
export function createForm(context: Version1Config): string {

  if (! context.settings.website.form.url) return "";

  const style = {
    label: "block mt-3 w-fit mx-auto text-text-header",
    input: "w-full block rounded-md text-text-header bg-layer-2 p-3 text-center",
  };

  const submitButton = (extraClasses:string) => ( /*html*/`
    <div class="w-full mt-6 ${extraClasses}">            
      <div class="mx-auto w-fit">
        <input class="bg-accent rounded-md text-text-header p-3"
          type="submit" value="Sent">
      </div>
    </div>`
  );

  return ( /*html*/`
    <p>Fill in this form to sent me an email and I'll get back to you as soon as I can.</p>
    <form method="POST" action="${context.settings.website.form.url}">
      <div class="lg:grid grid-cols-2 gap-x-4">
        <div>
          <label for="email" class="${style.label}">Email-address</label>
          <input class="${style.input}" placeholder="${context.settings.website.form.fields.email.placeholder}"
            name="email" autocomplete="email" type="email" required>
          <label class="${style.label}" for="subject">Subject</label>
          <input class="${style.input}" name="subject" type="text" 
            placeholder="${context.settings.website.form.fields.subject.placeholder}" required>
          ${submitButton("hidden")}
        </div>  
        <div class="flex flex-col">
          <label class="${style.label}" for="message">Message</label>
          <textarea class="${style.input} !text-left min-h-32 flex-1" 
            placeholder="${context.settings.website.form.fields.message.placeholder}" name="message" required></textarea>
        </div>  
      </div>
      ${submitButton("")}
    </form>`
  );
}

/** Creates the links in the contact section */
export function createLinks(context: Version1Config): string {
  
  if (! context.links) return "";
  
  if (context.links.length === 0) return "";
  
  return ( /*html*/`
    <ul class="p-2 mt-10 flex flex-wrap justify-center w-full ">
      ${context.links.map( item => {
        
        const image = (item.icon ? /*html*/`<img src="${item.icon.url}" alt="${item.icon.alt}">` : "" );

        return /*html*/ `
        <li class="list-none inline-block m-3">
          <a class="text-text-header no-underline hover:underline" href="${item.url}">${image} ${item.name}</a>
        </li>`
      }).join("\n")}
    </ul>`
  );
}
