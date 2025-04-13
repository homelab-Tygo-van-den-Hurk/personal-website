import { RedirectNodeHub } from "#source/redirectNode.js";

import aboutRedirectNode from "#source/nodes/about.js";
import appleMusicRedirectNode from "#source/nodes/apple-music.js";
import behanceRedirectNode from "#source/nodes/behance.js";
import blogRedirectNode from "#source/nodes/blog.js";
import contactRedirectNode from "#source/nodes/contact.js";
import devRedirectNode from "#source/nodes/dev.js";
import facebookRedirectNode from "#source/nodes/facebook.js";
import gitTeaRedirectionNode from "#source/nodes/gitea.js";
import gitHubRedirectNode from "#source/nodes/github.js";
import gitLabRedirectNode from "#source/nodes/gitlab.js";
import instagramRedirectionNode from "#source/nodes/instagram.js";
import leetCodeRedirectionNode from "#source/nodes/leetcode.js";
import linkedinRedirectionNode from "#source/nodes/linkedin.js";
import signalRedirectionNode from "#source/nodes/signal.js";
import snapchatRedirectionNode from "#source/nodes/snapchat.js";
import stackOverflowRedirectionNode from "#source/nodes/stackoverflow.js";
import steamRedirectionNode from "#source/nodes/steam.js";
import telegramRedirectionNode from "#source/nodes/telegram.js";
import whatsappRedirectionNode from "#source/nodes/whatsapp.js";


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
