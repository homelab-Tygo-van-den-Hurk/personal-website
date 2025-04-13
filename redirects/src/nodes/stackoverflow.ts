import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The URL to redirect to my stackoverflow account. */
const stackOverflowRedirectionNode = new RedirectNodeLeaf({
  name: "StackOverflow",
  hidden: false,
  url: new URL("https://stackoverflow.com/users/17113615/st-h"),
});

export default stackOverflowRedirectionNode;
