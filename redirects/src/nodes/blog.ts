import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The URL to redirect to my blog. */
const blogRedirectNode = new RedirectNodeLeaf({
  name: "My Personal Blog",
  hidden: false,
  url: new URL("https://blog.tygo.van.den.hurk.dev"),
});

export default blogRedirectNode;
