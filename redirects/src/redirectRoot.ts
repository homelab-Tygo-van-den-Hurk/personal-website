import { RedirectNodeHub, RedirectNodeLeaf } from "#source/redirectNode";

import aboutRedirectNode from "#source/nodes/about";
import appleMusicRedirectNode from "#source/nodes/apple-music";
import behanceRedirectNode from "#source/nodes/behance";
import blogRedirectNode from "#source/nodes/blog";
import contactRedirectNode from "#source/nodes/contact";
import devRedirectNode from "#source/nodes/dev";
import facebookRedirectNode from "#source/nodes/facebook";
import gitTeaRedirectionNode from "#source/nodes/gitea"
import gitHubRedirectNode from "#source/nodes/github";
import gitLabRedirectNode from "#source/nodes/gitlab";
import instagramRedirectionNode from "#source/nodes/instagram";
import leetCodeRedirectionNode from "#source/nodes/leetcode";
import linkedinRedirectionNode from "#source/nodes/linkedin";
import signalRedirectionNode from "#source/nodes/signal";
import snapchatRedirectionNode from "#source/nodes/snapchat";
import stackOverflowRedirectionNode from "#source/nodes/stackoverflow";
import steamRedirectionNode from "#source/nodes/steam";
import telegramRedirectionNode from "#source/nodes/telegram";
import whatsappRedirectionNode from "#source/nodes/whatsapp";


/**
 * The root node of the redirection section tree. This is the part that gets searched through when a link needs to be
 * found. To traverse the link tree, you use the children property. For example to get the redirection url 
 * of `/some/path`, you access the `root.children."some".children."path".url` property. See `RedirectSection` for more.
 */
const rootRedirectionNodes = new RedirectNodeHub({
  name: "root",
  hidden: false,
  children: {
    "about":          aboutRedirectNode,
    "apple-music":    appleMusicRedirectNode,
    "behance":        behanceRedirectNode,
    "blog":           blogRedirectNode,
    "contact":        contactRedirectNode,
    "dev":            devRedirectNode,
    "facebook":       facebookRedirectNode,
    "git-tea":        gitTeaRedirectionNode,
    "github":         gitHubRedirectNode,
    "gitlab":         gitLabRedirectNode,
    "instagram":      instagramRedirectionNode,
    "leetcode":       leetCodeRedirectionNode,
    "linkedin":       linkedinRedirectionNode,
    "signal":         signalRedirectionNode,
    "snapchat":       snapchatRedirectionNode,
    "stackoverflow":  stackOverflowRedirectionNode,
    "steam":          steamRedirectionNode,
    "telegram":       telegramRedirectionNode,
    "whatsapp":       whatsappRedirectionNode,
  },
}); 


export default rootRedirectionNodes;
