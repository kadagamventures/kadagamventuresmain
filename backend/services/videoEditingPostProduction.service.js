// const Service = require("../models/videoEditingPostProduction.model");

// // UPSERT
// exports.upsertService = async (data) => {
//   return Service.findOneAndUpdate(
//     { slug: "video-editing-post-production" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // PUBLIC GET
// exports.getService = async () => {
//   return Service.findOne({
//     slug: "video-editing-post-production",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateService = async (data) => {
//   return Service.findOneAndUpdate(
//     { slug: "video-editing-post-production" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteService = async () => {
//   return Service.findOneAndDelete({
//     slug: "video-editing-post-production",
//   });
// };

// // ADD PLAN
// exports.addPricingPlan = async (plan) => {
//   return Service.findOneAndUpdate(
//     { slug: "video-editing-post-production" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return Service.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PLAN
// exports.deletePricingPlan = async (planId) => {
//   return Service.findOneAndUpdate(
//     { slug: "video-editing-post-production" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

// UPSERT
exports.upsertService = async (data) => {
  return prisma.videoEditingPostProduction.upsert({
    where: {
      slug: "video-editing-post-production",
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
      slug: "video-editing-post-production",
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
  return prisma.videoEditingPostProduction.findFirst({
    where: {
      slug: "video-editing-post-production",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE
exports.updateService = async (data) => {
  return prisma.videoEditingPostProduction.update({
    where: {
      slug: "video-editing-post-production",
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
  return prisma.videoEditingPostProduction.delete({
    where: {
      slug: "video-editing-post-production",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.videoEditingPostProduction.findUnique({
    where: {
      slug: "video-editing-post-production",
    },
  });

  if (!service) {
    return null;
  }

  await prisma.videoEditingPricingPlan.create({
    data: {
      videoEditingPostProductionId: service.id,
      planName: plan.planName,
      priceFrom: plan.priceFrom,
      priceTo: plan.priceTo,
      duration: plan.duration,
      features: plan.features,
      isPopular: plan.isPopular,
    },
  });

  return prisma.videoEditingPostProduction.findUnique({
    where: {
      slug: "video-editing-post-production",
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  await prisma.videoEditingPricingPlan.update({
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

  return prisma.videoEditingPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  const plan = await prisma.videoEditingPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });

  if (!plan) {
    return null;
  }

  await prisma.videoEditingPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });

  return plan;
};