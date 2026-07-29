require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const Subscriber = require("../models/subscriber.model");
  
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
  
      const subscribers = await Subscriber.find();
  
      console.log(`Found ${subscribers.length} subscribers`);
  
      for (const subscriber of subscribers) {
  
        const exists = await prisma.subscriber.findUnique({
          where: {
            email: subscriber.email,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ Subscriber ${subscriber.email} already exists. Skipping.`
          );
          continue;
        }
  
        await prisma.subscriber.create({
          data: {
            email: subscriber.email,
            isActive: subscriber.isActive,
            createdAt: subscriber.createdAt,
            updatedAt: subscriber.updatedAt,
          },
        });
  
        console.log(`✅ Subscriber ${subscriber.email} migrated`);
      }
  
      console.log("✅ Subscriber migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();