const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { ses, AWS_SES_SENDER_EMAIL } = require("../config/aws");

exports.sendWelcomeSubscriptionEmail = async (email) => {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<!-- MAIN CONTAINER -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff">


<!-- LOGO -->
<tr>
  <td style="padding:25px 20px;text-align:center;background:#ffffff">
    <img
      src="https://kadagamventuresmain.s3.ap-south-1.amazonaws.com/subscrieemail/Kadagam+Ventures+logo.png"
      alt="Kadagam Ventures"
      width="230"
      style="display:block;margin:0 auto;border:0"
    />
  </td>
</tr>

<!-- HEADER IMAGE -->
<tr>
  <td style="padding:0;text-align:center;background:#ffffff">
    <img
      src="https://kadagamventuresmain.s3.ap-south-1.amazonaws.com/subscrieemail/Header+file.png"
      alt="Kadagam Ventures - Digital Solutions"
      width="600"
      style="display:block;width:100%;max-width:600px;border:0"
    />
  </td>
</tr>

<!-- TAGLINE BELOW IMAGE -->
<tr>
  <td style="padding:22px 30px;text-align:center;background:#ffffff">
    <p style="
      font-size:15px;
      line-height:22px;
      color:#666666;
      margin:0;
      font-family:Arial,Helvetica,sans-serif;
    ">
      A modern software platform designed to streamline operations,
      improve productivity and help businesses work smarter—securely
      and efficiently.
    </p>
  </td>
</tr>


<!-- PRODUCTS SECTION -->
<tr>
  <td style="padding:30px 20px">

    <!-- TITLE -->
    <h2 style="text-align:center;font-size:24px;margin:0">
      Our Products
    </h2>

    <!-- RED UNDERLINE -->
    <div style="width:60px;height:4px;background:#e53935;margin:10px auto 30px auto;border-radius:2px"></div>

    <!-- PRODUCTS TABLE -->
    <table width="100%" cellpadding="0" cellspacing="0">

      <!-- ROW 1 -->
      <tr>

        <!-- LEFT GAP -->
        <td width="2%"></td>

        <!-- NITHYA EVENT -->
        <td width="46%" valign="top" bgcolor="#fdecea"
            style="border-radius:14px;padding:22px">

          <p style="font-size:12px;color:#666;margin:0">
            Events Made Effortless
          </p>

          <h3 style="margin:6px 0 10px 0">Nithya Event</h3>

          <p style="font-size:14px;color:#333;line-height:21px">
            A complete event management suite connecting teams,
            timelines, vendors and venues—designed to make
            every event a success.
          </p>

          <a href="https://nithyaevent.com/"
             style="display:inline-block;background:#e53935;color:#fff;
                    padding:10px 20px;border-radius:6px;
                    text-decoration:none;font-size:13px">
            Try Now
          </a>
        </td>

        <!-- CENTER GAP -->
        <td width="4%"></td>

        <!-- NITHYA TICKETS -->
        <td width="46%" valign="top" bgcolor="#e3f2fd"
            style="border-radius:14px;padding:22px">

          <p style="font-size:12px;color:#666;margin:0">
            Create. Share. Sell.
          </p>

          <h3 style="margin:6px 0 10px 0">Nithya Tickets</h3>

          <p style="font-size:14px;color:#333;line-height:21px">
            An all-in-one ticket creation platform connecting events,
            attendees, payments and marketing-built to make
            every event a sellout success.
          </p>

          <a href="https://nithyatickets.com/"
             style="display:inline-block;background:#1e88e5;color:#fff;
                    padding:10px 20px;border-radius:6px;
                    text-decoration:none;font-size:13px">
            Try Now
          </a>
        </td>

        <!-- RIGHT GAP -->
        <td width="2%"></td>

      </tr>

      <!-- VERTICAL GAP -->
      <tr><td colspan="5" height="24"></td></tr>

      <!-- ROW 2 -->
      <tr>

        <td width="2%"></td>

        <!-- KADAGAM FOUNDATION -->
        <td width="46%" valign="top" bgcolor="#e8f5e9"
            style="border-radius:14px;padding:22px">

          <p style="font-size:12px;color:#666;margin:0">
            Care Beyond Profit
          </p>

          <h3 style="margin:6px 0 10px 0">Kadagam Foundation</h3>

          <p style="font-size:14px;color:#333;line-height:21px">
            An all-in-one task management hub connecting teams,
            tasks, timelines and goals—built to help you work
            smarter and achieve faster.
          </p>

          <a href="https://kadagamfoundation.org/"
             style="display:inline-block;background:#43a047;color:#fff;
                    padding:10px 20px;border-radius:6px;
                    text-decoration:none;font-size:13px">
            Try Now
          </a>
        </td>

        <td width="4%"></td>

        <!-- KADAGAM NEXT -->
        <td width="46%" valign="top" bgcolor="#fff8e1"
            style="border-radius:14px;padding:22px">

          <p style="font-size:12px;color:#666;margin:0">
            All-in-one Suite
          </p>

          <h3 style="margin:6px 0 10px 0">Kadagam Next</h3>

          <p style="font-size:14px;color:#333;line-height:21px">
            Kadagam Next is the all-in-one workspace that connects
            people, projects and productivity. Assign tasks,
            track progress and collaborate in real time.
          </p>

          <a href="https://www.kadagamnext.com/"
             style="display:inline-block;background:#fbc02d;color:#000;
                    padding:10px 20px;border-radius:6px;
                    text-decoration:none;font-size:13px">
            Try Now
          </a>
        </td>

        <td width="2%"></td>

      </tr>

    </table>
  </td>
</tr>

<!-- SERVICES SECTION -->
<tr>
  <td style="padding:40px 30px;background:#ffffff">

    <!-- TITLE -->
    <h2 style="
      text-align:center;
      font-size:26px;
      margin:0;
      font-family:Arial,Helvetica,sans-serif;
      color:#111;
    ">
      Our Services
    </h2>

    <!-- RED UNDERLINE -->
    <div style="
      width:50px;
      height:4px;
      background:#e53935;
      margin:10px auto 35px auto;
      border-radius:2px;
    "></div>

    <!-- SERVICES TABLE -->
    <table width="100%" cellpadding="10" cellspacing="0">

      <tr>
        <!-- LEFT COLUMN -->
        <td width="50%" valign="top">
          <h4 style="margin:0 0 6px 0;color:#222">Website Development</h4>
          <p style="margin:0 0 20px 0;font-size:14px;line-height:20px;color:#666">
            Fast, responsive, and scalable websites tailored to your business goals.
          </p>

          <h4 style="margin:0 0 6px 0;color:#222">Digital Marketing</h4>
          <p style="margin:0 0 20px 0;font-size:14px;line-height:20px;color:#666">
            Data-driven SEO, social media, and performance marketing to grow your brand online.
          </p>

          <h4 style="margin:0 0 6px 0;color:#222">Landing Page Design</h4>
          <p style="margin:0;font-size:14px;line-height:20px;color:#666">
           High-converting landing pages with clear messaging, strong visuals and optimized user journeys..
          </p>
        </td>

        <!-- RIGHT COLUMN -->
        <td width="50%" valign="top">
          <h4 style="margin:0 0 6px 0;color:#222">Mobile App Development</h4>
          <p style="margin:0 0 20px 0;font-size:14px;line-height:20px;color:#666">
            High-performance Android and iOS apps built for scale, speed, and usability.
          </p>

          <h4 style="margin:0 0 6px 0;color:#222">UI/UX Designing</h4>
          <p style="margin:0 0 20px 0;font-size:14px;line-height:20px;color:#666">
            User-centric interfaces and seamless experiences designed for clarity and impact.
          </p>

          <h4 style="margin:0 0 6px 0;color:#222">Branding & Graphic Design</h4>
          <p style="margin:0;font-size:14px;line-height:20px;color:#666">
            Distinct brand identities through impactful logos, visuals, and cohesive design systems.
          </p>
        </td>
      </tr>

    </table>

    <!-- CTA BUTTON -->
    <table align="center" cellpadding="0" cellspacing="0" style="margin-top:35px">
      <tr>
        <td align="center" bgcolor="#1e40af" style="border-radius:30px">
          <a
            href="${process.env.FRONTEND_URL}"
            target="_blank"
            style="
              display:inline-block;
              padding:14px 36px;
              color:#ffffff;
              font-size:14px;
              font-weight:bold;
              text-decoration:none;
              font-family:Arial,Helvetica,sans-serif;
            "
          >
            Explore Services
          </a>
        </td>
      </tr>
    </table>

  </td>
</tr>

<!-- FINAL FOOTER -->
<tr>
  <td style="padding:45px 30px;background:#ffffff;text-align:center;font-family:Arial,Helvetica,sans-serif">

    <!-- TITLE -->
    <h2 style="margin:0;font-size:26px;color:#111">
      Let’s Build Something Together
    </h2>

    <!-- RED UNDERLINE -->
    <div style="
      width:60px;
      height:4px;
      background:#e53935;
      margin:10px auto 18px auto;
      border-radius:2px">
    </div>

    <!-- DESCRIPTION -->
    <p style="max-width:520px;margin:0 auto 25px auto;
      font-size:15px;line-height:22px;color:#666">
      Whether you’re looking for a reliable tech partner, a ready-to-use product,
      or a custom solution — <b>Kadagam Ventures</b> is here to help.
    </p>

    <!-- BUTTON -->
    <table align="center" cellpadding="0" cellspacing="0" style="margin-bottom:40px">
      <tr>
        <td style="border:1px solid #999;border-radius:6px">
          <a href="${process.env.FRONTEND_URL}"
             target="_blank"
             style="
               display:inline-block;
               padding:12px 32px;
               color:#555;
               font-size:14px;
               font-weight:bold;
               text-decoration:none">
            Explore Services
          </a>
        </td>
      </tr>
    </table>

    <!-- THANK YOU -->
    <h2 style="color:#b71c1c;font-size:30px;margin:0 0 25px 0">
      Thank you for Subscribing
    </h2>

    <!-- REACH OUT -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px">
      <tr>
        <td align="left" width="120" style="font-weight:bold;color:#111">
          Reach out to us
        </td>
        <td>
          <hr style="border:none;border-top:2px dotted #bbb"/>
        </td>
      </tr>
    </table>

    <!-- CONTACT SECTION -->
    <table width="100%" cellpadding="10" cellspacing="0">
      <tr>

        <!-- EMAIL -->
        <td width="33%" valign="top" align="left">
          <b>Email ID</b><br/>
          <span style="color:#555">info@kadagamventures.com</span>
        </td>

        <!-- QR -->
        <td width="34%" align="center">
          <img
            src="https://kadagamventuresmain.s3.ap-south-1.amazonaws.com/subscrieemail/Location+Scanner.png"
            width="110"
            alt="Location QR"
            style="display:block;margin:auto"/>
        </td>

        <!-- ADDRESS -->
        <td width="33%" valign="top" align="left">
          <b>Corporate Office Address</b><br/>
          <span style="color:#555;font-size:13px;line-height:20px">
            No.34, 1st Floor, Venkatappa Road,<br/>
            Tasker Town, Off Queens Road,<br/>
            Bengaluru – 560051
          </span>
        </td>

      </tr>
    </table>

  </td>
</tr>
</table>
</td>
</tr>
</table>

</body>
</html>
`;

  // const command = new SendEmailCommand({
  //   Source: `"Kadagam Ventures Private Limited" <${AWS_SES_SENDER_EMAIL}>`,
  //   Destination: { ToAddresses: [email] },
  //   Message: {
  //     Subject: { Data: "Welcome to Kadagam Ventures" },
  //     Body: { Html: { Data: html } },
  //   },
  // });

  const command = new SendEmailCommand({
    Source: `"Kadagam Ventures Private Limited" <${AWS_SES_SENDER_EMAIL}>`,
  
    Destination: {
      ToAddresses: [email],
    },
  
    ReplyToAddresses: ["info@kadagamventures.com"],
  
    Message: {
      Subject: {
        Data: "Welcome to Kadagam Ventures",
        Charset: "UTF-8",
      },
  
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
  
        Text: {
          Charset: "UTF-8",
          Data: `
  Welcome to Kadagam Ventures!
  
  Thank you for subscribing to Kadagam Ventures.
  We build modern digital solutions that help businesses grow.
  
  Visit us:
  https://kadagamventures.com
  
  Kadagam Ventures Private Limited
  Bengaluru – 560051
  info@kadagamventures.com
  `,
        },
      },
    },
  });
  

  await ses.send(command);
};
