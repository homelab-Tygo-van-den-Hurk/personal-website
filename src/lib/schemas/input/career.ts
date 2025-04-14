import Job, { CharityJob, EducationJob, WorkJob } from "./job.js"

/** The arguments to the name class constructor. */
interface CareerArg {
  
  /** Jobs you've done for charity. */
  readonly charity: Job[];

  /** Education you've received. */
  readonly education: Job[];

  /** Jobs you've taken. */
  readonly jobs: Job[];
}

export default class Career {
  
  /** Jobs you've done for charity. */
  public readonly charity: Job[];
  
  /** Education you've received. */
  public readonly education: Job[];
  
  /** Jobs you've taken. */
  public readonly jobs: Job[];

  constructor(arg: CareerArg) {
    this.education = arg.education;
    this.charity = arg.charity;
    this.jobs = arg.jobs;
  }

  public static from(element: unknown): Career {
    
    /* Type checking element */ {
      const foundType = typeof element;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `element is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const object = element as { [key:string] : any };

    /* Type checking education property */ {
      const foundType = typeof object?.education;
      const expectedType = "Array";
      if ((! Array.isArray(object?.education)) && typeof object?.education !== "object") throw new Error(
        `Career.education is of type ${foundType} while ${expectedType} was expected.`
      ); 
      else if ((! Array.isArray(object?.education)) && Object.keys(object.education).length !== 0) throw new Error(
        `Career.education is of type ${foundType} while ${expectedType} was expected.`
      );
      else if ((! Array.isArray(object?.education)) && Object.keys(object.education).length === 0) object.education = [];
    }

    const education = (object?.education as any[]).map( (item: any) => EducationJob.from(item) );

    /* Type checking charity property */ {
      const foundType = typeof object?.charity;
      const expectedType = "Array";
      if ((! Array.isArray(object?.charity)) && typeof object?.charity !== "object") throw new Error(
        `Career.charity is of type ${foundType} while ${expectedType} was expected.`
      );
      else if ((! Array.isArray(object?.charity)) && Object.keys(object.charity).length !== 0) throw new Error(
        `Career.charity is of type ${foundType} while ${expectedType} was expected.`
      );
      else if ((! Array.isArray(object?.charity)) && Object.keys(object.charity).length === 0) object.charity = [];
    }

    const charity = (object?.charity as any[]).map( (item: any) => CharityJob.from(item) );

    /* Type checking jobs property */ {
      const foundType = typeof object?.jobs;
      const expectedType = "Array";
      if ((! Array.isArray(object?.jobs)) && typeof object?.jobs !== "object") throw new Error(
        `Career.jobs is of type ${foundType} while ${expectedType} was expected.`
      );
      else if ((! Array.isArray(object?.jobs)) && Object.keys(object.jobs).length !== 0) throw new Error(
        `Career.jobs is of type ${foundType} while ${expectedType} was expected.`
      );
      else if ((! Array.isArray(object?.jobs)) && Object.keys(object.jobs).length === 0) object.jobs = [];
    }

    const jobs = (object?.jobs as any[]).map( (item: any) => WorkJob.from(item) );

    return new Career({ education, charity, jobs });
  }
}
