require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const fs = require("fs");
  const path = require("path");
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const Company = require("../models/company.model");
  
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
  
      const companies = await Company.find();
  
      console.log(`Found ${companies.length} companies`);
  
      const companyIdMap = {};
  
      for (const company of companies) {
        const createdCompany = await prisma.company.create({
          data: {
            companyName: company.companyName,
            legalName: company.legalName,
            gstNumber: company.gstNumber,
            panNumber: company.panNumber,
            registrationNumber: company.registrationNumber,
  
            email: company.email,
            phone: company.phone,
            website: company.website,
  
            contactPersonName: company.contactPerson?.name,
            contactPersonDesignation: company.contactPerson?.designation,
            contactPersonPhone: company.contactPerson?.phone,
            contactPersonEmail: company.contactPerson?.email,
  
            isDeleted: company.isDeleted,
  
            billingStreet: company.billingAddress?.street,
            billingCity: company.billingAddress?.city,
            billingState: company.billingAddress?.state,
            billingCountry: company.billingAddress?.country,
            billingPincode: company.billingAddress?.pincode,
  
            shippingStreet: company.shippingAddress?.street,
            shippingCity: company.shippingAddress?.city,
            shippingState: company.shippingAddress?.state,
            shippingCountry: company.shippingAddress?.country,
            shippingPincode: company.shippingAddress?.pincode,
          },
        });
  
        companyIdMap[company._id.toString()] = createdCompany.id;
      }
  
      const mapPath = path.join(__dirname, "companyIdMap.json");
  
      fs.writeFileSync(
        mapPath,
        JSON.stringify(companyIdMap, null, 2)
      );
  
      console.log("✅ Company migration completed.");
      console.log("✅ Company ID map saved:", mapPath);
  
    } catch (error) {
      console.error("❌ Migration failed:", error);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();