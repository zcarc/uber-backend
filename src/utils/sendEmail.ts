import Mailgun from "mailgun-js";


const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxb7ef612dbc6f4d8a9c8b38411079b5b4.mailgun.org",
});


const sendEmail = (subject: string, html: string) => {

  const emailData = {
    from: "zcarc@naver.com",
    to: "zcarc@naver.com",
    subject,
    html,
  };

  return mailGunClient.messages().send(emailData);
};


export const sendVerificationEmail = (fullName: string, key: string) => {

  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;

  return sendEmail(emailSubject, emailBody);
};
