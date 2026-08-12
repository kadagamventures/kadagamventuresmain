// const puppeteer = require("puppeteer");
// const { PutObjectCommand } = require("@aws-sdk/client-s3");
// const { s3, AWS_S3_BUCKET_NAME } = require("../config/aws");
// const generateTemplate = require("../templates/invoice.template");

// class PDFService {

//     static async generateInvoicePDF(invoiceData) {

//         const browser = await puppeteer.launch({
//             headless: true,
//             args: ["--no-sandbox", "--disable-setuid-sandbox"]
//         });

//         const page = await browser.newPage();


//         const html = generateTemplate(invoiceData);

//         await page.setContent(html, { waitUntil: "networkidle0" });
//         await page.evaluateHandle('document.fonts.ready');

//         await page.emulateMediaType('screen');

//         // Generate PDF as Buffer (NOT file)
//         const pdfBuffer = await page.pdf({
//             format: "A4",
//             printBackground: true,
//             margin: {
//                 top: "20px",
//                 bottom: "20px",
//                 left: "20px",
//                 right: "20px"
//             }
//         });

//         await browser.close();

//         // Upload to S3
//         const fileKey = `invoices/${invoiceData.invoiceNumber}.pdf`;

//         const uploadParams = {
//             Bucket: AWS_S3_BUCKET_NAME,
//             Key: fileKey,
//             Body: pdfBuffer,
//             ContentType: "application/pdf"
//         };

//         // Upload to S3 (private bucket)
//         await s3.send(new PutObjectCommand(uploadParams));

//         // Return only fileKey (NOT public URL)
//         return fileKey;
//     }

// }

// module.exports = PDFService;

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const {
    s3,
    AWS_S3_BUCKET_NAME
} = require("../config/aws");

const generateTemplate = require("../templates/invoice.template");

class PDFService {

    static async generateInvoicePDF(invoiceData) {

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });

        try {

            const page = await browser.newPage();

            const html = generateTemplate(invoiceData);

            await page.setContent(html, {
                waitUntil: "networkidle0"
            });

            await page.evaluateHandle(
                "document.fonts.ready"
            );

            await page.emulateMediaType("screen");

            // Generate PDF as Buffer
            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "20px",
                    bottom: "20px",
                    left: "20px",
                    right: "20px"
                }
            });

            // ==========================================
            // FILE NAME
            // ==========================================

            const fileName =
                `${invoiceData.invoiceNumber}.pdf`;

            // ==========================================
            // LOCAL STORAGE
            // ==========================================

            if (process.env.FILE_STORAGE === "local") {

                const uploadDir = path.join(
                    __dirname,
                    "../uploads/invoices"
                );

                // Create folder if it doesn't exist
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, {
                        recursive: true
                    });
                }

                const filePath = path.join(
                    uploadDir,
                    fileName
                );

                // Save PDF to local computer
                fs.writeFileSync(
                    filePath,
                    pdfBuffer
                );

                console.log(
                    "✅ Invoice PDF saved locally:",
                    filePath
                );

                // Store relative path in database
                return `invoices/${fileName}`;
            }

            // ==========================================
            // AWS S3 STORAGE
            // ==========================================

            const fileKey =
                `invoices/${fileName}`;

            const uploadParams = {
                Bucket: AWS_S3_BUCKET_NAME,
                Key: fileKey,
                Body: pdfBuffer,
                ContentType: "application/pdf"
            };

            await s3.send(
                new PutObjectCommand(uploadParams)
            );

            console.log(
                "✅ Invoice PDF uploaded to S3:",
                fileKey
            );

            return fileKey;

        } finally {

            await browser.close();

        }
    }
}

module.exports = PDFService;