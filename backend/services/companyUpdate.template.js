module.exports = ({ title, message, pdfUrl, unsubscribeUrl }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Kadagam Ventures – Company Update</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<!-- MAIN CARD -->
<table width="600" cellpadding="0" cellspacing="0"
       style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08)">

<!-- HEADER -->
<tr>
<td style="padding:28px 30px;text-align:center;background:#ffffff">
  <img
    src="https://kadagamventuresmain.s3.ap-south-1.amazonaws.com/subscrieemail/Kadagam+Ventures+logo.png"
    alt="Kadagam Ventures"
    width="180"
    style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none"
  />

  <p style="margin:10px 0 0 0;font-size:13px;color:#6b7280">
    Official Company Communication
  </p>
</td>
</tr>

<!-- DIVIDER -->
<tr>
<td>
  <hr style="border:none;border-top:1px solid #e5e7eb"/>
</td>
</tr>

<!-- CONTENT -->
<tr>
<td style="padding:32px;color:#111827">

  <h3 style="margin:0 0 12px 0;font-size:20px;color:#111827">
    ${title}
  </h3>

  <p style="font-size:15px;line-height:24px;color:#374151;margin:0">
    ${message}
  </p>

  ${
    pdfUrl
      ? `
      <table cellpadding="0" cellspacing="0" style="margin-top:28px">
        <tr>
          <td>
            <a href="${pdfUrl}"
               target="_blank"
               style="
                 display:inline-block;
                 background:#2563eb;
                 color:#ffffff;
                 padding:12px 22px;
                 border-radius:6px;
                 text-decoration:none;
                 font-size:14px;
                 font-weight:bold">
              📄 Download Attached Report
            </a>
          </td>
        </tr>
      </table>
      `
      : ""
  }

  <p style="margin-top:32px;font-size:14px;color:#374151">
    Regards,<br/>
    <b>Kadagam Ventures Team</b>
  </p>

  <!-- EXPLORE BUTTON -->
<table cellpadding="0" cellspacing="0" align="center" style="margin-top:24px">
  <tr>
    <td
      align="center"
     bgcolor="#1e40af"

      style="border-radius:30px"
    >
      <a
        href="${process.env.FRONTEND_URL}"
        target="_blank"
        style="
          display:inline-block;
          padding:14px 36px;
          font-size:14px;
          font-weight:600;
          color:#ffffff;
          text-decoration:none;
          letter-spacing:0.4px;
        "
      >
        Explore Our Solutions
      </a>
    </td>
  </tr>
</table>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding:22px;background:#f9fafb;text-align:center;font-size:12px;color:#6b7280">

  <b>Kadagam Ventures Private Limited</b><br/>
  Bengaluru – 560051<br/><br/>

  <a href="${unsubscribeUrl}"
     target="_blank"
     rel="noopener noreferrer"
     style="color:#6b7280;text-decoration:underline">
    Unsubscribe
  </a>

</td>
</tr>

</table>
<!-- END CARD -->

</td>
</tr>
</table>

</body>
</html>
`;
