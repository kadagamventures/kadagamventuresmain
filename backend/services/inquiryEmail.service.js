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

const { Resend } = require("resend");
const template = require("./inquiryEmail.template");

// =====================================================
// RESEND
// =====================================================

const resend = new Resend(process.env.RESEND_API_KEY);


// =====================================================
// SEND INQUIRY EMAIL TO ADMIN
// =====================================================

exports.sendInquiryEmailToAdmin = async (data) => {

  try {

    const html = template(data);

    const { data: emailData, error } = await resend.emails.send({

      from: `Kadagam Ventures <${process.env.EMAIL_FROM}>`,

      to: [process.env.SES_ADMIN_RECEIVER_EMAIL],

      subject: `New Inquiry – ${data.inquiryAbout}`,

      html,

    });


    // ==========================================
    // RESEND ERROR
    // ==========================================

    if (error) {

      console.error("❌ Resend inquiry email error:", error);

      throw new Error(
        error.message || "Failed to send inquiry email"
      );

    }


    // ==========================================
    // SUCCESS
    // ==========================================

    console.log(
      `✅ Inquiry email sent successfully. Resend ID: ${emailData?.id}`
    );


    return emailData;

  } catch (error) {

    console.error(
      "❌ Failed to send inquiry email:",
      error
    );

    throw error;

  }

};
