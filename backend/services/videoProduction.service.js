// const VideoProduction = require("../models/videoProduction.model");

// // UPSERT
// exports.upsertService = async (data) => {
//   return VideoProduction.findOneAndUpdate(
//     { slug: "video-production" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // PUBLIC GET
// exports.getService = async () => {
//   return VideoProduction.findOne({
//     slug: "video-production",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateService = async (data) => {
//   return VideoProduction.findOneAndUpdate(
//     { slug: "video-production" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteService = async () => {
//   return VideoProduction.findOneAndDelete({
//     slug: "video-production",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return VideoProduction.findOneAndUpdate(
//     { slug: "video-production" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return VideoProduction.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return VideoProduction.findOneAndUpdate(
//     { slug: "video-production" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

// UPSERT
exports.upsertService = async (data) => {
  return prisma.videoProduction.upsert({
    where: {
      slug: "video-production",
    },
    update: {
      title: data.title,
      description: data.description,
      platforms: data.platforms,
      isActive: data.isActive,

      pricingPlans: {
        deleteMany: {},
        create: (data.pricingPlans || []).map((plan) => ({
          planName: plan.planName,
          priceFrom: plan.priceFrom,
          priceTo: plan.priceTo,
          duration: plan.duration,
          features: plan.features,
          isPopular: plan.isPopular,
        })),
      },
    },
    create: {
      slug: "video-production",
      title: data.title,
      description: data.description,
      platforms: data.platforms,
      isActive: data.isActive,

      pricingPlans: {
        create: (data.pricingPlans || []).map((plan) => ({
          planName: plan.planName,
          priceFrom: plan.priceFrom,
          priceTo: plan.priceTo,
          duration: plan.duration,
          features: plan.features,
          isPopular: plan.isPopular,
        })),
      },
    },
    include: {
      pricingPlans: true,
    },
  });
};

// GET
exports.getService = async () => {
  return prisma.videoProduction.findFirst({
    where: {
      slug: "video-production",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE
exports.updateService = async (data) => {
  return prisma.videoProduction.update({
    where: {
      slug: "video-production",
    },
    data: {
      title: data.title,
      description: data.description,
      platforms: data.platforms,
      isActive: data.isActive,

      pricingPlans: {
        deleteMany: {},
        create: (data.pricingPlans || []).map((plan) => ({
          planName: plan.planName,
          priceFrom: plan.priceFrom,
          priceTo: plan.priceTo,
          duration: plan.duration,
          features: plan.features,
          isPopular: plan.isPopular,
        })),
      },
    },
    include: {
      pricingPlans: true,
    },
  });
};

// DELETE
exports.deleteService = async () => {
  return prisma.videoProduction.delete({
    where: {
      slug: "video-production",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.videoProduction.findUnique({
    where: {
      slug: "video-production",
    },
  });

  if (!service) {
    return null;
  }

  await prisma.videoProductionPricingPlan.create({
    data: {
      videoProductionId: service.id,
      planName: plan.planName,
      priceFrom: plan.priceFrom,
      priceTo: plan.priceTo,
      duration: plan.duration,
      features: plan.features,
      isPopular: plan.isPopular,
    },
  });

  return prisma.videoProduction.findUnique({
    where: {
      slug: "video-production",
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  await prisma.videoProductionPricingPlan.update({
    where: {
      id: Number(planId),
    },
    data: {
      planName: data.planName,
      priceFrom: data.priceFrom,
      priceTo: data.priceTo,
      duration: data.duration,
      features: data.features,
      isPopular: data.isPopular,
    },
  });

  return prisma.videoProductionPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  const plan = await prisma.videoProductionPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });

  if (!plan) {
    return null;
  }

  await prisma.videoProductionPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });

  return plan;
};