const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  ses,
  s3,
  AWS_SES_SENDER_EMAIL,
  AWS_S3_BUCKET_NAME,
} = require("../config/aws");

const clean = (v) => v?.trim();

// 🔗 Generate Resume Download Link
const getResumeUrl = async (key) => {
  if (!key) return "Not Uploaded";

  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 60 * 60 }); // 1 hour
};

// 📩 ADMIN EMAIL (FULL DETAILS)
exports.sendAdminApplicationMail = async (data) => {
  const resumeUrl = await getResumeUrl(data.resumeKey);

  const command = new SendEmailCommand({
    Source: clean(AWS_SES_SENDER_EMAIL),
    Destination: {
      ToAddresses: [clean(process.env.SES_ADMIN_RECEIVER_EMAIL)],
    },
    Message: {
      Subject: {
        Data: `New Application – ${data.careerId.title}`,
      },
      Body: {
        Html: {
          Data: `
            <h2>New Career Application</h2>

            <p><b>Role:</b> ${data.careerId.title}</p>

            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
              <tr><td>Name</td><td>${data.firstName} ${data.lastName}</td></tr>
              <tr><td>Email</td><td>${data.email}</td></tr>
              <tr><td>Phone</td><td>${data.phone}</td></tr>
              <tr><td>Gender</td><td>${data.gender || "-"}</td></tr>
              <tr><td>Location</td><td>${data.location}</td></tr>
              <tr><td>Experience</td><td>${data.experience}</td></tr>
              <tr><td>Current Salary</td><td>${data.currentSalary || "-"}</td></tr>
              <tr><td>Expected Salary</td><td>${data.expectedSalary || "-"}</td></tr>
              <tr><td>Notice Period</td><td>${data.noticePeriod || "-"}</td></tr>
              <tr><td>Joining Time</td><td>${data.joiningTime || "-"}</td></tr>
              <tr><td>Joining Date</td><td>${data.joiningDate ? new Date(data.joiningDate).toDateString() : "-"}</td></tr>
              <tr><td>Immediate Joiner</td><td>${data.isImmediateJoiner ? "Yes" : "No"}</td></tr>
            </table>

            <br/>
            <p><b>Resume:</b> <a href="${resumeUrl}">Download PDF</a></p>

            <br/>
            <p>— Kadagam Careers System</p>
          `,
        },
      },
    },
  });

  await ses.send(command);
};


// ✉️ PROFESSIONAL APPLICANT AUTO-REPLY
exports.sendApplicantReply = async (email, name) => {
  const command = new SendEmailCommand({
    Source: clean(AWS_SES_SENDER_EMAIL),
    Destination: {
      ToAddresses: [clean(email)],
    },
    Message: {
      Subject: {
        Data: "Application Received – Kadagam Ventures",
      },
      Body: {
        Html: {
          Data: `
            <p>Dear ${name || "Candidate"},</p>

            <p>
              Thank you for your interest in joining <b>Kadagam Ventures</b>.
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

            <br/>

            <p>
              Warm regards,<br/>
              <b>HR Team</b><br/>
              Kadagam Ventures Private limited, Bengaluru, Karnataka 560051
            </p>

            <p style="font-size:12px;color:#777">
              This is an automated message. Please do not reply.
            </p>
          `,
        },
      },
    },
  });

  await ses.send(command);
};
