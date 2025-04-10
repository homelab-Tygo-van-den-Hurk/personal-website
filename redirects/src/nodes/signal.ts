import { RedirectNodeLeaf } from "#source/redirectNode";

const signalUrl = process.env.SIGNAL_URL;
if (! signalUrl) throw new Error("signal url is undefined.");

/** The URL to redirect to my signal account. */
const signalRedirectionNode = new RedirectNodeLeaf({
  name: "Signal",
  hidden: true,
  url: new URL(`${signalUrl}`),
});

export default signalRedirectionNode;
