import { differenceInMonths, differenceInYears } from "date-fns";
import { z } from "zod";

/** The exact date that job fields have if there were not filled in */
export const TODAY = (Object.freeze(new Date(Date.now())).toISOString().split('T')[0]);

/** A job section, contains a name, description time span and location. */
const job = z.object({ 
  
  name: z.string()
    .describe("The name of the place, school or company.")
    .nonempty(),

  description: z.string()
    .describe("A short description of what you did there.")
    .nonempty(),

  start_date: z.string()
    .describe("When you started there")
    .date(),

  end_date: z.string()
    .describe("When you left. If not supplied assumed to still be there.")
    .date()
    .default(TODAY), // Assume for calculations its today.

  location: z.string()
    .describe("The location of the place")
    .nonempty(),

  show_on: z.object({

    website: z.boolean()
      .describe("Wether or not to show this on the website")
      .default(true),
  
    resume: z.boolean()
      .describe("Wether or not to show this on your resume")
      .default(true),
  
  }).describe("Options on where to show this onto.")
    .default({ website: true, resume: true })
});

export type Job = z.infer<typeof job>;

/** A zod schema of your career so far, so your education and jobs. */
const career = z.object({
  
  jobs:  z.array(job)
    .describe("The jobs you've taken so far."),

  education: z.array(job)
    .describe("The education you've followed so far."),
    
}).describe("This section describes your career, and will be on both the website as your CV.");

export default career;
