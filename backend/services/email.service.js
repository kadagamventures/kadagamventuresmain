// const { SendEmailCommand, SendRawEmailCommand } = require("@aws-sdk/client-ses");
// const { GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const {
//   ses,
//   s3,
//   AWS_SES_SENDER_EMAIL,
//   AWS_S3_BUCKET_NAME,
// } = require("../config/aws");

// const clean = (v) => v?.trim();

// // 🔗 Generate Resume Download Link
// const getResumeUrl = async (key) => {
//   if (!key) return "Not Uploaded";

//   const command = new GetObjectCommand({
//     Bucket: AWS_S3_BUCKET_NAME,
//     Key: key,
//   });

//   return await getSignedUrl(s3, command, { expiresIn: 60 * 60 }); // 1 hour
// };

// // 📩 ADMIN EMAIL (FULL DETAILS)
// exports.sendAdminApplicationMail = async (data) => {
//   const resumeUrl = await getResumeUrl(data.resumeKey);

//   const command = new SendEmailCommand({
//     Source: clean(AWS_SES_SENDER_EMAIL),
//     Destination: {
//       ToAddresses: [clean(process.env.SES_ADMIN_RECEIVER_EMAIL)],
//     },
//     Message: {
//       Subject: {
//         Data: `New Application – ${data.careerId.title}`,
//       },
//       Body: {
//         Html: {
//           Data: `
//             <h2>New Career Application</h2>

//             <p><b>Role:</b> ${data.careerId.title}</p>

//             <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
//               <tr><td>Name</td><td>${data.firstName} ${data.lastName}</td></tr>
//               <tr><td>Email</td><td>${data.email}</td></tr>
//               <tr><td>Phone</td><td>${data.phone}</td></tr>
//               <tr><td>Gender</td><td>${data.gender || "-"}</td></tr>
//               <tr><td>Location</td><td>${data.location}</td></tr>
//               <tr><td>Experience</td><td>${data.experience}</td></tr>
//               <tr><td>Current Salary</td><td>${data.currentSalary || "-"}</td></tr>
//               <tr><td>Expected Salary</td><td>${data.expectedSalary || "-"}</td></tr>
//               <tr><td>Notice Period</td><td>${data.noticePeriod || "-"}</td></tr>
//               <tr><td>Joining Time</td><td>${data.joiningTime || "-"}</td></tr>
//               <tr><td>Joining Date</td><td>${data.joiningDate ? new Date(data.joiningDate).toDateString() : "-"}</td></tr>
//               <tr><td>Immediate Joiner</td><td>${data.isImmediateJoiner ? "Yes" : "No"}</td></tr>
//             </table>

//             <br/>
//             <p><b>Resume:</b> <a href="${resumeUrl}">Download PDF</a></p>

//             <br/>
//             <p>— Kadagam Careers System</p>
//           `,
//         },
//       },
//     },
//   });

//   await ses.send(command);
// };


// // ✉️ PROFESSIONAL APPLICANT AUTO-REPLY
// exports.sendApplicantReply = async (email, name) => {
//   const command = new SendEmailCommand({
//     Source: clean(AWS_SES_SENDER_EMAIL),
//     Destination: {
//       ToAddresses: [clean(email)],
//     },
//     Message: {
//       Subject: {
//         Data: "Application Received – Kadagam Ventures",
//       },
//       Body: {
//         Html: {
//           Data: `
//             <p>Dear ${name || "Candidate"},</p>

//             <p>
//               Thank you for your interest in joining <b>Kadagam Ventures</b>.
//               We have successfully received your application.
//             </p>

//             <p>
//               Our HR team is currently reviewing your profile.
//               If your qualifications match our requirements,
//               we will contact you for the next steps.
//             </p>

//             <p>
//               We appreciate the time and effort you took to apply.
//             </p>

//             <br/>

//             <p>
//               Warm regards,<br/>
//               <b>HR Team</b><br/>
//               Kadagam Ventures Private limited, Bengaluru, Karnataka 560051
//             </p>

//             <p style="font-size:12px;color:#777">
//               This is an automated message. Please do not reply.
//             </p>
//           `,
//         },
//       },
//     },
//   });

//   await ses.send(command);
// };

// // 📄 SEND INVOICE WITH PDF ATTACHMENT
// exports.sendInvoiceWithAttachment = async (invoice) => {

//   if (!invoice?.pdfKey)
//     throw new Error("Invoice PDF not found");

//   // Get PDF from S3
//   const command = new GetObjectCommand({
//     Bucket: AWS_S3_BUCKET_NAME,
//     Key: invoice.pdfKey,
//   });

//   const s3Object = await s3.send(command);
//   const pdfBuffer = Buffer.from(
//     await s3Object.Body.transformToByteArray()
//   );

//   const boundary = "InvoiceBoundary";

//   const rawEmail =
//     `From: ${clean(AWS_SES_SENDER_EMAIL)}
// To: ${clean(invoice.company.email)}
// Subject: Invoice ${invoice.invoiceNumber} – Invoice & Service Agreement
// MIME-Version: 1.0
// Content-Type: multipart/mixed; boundary="${boundary}"

// --${boundary}
// Content-Type: text/html; charset="UTF-8"

// <html>
//   <body style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
    
//     <p>Dear ${clean(invoice.company.companyName || "Valued Client")},</p>

//     <p>
//       We hope this message finds you well.
//     </p>

//     <p>
//       Please find attached the <strong>Invoice (${invoice.invoiceNumber})</strong> 
//       along with the applicable <strong>Service Agreement</strong> for your review and records.
//     </p>

//     <p>
//       Kindly process the payment as per the agreed terms mentioned in the invoice. 
//       Should you require any clarification regarding the invoice or agreement, 
//       please feel free to contact us.
//     </p>

//     <p>
//       We appreciate your continued business and look forward to serving you.
//     </p>

//     <br/>

//     <p>
//       Warm Regards,<br/>
//       <strong>Kadagam Ventures Private Limited.</strong><br/>
//       ${clean(invoice.company.phone || "")}
//     </p>

//   </body>
// </html>

// --${boundary}
// Content-Type: application/pdf; name="Invoice-${invoice.invoiceNumber}.pdf"
// Content-Disposition: attachment; filename="Invoice-${invoice.invoiceNumber}.pdf"
// Content-Transfer-Encoding: base64

// ${pdfBuffer.toString("base64")}

// --${boundary}--`;



//   await ses.send(
//     new SendRawEmailCommand({
//       RawMessage: {
//         Data: Buffer.from(rawEmail),
//       },
//     })
//   );
// };


const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {
  s3,
  AWS_S3_BUCKET_NAME,
} = require("../config/aws");


// =====================================================
// HELPERS
// =====================================================

const clean = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};


// =====================================================
// HOSTINGER SMTP TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// =====================================================
// OPTIONAL SMTP CONNECTION TEST
// =====================================================

exports.verifyEmailConnection = async () => {
  await transporter.verify();

  console.log("✅ Hostinger SMTP connection successful");
};


// =====================================================
// GENERATE RESUME DOWNLOAD LINK
// =====================================================

const getResumeUrl = async (key) => {
  if (!key) {
    return "Not Uploaded";
  }

  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3, command, {
    expiresIn: 60 * 60, // 1 hour
  });
};


// =====================================================
// ADMIN EMAIL - NEW CAREER APPLICATION
// =====================================================

exports.sendAdminApplicationMail = async (data) => {

  const resumeUrl = await getResumeUrl(data.resumeKey);

  const careerTitle =
    data.career?.title ||
    data.careerId?.title ||
    "Career Position";


  const html = `
    <h2>New Career Application</h2>

    <p>
      <b>Role:</b> ${clean(careerTitle)}
    </p>

    <table
      border="1"
      cellpadding="8"
      cellspacing="0"
      style="border-collapse: collapse;"
    >

      <tr>
        <td><b>Name</b></td>
        <td>
          ${clean(data.firstName)} ${clean(data.lastName)}
        </td>
      </tr>

      <tr>
        <td><b>Email</b></td>
        <td>${clean(data.email)}</td>
      </tr>

      <tr>
        <td><b>Phone</b></td>
        <td>${clean(data.phone)}</td>
      </tr>

      <tr>
        <td><b>Gender</b></td>
        <td>${clean(data.gender) || "-"}</td>
      </tr>

      <tr>
        <td><b>Location</b></td>
        <td>${clean(data.location)}</td>
      </tr>

      <tr>
        <td><b>Experience</b></td>
        <td>${clean(data.experience)}</td>
      </tr>

      <tr>
        <td><b>Current Salary</b></td>
        <td>${clean(data.currentSalary) || "-"}</td>
      </tr>

      <tr>
        <td><b>Expected Salary</b></td>
        <td>${clean(data.expectedSalary) || "-"}</td>
      </tr>

      <tr>
        <td><b>Notice Period</b></td>
        <td>${clean(data.noticePeriod) || "-"}</td>
      </tr>

      <tr>
        <td><b>Joining Time</b></td>
        <td>${clean(data.joiningTime) || "-"}</td>
      </tr>

      <tr>
        <td><b>Joining Date</b></td>
        <td>
          ${
            data.joiningDate
              ? new Date(data.joiningDate).toDateString()
              : "-"
          }
        </td>
      </tr>

      <tr>
        <td><b>Immediate Joiner</b></td>
        <td>
          ${data.isImmediateJoiner ? "Yes" : "No"}
        </td>
      </tr>

    </table>

    <br />

    <p>
      <b>Resume:</b>
      ${
        resumeUrl !== "Not Uploaded"
          ? `<a href="${resumeUrl}" target="_blank">
               Download Resume
             </a>`
          : "Not Uploaded"
      }
    </p>

    <br />

    <p>
      — Kadagam Careers System
    </p>
  `;


  await transporter.sendMail({
    from: `"Kadagam Ventures" <${process.env.EMAIL_FROM}>`,
  
    to: process.env.SES_ADMIN_RECEIVER_EMAIL,
  
    subject: `New Application – ${clean(careerTitle)}`,
  
    html,
  });

};


// =====================================================
// APPLICANT AUTO REPLY
// =====================================================

exports.sendApplicantReply = async (email, name) => {

  const html = `
    <p>
      Dear ${clean(name) || "Candidate"},
    </p>

    <p>
      Thank you for your interest in joining
      <b>Kadagam Ventures</b>.
      We have successfully received your application.
    </p>

    <p>
      Our HR team is currently reviewing your profile.
      If your qualifications match our requirements,
      we will contact you for the next steps.
    </p>

    <p>
      We appreciate the time and effort you took to apply.
    </p>

    <br />

    <p>
      Warm regards,<br />

      <b>HR Team</b><br />

      Kadagam Ventures Private Limited<br />

      Bengaluru, Karnataka 560051
    </p>

    <p style="font-size:12px;color:#777">
      This is an automated message.
      Please do not reply.
    </p>
  `;


  await transporter.sendMail({
    from: `"Kadagam Ventures HR" <${process.env.EMAIL_FROM}>`,

    to: clean(email),

    subject: "Application Received – Kadagam Ventures",

    html,
  });

};


// =====================================================
// SEND INVOICE WITH PDF ATTACHMENT
// =====================================================

// exports.sendInvoiceWithAttachment = async (invoice) => {

//   if (!invoice?.pdfKey) {
//     throw new Error("Invoice PDF not found");
//   }


//   // Get PDF from AWS S3
//   const command = new GetObjectCommand({
//     Bucket: AWS_S3_BUCKET_NAME,
//     Key: invoice.pdfKey,
//   });


//   const s3Object = await s3.send(command);


//   const pdfBuffer = Buffer.from(
//     await s3Object.Body.transformToByteArray()
//   );


//   const companyName =
//     clean(invoice.company?.companyName) ||
//     "Valued Client";


//   const companyEmail =
//     clean(invoice.company?.email);


//   if (!companyEmail) {
//     throw new Error("Customer email not found");
//   }


//   const invoiceNumber =
//     clean(invoice.invoiceNumber);


//   const html = `
//     <html>

//       <body
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-size: 14px;
//           color: #333;
//           line-height: 1.6;
//         "
//       >

//         <p>
//           Dear ${companyName},
//         </p>

//         <p>
//           We hope this message finds you well.
//         </p>

//         <p>
//           Please find attached the
//           <strong>
//             Invoice (${invoiceNumber})
//           </strong>
//           along with the applicable
//           <strong>
//             Service Agreement
//           </strong>
//           for your review and records.
//         </p>

//         <p>
//           Kindly process the payment as per the agreed
//           terms mentioned in the invoice.
//           Should you require any clarification regarding
//           the invoice or agreement, please feel free
//           to contact us.
//         </p>

//         <p>
//           We appreciate your continued business
//           and look forward to serving you.
//         </p>

//         <br />

//         <p>
//           Warm Regards,<br />

//           <strong>
//             Kadagam Ventures Private Limited
//           </strong>
//           <br />

//           ${clean(invoice.company?.phone)}
//         </p>

//       </body>

//     </html>
//   `;


//   await transporter.sendMail({

//     from:
//       `"Kadagam Ventures" <${process.env.EMAIL_FROM}>`,

//     to: companyEmail,

//     subject:
//       `Invoice ${invoiceNumber} – Invoice & Service Agreement`,

//     html,

//     attachments: [
//       {
//         filename: `Invoice-${invoiceNumber}.pdf`,

//         content: pdfBuffer,

//         contentType: "application/pdf",
//       },
//     ],
//   });

// };

exports.sendInvoiceWithAttachment = async (invoice) => {

  if (!invoice?.pdfKey) {
      throw new Error("Invoice PDF not found");
  }

  // ==========================================
  // GET PDF
  // LOCAL OR AWS S3
  // ==========================================

  let pdfBuffer;

  if (process.env.FILE_STORAGE === "local") {

      // ==============================
      // LOCAL PDF
      // ==============================

      const filePath = path.join(
          __dirname,
          "../uploads",
          invoice.pdfKey
      );

      console.log("📄 Reading local invoice PDF:");
      console.log(filePath);

      if (!fs.existsSync(filePath)) {
          throw new Error(
              `Invoice PDF not found locally: ${filePath}`
          );
      }

      pdfBuffer = fs.readFileSync(filePath);

      console.log("✅ Local invoice PDF loaded");

  } else {

      // ==============================
      // AWS S3 PDF
      // ==============================

      console.log("☁️ Reading invoice PDF from AWS S3");

      const command = new GetObjectCommand({
          Bucket: AWS_S3_BUCKET_NAME,
          Key: invoice.pdfKey,
      });

      const s3Object = await s3.send(command);

      pdfBuffer = Buffer.from(
          await s3Object.Body.transformToByteArray()
      );

      console.log("✅ Invoice PDF loaded from S3");
  }


  // ==========================================
  // COMPANY DETAILS
  // ==========================================

  const companyName =
      clean(invoice.company?.companyName) ||
      "Valued Client";

  const companyEmail =
      clean(invoice.company?.email);

  if (!companyEmail) {
      throw new Error("Customer email not found");
  }

  const invoiceNumber =
      clean(invoice.invoiceNumber);


  // ==========================================
  // EMAIL HTML
  // ==========================================

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
                  Dear ${companyName},
              </p>

              <p>
                  We hope this message finds you well.
              </p>

              <p>
                  Please find attached the
                  <strong>
                      Invoice (${invoiceNumber})
                  </strong>
                  along with the applicable
                  <strong>
                      Service Agreement
                  </strong>
                  for your review and records.
              </p>

              <p>
                  Kindly process the agreed payment terms
                  mentioned in the invoice.
                  Should you require any clarification
                  regarding the invoice or agreement,
                  please feel free to contact us.
              </p>

              <p>
                  We appreciate your continued business
                  and look forward to serving you.
              </p>

              <br />

              <p>
                  Warm Regards,<br />

                  <strong>
                      Kadagam Ventures Private Limited
                  </strong>

                  <br />

                  ${clean(invoice.company?.phone)}
              </p>

          </body>

      </html>
  `;


  // ==========================================
  // SEND EMAIL USING HOSTINGER SMTP
  // ==========================================

  await transporter.sendMail({

      from:
          `"Kadagam Ventures" <${process.env.EMAIL_FROM}>`,

      to: companyEmail,

      subject:
          `Invoice ${invoiceNumber} – Invoice & Service Agreement`,

      html,

      attachments: [
          {
              filename:
                  `Invoice-${invoiceNumber}.pdf`,

              content: pdfBuffer,

              contentType: "application/pdf",
          },
      ],
  });

  console.log(
      `✅ Invoice ${invoiceNumber} emailed successfully to ${companyEmail}`
  );
};