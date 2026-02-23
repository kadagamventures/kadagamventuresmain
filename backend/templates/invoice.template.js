function numberToWords(num) {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  if ((num = num.toString()).length > 9) return "Overflow";
  if (Number(num) === 0) return "Zero Rupees Only";

  const n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

  if (!n) return "";

  let str = "";

  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore " : "";
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh " : "";
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand " : "";
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred " : "";
  str += (n[5] != 0) ? ((str != "") ? "and " : "") +
    (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + " " : "";

  return str.trim() + " Rupees Only";
}

module.exports = (data) => {
  const companyName = data.companyName || "";
  const companyAddress = data.companyAddress || "";
  const client = data.client || {};
  const services = data.services || [];

  const subtotal = data.subTotal || 0;
  const totalGST = data.totalGST || 0;
  const totalAmount = data.grandTotal || 0;
  const advance = data.advanceAmount || 0;
  const paid = data.totalPaid || 0;
  const pending = data.pendingAmount || 0;

  const grandTotalInWords = numberToWords(Math.round(totalAmount));
  const pendingInWords = numberToWords(Math.round(pending));

  let totalCGST = 0, totalSGST = 0, totalIGST = 0;
  services.forEach(s => {
    totalCGST += s.cgst || 0;
    totalSGST += s.sgst || 0;
    totalIGST += s.igst || 0;
  });

  const rows = services.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="text-align:left">${s.serviceName || ""}</td>
      <td>${s.quantity || 0}</td>
      <td>₹${(s.price || 0).toFixed(2)}</td>
      <td>₹${(s.taxableAmount || 0).toFixed(2)}</td>
      <td>₹${(s.cgst || 0).toFixed(2)}</td>
      <td>₹${(s.sgst || 0).toFixed(2)}</td>
      <td>₹${(s.igst || 0).toFixed(2)}</td>
      <td>₹${(s.total || 0).toFixed(2)}</td>
    </tr>
  `).join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tax Invoice - ${data.invoiceNumber || 'Draft'}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
      background: #f5f6f5;
      line-height: 1.5;
    }
    .container {
      max-width: 1000px;
      margin: 30px auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.08);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 25px;
      border-bottom: 3px solid #1e3a8a;
    }
    .logo img {
      max-height: 100px;
      max-width: 260px;
      object-fit: contain;
    }
    .company-info {
      text-align: right;
      font-size: 14px;
    }
    .company-info strong {
      font-size: 20px;
      color: #1e3a8a;
      display: block;
      margin-bottom: 4px;
    }
    .title {
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      color: #1e3a8a;
      margin: 35px 0 12px;
      letter-spacing: 0.8px;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      margin: 35px 0 40px;
      font-size: 14.5px;
    }
    .bill-to strong, .invoice-details strong {
      color: #1e3a8a;
      display: block;
      margin-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 30px 0;
      font-size: 13.2px;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 11px 10px;
      text-align: right;
    }
    th {
      background: #1e3a8a;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      font-size: 12.5px;
    }
    .service-col { text-align: left !important; width: 36%; }
    tr:nth-child(even) { background: #f8fafc; }
    tr:hover { background: #f1f5f9; transition: background 0.15s; }
    .totals {
      width: 380px;
      margin: 30px 0 20px auto;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      overflow: hidden;
      font-size: 14px;
    }
    .totals div {
      display: flex;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid #e5e7eb;
    }
    .totals div:last-child { border-bottom: none; }
    .grand {
      background: #1e3a8a;
      color: white;
      font-weight: 700;
      font-size: 16.5px;
    }
    .amount-words {
      margin: 20px 0 30px;
      font-size: 14.5px;
      color: #444;
    }
    .amount-words strong { color: #1e3a8a; }
    .payment-info {
      padding: 18px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      font-size: 14.5px;
      margin-bottom: 40px;
    }
    .status-paid   { color: #15803d; font-weight: bold; }
    .status-pending { color: #b91c1c; font-weight: bold; }
    .footer {
      text-align: center;
      font-size: 12.5px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 25px;
      margin-top: 50px;
    }

    /* MSA Styling */
    .msa-section {
      page-break-before: always;
      padding: 50px 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.08);
      margin: 40px auto;
      max-width: 1000px;
      font-size: 13.5px;
      line-height: 1.75;
    }
    .msa-section h2 {
      text-align: center;
      color: #1e3a8a;
      font-size: 26px;
      margin-bottom: 35px;
    }
    .msa-section h3 {
      color: #1e40af;
      margin: 32px 0 12px;
      font-size: 17px;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 6px;
    }
    .signature-table {
      width: 100%;
      margin-top: 90px;
    }
    .signature-table td {
      width: 50%;
      vertical-align: top;
      padding: 10px;
    }
    .signature-line {
      border-top: 1.5px solid #000;
      width: 75%;
      margin: 70px 0 10px;
    }

    @media print {
      body { background: white; padding: 0; }
      .container, .msa-section { box-shadow: none; margin: 0; border-radius: 0; }
      .totals { page-break-inside: avoid; }
    }
  </style>
</head>
<body>

<div class="container">

  <div class="header">
    <div class="logo">
      ${data.logo ? `<img src="${data.logo}" alt="${companyName} Logo">` : '<div style="font-size:32px;color:#999;">LOGO</div>'}
    </div>
    <div class="company-info">
      <strong>${companyName}</strong>
      ${companyAddress.replace(/\n/g, '<br>')}<br>
      GSTIN: ${data.gstNumber || '—'}<br>
      PAN: ${data.panNumber || '—'}
    </div>
  </div>

  <div class="title">TAX INVOICE</div>

  <div class="invoice-meta">
    <div class="bill-to">
      <strong>Bill To</strong>
      ${client.name || '—'}<br>
      ${client.address || ''}<br>
      ${client.email ? `Email: ${client.email}<br>` : ''}
      ${client.phone ? `Phone: ${client.phone}` : ''}
    </div>
    <div class="invoice-details">
      <strong>Invoice No</strong> ${data.invoiceNumber || '—'}<br>
      <strong>Date</strong> ${data.invoiceDate ? new Date(data.invoiceDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}<br>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th class="service-col">Service Description</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Taxable Amt</th>
        <th>CGST</th>
        <th>SGST</th>
        <th>IGST</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="9" style="text-align:center;padding:30px;">No services added</td></tr>'}
    </tbody>
  </table>

  <div class="totals">
    <div><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></div>
    ${totalCGST > 0 ? `<div><span>CGST</span><span>₹${totalCGST.toFixed(2)}</span></div>` : ''}
    ${totalSGST > 0 ? `<div><span>SGST</span><span>₹${totalSGST.toFixed(2)}</span></div>` : ''}
    ${totalIGST > 0 ? `<div><span>IGST</span><span>₹${totalIGST.toFixed(2)}</span></div>` : ''}
    <div class="grand"><span>Grand Total</span><span>₹${totalAmount.toFixed(2)}</span></div>
  </div>

  <div class="amount-words">
    <strong>Amount in Words:</strong><br>
    ${grandTotalInWords}
  </div>

  <div class="payment-info">
    ${advance > 0 ? `<div>Advance Received: <strong>₹${advance.toFixed(2)}</strong></div>` : ''}
    ${paid > 0 ? `<div>Total Paid: <strong>₹${paid.toFixed(2)}</strong></div>` : ''}
    ${pending > 0
      ? `<div class="status-pending">Balance Payable: <strong>₹${pending.toFixed(2)}</strong><br>(${pendingInWords})</div>`
      : `<div class="status-paid">Invoice Fully Paid – Thank You!</div>`
    }
  </div>

  <div class="footer">
    This is a computer-generated invoice and does not require a physical signature.<br>
    Thank you for your business. For any queries, please contact us.
  </div>

</div>

<div class="msa-section">

  <h2>MASTER SERVICES AGREEMENT</h2>

  <p>This Master Services Agreement (“<strong>Agreement</strong>”) is entered into on <strong>${data.agreementDate || "________________"}</strong> (“<strong>Effective Date</strong>”)</p>

  <p><strong>BETWEEN</strong></p>
  <p><strong>${data.ownerName || "Kadagam Ventures Private Limited"}</strong>, a company incorporated under the Companies Act, 2013, having its registered office at ${data.ownerAddress || "—"}, CIN: ${data.ownerCIN || "—"}, GSTIN: ${data.ownerGST || "—"}, PAN: ${data.ownerPAN || "—"}, represented by its authorised signatory ${data.ownerAuthorizedPerson || "—"}, (hereinafter referred to as the “<strong>Service Provider</strong>” or “<strong>we</strong>” / “<strong>us</strong>”);</p>

  <p><strong>AND</strong></p>
  <p><strong>${client.name || "—"}</strong>, having its principal place of business at ${client.address || "—"}, (hereinafter referred to as the “<strong>Client</strong>” or “<strong>you</strong>”).</p>

  <p>The Service Provider and the Client are hereinafter individually referred to as “<strong>Party</strong>” and collectively as the “<strong>Parties</strong>”.</p>

  <p><strong>WHEREAS</strong></p>
  <p>The Service Provider is engaged in the business of providing information technology, software development, consulting, digital transformation, and related professional services;</p>
  <p>The Client desires to engage the Service Provider to provide certain services from time to time as may be detailed in one or more Statements of Work (“<strong>SOW</strong>”), proposals, invoices or work orders;</p>
  <p>The Parties wish to set forth the general terms and conditions governing such services under this master framework agreement.</p>

  <p>NOW THEREFORE, in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:</p>

  <hr style="border:0; border-top:1px solid #d1d5db; margin:30px 0;">

  <h3>1. DEFINITIONS</h3>
  <p>“<strong>Services</strong>” means the professional services provided by the Service Provider, including but not limited to:</p>
  <ul>
    ${services.map(s => `<li>${s.serviceName || "Service item"}</li>`).join("")}
  </ul>
  <p>“<strong>Deliverables</strong>” means all outputs, documents, software, designs, code, reports, prototypes, or other materials produced by the Service Provider specifically for the Client under an applicable SOW.</p>
  <p>“<strong>Statement of Work (SOW)</strong>” or “<strong>Work Order</strong>” means any mutually agreed written or electronic document (including invoice where accepted) that specifies the scope, deliverables, timelines, fees, and other project-specific terms.</p>
  <p>“<strong>Confidential Information</strong>” means all non-public information disclosed by one Party to the other, whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential.</p>

  <h3>2. SCOPE OF SERVICES</h3>
  <p>2.1 The Service Provider shall perform the Services as described in the applicable SOW, invoice, or work order.</p>
  <p>2.2 Any change in scope must be agreed in writing (via change order or amended SOW) and may result in adjustment of fees, timelines, or both.</p>
  <p>2.3 The Client shall provide timely access, accurate information, materials, approvals, feedback, and cooperation reasonably required for the Service Provider to perform the Services.</p>
  <p>2.4 The Service Provider may use subcontractors provided that it remains fully responsible for their performance and compliance with this Agreement.</p>

  <h3>3. FEES & PAYMENT TERMS</h3>
  <p>Total Contract Value (as per this document): <strong>₹${totalAmount.toFixed(2)}</strong><br/>
  Advance / Payment Received: ₹${(advance + paid).toFixed(2)}<br/>
  Outstanding Amount: ₹${pending.toFixed(2)}</p>

  <p>3.1 Fees shall be as specified in the applicable SOW or invoice. All amounts are Inclusive of GST and other taxes, which shall be borne by the Client.</p>
  <p>3.2 Invoices shall be paid within the agreed credit period (default 15 days from invoice date) via bank transfer / UPI / cheque to the Service Provider’s designated account.</p>
<p>3.3 Overdue amounts shall attract an administrative charge at 18% per annum (or the maximum rate permitted by law) from the due date until payment.</p>
  <p>3.4 The Service Provider may suspend Services or withhold Deliverables if any undisputed invoice remains unpaid beyond 30 days after written reminder.</p>

  <h3>4. INTELLECTUAL PROPERTY RIGHTS</h3>
  <p>4.1 Subject to full payment of all fees due, the Service Provider assigns to the Client all right, title and interest in the Deliverables specifically created for the Client under this Agreement (“<strong>Client IP</strong>”).</p>
  <p>4.2 The Service Provider retains ownership of all pre-existing materials, tools, frameworks, templates, libraries, methodologies, know-how, and general IP (“<strong>Background IP</strong>”).</p>
  <p>4.3 The Client is granted a non-exclusive, perpetual, royalty-free, worldwide license to use Background IP solely as embedded in the Deliverables for its internal business purposes.</p>
  <p>4.4 The Client warrants that any materials or inputs provided by it do not infringe third-party IP rights.</p>

  <h3>5. CONFIDENTIALITY</h3>
  <p>5.1 Each Party shall maintain the Confidential Information of the other in strict confidence and shall not disclose it to any third party without prior written consent, except to its employees, contractors or advisors who need to know and are bound by equivalent confidentiality obligations.</p>
  <p>5.2 Confidential Information does not include information that is publicly known (through no fault of the receiving Party), independently developed, or lawfully received from a third party.</p>
  <p>5.3 Confidentiality obligations survive for five (5) years after termination or expiry of this Agreement.</p>

  <h3>6. DATA PROTECTION & SECURITY</h3>
  <p>6.1 The Service Provider shall implement reasonable technical, administrative, and physical security measures consistent with industry standards to protect Client data.</p>
  <p>6.2 The Client remains responsible for compliance with all applicable data protection laws (including the Digital Personal Data Protection Act, 2023 when notified) with respect to personal data it provides or instructs the Service Provider to process.</p>
  <p>6.3 In case of a data breach affecting Client data, the Service Provider shall notify the Client without undue delay and cooperate in mitigation efforts.</p>

  <h3>7. REPRESENTATIONS & WARRANTIES</h3>
  <p>7.1 Each Party represents that it has full power and authority to enter into this Agreement.</p>
  <p>7.2 The Service Provider warrants that Services will be performed in a professional, workmanlike manner consistent with industry standards by qualified personnel.</p>
  <p>7.3 EXCEPT AS EXPRESSLY PROVIDED HEREIN, ALL WARRANTIES (INCLUDING MERCHANTABILITY, FITNESS FOR PURPOSE, NON-INFRINGEMENT) ARE DISCLAIMED TO THE MAXIMUM EXTENT PERMITTED BY LAW.</p>

  <h3>8. INDEMNIFICATION</h3>
  <p>8.1 The Service Provider shall indemnify, defend and hold harmless the Client from any third-party claims arising from (i) infringement of third-party IP by Deliverables (excluding Client-provided materials), or (ii) gross negligence or willful misconduct by the Service Provider.</p>
  <p>8.2 The Client shall indemnify, defend and hold harmless the Service Provider from any third-party claims arising from (i) Client-provided materials or data infringing third-party rights, (ii) Client’s breach of law, or (iii) misuse of Deliverables.</p>
  <p>8.3 The indemnified Party shall promptly notify the indemnifying Party of any claim and allow it to control the defense and settlement (provided no settlement admits liability without consent, which shall not be unreasonably withheld).</p>

  <h3>9. LIMITATION OF LIABILITY</h3>
  <p>9.1 Except for indemnity obligations, breach of confidentiality, or gross negligence/willful misconduct, the total aggregate liability of either Party shall not exceed the fees actually paid or payable under the relevant SOW in the twelve (12) months preceding the claim.</p>
  <p>9.2 Neither Party shall be liable for any indirect, consequential, incidental, special, punitive, or exemplary damages, including loss of profits, revenue, data, or business opportunity, even if advised of the possibility thereof.</p>

  <h3>10. INSURANCE</h3>
  <p>10.1 The Service Provider shall maintain adequate professional indemnity insurance and general liability insurance as per industry standards during the term of this Agreement.</p>

  <h3>11. TERM & TERMINATION</h3>
  <p>11.1 This Agreement commences on the Effective Date and continues until terminated in accordance with this clause or completion of all SOWs (whichever is later).</p>
  <p>11.2 Either Party may terminate this Agreement or any SOW for material breach (including non-payment) if the breach remains uncured for 30 days after written notice.</p>
  <p>11.3 Upon termination: (i) Client shall pay all undisputed fees for Services rendered up to termination; (ii) each Party shall return or destroy the other’s Confidential Information; (iii) surviving provisions (IP license, confidentiality, indemnity, limitation of liability, governing law) continue.</p>

  <h3>12. FORCE MAJEURE</h3>
  <p>Neither Party shall be liable for delay or failure to perform (except payment obligations) due to events beyond reasonable control, including acts of God, war, terrorism, pandemics, government orders, internet outages, or strikes.</p>

  <h3>13. DISPUTE RESOLUTION</h3>
  <p>13.1 Any dispute shall first be attempted to be resolved amicably through senior management discussions within 30 days.</p>
  <p>13.2 Failing amicable resolution, disputes shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996 (as amended). The seat shall be Bengaluru, Karnataka. The tribunal shall consist of one arbitrator. Language: English.</p>

  <h3>14. GOVERNING LAW & JURISDICTION</h3>
  <p>This Agreement shall be governed by and construed in accordance with the laws of India. Subject to arbitration above, courts at Bengaluru shall have exclusive jurisdiction.</p>

  <h3>15. NOTICES</h3>
  <p>All notices shall be in writing and sent to the addresses mentioned above (or as updated by written notice) via email with read receipt or registered post / courier.</p>

  <h3>16. MISCELLANEOUS</h3>
  <p>16.1 **Assignment** — Neither Party may assign this Agreement without the other’s prior written consent, except in connection with a merger, acquisition, or sale of all/substantially all assets.</p>
  <p>16.2 **Severability** — If any provision is held invalid or unenforceable, the remainder shall continue in full force.</p>
  <p>16.3 **Waiver** — No waiver shall be effective unless in writing. No waiver of one breach shall constitute waiver of any other.</p>
  <p>16.4 **Entire Agreement** — This Agreement (including all SOWs, invoices accepted, and referenced documents) constitutes the entire understanding and supersedes all prior agreements, representations, or understandings.</p>
  <p>16.5 **Counterparts & Electronic Signatures** — This Agreement may be executed in counterparts and electronically (including DocuSign or similar), each of which shall be deemed an original.</p>
  <p>16.6 **Survival** — Provisions intended to survive termination (confidentiality, IP, indemnity, limitation of liability, governing law, etc.) shall survive.</p>
  <p>16.7 **Anti-Bribery** — Each Party shall comply with all applicable anti-corruption laws, including the Prevention of Corruption Act, 1988.</p>

  <br/><br/>

  <table class="signature-table">
    <tr>
      <td>
        <strong>For Service Provider</strong><br><br>
        Name: ${data.ownerAuthorizedPerson || "—"}<br>
        Designation: Director / Authorized Signatory<br><br>
        <div class="signature-line"></div>
        Date: ________________
      </td>
      <td>
        <strong>For Client</strong><br><br>
        Name: ${client.name || "—"}<br>
        Designation: ________________________<br><br>
        <div class="signature-line"></div>
        Date: ________________
      </td>
    </tr>
  </table>

</div>

</body>
</html>
  `;
};