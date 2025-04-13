import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The URL to redirect to my behance account. */
const behanceRedirectNode = new RedirectNodeLeaf({
  name: "Behance",
  hidden: false,
  url: new URL("https://www.behance.net/6301702c"),
});

export default behanceRedirectNode;
