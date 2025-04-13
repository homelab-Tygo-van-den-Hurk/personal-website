import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The URL to redirect to my facebook account. */
const facebookRedirectNode = new RedirectNodeLeaf({
  name: "Facebook",
  hidden: false,
  url: new URL("https://facebook.com/profile.php?id=100011384536668"),
});

export default facebookRedirectNode;
