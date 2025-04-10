import { RedirectNodeHub, RedirectNodeLeaf } from "#source/redirectNode";


/** The URL to my personal gitLab account. */
const gitLabPersonal = new RedirectNodeLeaf({
  name: "My personal account",
  hidden: false,
  url: new URL("https://gitlab.com/Tygo-van-den-Hurk"),
});


/** The URL to my school gitLab organisation. */
const gitLabSchool = new RedirectNodeLeaf({
  name: "My school projects",
  hidden: false,
  url: new URL("https://gitlab.com/school-Tygo-van-den-Hurk"),
});


/** The URL to my homelab gitLab organisation. */
const gitLabHomelab = new RedirectNodeLeaf({
  name: "My homelab projects",
  hidden: false,
  url: new URL("https://gitlab.com/homelab-Tygo-van-den-Hurk"),
});


/** The URL to my legacy gitLab organisation. */
const gitLabLegacy = new RedirectNodeLeaf({
  name: "Deprecated projects",
  hidden: false,
  url: new URL("https://gitlab.com/legacy-Tygo-van-den-Hurk"),
});


/** All my GitLab accounts and organisations. */
const gitLabRedirectNode = new RedirectNodeHub({
  name: "GitLab",
  hidden: false,
  children: {
    "personal": gitLabPersonal,
    "homelab":  gitLabHomelab,
    "school":   gitLabSchool,
    "legacy":   gitLabLegacy,
  },
});


export default gitLabRedirectNode;
