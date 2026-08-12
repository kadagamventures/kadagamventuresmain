// const { SendEmailCommand } = require("@aws-sdk/client-ses");
// const { ses, AWS_SES_SENDER_EMAIL } = require("../config/aws");

// exports.sendAdminEmail = async (data) => {
//     if (!process.env.SES_ADMIN_RECEIVER_EMAIL) {
//       throw new Error("SES_ADMIN_RECEIVER_EMAIL not set");
//     }
  
//     // ✅ Safe company name for subject
//     const companyName =
//       data.company && data.company.trim()
//         ? data.company.trim()
//         : "Individual";
  
//     const subject = `New Project Inquiry – ${companyName}`;
  
//     const html = `
//       <h2>New Project Inquiry</h2>
  
//       <p><b>Name:</b> ${data.firstName}</p>
//       <p><b>Email:</b> ${data.email}</p>
//       <p><b>Company:</b> ${data.company || "-"}</p>
  
//       <p><b>Project Details:</b></p>
//       <p>${data.projectDetails}</p>
  
//       <br/>
//       <p>— Kadagam Ventures Website</p>
//     `;
  
//     await ses.send(
//       new SendEmailCommand({
//         Source: AWS_SES_SENDER_EMAIL,
//         Destination: {
//           ToAddresses: [process.env.SES_ADMIN_RECEIVER_EMAIL],
//         },
//         Message: {
//           Subject: { Data: subject },
//           Body: { Html: { Data: html } },
//         },
//       })
//     );
//   };

// exports.sendUserConfirmation = async (email, name) => {
//   const html = `
//     <p>Hi ${name},</p>
//     <p>Thank you for reaching out to <b>Kadagam Ventures</b>.</p>
//     <p>Our team will get back to you within 24 hours.</p>
//     <br/>
//     <p>— Kadagam Ventures Team</p>
//   `;

//   await ses.send(
//     new SendEmailCommand({
//       Source: AWS_SES_SENDER_EMAIL,
//       Destination: { ToAddresses: [email] },
//       Message: {
//         Subject: { Data: "We received your request 🚀" },
//         Body: { Html: { Data: html } },
//       },
//     })
//   );
// };


const nodemailer = require("nodemailer");

// ==========================================
// HOSTINGER SMTP
// ==========================================

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


// ==========================================
// ADMIN EMAIL
// ==========================================

exports.sendAdminEmail = async (data) => {

    if (!process.env.SES_ADMIN_RECEIVER_EMAIL) {
        throw new Error(
            "SES_ADMIN_RECEIVER_EMAIL not set"
        );
    }

    // Safe company name for subject
    const companyName =
        data.company && data.company.trim()
            ? data.company.trim()
            : "Individual";

    const subject =
        `New Project Inquiry – ${companyName}`;

    const html = `
        <html>
            <body
                style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                "
            >

                <h2>New Project Inquiry</h2>

                <p>
                    <strong>Name:</strong>
                    ${data.firstName || "-"}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${data.email || "-"}
                </p>

                <p>
                    <strong>Company:</strong>
                    ${data.company || "-"}
                </p>

                <p>
                    <strong>Project Details:</strong>
                </p>

                <p>
                    ${data.projectDetails || "-"}
                </p>

                <br />

                <p>
                    — Kadagam Ventures Website
                </p>

            </body>
        </html>
    `;

    await transporter.sendMail({

        from:
            `"Kadagam Ventures Private Limited" <${process.env.EMAIL_FROM}>`,

        to:
            process.env.SES_ADMIN_RECEIVER_EMAIL,

        replyTo:
            data.email,

        subject,

        html,
    });
};


// ==========================================
// USER CONFIRMATION EMAIL
// ==========================================

exports.sendUserConfirmation = async (
    email,
    name
) => {

    if (!email) {
        throw new Error(
            "User email is required"
        );
    }

    const html = `
        <html>
            <body
                style="
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                "
            >

                <p>
                    Hi ${name || "there"},
                </p>

                <p>
                    Thank you for reaching out to
                    <strong>Kadagam Ventures</strong>.
                </p>

                <p>
                    Our team will get back to you
                    within 24 hours.
                </p>

                <br />

                <p>
                    — Kadagam Ventures Team
                </p>

            </body>
        </html>
    `;

    await transporter.sendMail({

        from:
            `"Kadagam Ventures Private Limited" <${process.env.EMAIL_FROM}>`,

        to:
            email,

        replyTo:
            process.env.EMAIL_FROM,

        subject:
            "We received your request 🚀",

        html,
    });
};