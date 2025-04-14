import Name from "./name.js";
import Location from "./location.js";
import { ISO_8601_FULL } from "./date.js";

interface Personal_InformationArg {
  
  /** The job title you'd like to have. For example "Software engineer". */
  readonly job_title: Date,

  /** The date at which you were born. Used for calculating your age. */
  readonly date_of_birth: Date,

  /** Your name, used everywhere your name is used. */
  readonly name: Name,

  /** A description about you. */
  readonly about: string,

  /** The location where you live. */
  readonly location: Location,
}

export default class Personal_Information {

  /** The job title you'd like to have. For example "Software engineer". */
  public readonly job_title: Date;

  /** The date at which you were born. Used for calculating your age. */
  public readonly date_of_birth: Date;

  /** Your name, used everywhere your name is used. */
  public readonly name: Name;

  /** A description about you. */
  public readonly about: string;

  /** The location where you live. */
  public readonly location: Location;

  constructor(arg: Personal_InformationArg) {
    this.date_of_birth = arg.date_of_birth;
    this.job_title = arg.job_title;
    this.location = arg.location;
    this.about = arg.about;
    this.name = arg.name;
  }

  public static from(element: any): Personal_Information {

    /* Type checking element */ {
      const foundType = typeof element;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `element is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const object = element as { [key:string]: any };

    /* Type checking the object.date_of_birth property */ {
      const foundType = typeof object?.date_of_birth;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.date_of_birth is of type ${foundType} while ${expectedType} was expected.`
      );
      if (! ISO_8601_FULL.test(object.date_of_birth)) throw new Error(
        `Job.end_date is done not comply with the ISO date standard: "${object.date_of_birth}"`
      );
    }

    const date_of_birth = new Date(object?.date_of_birth);
    date_of_birth.setHours(0, 0, 0, 0);

    /* Type checking the object.job_title property */ {
      const foundType = typeof object.job_title;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.job_title is of type ${foundType} while ${expectedType} was expected.`
      );
    }
    
    const job_title = object?.job_title;

    /* Type checking the object.first property */ {
      const foundType = typeof object.location;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.location is of type ${foundType} while ${expectedType} was expected.`
      );
    }
    
    const location = object?.location;


    /* Type checking the object.about property */ {
      const foundType = typeof object.about;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.about is of type ${foundType} while ${expectedType} was expected.`
      );
    }
    
    const about = object?.about;
    
    const name = Name.from(object?.name);

    return new Personal_Information({
      date_of_birth, job_title, location, about, name 
    });
  }
}