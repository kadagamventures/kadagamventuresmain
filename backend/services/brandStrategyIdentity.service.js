// const BrandStrategy = require("../models/brandStrategyIdentity.model");

// // UPSERT
// exports.upsertService = async (data) => {
//   return BrandStrategy.findOneAndUpdate(
//     { slug: "brand-strategy-identity" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // PUBLIC GET
// exports.getService = async () => {
//   return BrandStrategy.findOne({
//     slug: "brand-strategy-identity",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateService = async (data) => {
//   return BrandStrategy.findOneAndUpdate(
//     { slug: "brand-strategy-identity" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteService = async () => {
//   return BrandStrategy.findOneAndDelete({
//     slug: "brand-strategy-identity",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return BrandStrategy.findOneAndUpdate(
//     { slug: "brand-strategy-identity" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return BrandStrategy.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return BrandStrategy.findOneAndUpdate(
//     { slug: "brand-strategy-identity" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };


const prisma = require("../config/prisma");

// UPSERT
exports.upsertService = async (data) => {
  return prisma.brandStrategyIdentity.upsert({
    where: {
      slug: "brand-strategy-identity",
    },
    update: {
      description: data.description,
      platforms: data.platforms ?? ["Branding", "Digital", "Print"],
      pricingPlans: {
        deleteMany: {},
        create: data.pricingPlans,
      },
    },
    create: {
      title: "Brand Strategy & Identity",
      slug: "brand-strategy-identity",
      description: data.description,
      platforms: data.platforms ?? ["Branding", "Digital", "Print"],
      pricingPlans: {
        create: data.pricingPlans,
      },
    },
    include: {
      pricingPlans: true,
    },
  });
};

// PUBLIC GET
exports.getService = async () => {
  return prisma.brandStrategyIdentity.findFirst({
    where: {
      slug: "brand-strategy-identity",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return prisma.brandStrategyIdentity.update({
    where: {
      slug: "brand-strategy-identity",
    },
    data: {
      description: data.description,
      platforms: data.platforms,
      pricingPlans: {
        deleteMany: {},
        create: data.pricingPlans,
      },
    },
    include: {
      pricingPlans: true,
    },
  });
};

// DELETE FULL
exports.deleteService = async () => {
  return prisma.brandStrategyIdentity.delete({
    where: {
      slug: "brand-strategy-identity",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.brandStrategyIdentity.findUnique({
    where: {
      slug: "brand-strategy-identity",
    },
  });

  if (!service) return null;

  return prisma.brandStrategyPricingPlan.create({
    data: {
      ...plan,
      brandStrategyIdentityId: service.id,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return prisma.brandStrategyPricingPlan.update({
    where: {
      id: Number(planId),
    },
    data,
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return prisma.brandStrategyPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });
};