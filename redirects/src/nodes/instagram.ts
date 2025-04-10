import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my instagram account. */
const instagramRedirectionNode = new RedirectNodeLeaf({
  name: "Instagram",
  hidden: false,
  url: new URL("https://www.instagram.com/tygo.van.den.hurk"),
});

export default instagramRedirectionNode;
