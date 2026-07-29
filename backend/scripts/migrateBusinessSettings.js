require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const BusinessSettings = require("../models/business.model");
  
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  
  const prisma = new PrismaClient({
    adapter,
  });
  
  async function migrate() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Connected to MongoDB");
  
      console.log("✅ Connected to PostgreSQL");
  
      const settings = await BusinessSettings.find();
  
      console.log(`Found ${settings.length} business settings`);
  
      for (const item of settings) {
        await prisma.businessSettings.create({
          data: {
            businessName: item.businessName,
            gstNumber: item.gstNumber,
            panNumber: item.panNumber,
            cin: item.cin,
            state: item.state,
            address: item.address,
            phone: item.phone,
            email: item.email,
            logoUrl: item.logoUrl,
            signatureUrl: item.signatureUrl,
            authorizedPerson: item.authorizedPerson,
            invoicePrefix: item.invoicePrefix,
            nextInvoiceNumber: item.nextInvoiceNumber,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          },
        });
      }
  
      console.log("✅ BusinessSettings migration completed.");
    } catch (error) {
      console.error("❌ Migration failed:", error);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();