import { zodToJsonSchema } from "zod-to-json-schema";
import { array, z } from "zod";

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
      .describe("The name of the URL, this is how its rendered on the web page.")
      .trim()
      .nonempty(),

    url: z.string()
      .describe("The URL where the link redirects.")
      .url(),

    icon: z.object({
      
      url: z.string()
        .describe("The URL at which the picture can be fetched.")
        .url(), 

      alt: z.string()
        .describe("The description of the picture.")
        .trim()
        .nonempty(), 
    
    }).describe("The icon to add next to the link")
      .optional(),
  
  }).describe("The links the different places.")
    .array()
    .optional(),


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

  }).describe("The skills you've acquired so far.")
    .array()
    .optional(),

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
