require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const LeadBatch = require("../models/leadBatch.model");
  
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
  
      const leadBatches = await LeadBatch.find();
  
      console.log(`Found ${leadBatches.length} lead batches`);
  
      for (const batch of leadBatches) {
  
        const exists = await prisma.leadBatch.findFirst({
          where: {
            leadName: batch.leadName,
            leadGeneratedDate: batch.leadGeneratedDate,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ Lead Batch "${batch.leadName}" already exists. Skipping.`
          );
          continue;
        }
  
        await prisma.leadBatch.create({
          data: {
            leadName: batch.leadName,
            totalLeads: batch.totalLeads,
  
            leadGeneratedDate: batch.leadGeneratedDate,
  
            source: batch.source,
            campaignName: batch.campaignName,
  
            costPerLead: batch.costPerLead,
            totalCost: batch.totalCost,
  
            fileKey: batch.fileKey,
            fileName: batch.fileName,
            fileSize: batch.fileSize,
  
            notes: batch.notes,
  
            status: batch.status,
  
            isDeleted: batch.isDeleted,
  
            createdAt: batch.createdAt,
            updatedAt: batch.updatedAt,
          },
        });
  
        console.log(`✅ Lead Batch "${batch.leadName}" migrated`);
      }
  
      console.log("✅ Lead Batch migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();