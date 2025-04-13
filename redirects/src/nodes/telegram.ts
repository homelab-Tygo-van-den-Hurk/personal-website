import { RedirectNodeLeaf } from "#source/redirectNode.js";

const telegramUrl = process.env.TELEGRAM_URL;
if (! telegramUrl) throw new Error("telegram url is undefined.");

/** The URL to redirect to my telegram account. */
const telegramRedirectionNode = new RedirectNodeLeaf({
  name: "WhatsApp",
  hidden: true,
  url: new URL(`${telegramUrl}`),
});

export default telegramRedirectionNode;
