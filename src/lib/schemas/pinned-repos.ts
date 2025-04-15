interface RepositoryArg {
  readonly name: String,
  readonly description: String,
  readonly url: URL,
  readonly stargazerCount: number,
  readonly forkCount: number,
  readonly primaryLanguage: {
    name: string
    color: string
  },
  readonly owner: {
    login: string,
    avatarUrl: URL
  },
}

/** A GitHub Repository. */
export default class Repository {

  /** The name of the repository. */
  readonly name: String;

  /** The description of the repository. */
  readonly description: String;
  
  /** The url of the repository. */
  readonly url: URL;
  
  /** The amount of stars the repository has. */
  readonly stargazerCount: number;
  
  /** The total amount of times that the repository has been forked. */
  readonly forkCount: number;
  
  /** information about the primary language of the repository. */
  readonly primaryLanguage: {
  
    /** name of the primary language of the repository. */
    name: string

    /** the color of the primary language of the repository. */
    color: string
  };

  readonly owner: {
    login: string,
    avatarUrl: URL
  };

  constructor(arg:RepositoryArg) {
    this.name = arg.name;
    this.description = arg.description;
    this.url = arg.url;
    this.stargazerCount = arg.stargazerCount;
    this.forkCount = arg.forkCount;
    this.primaryLanguage = arg.primaryLanguage;
    this.owner = arg.owner;
  }

  public toHTML(): string {
    return ( /*html*/`
      <li class="list-none bg-layer-2 p-6 rounded-md mx-o my-6 border-text-primary">
        <h3 class="mt-0">
          <a class="text-text-header no-underline hover:underline" href="https://github.com/${this.owner.login}/">${this.owner.login}</a> / 
          <a class="text-text-header no-underline hover:underline" href="https://github.com/${this.owner.login}/${this.name}/">${this.name}</a>
        </h3>
        <p class="box-border">
          ${this.description}
        </p>
        <a href="${this.url}">
          <button>
            Visit project
          </button>  
        </a>
      </li>`
    );
  }

  /** Converts an object to a Repository */
  public static from(element: any): Repository {
    
    /* Type checking element */ {
      const foundType = typeof element;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `element is of type ${foundType} while ${expectedType} was expected.`
      );
    }

    const object = element as { [key:string]: any };

    /* Type checking name property */ {
      const foundType = typeof object?.name;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.name is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const name = object.name;

    /* Type checking description property */ {
      const foundType = typeof object?.description;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.description is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const description = object.description;

    /* Type checking url property */ {
      const foundType = typeof object?.url;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.url is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const url = new URL(object.url);

    /* Type checking stargazerCount property */ {
      const foundType = typeof object?.stargazerCount;
      const expectedType = "number";
      if (foundType !== expectedType) throw new Error(
        `object.stargazerCount is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const stargazerCount = object.stargazerCount as number;

    /* Type checking forkCount property */ {
      const foundType = typeof object?.forkCount;
      const expectedType = "number";
      if (foundType !== expectedType) throw new Error(
        `object.forkCount is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const forkCount = object.forkCount as number;

    /* Type checking primaryLanguage property */ {
      const foundType = typeof object?.primaryLanguage;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `object.primaryLanguage is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const primaryLanguage = object?.primaryLanguage as { [key:string]: any };

    /* Type checking primaryLanguage.name property */ {
      const foundType = typeof primaryLanguage?.name;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.primaryLanguage.name is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const primaryLanguageName = primaryLanguage?.name;


    /* Type checking primaryLanguage.color property */ {
      const foundType = typeof primaryLanguage?.color;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.primaryLanguage.color is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const primaryLanguageColor = primaryLanguage?.color;
    
    /* Type checking owner property */ {
      const foundType = typeof object?.owner;
      const expectedType = "object";
      if (foundType !== expectedType) throw new Error(
        `object.owner is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const owner = object?.owner as { [key:string]: any };

    /* Type checking owner.login property */ {
      const foundType = typeof owner?.login;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.owner.login is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const ownerLogin = owner?.login;


    /* Type checking owner.avatarUrl property */ {
      const foundType = typeof owner?.avatarUrl;
      const expectedType = "string";
      if (foundType !== expectedType) throw new Error(
        `object.owner.avatarUrl is of type ${foundType} while ${expectedType} was expected. object = ${object}`
      );
    }

    const ownerAvatarUrl = new URL(owner?.avatarUrl);

    return new Repository({
      name,
      description,
      url,
      stargazerCount,
      forkCount,
      primaryLanguage: {
        name: primaryLanguageName,
        color: primaryLanguageColor,
      },
      owner: {
        login: ownerLogin,
        avatarUrl: ownerAvatarUrl,
      }
    });
  }

  /**
  * Gets the 6 pinned repositories and the information regarding it.
  * @returns { Promise<List<Object>> } the list of repositories.
  */
  public static async getPinnedRepositories(amount?: number): Promise<Repository[]> {    
     
    if (amount === undefined) amount = 6;
    
    if (! process.env.GITHUB_TOKEN) throw new Error(
      `Required environment variable: "GITHUB_TOKEN" is not set.`
    );
    
    const USERNAME = "Tygo-van-den-Hurk";

    const GRAPHQL_QUERY = `query {
      user(login: "${USERNAME}") {
        avatarUrl
        pinnedItems(first: ${amount}, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              owner {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }`;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: GRAPHQL_QUERY }),
    });
  
    const data = await response.json();
  
    if (data.errors) throw new Error(data.errors);
  
    const result = data?.data?.user?.pinnedItems?.nodes;
  
    if (! Array.isArray(result)) throw new Error("nodes is not an array.");
  
    const nodes = data?.data?.user?.pinnedItems?.nodes as any[];
    
    const repositories = nodes.map( element => Repository.from(element) );

    console.log(repositories);

    return repositories;
  }
  
}

