const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  ses,
  s3,
  AWS_SES_SENDER_EMAIL,
  AWS_S3_BUCKET_NAME,
} = require("../config/aws");

const Subscriber = require("../models/subscriber.model");
const template = require("../services/companyUpdate.template");

exports.sendUpdateToSubscribers = async (update) => {
  const subscribers = await Subscriber.find({ isActive: true });

  let pdfUrl = null;
  if (update.pdfKey) {
    pdfUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: update.pdfKey,
      }),
      { expiresIn: 60 * 60 * 24 } // 24 hours
    );
  }

  for (const sub of subscribers) {
    const unsubscribeUrl =
      `${process.env.BACKEND_URL}/api/subscribe/unsubscribe` +
      `?email=${encodeURIComponent(sub.email)}`;

    const html = template({
      title: update.title,
      message: update.message,
      pdfUrl,
      unsubscribeUrl,
    });

    await ses.send(
      new SendEmailCommand({
       // Source: AWS_SES_SENDER_EMAIL,
        Source: `"Kadagam Ventures Private Limited" <${AWS_SES_SENDER_EMAIL}>`,
        Destination: { ToAddresses: [sub.email] },
        ReplyToAddresses: ["info@kadagamventures.com"],
        Message: {
          Subject: { Data: update.title },
          Body: { Html: { Data: html } },
        },
      })
    );
  }
};
