/** The arguments to the name class constructor. */
interface NameArg {
  
  /** The first name. */
  readonly first: string,
  
  /** The middel names. */
  readonly middle?: string,
  
  /** The last name. */
  readonly last: string,
}

export default class Name {
  
  /** The first name. */
  public readonly first: string;
  
  /** The middel names. */
  public readonly middle?: string;
  
  /** The last name. */
  public readonly last: string;

  constructor(arg: NameArg) {
    this.first = arg.first;
    this.middle = arg.middle;
    this.last = arg.last;
  }

  /** Creates a new Name object from anything. */
  public static from(element: any): Name {

    /* Type checking element */ {
      const foundType = typeof element;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `element is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const object = element as { [key:string]: any };

    /* Type checking the object.first property */ {
      const foundType = typeof object?.first;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `element.first is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const first = object?.first;

    /* Type checking the object.middle property */ {
      const foundType = typeof object.middle;
      const expectedType = "string";
      if (foundType !== expectedType && foundType !== "undefined") throw new Error(
        `element.middle is of type ${foundType} while ${expectedType} or undefined was expected.`
      );
    }
    
    const middle = object?.middle;

    /* Type checking the object.first property */ {
      const foundType = typeof object.last;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `element.last is of type ${foundType} while ${expectedType} was expected.`
      );
    }
    
    const last = object?.last;
    
    return new Name({ first, middle, last });
  }

  public toString(): string {
    return `${this.first} ${`${this.middle} ` || ""}${this.last}`;
  }
}