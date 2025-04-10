import { RedirectNodeHub, RedirectNodeLeaf } from "#source/redirectNode";


/** The URL to my personal GitHub account. */
const gitHubPersonal = new RedirectNodeLeaf({
  name: "My personal account",
  hidden: false,
  url: new URL("https://github.com/Tygo-van-den-Hurk"),
});


/** The URL to my school GitHub organisation. */
const gitHubSchool = new RedirectNodeLeaf({
  name: "My school projects",
  hidden: false,
  url: new URL("https://github.com/school-Tygo-van-den-Hurk"),
});


/** The URL to my homelab GitHub organisation. */
const gitHubHomelab = new RedirectNodeLeaf({
  name: "My homelab projects",
  hidden: false,
  url: new URL("https://github.com/homelab-Tygo-van-den-Hurk"),
});


/** The URL to my startup GitHub organisation. */
const gitHubStartUp = new RedirectNodeLeaf({
  name: "My startup company",
  hidden: false,
  url: new URL("https://github.com/Safe-and-Fast-Software"),
});


/** The URL to my legacy GitHub organisation. */
const gitHubLegacy = new RedirectNodeLeaf({
  name: "Deprecated projects",
  hidden: false,
  url: new URL("https://github.com/legacy-Tygo-van-den-Hurk"),
});


/** All my github accounts and organisations. */
const gitHubRedirectNode = new RedirectNodeHub({
  name: "GitHub",
  hidden: false,
  children: {
    "personal": gitHubPersonal,
    "homelab":  gitHubHomelab,
    "school":   gitHubSchool,
    "startup":  gitHubStartUp,
    "legacy":   gitHubLegacy,
  },
});


export default gitHubRedirectNode;
