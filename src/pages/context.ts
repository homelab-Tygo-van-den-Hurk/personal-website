import { Version1ConfigSchema, Version1Config } from "../lib/schemas/v1/config.v1.js";
import { ZodError } from "zod";

export default function createContext(input: any): Version1Config | never {

  const parser = matchParser(input?.version);
  
  try { return parser.parse(input); } 
  
  catch (error) {
    
    if (! (error instanceof ZodError) ) throw error;
    
    const zodError = error as ZodError;

    console.error(`There where ${zodError.errors.length} errors:`)
    for (const issue of zodError.errors) {
      console.error(" - Message:", issue.message);
      console.error("   Path:", issue.path.join("."));
      console.error("   Code:", issue.code);
    }
    
    process.exit(1);
  }
}

function matchParser(version: any) {

  const expectedType = "string";
  const foundType = typeof version;
  if ( foundType !== expectedType ) throw new Error(
    `expected version field "${version}" field to have type: "${expectedType}" but found: "${foundType}".`
  );

  const [ major, minor, patch, ] = (version as string).split(".");
  
  switch (major) {
    case "1": return Version1ConfigSchema;
    default: throw new Error(
      `unknown major version ${major} in version ${version}`
    );
  }
}
