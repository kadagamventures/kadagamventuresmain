// const DigitalMarketing = require("../models/digitalMarketing.model");

// // UPSERT
// exports.upsertService = async (data) => {
//   return DigitalMarketing.findOneAndUpdate(
//     { slug: "digital-marketing" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // PUBLIC GET
// exports.getService = async () => {
//   return DigitalMarketing.findOne({
//     slug: "digital-marketing",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateService = async (data) => {
//   return DigitalMarketing.findOneAndUpdate(
//     { slug: "digital-marketing" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteService = async () => {
//   return DigitalMarketing.findOneAndDelete({
//     slug: "digital-marketing",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return DigitalMarketing.findOneAndUpdate(
//     { slug: "digital-marketing" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return DigitalMarketing.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return DigitalMarketing.findOneAndUpdate(
//     { slug: "digital-marketing" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

// UPSERT
exports.upsertService = async (data) => {
  return prisma.digitalMarketing.upsert({
    where: {
      slug: "digital-marketing",
    },
    update: {
      description: data.description,
      platforms: data.platforms ?? [],
      pricingPlans: {
        deleteMany: {},
        create: data.pricingPlans,
      },
    },
    create: {
      title: "Digital Marketing",
      slug: "digital-marketing",
      description: data.description,
      platforms: data.platforms ?? [],
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
  return prisma.digitalMarketing.findFirst({
    where: {
      slug: "digital-marketing",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return prisma.digitalMarketing.update({
    where: {
      slug: "digital-marketing",
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
  return prisma.digitalMarketing.delete({
    where: {
      slug: "digital-marketing",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.digitalMarketing.findUnique({
    where: {
      slug: "digital-marketing",
    },
  });

  if (!service) return null;

  return prisma.digitalMarketingPricingPlan.create({
    data: {
      ...plan,
      digitalMarketingId: service.id,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return prisma.digitalMarketingPricingPlan.update({
    where: {
      id: Number(planId),
    },
    data,
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return prisma.digitalMarketingPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });
};
