module.exports = ({ fullName, contactNumber, email, inquiryAbout }) => `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f4f4f4;font-family:Arial">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" style="background:#ffffff;border-radius:6px">

<tr>
<td style="padding:30px;text-align:center">
<h2 style="color:#1e3a8a">Kadagam Ventures</h2>
<p style="font-size:13px;color:#777">New Get in Touch Inquiry</p>
</td>
</tr>

<tr>
<td style="padding:30px;color:#333">
<table width="100%" cellpadding="10" cellspacing="0" border="1" style="border-collapse:collapse">
<tr>
<td><b>Full Name</b></td>
<td>${fullName}</td>
</tr>

<tr>
<td><b>Email</b></td>
<td>${email}</td>
</tr>

<tr>
<td><b>Contact Number</b></td>
<td>${contactNumber}</td>
</tr>

<tr>
<td><b>Inquiry About</b></td>
<td>${inquiryAbout.toUpperCase()}</td>
</tr>
</table>

<p style="margin-top:30px">
— Kadagam Ventures System
</p>
</td>
</tr>

<tr>
<td style="padding:20px;font-size:12px;background:#fafafa;text-align:center">
Kadagam Ventures Private Limited<br/>
Bengaluru – 560051<br/>
info@kadagamventures.com
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
