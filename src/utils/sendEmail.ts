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

  const emailSubject = `안녕하세요! ${fullName}님 이메일을 인증해주세요. 감사합니다!!`;
  const emailBody = `클릭해서 인증하세요.<a href="https://uber-client-hs.herokuapp.com/${key}/">https://uber-client-hs.herokuapp.com/${key}</a>`;

  return sendEmail(emailSubject, emailBody);
};
