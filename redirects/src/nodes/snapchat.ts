import { RedirectNodeLeaf } from "#source/redirectNode.js";

/** The URL to redirect to my snapchat account. */
const snapchatRedirectionNode = new RedirectNodeLeaf({
  name: "SnapChat",
  hidden: false,
  url: new URL("https://snapchat.com/add/tygo2502"),
});

export default snapchatRedirectionNode;
