import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The redirect to my about page. */
const aboutRedirectNode = new RedirectNodeLeaf({
  name: "My about me page",
  hidden: false,
  url: new URL("https://tygo.van.den.hurk.dev#about"),
});

export default aboutRedirectNode;
