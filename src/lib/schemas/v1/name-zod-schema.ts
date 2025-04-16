import { z } from "zod";

const rawNameSchema = z.object({

  first: z.string()
    .describe("Your first name")
    .trim()
    .nonempty(),

  middle: z.string()
    .describe("Your middel names.")
    .trim()
    .optional(),

  last: z.string()
    .describe("Your last name")
    .trim()
    .nonempty(),

}).describe("Your personal name.");

type Name = z.infer<typeof rawNameSchema> & {
  toString(): string;
};

const PersonName = rawNameSchema.transform((val): Name => ({
  ...val,
  toString() {
    if (this.middle) return `${this.first} ${this.middle} ${this.last}`;
    else return `${this.first} ${this.last}`;
  }
}));

export default PersonName;
