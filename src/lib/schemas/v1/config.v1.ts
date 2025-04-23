import { zodToJsonSchema } from "zod-to-json-schema";
import { array, tuple, z } from "zod";

import settings from "./settings-zod-schema.js";
import career from "./career-zod-schema.js";
import PersonName from "./name-zod-schema.js";

export const Version1ConfigSchema = z.object({
  
  version: z.coerce.string()
    .describe("The version of config file"),

  settings,
  career,

  links: z.object({

    name: z.string()
      .describe("The name of the URL, this is how its rendered on the web page and CV.")
      .trim()
      .nonempty(),
    
    raw_link_appearance: z.string()
      .describe("How the link will be rendered on the resume. If omitted then the raw URL will be used.")
      .trim()
      .nonempty()
      .optional(),

    url: z.string()
      .describe("The URL where the link redirects.")
      .url(),

    show: z.object({
      
      on_header: z.boolean()
        .describe("Wether or not to show this link on the header")
        .default(true),

      on_footer: z.boolean()
        .describe("Wether or not to show this link on the footer")
        .default(true),
      
        on_resume: z.boolean()
        .describe("Wether or not to show this link on your resume")
        .default(true),

    }).default({ on_header:true, on_footer:true, on_resume: true })
      .describe(""),
      
    icon: z.object({

      svg: z.string()
        .describe("An SVG that will be injected AS IS into the web page. Beware for XSS!")
        .optional(),
    
      image: z.object({
        
        url: z.string()
          .describe("The URL at which the picture can be fetched.")
          .url(), 

        alt: z.string()
          .describe("The description of the picture.")
          .trim()
          .nonempty(), 
      
      }).describe("The icon to add next to the link")
        .optional(),
        
    }).optional(),
      
  }).describe("The links the different places.")
    .array()
    .describe("This will be used to render links on your page.")
    .default([]),


  personal_information: z.object({
    
    name: PersonName,

    image_url: z.string()
      .url()
      .default(`https://github.com/${process.env.REPOSITORY_OWNER}.png`),

    job_title: z.string()
      .describe("The title you'd like to be addressed as, for example 'software engineer'.")
      .trim()
      .nonempty(),

    date_of_birth: z.string()
      .describe("The date on which you were born, used to calculate your age.")
      .date(),

    about: z.string()
      .describe("This is the text that will on your about me section. This can be quite long.")
      .trim()
      .nonempty(),

    location: z.string()
      .describe("Where you live")
      .trim()
      .nonempty(),

    phone: z.string()
      .describe("Your phone number. Can also be set as an environment variable (PHONE_NUMBER) at run time.")
      .trim()
      .nullable()
      .default(process.env.PHONE_NUMBER || null),

    email: z.string()
      .describe("Your email. Can also be set as an environment variable (EMAIL) at run time.")
      .trim()
      .nullable()
      .default(process.env.EMAIL || null),

    form: z.string()
      .url()
      .describe("A Form to contact you with. Can also be set as an environment variable (EMAIL) at run time.")
      .trim()
      .nullable()
      .default(null),
    
  }),

  skills: z.object({

    name: z.string()
      .describe("The name of the skill")
      .trim()
      .nonempty(),

    description: z.string()
      .describe("A short description of the skill")
      .trim()
      .nonempty(),

    icon: z.object({ 
      
      url: z.string()
        .describe("The URL at which the picture can be fetched.")
        .url(), 

      alt: z.string()
        .describe("The description of the picture.")
        .trim()
        .nonempty(), 

    }).optional(),

  }).describe("Describe a skill you've acquired so far.")
    .array()
    .describe("The skills you've acquired so far.")
    .default([]),

}).describe("This is the context in which the application works.")
  .readonly();

/** The JSON schema that version 1 has to follow. */
export const Version1ConfigJsonSchema = zodToJsonSchema(Version1ConfigSchema, "Version1Config");

/** The type for typechecking of the version 1 config. */
export type Version1Config = z.infer<typeof Version1ConfigSchema>;

// Updates and saves the new schema every time its run...

import * as FileSystem from "fs";
import path from "path";

const contents = JSON.stringify(Version1ConfigJsonSchema, null, 2);
const pathy = path.join(process.cwd(), 'schemas', 'v1.json');

FileSystem.writeFileSync(pathy, contents);
