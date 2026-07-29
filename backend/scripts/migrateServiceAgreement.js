require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const fs = require("fs");
  const path = require("path");
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const ServiceAgreement = require("../models/serviceAgreement.model");
  
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
  
      const agreements = await ServiceAgreement.find();
  
      console.log(`Found ${agreements.length} service agreements`);
  
      for (const agreement of agreements) {
  
        if (!agreement.company) {
          console.log(
            `❌ Company not found for agreement ${agreement.agreementNumber}`
          );
          continue;
        }
  
        const companyId =
          companyIdMap[agreement.company.toString()];
  
        if (!companyId) {
          console.log(
            `❌ Company mapping not found for agreement ${agreement.agreementNumber}`
          );
          continue;
        }
  
        const exists = await prisma.serviceAgreement.findUnique({
          where: {
            agreementNumber: agreement.agreementNumber,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ Agreement ${agreement.agreementNumber} already exists. Skipping.`
          );
          continue;
        }
  
        const createdAgreement =
          await prisma.serviceAgreement.create({
            data: {
              companyId,
  
              agreementNumber: agreement.agreementNumber,
  
              agreementType:
                agreement.agreementType === "monthly"
                  ? "monthly"
                  : agreement.agreementType === "quarterly"
                  ? "quarterly"
                  : agreement.agreementType === "yearly"
                  ? "yearly"
                  : "one_time",
  
              startDate: agreement.startDate,
              endDate: agreement.endDate,
  
              status: agreement.status,
  
              documentUrl: agreement.documentUrl,
  
              notes: agreement.notes,
  
              createdAt: agreement.createdAt,
              updatedAt: agreement.updatedAt,
            },
          });
  
        if (agreement.emailTracking) {
          await prisma.agreementEmailTracking.create({
            data: {
              serviceAgreementId: createdAgreement.id,
  
              sent: agreement.emailTracking.sent,
              sentAt: agreement.emailTracking.sentAt,
  
              opened: agreement.emailTracking.opened,
              openedAt: agreement.emailTracking.openedAt,
            },
          });
        }
  
        console.log(
          `✅ Agreement ${agreement.agreementNumber} migrated`
        );
      }
  
      console.log("✅ Service Agreement migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();