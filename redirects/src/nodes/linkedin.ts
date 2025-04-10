import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my linkedin account. */
const linkedinRedirectionNode = new RedirectNodeLeaf({
  name: "Linkedin",
  hidden: false,
  url: new URL("https://www.linkedin.com/in/tygo-van-den-hurk"),
});

export default linkedinRedirectionNode;
