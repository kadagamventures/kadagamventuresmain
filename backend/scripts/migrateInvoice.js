require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const fs = require("fs");
  const path = require("path");
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const Invoice = require("../models/invoice.modeal");
  
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  
  const prisma = new PrismaClient({
    adapter,
  });
  
  const companyIdMap = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "companyIdMap.json"),
      "utf8"
    )
  );
  
  async function migrate() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("✅ Connected to MongoDB");
      console.log("✅ Connected to PostgreSQL");
  
      const invoices = await Invoice.find();
  
      console.log(`Found ${invoices.length} invoices`);
  
      for (const invoice of invoices) {

        // Check if company exists
        if (!invoice.company) {
            console.log(
              `❌ Company not found for invoice ${invoice.invoiceNumber}`
            );
            continue;
          }
      
        const companyId =
  companyIdMap[invoice.company.toString()];
      
        // Check if company mapping exists
        if (!companyId) {
          console.log(
            `❌ Company mapping not found for invoice ${invoice.invoiceNumber}`
          );
          continue;
        }
      
        const createdInvoice = await prisma.invoice.create({
          data: {
            invoiceNumber: invoice.invoiceNumber,
  
            invoiceType:
              invoice.invoiceType === "Proforma Invoice"
                ? "Proforma_Invoice"
                : "Tax_Invoice",
  
            companyId,
  
            invoiceDate: invoice.invoiceDate,
            dueDate: invoice.dueDate,
  
            placeOfSupply: invoice.placeOfSupply,
  
            status: invoice.status,
  
            subTotal: invoice.subTotal,
            totalGST: invoice.totalGST,
            roundOff: invoice.roundOff,
            grandTotal: invoice.grandTotal,
  
            advanceAmount: invoice.advanceAmount,
            totalPaid: invoice.totalPaid,
            pendingAmount: invoice.pendingAmount,
  
            amountInWords: invoice.amountInWords,
  
            termsAndConditions:
              invoice.termsAndConditions,
  
            pdfKey: invoice.pdfKey,
  
            isDeleted: invoice.isDeleted,
  
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
          },
        });
  
        console.log(
          `✅ Invoice ${invoice.invoiceNumber} migrated`
        );
  
        // Part 2 will go here

        //
// Migrate Invoice Services
//
for (const service of invoice.services) {
    await prisma.invoiceService.create({
      data: {
        invoiceId: createdInvoice.id,
  
        serviceName: service.serviceName,
        description: service.description,
  
        sacCode: service.sacCode,
  
        price: service.price,
        quantity: service.quantity,
  
        gstRate: service.gstRate,
  
        taxableAmount: service.taxableAmount,
  
        cgst: service.cgst,
        sgst: service.sgst,
        igst: service.igst,
  
        total: service.total,
      },
    });
  }
  
  //
  // Migrate Invoice Payments
  //
  for (const payment of invoice.payments) {
    await prisma.invoicePayment.create({
      data: {
        invoiceId: createdInvoice.id,
  
        amount: payment.amount,
  
        paymentMethod: payment.paymentMethod,
  
        transactionId: payment.transactionId,
  
        paymentDate: payment.paymentDate,
  
        notes: payment.notes,
      },
    });
  }
  
  console.log(
    `   ↳ Services: ${invoice.services.length}, Payments: ${invoice.payments.length}`
  );
  
  // Part 3 (EmailTracking & EmailHistory) will be added here.

  //
// Migrate Email Tracking
//
if (invoice.emailTracking) {

    const createdTracking = await prisma.emailTracking.create({
      data: {
        invoiceId: createdInvoice.id,
  
        sent: invoice.emailTracking.sent,
  
        sentCount: invoice.emailTracking.sentCount,
  
        lastSentAt: invoice.emailTracking.lastSentAt,
      },
    });
  
    //
    // Migrate Email History
    //
    if (
      invoice.emailTracking.history &&
      invoice.emailTracking.history.length > 0
    ) {
      for (const history of invoice.emailTracking.history) {
  
        await prisma.emailHistory.create({
          data: {
            emailTrackingId: createdTracking.id,
  
            sentAt: history.sentAt,
  
            sentTo: history.sentTo,
          },
        });
  
      }
    }
  
    console.log(
      `   ↳ Email History: ${
        invoice.emailTracking.history?.length || 0
      }`
    );
  }

      }
  
      console.log("✅ Invoice migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();