// const Service = require("../models/interactiveAnimatedWebsites.model");

// // UPSERT
// exports.upsertService = async (data) => {
//   return Service.findOneAndUpdate(
//     { slug: "interactive-animated-websites" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // PUBLIC GET
// exports.getService = async () => {
//   return Service.findOne({
//     slug: "interactive-animated-websites",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateService = async (data) => {
//   return Service.findOneAndUpdate(
//     { slug: "interactive-animated-websites" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteService = async () => {
//   return Service.findOneAndDelete({
//     slug: "interactive-animated-websites",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return Service.findOneAndUpdate(
//     { slug: "interactive-animated-websites" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return Service.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return Service.findOneAndUpdate(
//     { slug: "interactive-animated-websites" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };


const prisma = require("../config/prisma");

// UPSERT
exports.upsertService = async (data) => {
  return prisma.interactiveAnimatedWebsites.upsert({
    where: {
      slug: "interactive-animated-websites",
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
      title: "Interactive & Animated Websites",
      slug: "interactive-animated-websites",
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
  return prisma.interactiveAnimatedWebsites.findFirst({
    where: {
      slug: "interactive-animated-websites",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return prisma.interactiveAnimatedWebsites.update({
    where: {
      slug: "interactive-animated-websites",
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
  return prisma.interactiveAnimatedWebsites.delete({
    where: {
      slug: "interactive-animated-websites",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.interactiveAnimatedWebsites.findUnique({
    where: {
      slug: "interactive-animated-websites",
    },
  });

  if (!service) return null;

  return prisma.interactiveAnimatedWebsitePricingPlan.create({
    data: {
      ...plan,
      interactiveAnimatedWebsiteId: service.id,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return prisma.interactiveAnimatedWebsitePricingPlan.update({
    where: {
      id: Number(planId),
    },
    data,
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return prisma.interactiveAnimatedWebsitePricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });
};