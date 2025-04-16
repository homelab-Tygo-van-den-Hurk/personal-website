import { z } from "zod";

const DEFAULTS = Object.freeze({
  website: {
    repositories: {
      fetch: true,
      owner: process.env.REPOSITORY_OWNER!,
      amount: 3,
    },
    form: {
      url: null,
      fields: {
        email: {
          placeholder: "you@example.com"
        },
        subject: {
          placeholder: "I'm reaching out because..."
        },
        message: {
          placeholder: "hey there!\n\nI'm reaching out because..."
        },
      },
    },
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/** The general settings of both the website and the document. */
const settings = z.object({
    
  website: z.object({

    prefer_break_after_first_name: z.boolean()
      .describe("Wether or not to nudge the browser to put the first name and the rest on a different line on the header.")
      .default(true),

    title: z.string()
        .describe("The title of the web page in the tab.")
        .default(`${process.env.REPOSITORY_OWNER} - Portfolio`),

    repositories: z.object({
  
      fetch:  z.boolean()
        .describe("Wether to fetch and display them at all.")
        .default(DEFAULTS.website.repositories.fetch),
    
      owner:  z.string()
        .describe("Who to fetch from, must be a GitHub user name.")
        .default(DEFAULTS.website.repositories.owner),
    
      amount: z.number()
        .describe("How many to fetch.")
        .default(DEFAULTS.website.repositories.amount),
    
    }).describe("Settings related to your github repositories.")
      .strict()  
      .default(DEFAULTS.website.repositories),


    form: z.object({

      url: z.string()
        .url()
        .nullable()
        .default(DEFAULTS.website.form.url),

      fields: z.object({
        
        email: z.object({
          placeholder: z.string()
            .describe("The placeholder on this field")
            .default(DEFAULTS.website.form.fields.email.placeholder),
        }).describe("The first field is an email field"),

        subject: z.object({
          placeholder: z.string()
            .describe("The placeholder on this field")
            .default(DEFAULTS.website.form.fields.subject.placeholder),
        }).describe("The second field is the subject field"),
          
        message: z.object({
          placeholder: z.string()
            .describe("The placeholder on this field")
            .default(DEFAULTS.website.form.fields.message.placeholder),
        }).describe("The last field is the message field"),
      
      }).describe("A form field on the website")
        .strict()
        .default(DEFAULTS.website.form.fields)
    
    }).describe("Settings to the form onto the website")
      .strict()
      .default(DEFAULTS.website.form),

  }).describe("Settings related to the website only.")
    .strict()
    .default(DEFAULTS.website),

}).describe("All the settings you can change.")
  .strict()
  .default(DEFAULTS);


type Test = z.infer<typeof settings>;

export default settings;
