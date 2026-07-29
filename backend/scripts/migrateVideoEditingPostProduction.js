require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const VideoEditingPostProduction = require("../models/videoEditingPostProduction.model");
  
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
  
      const services = await VideoEditingPostProduction.find();
  
      console.log(`Found ${services.length} Video Editing & Post-Production records`);
  
      for (const service of services) {
  
        const exists = await prisma.videoEditingPostProduction.findUnique({
          where: {
            slug: service.slug,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ ${service.slug} already exists. Skipping.`
          );
          continue;
        }
  
        const createdService =
          await prisma.videoEditingPostProduction.create({
            data: {
              title: service.title,
              slug: service.slug,
              description: service.description,
              platforms: service.platforms || [],
              isActive: service.isActive,
              createdAt: service.createdAt,
              updatedAt: service.updatedAt,
            },
          });
  
        for (const plan of service.pricingPlans) {
  
          await prisma.videoEditingPricingPlan.create({
            data: {
              videoEditingPostProductionId: createdService.id,
  
              planName: plan.planName,
              priceFrom: plan.priceFrom,
              priceTo: plan.priceTo,
              duration: plan.duration,
              features: plan.features || [],
              isPopular: plan.isPopular,
            },
          });
  
        }
  
        console.log(
          `✅ ${service.slug} migrated (${service.pricingPlans.length} pricing plans)`
        );
      }
  
      console.log("✅ Video Editing & Post-Production migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();