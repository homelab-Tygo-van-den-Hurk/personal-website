/** An representation of a location. */
export default class Location {
  
  /** Creates a new Location object */
  constructor (
  
    /** The country this location is talking about */
    public readonly country: String,

    /** The city this location is talking about */
    public readonly city?: String,

  ) {}

  public toString(): string {
    return `${this.city}, ${this.country}`;
  }

  /** Creates a new Location object */
  public static from(element: any): Location {

    if (typeof element === "object") {
      
      const object = element as { [key:string]: any };

      /* Type checking the object.country property */ {
        const foundType = typeof object?.country;
        const expectedType = "string";
        if (foundType !== expectedType) throw new Error(
          `object.country is of type ${foundType} while ${expectedType} was expected.`
        );
      }

      const country = object?.country;

      /* Type checking the object.middle property */ {
        const foundType = typeof object.city;
        if (foundType !== "string" && foundType !== "undefined") throw new Error(
          `element.city is of type ${foundType} while string or undefined was expected.`
        );
      }
      
      const city = object?.city;

      return new Location(country, city)
    }

    if (typeof element === "string") {
      
      const str = element as string;

      if (str.includes(", ")) {
        const [city, country] = str.split(", ");
        return new Location(country, city);
      }

      else return new Location(str);
    }
      
    else throw new Error(
      `element is of type ${typeof element} while string or object was expected.`
    );
  }
}
