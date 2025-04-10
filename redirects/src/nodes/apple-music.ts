import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my apple music account. */
const appleMusicRedirectNode = new RedirectNodeLeaf({
  name: "Apple Music",
  hidden: false,
  url: new URL("https://music.apple.com/profile/St_H/"),
});

export default appleMusicRedirectNode;
