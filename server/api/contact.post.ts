import { Resend } from "resend";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<ContactBody>(event);

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() || "Not provided";
  const message = body.message?.trim();

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, email, and message are required.",
    });
  }

  if (!config.resendApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage:
        "Contact form email is not configured yet. Please call 210-436-9117.",
    });
  }

  const resend = new Resend(config.resendApiKey);
  const to = config.contactTo || "jon@theflipfixer.com";
  const from =
    config.contactFrom || "Flip Fixer Website <info@theflipfixer.com>";

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Website contact form — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    throw createError({
      statusCode: 502,
      statusMessage:
        "We could not send your message right now. Please call 210-436-9117.",
    });
  }

  return { ok: true };
});
