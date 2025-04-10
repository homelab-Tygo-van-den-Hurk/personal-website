import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my contact page. */
const contactRedirectNode = new RedirectNodeLeaf({
  name: "My personal contact form",
  hidden: false,
  url: new URL("https://tygo.van.den.hurk.dev/contact-me"),
});

export default contactRedirectNode;
