require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const WorkTogether = require("../models/workTogether.model");
  
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
  
      const works = await WorkTogether.find();
  
      console.log(`Found ${works.length} Work Together records`);
  
      for (const work of works) {
  
        const exists = await prisma.workTogether.findFirst({
          where: {
            email: work.email,
            projectDetails: work.projectDetails,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ Work Together request from ${work.email} already exists. Skipping.`
          );
          continue;
        }
  
        await prisma.workTogether.create({
          data: {
            firstName: work.firstName,
            email: work.email,
            company: work.company,
            projectDetails: work.projectDetails,
            createdAt: work.createdAt,
            updatedAt: work.updatedAt,
          },
        });
  
        console.log(
          `✅ Work Together request from ${work.email} migrated`
        );
      }
  
      console.log("✅ Work Together migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();