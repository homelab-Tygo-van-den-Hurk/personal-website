import { Version1Config } from "./v1/config.v1"
import { z } from "zod";

interface RepositoryArg {
  readonly name: string,
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
export default class Repository implements RepositoryArg {

  /** The name of the repository. */
  readonly name: string;

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

  /** Constructs a new repository object. */
  constructor(arg:RepositoryArg) {
    this.name = arg.name;
    this.description = arg.description;
    this.url = arg.url;
    this.stargazerCount = arg.stargazerCount;
    this.forkCount = arg.forkCount;
    this.primaryLanguage = arg.primaryLanguage;
    this.owner = arg.owner;
  }

  public toHTML(context: Version1Config): string {

    const mapBasedOnSettings = (input: string): string => {
      
      const map = context.settings.website.repositories.map;

      console.log(`input : ${input}`);

      const wrapper = (): string => {

        for (const item of map)  {
          
          const match = input.match(item.matches)
          
          if (! match) continue; 

          if (item.type === "simple") return input.replace(new RegExp(item.replace, 'g'), item.with)
            .trim();

          if (item.type === "regex") return match.slice(1)
            .join(item.join_with)
            .replace(item.replace, item.with)
            .trim();
          
          throw new Error(`Unhandled case in Repository.toHTML(): type ${(item as {[key:string]:any}).type} is not known.`);
        }

        return input;
      }

      const result = wrapper();
      console.log(`result: ${result}`);
      return result;
    }

    return ( /*html*/`
      <li class="list-none m-0 p-0 w-full h-fit bg-layer-2 rounded-xl border-text-primary border-solid border-2">
        <div class="">
          <img class="rounded-tl-xl rounded-tr-xl border-text-primary border-solid border-b-2" 
            src="${this.owner.avatarUrl}" 
            alt="The profile or organisation picture of ${this.owner.login}">
        </div>
        <div class="p-6">
          <h3 class="mt-0">
            <span class="group">
              <a class="mx-0 px-0 hover:underline group-hover:underline no-underline" 
                href="https://github.com/${this.owner.login}/${this.name}/">
                ${mapBasedOnSettings(this.owner.login)}
              </a>
              <span class="mx-0 px-0 group-hover:underline">/</span>
              <a class="mx-0 px-0 hover:!underline group-hover:no-underline no-underline" 
                href="https://github.com/${this.owner.login}/">
                ${mapBasedOnSettings(this.name)}
              </a>
            </span>
          </h3>
          <p class="box-border">
            ${this.description}
          </p>
          <div class="w-full mt-6">
            <div class="w-fit mx-auto">
              <a href="${this.url}">
                <button class="bg-accent text-text-header font-bold p-2 rounded-md w-fit">
                  Visit project
                </button>  
              </a>
            </div>
          </div>
        </div>
      </li>`
    );
  }

  public static readonly schema = z.object({
    name: z.string(),
    description: z.string(),
    url: z.coerce.string().url(),
    stargazerCount: z.number(),
    forkCount: z.number(),
    primaryLanguage: z.object({
      name: z.string(),
      color: z.string(),
    }),
    owner: z.object({
      login: z.string(),
      avatarUrl: z.coerce.string().url(),
    }),
  });

  /** Converts an object to a Repository */
  public static from(element: any): Repository {
    
    const parsed = Repository.schema.parse(element);

    return new Repository({ ...parsed,
      url: new URL(parsed.url),
      owner: {
        login: parsed.owner.login,
        avatarUrl: new URL(parsed.owner.avatarUrl),
      },
    });
  }

  /**
  * Gets the 6 pinned repositories and the information regarding it.
  * @returns { Promise<List<Object>> } the list of repositories.
  */
  public static async getPinnedRepositories(context: Version1Config): Promise<Repository[]>{    
    
    if (! context.settings.website.repositories.fetch) return [];
    
    if (! process.env.GITHUB_TOKEN) throw new Error(
      `Required environment variable: "GITHUB_TOKEN" is not set.`
    );
    
    const GRAPHQL_QUERY = `query {
      user(login: "${context.settings.website.repositories.owner}") {
        avatarUrl
        pinnedItems(first: ${context.settings.website.repositories.amount}, types: [REPOSITORY]) {
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
  
    if (! Array.isArray(result)) throw new Error(
      "Expected responds from github to be an array, but got something else."
    );

    const nodes = result as any[];
    const repositories = nodes.map( element => Repository.from(element) );

    return repositories;
  }
  
}

