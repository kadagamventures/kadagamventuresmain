require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const Inquiry = require("../models/inquiry.model");
  
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
  
      const inquiries = await Inquiry.find();
  
      console.log(`Found ${inquiries.length} inquiries`);
  
      for (const inquiry of inquiries) {
  
        const exists = await prisma.inquiry.findFirst({
          where: {
            email: inquiry.email,
            contactNumber: inquiry.contactNumber,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ Inquiry from ${inquiry.email} already exists. Skipping.`
          );
          continue;
        }
  
        await prisma.inquiry.create({
          data: {
            fullName: inquiry.fullName,
            contactNumber: inquiry.contactNumber,
            email: inquiry.email,
  
            inquiryAbout: inquiry.inquiryAbout,
  
            createdAt: inquiry.createdAt,
            updatedAt: inquiry.updatedAt,
          },
        });
  
        console.log(
          `✅ Inquiry from ${inquiry.email} migrated`
        );
      }
  
      console.log("✅ Inquiry migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();