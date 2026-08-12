// const { SendEmailCommand } = require("@aws-sdk/client-ses");
// const { ses, AWS_SES_SENDER_EMAIL } = require("../config/aws");
// const template = require("./inquiryEmail.template");

// exports.sendInquiryEmailToAdmin = async (data) => {
//   const html = template(data);

//   const command = new SendEmailCommand({
//     Source: AWS_SES_SENDER_EMAIL,
//     Destination: {
//       ToAddresses: [process.env.SES_ADMIN_RECEIVER_EMAIL],
//     },
//     Message: {
//       Subject: {
//         Data: `New Inquiry – ${data.inquiryAbout}`,
//       },
//       Body: {
//         Html: { Data: html },
//       },
//     },
//   });

//   await ses.send(command);
// };


const nodemailer = require("nodemailer");
const template = require("./inquiryEmail.template");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendInquiryEmailToAdmin = async (data) => {
  const html = template(data);

  const mailOptions = {
    from: `"Kadagam Ventures" <${process.env.EMAIL_FROM}>`,
    to: process.env.SES_ADMIN_RECEIVER_EMAIL,

    subject: `New Inquiry – ${data.inquiryAbout}`,

    html,
  };

  await transporter.sendMail(mailOptions);
};
