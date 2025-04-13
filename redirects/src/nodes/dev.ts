import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The URL to redirect to my dev account. */
const devRedirectNode = new RedirectNodeLeaf({
  name: "Dev",
  hidden: false,
  url: new URL("https://dev.to/st-h"),
});

export default devRedirectNode;

