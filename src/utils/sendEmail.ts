import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxb7ef612dbc6f4d8a9c8b38411079b5b4.mailgun.org",
});
