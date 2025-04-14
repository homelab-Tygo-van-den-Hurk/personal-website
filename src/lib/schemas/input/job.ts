import { differenceInYears, differenceInMonths } from "date-fns";
import { ISO_8601_FULL, isPresent } from "./date.js";
import Location from "./location.js"

interface JobArg {
  
  /** The name of the company. */
  readonly name: string,
    
  /** A short description of what you did there. */
  readonly description: string,
        
  /** The location of this company. */
  readonly location: Location,
  
  /** When you started working for/with this company. */
  readonly start_date: Date,
    
  /** When you stopped working for/with this company. */
  readonly end_date: Date,
}

export default class Job {

  /** The name of the company. */ 
  public readonly name: string;

  /** A short description of what you did there. */
  public readonly description: string;
  
  /** The location of this company. */
  public readonly location: Location;
  
  /** When you started working for/with this company. */
  public readonly start_date: Date;

  /** When you stopped working for/with this company. If not present assumed to still be working with/for them. */
  public readonly end_date: Date;

  /** Constructs a new Job object. */
  constructor (arg: JobArg) {
    this.description = arg.description;
    this.start_date = arg.start_date;
    this.end_date = arg.end_date;
    this.location = arg.location;
    this.name = arg.name;
  }

  public toHTML(): string {
    
    const years = differenceInYears(this.end_date, this.start_date);
    const months = differenceInMonths(this.end_date, this.start_date) - years * 12;
    const yearsStr = (years === 0 ? "" : ( years === 1 ? "1&nbsp;year" : `${years}&nbsp;years` ));
    const monthsStr = (months === 0 ? "" : ( months === 1 ? "1&nbsp;month" : `${months}&nbsp;months` ));
    const timeStr = ( yearsStr === "" || monthsStr === "" ? `${yearsStr}${monthsStr}` : `${yearsStr},&nbsp;${monthsStr}` );
    const totalTimeStr = ( this instanceof EducationJob ? "" : `(${timeStr})` );

    const monthsMap = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec" ];
    const fromStr = (isPresent(this.start_date)
      ? "Present" 
      : `${monthsMap[this.start_date.getMonth()]} ${this.start_date.getFullYear()}`
    );

    const tillStr = ( isPresent(this.end_date)
      ? "Present" 
      : `${monthsMap[this.end_date.getMonth()]} ${this.end_date.getFullYear()}`
    );

    return (/*html*/`
      <li>
        <h4 class="uppercase font-semibold text-base mt-6">${this.name}</h4>
        <p class="m-2"><span class="uppercase">${fromStr}&nbsp;-&nbsp;${tillStr}</span> ${totalTimeStr}</p>
        <p class="m-2">${this.description}</p>
        <p class="m-2">${this.location}</p>
      </li>`
    );
  }

  /** Creates a Thing object from an element. */
  public static from(element: unknown): Job {
   
    /* Type checking element */ {
      const foundType = typeof element;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `element is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const object = element as { [key:string]: any };

    /* Type checking the object.first property */ {
      const foundType = typeof object?.name;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `Job.name is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const name = (object?.name as string).trim();

    /* Type checking the object.description property */ {
      const foundType = typeof object.description;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `Job.description is of type ${foundType} while ${expectedType} was expected.`
      );
    }
    
    const description = (object?.description as string).trim();

    /* Type checking the object.location property */ {
      const foundType = typeof object.location;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `Job.location is of type ${foundType} while ${expectedType} was expected.`
      );
    }
    
    const location = Location.from(object?.location);

    /* Type checking the object.start_date property */ {
      const foundType = typeof object.start_date;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `Job.start_date is of type ${foundType} while ${expectedType} was expected.`
      ); 
      if (! ISO_8601_FULL.test(object.start_date)) throw new Error(
        `Job.start_date is done not comply with the ISO date standard: "${object.start_date}"`
      );
    }
    
    const start_date = new Date(object?.start_date);
    start_date.setHours(0, 0, 0, 0);

    /* Type checking the object.end_date property */ {
      const foundType = typeof object.end_date;
      const expectedType = "string";
      if (foundType !== expectedType && foundType !== "undefined") throw new Error(
        `Job.end_date is of type ${foundType} while ${expectedType} or undefined was expected.`
      );
      if (foundType !== "undefined" && ! ISO_8601_FULL.test(object.end_date)) throw new Error(
        `Job.end_date is done not comply with the ISO date standard: "${object.end_date}"`
      );
    }
    
    const end_date = new Date(object.end_date || Date.now());
    end_date.setHours(0, 0, 0, 0);

    return new Job({ name, description, location, start_date, end_date });
  }
}

export class CharityJob extends Job {
  public static from(element: unknown): CharityJob {
    const result = Job.from(element);
    return new CharityJob({ ...result });
  }
}

export class WorkJob extends Job {
  public static from(element: unknown): WorkJob {
    const result = Job.from(element);
    return new WorkJob({ ...result });
  }
}

export class EducationJob extends Job {
  public static from(element: unknown): EducationJob {
    const result = Job.from(element);
    return new EducationJob({ ...result });
  }
}
