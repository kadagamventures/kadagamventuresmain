require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const fs = require("fs");
  const path = require("path");
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const CareerApplication = require("../models/careerApplication.model");
  
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  
  const prisma = new PrismaClient({
    adapter,
  });
  
  const careerIdMap = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "careerIdMap.json"),
      "utf8"
    )
  );
  
  async function migrate() {
    try {
  
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("✅ Connected to MongoDB");
      console.log("✅ Connected to PostgreSQL");
  
      const applications = await CareerApplication.find();
  
      console.log(`Found ${applications.length} applications`);
  
      for (const application of applications) {
  
        if (!application.careerId) {
          console.log(
            `❌ Career missing for ${application.email}`
          );
          continue;
        }
  
        const careerId =
          careerIdMap[application.careerId.toString()];
  
        if (!careerId) {
          console.log(
            `❌ Career mapping not found for ${application.email}`
          );
          continue;
        }
  
        const exists =
          await prisma.careerApplication.findFirst({
            where: {
              careerId,
              email: application.email,
            },
          });
  
        if (exists) {
          console.log(
            `⚠️ ${application.email} already migrated`
          );
          continue;
        }
  
        await prisma.careerApplication.create({
          data: {
  
            careerId,
  
            firstName: application.firstName,
            lastName: application.lastName,
  
            email: application.email,
  
            phone: application.phone,
            gender: application.gender,
            location: application.location,
  
            experience: application.experience,
            currentSalary: application.currentSalary,
            expectedSalary: application.expectedSalary,
            noticePeriod: application.noticePeriod,
  
            joiningDate: application.joiningDate,
            joiningTime: application.joiningTime,
            isImmediateJoiner:
              application.isImmediateJoiner,
  
            resumeKey: application.resumeKey,
  
            createdAt: application.createdAt,
            updatedAt: application.updatedAt,
          },
        });
  
        console.log(
          `✅ ${application.email} migrated`
        );
  
      }
  
      console.log(
        "✅ Career Application migration completed."
      );
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();