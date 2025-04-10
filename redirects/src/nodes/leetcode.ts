import { RedirectNodeLeaf } from "#source/redirectNode";

/** The URL to redirect to my leetcode account. */
const leetCodeRedirectionNode = new RedirectNodeLeaf({
  name: "LeetCode",
  hidden: false,
  url: new URL("https://leetcode.com/u/tygo-van-den-hurk"),
});

export default leetCodeRedirectionNode;
