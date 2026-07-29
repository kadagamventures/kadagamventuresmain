require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const CompanyUpdate = require("../models/companyUpdate.model");
  
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
  
      const updates = await CompanyUpdate.find();
  
      console.log(`Found ${updates.length} company updates`);
  
      for (const update of updates) {
        await prisma.companyUpdate.create({
          data: {
            title: update.title,
            message: update.message,
            pdfKey: update.pdfKey,
            isPublished: update.isPublished,
            createdAt: update.createdAt,
            updatedAt: update.updatedAt,
          },
        });
      }
  
      console.log("✅ CompanyUpdate migration completed.");
    } catch (error) {
      console.error("❌ Migration failed:", error);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();