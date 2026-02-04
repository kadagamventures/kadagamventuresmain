const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { ses, AWS_SES_SENDER_EMAIL } = require("../config/aws");

exports.sendAdminEmail = async (data) => {
    if (!process.env.SES_ADMIN_RECEIVER_EMAIL) {
      throw new Error("SES_ADMIN_RECEIVER_EMAIL not set");
    }
  
    // ✅ Safe company name for subject
    const companyName =
      data.company && data.company.trim()
        ? data.company.trim()
        : "Individual";
  
    const subject = `New Project Inquiry – ${companyName}`;
  
    const html = `
      <h2>New Project Inquiry</h2>
  
      <p><b>Name:</b> ${data.firstName}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Company:</b> ${data.company || "-"}</p>
  
      <p><b>Project Details:</b></p>
      <p>${data.projectDetails}</p>
  
      <br/>
      <p>— Kadagam Ventures Website</p>
    `;
  
    await ses.send(
      new SendEmailCommand({
        Source: AWS_SES_SENDER_EMAIL,
        Destination: {
          ToAddresses: [process.env.SES_ADMIN_RECEIVER_EMAIL],
        },
        Message: {
          Subject: { Data: subject },
          Body: { Html: { Data: html } },
        },
      })
    );
  };

exports.sendUserConfirmation = async (email, name) => {
  const html = `
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to <b>Kadagam Ventures</b>.</p>
    <p>Our team will get back to you within 24 hours.</p>
    <br/>
    <p>— Kadagam Ventures Team</p>
  `;

  await ses.send(
    new SendEmailCommand({
      Source: AWS_SES_SENDER_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: "We received your request 🚀" },
        Body: { Html: { Data: html } },
      },
    })
  );
};
