require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const fs = require("fs");
  const path = require("path");
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const Career = require("../models/career.model");
  
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  
  const prisma = new PrismaClient({
    adapter,
  });
  
  const careerIdMap = {};
  
  async function migrate() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("✅ Connected to MongoDB");
      console.log("✅ Connected to PostgreSQL");
  
      const careers = await Career.find();
  
      console.log(`Found ${careers.length} careers`);
  
      for (const career of careers) {
  
        const exists = await prisma.career.findFirst({
          where: {
            title: career.title,
            location: career.location,
          },
        });
  
        let createdCareer;
  
        if (exists) {
          console.log(
            `⚠️ Career "${career.title}" already exists. Using existing record.`
          );
  
          createdCareer = exists;
  
        } else {
  
          createdCareer = await prisma.career.create({
            data: {
              title: career.title,
              location: career.location,
              experience: career.experience,
              employmentType: career.employmentType,
              overview: career.overview,
  
              responsibilities: career.responsibilities || [],
              skills: career.skills || [],
  
              whatWeOffer: career.whatWeOffer || [],
              howToApply: career.howToApply,
  
              positionCount: career.positionCount,
  
              isActive: career.isActive,
  
              createdAt: career.createdAt,
              updatedAt: career.updatedAt,
            },
          });
  
          console.log(`✅ Career "${career.title}" migrated`);
        }
  
        // Save MongoDB ObjectId -> PostgreSQL ID mapping
        careerIdMap[career._id.toString()] = createdCareer.id;
      }
  
      const mapPath = path.join(__dirname, "careerIdMap.json");
  
      fs.writeFileSync(
        mapPath,
        JSON.stringify(careerIdMap, null, 2)
      );
  
      console.log("✅ Career ID map saved:", mapPath);
  
      console.log("✅ Career migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();