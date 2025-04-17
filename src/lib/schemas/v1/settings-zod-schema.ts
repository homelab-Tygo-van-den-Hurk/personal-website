import { z } from "zod";

const DEFAULTS = Object.freeze({
  website: {
    meta: {
      description: `This is ${process.env.REPOSITORY_OWNER}s portfolio. In here I'll tell you a little about myself and show of my works!`,
      keywords: `${process.env.REPOSITORY_OWNER}, portfolio`
    },    
    repositories: {
      fetch: true,
      owner: process.env.REPOSITORY_OWNER!,
      amount: 3,
    },
    form: {
      url: null,
      fields: {
        email: {
          placeholder: "you@example.com",
          show: true
        },
        phone: {
          placeholder: "+31 6 1234567890",
          show: true
        },
        subject: {
          placeholder: "I'm reaching out because...",
          show: true
        },
        message: {
          placeholder: "hey there!\n\nI'm reaching out because...",
          show: true
        },
      },
    },
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/** The general settings of both the website and the document. */
const settings = z.object({
    
  website: z.object({

    meta: z.object({

      description: z.string()
        .describe("This is the description of the website. It's what will show up in search results.")
        .default(DEFAULTS.website.meta.description),

      keywords: z.string()
        .describe("These are the keywords of the website. It will help with showing up in search results.")
        .default(DEFAULTS.website.meta.description),

    }).describe("This settings allows you to change the meta data of the website.")
      .default(DEFAULTS.website.meta),
    
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
        
          show: z.boolean()
            .describe("Wether or not to show the field")
            .default(DEFAULTS.website.form.fields.email.show)

        }).describe("The first field is an email field"),

        phone: z.object({
          
          placeholder: z.string()
            .describe("The placeholder on this field")
            .default(DEFAULTS.website.form.fields.phone.placeholder),

          show: z.boolean()
            .describe("Wether or not to show the field")
            .default(DEFAULTS.website.form.fields.phone.show)

        }).describe("The second field is the subject field"),
          
        subject: z.object({
          
          placeholder: z.string()
            .describe("The placeholder on this field")
            .default(DEFAULTS.website.form.fields.subject.placeholder),

          show: z.boolean()
            .describe("Wether or not to show the field")
            .default(DEFAULTS.website.form.fields.subject.show)

        }).describe("The second field is the subject field"),
          
        message: z.object({

          placeholder: z.string()
            .describe("The placeholder on this field")
            .default(DEFAULTS.website.form.fields.message.placeholder),

          show: z.boolean()
            .describe("Wether or not to show the field")
            .default(DEFAULTS.website.form.fields.message.show)

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


  export default settings;
