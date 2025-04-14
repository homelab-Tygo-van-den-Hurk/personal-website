import Personal_Information from "./personal-information.js";
import Career from "./career.js";


interface ContextArg {

  readonly personal_information: Personal_Information,
  
  readonly career: Career,
}

export default class Context {

  public readonly personal_information: Personal_Information;

  public readonly career: Career;

  /** Constructs a new Context object */
  constructor(arg: ContextArg) {
    this.personal_information = arg.personal_information;
    this.career = arg.career;
  }

  /** Creates a Context object from an element. */
  public static from(element: unknown): Context {

    /* Type checking element */ {
      const foundType = typeof element;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `element is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const object = element as { [key:string]: any };

    const personal_information = Personal_Information.from(object?.personal_information);
    const career = Career.from(object?.career);

    return new Context({ personal_information, career });
  }
}
