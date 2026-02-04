const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { ses, AWS_SES_SENDER_EMAIL } = require("../config/aws");
const template = require("./inquiryEmail.template");

exports.sendInquiryEmailToAdmin = async (data) => {
  const html = template(data);

  const command = new SendEmailCommand({
    Source: AWS_SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [process.env.SES_ADMIN_RECEIVER_EMAIL],
    },
    Message: {
      Subject: {
        Data: `New Inquiry – ${data.inquiryAbout}`,
      },
      Body: {
        Html: { Data: html },
      },
    },
  });

  await ses.send(command);
};
