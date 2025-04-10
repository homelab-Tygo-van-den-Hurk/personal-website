import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my steam account. */
const steamRedirectionNode = new RedirectNodeLeaf({
  name: "Steam",
  hidden: false,
  url: new URL("https://steamcommunity.com/id/tygo-van-den-hurk/"),
});

export default steamRedirectionNode;
