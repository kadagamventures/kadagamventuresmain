// const Invoice = require("../models/invoice.modeal");
// const Business = require("../models/business.model");
// const Company = require("../models/company.model");
const prisma = require("../config/prisma");
const PDFService = require("./pdf.service");
const EmailService = require("./email.service")
const { s3, AWS_S3_BUCKET_NAME } = require("../config/aws");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const fs = require("fs");
const path = require("path");

const logoPath = path.join(__dirname, "../assets/Kadagamventureslogohd.png");
const logoBase64 = fs.readFileSync(logoPath).toString("base64");

class InvoiceService {

    // static async generateInvoiceNumber() {
    //     const settings = await Business.findOneAndUpdate(
    //         {},
    //         { $inc: { nextInvoiceNumber: 1 } },
    //         { new: true }
    //     );

    //     if (!settings) throw new Error("Business settings not found");

    //     const year = new Date().getFullYear();

    //     return `${settings.invoicePrefix}-${year}-${String(settings.nextInvoiceNumber - 1).padStart(3, "0")}`;

    // }
    static async generateInvoiceNumber() {
        const settings = await prisma.businessSettings.findFirst();
    
        if (!settings) {
            throw new Error("Business settings not found");
        }
    
        const updatedSettings = await prisma.businessSettings.update({
            where: {
                id: settings.id,
            },
            data: {
                nextInvoiceNumber: {
                    increment: 1,
                },
            },
        });
    
        const year = new Date().getFullYear();
    
        return `${updatedSettings.invoicePrefix}-${year}-${String(
            updatedSettings.nextInvoiceNumber - 1
        ).padStart(3, "0")}`;
    }

    // static async create(data) {
    //     const invoiceNumber = await this.generateInvoiceNumber();

    //     const invoice = await Invoice.create({
    //         ...data,
    //         invoiceNumber
    //     });

    //     return invoice;
    // }
    static async create(data) {
        const invoiceNumber = await this.generateInvoiceNumber();
    
        // Convert frontend invoice type to Prisma enum
        const invoiceType =
            data.invoiceType === "Proforma Invoice"
                ? "Proforma_Invoice"
                : "Tax_Invoice";
    
        const invoice = await prisma.invoice.create({
            data: {
                invoiceNumber,
                invoiceType,
    
                companyId: Number(data.companyId),
    
                invoiceDate: data.invoiceDate
                    ? new Date(data.invoiceDate)
                    : new Date(),
    
                dueDate: data.dueDate
                    ? new Date(data.dueDate)
                    : null,
    
                placeOfSupply: data.placeOfSupply,
    
                subTotal: Number(data.subTotal || 0),
                totalGST: Number(data.totalGST || 0),
                roundOff: Number(data.roundOff || 0),
                grandTotal: Number(data.grandTotal || 0),
    
                advanceAmount: Number(data.advanceAmount || 0),
                totalPaid: Number(data.totalPaid || 0),
                pendingAmount: Number(data.pendingAmount || 0),
    
                amountInWords: data.amountInWords,
                termsAndConditions: data.termsAndConditions,
    
                services: {
                    create: (data.services || []).map((service) => ({
                        serviceName: service.serviceName,
                        description: service.description,
                        sacCode: service.sacCode,
    
                        price: Number(service.price || 0),
                        quantity: Number(service.quantity || 1),
                        gstRate: Number(service.gstRate || 0),
    
                        taxableAmount: Number(service.taxableAmount || 0),
                        cgst: Number(service.cgst || 0),
                        sgst: Number(service.sgst || 0),
                        igst: Number(service.igst || 0),
                        total: Number(service.total || 0),
                    })),
                },
    
                payments: {
                    create: (data.payments || []).map((payment) => ({
                        amount: Number(payment.amount || 0),
                        paymentMethod: payment.paymentMethod,
                        transactionId: payment.transactionId,
                        paymentDate: payment.paymentDate
                            ? new Date(payment.paymentDate)
                            : new Date(),
                        notes: payment.notes,
                    })),
                },
    
                emailTracking: {
                    create: {
                        sent: false,
                        sentCount: 0,
                    },
                },
            },
    
            include: {
                company: true,
                services: true,
                payments: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        return invoice;
    }

    // static async getAll(query) {
    //     const { page = 1, limit = 10 } = query;

    //     const invoices = await Invoice.find({ isDeleted: false })
    //         .populate("company")
    //         .sort({ createdAt: -1 })
    //         .skip((page - 1) * limit)
    //         .limit(Number(limit));

    //     const total = await Invoice.countDocuments({ isDeleted: false });

    //     return { invoices, total };
    // }
    static async getAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
    
        const [invoices, total] = await Promise.all([
            prisma.invoice.findMany({
                where: {
                    isDeleted: false,
                },
                include: {
                    company: true,
                    services: true,
                    payments: true,
                    emailTracking: {
                        include: {
                            history: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
    
            prisma.invoice.count({
                where: {
                    isDeleted: false,
                },
            }),
        ]);
    
        return {
            invoices,
            total,
        };
    }

    // static async getById(id) {
    //     const invoice = await Invoice.findById(id)
    //         .populate("company");

    //     if (!invoice || invoice.isDeleted)
    //         throw new Error("Invoice not found");

    //     return invoice;
    // }
    static async getById(id) {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                company: true,
                services: true,
                payments: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        if (!invoice || invoice.isDeleted) {
            throw new Error("Invoice not found");
        }
    
        return invoice;
    }

    // static async update(id, data) {
    //     const invoice = await Invoice.findOne({
    //         _id: id,
    //         isDeleted: false
    //     });


    //     if (!invoice || invoice.isDeleted)
    //         throw new Error("Invoice not found");

    //     Object.assign(invoice, data);
    //     return await invoice.save();
    // }
    static async update(id, data) {
        const invoice = await prisma.invoice.findFirst({
            where: {
                id: Number(id),
                isDeleted: false,
            },
        });
    
        if (!invoice) {
            throw new Error("Invoice not found");
        }
    
        const updatedInvoice = await prisma.invoice.update({
            where: {
                id: Number(id),
            },
            data: {
                //invoiceType,
                invoiceType: data.invoiceType,
                //companyId: Number(data.companyId),
        
                invoiceDate: data.invoiceDate
                    ? new Date(data.invoiceDate)
                    : new Date(),
        
                dueDate: data.dueDate
                    ? new Date(data.dueDate)
                    : null,
        
                placeOfSupply: data.placeOfSupply,
        
                status: data.status,
        
                subTotal: Number(data.subTotal || 0),
                totalGST: Number(data.totalGST || 0),
                roundOff: Number(data.roundOff || 0),
                grandTotal: Number(data.grandTotal || 0),
        
                advanceAmount: Number(data.advanceAmount || 0),
                totalPaid: Number(data.totalPaid || 0),
                pendingAmount: Number(data.pendingAmount || 0),
        
                amountInWords: data.amountInWords,
                termsAndConditions: data.termsAndConditions,
        
                services: {
                    deleteMany: {},
                    create: (data.services || []).map((service) => ({
                        serviceName: service.serviceName,
                        description: service.description,
                        sacCode: service.sacCode,
        
                        price: Number(service.price || 0),
                        quantity: Number(service.quantity || 1),
                        gstRate: Number(service.gstRate || 0),
        
                        taxableAmount: Number(service.taxableAmount || 0),
                        cgst: Number(service.cgst || 0),
                        sgst: Number(service.sgst || 0),
                        igst: Number(service.igst || 0),
                        total: Number(service.total || 0),
                    })),
                },
            },
            include: {
                company: true,
                services: true,
                payments: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        return updatedInvoice;
    }

    // static async addPayment(id, paymentData) {
    //     const invoice = await Invoice.findOne({
    //         _id: id,
    //         isDeleted: false
    //     });

    //     if (!invoice || invoice.isDeleted)
    //         throw new Error("Invoice not found");

    //     // 1. Add payment
    //     invoice.payments.push(paymentData);

    //     // 2. Calculate total paid (IMPORTANT)
    //     const paymentsTotal = invoice.payments.reduce((sum, p) => {
    //         return sum + (p.amount || 0);
    //     }, 0);

    //     // 3. Include advance also
    //     invoice.totalPaid = paymentsTotal + (invoice.advanceAmount || 0);

    //     // 4. Recalculate pending
    //     invoice.pendingAmount = invoice.grandTotal - invoice.totalPaid;

    //     // 5. Optional: update status
    //     if (invoice.pendingAmount <= 0) {
    //         invoice.status = "paid";
    //     } else if (invoice.totalPaid > 0) {
    //         invoice.status = "partial";
    //     }

    //     await invoice.save();

    //     // Regenerate latest PDF
    //     await this.generatePDF(id);

    //     return invoice;
    // }
    static async addPayment(id, paymentData) {
        const invoice = await prisma.invoice.findFirst({
            where: {
                id: Number(id),
                isDeleted: false,
            },
            include: {
                payments: true,
            },
        });
    
        if (!invoice) {
            throw new Error("Invoice not found");
        }
    
        // Create payment
        await prisma.invoicePayment.create({
            data: {
                invoiceId: invoice.id,
                amount: paymentData.amount,
                paymentMethod: paymentData.paymentMethod,
                transactionId: paymentData.transactionId,
                paymentDate: paymentData.paymentDate,
                notes: paymentData.notes,
            },
        });
    
        // Calculate total paid
        const totalPayments =
            invoice.payments.reduce((sum, payment) => {
                return sum + payment.amount;
            }, 0) + paymentData.amount;
    
        const totalPaid = totalPayments + (invoice.advanceAmount || 0);
    
        const pendingAmount = invoice.grandTotal - totalPaid;
    
        let status = invoice.status;
    
        if (pendingAmount <= 0) {
            status = "paid";
        } else if (totalPaid > 0) {
            status = "partial";
        }
    
        const updatedInvoice = await prisma.invoice.update({
            where: {
                id: invoice.id,
            },
            data: {
                totalPaid,
                pendingAmount,
                status,
            },
            include: {
                company: true,
                services: true,
                payments: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        // Regenerate PDF
        await this.generatePDF(invoice.id);
    
        return updatedInvoice;
    }

    // static async delete(id) {
    //     const invoice = await Invoice.findOne({
    //         _id: id,
    //         isDeleted: false
    //     });

    //     if (!invoice) throw new Error("Invoice not found");

    //     invoice.isDeleted = true;
    //     return await invoice.save();
    // }
    static async delete(id) {
        const invoice = await prisma.invoice.findFirst({
            where: {
                id: Number(id),
                isDeleted: false,
            },
        });
    
        if (!invoice) {
            throw new Error("Invoice not found");
        }
    
        return await prisma.invoice.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: true,
            },
        });
    }

    // static async generatePDF(id) {

    //     const invoice = await Invoice.findById(id)
    //         .populate("company");

    //     if (!invoice) throw new Error("Invoice not found");

    //     const business = await Business.findOne();
    //     if (!business) throw new Error("Business settings missing");

    //     const templateData = {
    //         // Branding
    //         logo: business.logoUrl
    //             ? business.logoUrl
    //             : `data:image/png;base64,${logoBase64}`,

    //         companyName: business.businessName,
    //         companyAddress: business.address,
    //         gstNumber: business.gstNumber,
    //         panNumber: business.panNumber,
    //         cin: business.cin,
    //         phone: business.phone,
    //         email: business.email,
    //         authorizedPerson: business.authorizedPerson,
    //         bankDetails: business.bankDetails,

    //         // MSA owner fields
    //         ownerName: business.businessName,
    //         ownerAddress: business.address,
    //         ownerCIN: business.cin,
    //         ownerGST: business.gstNumber,
    //         ownerPAN: business.panNumber,
    //         ownerAuthorizedPerson: business.authorizedPerson,

    //         agreementDate: invoice.invoiceDate
    //             ? new Date(invoice.invoiceDate).toLocaleDateString("en-IN", {
    //                 day: "2-digit",
    //                 month: "long",
    //                 year: "numeric"
    //             })
    //             : "",


    //         // Invoice fields
    //         invoiceNumber: invoice.invoiceNumber,
    //         invoiceDate: invoice.invoiceDate,
    //         dueDate: invoice.dueDate,
    //         status: invoice.status,
    //         placeOfSupply: invoice.placeOfSupply,

    //         subTotal: invoice.subTotal,
    //         totalGST: invoice.totalGST,
    //         grandTotal: invoice.grandTotal,
    //         advanceAmount: invoice.advanceAmount,
    //         totalPaid: invoice.totalPaid,
    //         pendingAmount: invoice.pendingAmount,

    //         services: invoice.services,

    //         client: {
    //             name: invoice.company?.companyName || "",
    //             email: invoice.company?.email || "",
    //             phone: invoice.company?.phone || "",
    //             gstNumber: invoice.company?.gstNumber || "",
    //             address: [
    //                 invoice.company?.billingAddress?.street,
    //                 invoice.company?.billingAddress?.city,
    //                 invoice.company?.billingAddress?.state,
    //                 invoice.company?.billingAddress?.pincode
    //             ].filter(Boolean).join(", ")
    //         }
    //     };




    //     const fileKey = await PDFService.generateInvoicePDF(templateData);

    //     invoice.pdfKey = fileKey;
    //     await invoice.save();

    //     return invoice;
    // }
    static async generatePDF(id) {

        const invoice = await prisma.invoice.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                company: true,
                services: true,
            },
        });
    
        if (!invoice) {
            throw new Error("Invoice not found");
        }
    
        const business = await prisma.businessSettings.findFirst();
    
        if (!business) {
            throw new Error("Business settings missing");
        }
    
        const templateData = {
            // Branding
            logo: business.logoUrl
                ? business.logoUrl
                : `data:image/png;base64,${logoBase64}`,
    
            companyName: business.businessName,
            companyAddress: business.address,
            gstNumber: business.gstNumber,
            panNumber: business.panNumber,
            cin: business.cin,
            phone: business.phone,
            email: business.email,
            authorizedPerson: business.authorizedPerson,
            bankDetails: business.bankDetails,
    
            // MSA owner fields
            ownerName: business.businessName,
            ownerAddress: business.address,
            ownerCIN: business.cin,
            ownerGST: business.gstNumber,
            ownerPAN: business.panNumber,
            ownerAuthorizedPerson: business.authorizedPerson,
    
            agreementDate: invoice.invoiceDate
                ? new Date(invoice.invoiceDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                  })
                : "",
    
            // Invoice fields
            invoiceNumber: invoice.invoiceNumber,
            invoiceDate: invoice.invoiceDate,
            dueDate: invoice.dueDate,
            status: invoice.status,
            placeOfSupply: invoice.placeOfSupply,
    
            subTotal: invoice.subTotal,
            totalGST: invoice.totalGST,
            grandTotal: invoice.grandTotal,
            advanceAmount: invoice.advanceAmount,
            totalPaid: invoice.totalPaid,
            pendingAmount: invoice.pendingAmount,
    
            services: invoice.services,
    
            client: {
                name: invoice.company?.companyName || "",
                email: invoice.company?.email || "",
                phone: invoice.company?.phone || "",
                gstNumber: invoice.company?.gstNumber || "",
                address: [
                    invoice.company?.billingAddress?.street,
                    invoice.company?.billingAddress?.city,
                    invoice.company?.billingAddress?.state,
                    invoice.company?.billingAddress?.pincode,
                ]
                    .filter(Boolean)
                    .join(", "),
            },
        };
    
        const fileKey = await PDFService.generateInvoicePDF(templateData);
    
        const updatedInvoice = await prisma.invoice.update({
            where: {
                id: Number(id),
            },
            data: {
                pdfKey: fileKey,
            },
            include: {
                company: true,
                services: true,
                payments: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        return updatedInvoice;
    }

    // static async getSignedUrl(id) {
    //     const invoice = await Invoice.findOne({
    //         _id: id,
    //         isDeleted: false
    //     });


    //     if (!invoice || !invoice.pdfKey)
    //         throw new Error("PDF not found");

    //     const command = new GetObjectCommand({
    //         Bucket: AWS_S3_BUCKET_NAME,
    //         Key: invoice.pdfKey
    //     });

    //     const signedUrl = await getSignedUrl(s3, command, {
    //         expiresIn: 60 * 10
    //     });

    //     return signedUrl;
    // }
    static async getSignedUrl(id) {
        const invoice = await prisma.invoice.findFirst({
            where: {
                id: Number(id),
                isDeleted: false,
            },
        });
    
        if (!invoice || !invoice.pdfKey) {
            throw new Error("PDF not found");
        }
    
        const command = new GetObjectCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: invoice.pdfKey,
        });
    
        const signedUrl = await getSignedUrl(s3, command, {
            expiresIn: 60 * 10,
        });
    
        return signedUrl;
    }

    // static async sendInvoiceEmail(id) {

    //     const invoice = await Invoice.findById(id)
    //         .populate("company");

    //     if (!invoice || invoice.isDeleted)
    //         throw new Error("Invoice not found");

    //     if (!invoice.company)
    //         throw new Error("Associated company not found");

    //     if (!invoice.emailTracking) invoice.emailTracking = {};
    //     if (typeof invoice.emailTracking.sentCount !== "number")
    //         invoice.emailTracking.sentCount = 0;
    //     if (!Array.isArray(invoice.emailTracking.history))
    //         invoice.emailTracking.history = [];

    //     if (invoice.emailTracking.sentCount >= 10)
    //         throw new Error("Invoice send limit reached");

    //     // Always regenerate
    //     await this.generatePDF(id);

    //     const updatedInvoice = await Invoice.findById(id)
    //         .populate("company");

    //     await EmailService.sendInvoiceWithAttachment(updatedInvoice);

    //     updatedInvoice.emailTracking.sent = true;
    //     updatedInvoice.emailTracking.sentCount += 1;
    //     updatedInvoice.emailTracking.lastSentAt = new Date();

    //     updatedInvoice.emailTracking.history.push({
    //         sentAt: new Date(),
    //         sentTo: updatedInvoice.company.email
    //     });

    //     if (updatedInvoice.status === "draft") {
    //         updatedInvoice.status = "sent";
    //     }

    //     await updatedInvoice.save();

    //     return {
    //         message: "Invoice emailed successfully",
    //         sentCount: updatedInvoice.emailTracking.sentCount
    //     };
    // }
    static async sendInvoiceEmail(id) {

        const invoice = await prisma.invoice.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                company: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        if (!invoice || invoice.isDeleted) {
            throw new Error("Invoice not found");
        }
    
        if (!invoice.company) {
            throw new Error("Associated company not found");
        }
    
        if (!invoice.emailTracking) {
            throw new Error("Email tracking not found");
        }
    
        if (invoice.emailTracking.sentCount >= 10) {
            throw new Error("Invoice send limit reached");
        }
    
        // Always regenerate PDF
        await this.generatePDF(id);
    
        const updatedInvoice = await prisma.invoice.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                company: true,
                emailTracking: {
                    include: {
                        history: true,
                    },
                },
            },
        });
    
        await EmailService.sendInvoiceWithAttachment(updatedInvoice);
    
        await prisma.emailTracking.update({
            where: {
                invoiceId: updatedInvoice.id,
            },
            data: {
                sent: true,
                sentCount: {
                    increment: 1,
                },
                lastSentAt: new Date(),
                history: {
                    create: {
                        sentAt: new Date(),
                        sentTo: updatedInvoice.company.email,
                    },
                },
            },
        });
    
        if (updatedInvoice.status === "draft") {
            await prisma.invoice.update({
                where: {
                    id: updatedInvoice.id,
                },
                data: {
                    status: "sent",
                },
            });
        }
    
        const tracking = await prisma.emailTracking.findUnique({
            where: {
                invoiceId: updatedInvoice.id,
            },
        });
    
        return {
            message: "Invoice emailed successfully",
            sentCount: tracking.sentCount,
        };
    }

}

module.exports = InvoiceService;