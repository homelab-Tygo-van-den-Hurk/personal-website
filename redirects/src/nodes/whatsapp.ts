import { RedirectNodeLeaf } from "#source/redirectNode";

const whatsappUrl = process.env.WHATSAPP_URL;
if (! whatsappUrl) throw new Error("Whatsapp url is undefined.");

/** The URL to redirect to my whatsapp account. */
const whatsappRedirectionNode = new RedirectNodeLeaf({
  name: "WhatsApp",
  hidden: true,
  url: new URL(`${whatsappUrl}`),
});

export default whatsappRedirectionNode;
