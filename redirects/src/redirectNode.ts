const nothing = '';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Node ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/** The arguments for the constructor of the `RedirectNode` class. */
export interface RedirectNodeConstructorArguments {

  /** The name you want to appear in HTML webpages. */
  readonly name: string, 

  /** Wether or not to render this node when displaying HTML. It will still work as normal if you visit its path. */
  readonly hidden: boolean, 
}

/** 
 * A redirection section node. Either of the type: RedirectNodeSection, or RedirectLeafSection. Check the `type` field
 * to find out.
 */
export abstract class RedirectNode {

  /** The name you want to appear in HTML webpages. */
  readonly name: string;

  /** Wether or not to render this node when displaying HTML. It will still work as normal if you visit its path. */
  readonly hidden: boolean;
  
  /** Creates a new instance of `RedirectNode`. */
  constructor (arg: RedirectNodeConstructorArguments){
    this.name = arg.name;
    this.hidden = arg.hidden;
  }

  /**
   * Recurses into the data structure following the path provided. Looping over the array see if a child 
   * exists with that name at the current node, if not return undefined, else move to the next index, and repeat.
   * @returns undefined as no node exists at that path, otherwise returns the node.
   */
  public recurse(path: string[], index?: number): RedirectNode | undefined {
    
    if (index === undefined) index = 0;

    if (index === path.length) return this;
  
    if (this instanceof RedirectNodeLeaf) return undefined;
  
    if (this instanceof RedirectNodeHub) {
      const nextKey = path[index];
      const nextNode = this.children[nextKey];
      if (! nextNode) return undefined;
      else return nextNode.recurse(path, index + 1);
    }
  
    // Since we can't enforce case extensive matching. Should never happen.
    throw new Error("Unhandled case.");
  }

  /**
   * Converts the node into a valid HTML string.
   */
  public toHtml(): string {
    if (this.hidden) return nothing;
    
    if (this instanceof RedirectNodeHub) {
      
      const childrenAsHtml: string[] = [];
      /* Converting all children of this node to HTML */ {
        Object.keys(this.children).forEach(key => {
          if (this.children[key].hidden) return;
          else childrenAsHtml.push(/*html*/`
            <li class="mx-2">
              <a href="./${key}/">${this.children[key].name}</a>
            </li>`
          );
        });
      }

      const goBackLink = (this.name === "root" ? nothing : /*html*/`
        <li class="p-3">
          <a href="..">Go back...</a>
        </li>`
      );

      const id = this.name.toLowerCase().replace(' ', '-');

      return (/*html*/`
        <div id="redirection-hub-node-${id}">
          <ul>
            ${goBackLink}
            ${childrenAsHtml.join('\n')}  
          </ul>
        </div>`
      ).trim();
    }

    if (this instanceof RedirectNodeLeaf) {
      return (/*html*/`
        <a href="${this.url}">${this.name}</a>`
      );
    }

    // Since we can't enforce case extensive matching. Should never happen.
    throw new Error("Unhandled case.");
  }
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Hub ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


/** The arguments for the constructor of the `RedirectNodeHub` class. */
export interface RedirectNodeHubConstructorArguments extends RedirectNodeConstructorArguments {

  /** 
   * The paths you could possibly follow from here. These will all be rendered as clickable links. These can either 
   * of type `RedirectLeafSection`, or also `RedirectNodeSection`. This can be check with the `type` property.
   */
  readonly children: { [key: string]: RedirectNode } 
}


/** The internal node section. It does not have a URL to redirect to, but it does have children. */
export class RedirectNodeHub extends RedirectNode {
  
  /** 
   * The paths you could possibly follow from here. These will all be rendered as clickable links. These can either 
   * of type `RedirectLeafSection`, or also `RedirectNodeSection`. This can be check with the `type` property.
   */
  public readonly children: { [key: string]: RedirectNode };

  /** 
   * Constructs a new `RedirectNodeHub`.
   */
  constructor(arg: RedirectNodeHubConstructorArguments) { 

    const minimum = 2 as unknown;
    if (Object.keys(arg.children).length < (minimum as number)) throw new Error(
      `Must have at least ${minimum} ${minimum===1?"child":"children"}.`
    );

    super({ name: arg.name, hidden: arg.hidden });
    this.children = arg.children;
  }
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Leaf ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


/** The arguments for the constructor of the `RedirectNodeHub` class. */
export interface RedirectNodeLeafConstructorArguments extends RedirectNodeConstructorArguments {
  
  /** The URL to redirect to. */
  readonly url: URL,
}


/** The internal leaf section. It does not have children, but it does have a URL to redirect to. */
export class RedirectNodeLeaf extends RedirectNode {
  
  /** The URL to redirect to. */
  public readonly url: URL;
  
  /** Constructs a new `RedirectNodeLeaf`. */
  constructor(arg: RedirectNodeLeafConstructorArguments) {
    super({ name: arg.name, hidden: arg.hidden });
    this.url = arg.url;
  }
};
