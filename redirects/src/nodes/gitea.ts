import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my git tea account. */
const gitTeaRedirectionNode = new RedirectNodeLeaf({
  name: "Git Tea",
  hidden: false,
  url: new URL("https://gitea.com/Tygo-van-den-Hurk"),
});

export default gitTeaRedirectionNode;
