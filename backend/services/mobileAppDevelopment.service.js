// const MobileApp = require("../models/mobileAppDevelopment.model");

// /**
//  * CREATE or UPDATE FULL DOCUMENT
//  */
// exports.upsertMobileApp = async (data) => {
//   return MobileApp.findOneAndUpdate(
//     { slug: "mobile-app-development" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// /**
//  * GET
//  */
// exports.getMobileApp = async () => {
//   return MobileApp.findOne({ slug: "mobile-app-development", isActive: true });
// };

// /**
//  * UPDATE FULL DOCUMENT
//  */
// exports.updateMobileApp = async (data) => {
//   return MobileApp.findOneAndUpdate(
//     { slug: "mobile-app-development" },
//     data,
//     { new: true }
//   );
// };

// /**
//  * DELETE FULL DOCUMENT
//  */
// exports.deleteMobileApp = async () => {
//   return MobileApp.findOneAndDelete({
//     slug: "mobile-app-development",
//   });
// };

// /**
//  * ADD PRICING PLAN
//  */
// exports.addPricingPlan = async (data) => {
//     return MobileApp.findOneAndUpdate(
//       { slug: "mobile-app-development" },
//       {
//         $push: {
//           pricingPlans: data,
//         },
//       },
//       { new: true }
//     );
//   };
  

// /**
//  * UPDATE PRICING PLAN
//  */
// exports.updatePricingPlan = async (planId, data) => {
//   return MobileApp.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     {
//       $set: {
//         "pricingPlans.$.planName": data.planName,
//         "pricingPlans.$.priceFrom": data.priceFrom,
//         "pricingPlans.$.priceTo": data.priceTo,
//         "pricingPlans.$.duration": data.duration,
//         "pricingPlans.$.features": data.features,
//         "pricingPlans.$.isPopular": data.isPopular,
//       },
//     },
//     { new: true }
//   );
// };

// /**
//  * DELETE PRICING PLAN
//  */
// exports.deletePricingPlan = async (planId) => {
//   return MobileApp.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     {
//       $pull: {
//         pricingPlans: { _id: planId },
//       },
//     },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

/**
 * CREATE / UPSERT
 */
exports.upsertMobileApp = async (data) => {
  return prisma.mobileAppDevelopment.upsert({
    where: {
      slug: "mobile-app-development",
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
      slug: "mobile-app-development",
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

/**
 * GET
 */
exports.getMobileApp = async () => {
  return prisma.mobileAppDevelopment.findFirst({
    where: {
      slug: "mobile-app-development",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

/**
 * UPDATE
 */
exports.updateMobileApp = async (data) => {
  return prisma.mobileAppDevelopment.update({
    where: {
      slug: "mobile-app-development",
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

/**
 * DELETE
 */
exports.deleteMobileApp = async () => {
  return prisma.mobileAppDevelopment.delete({
    where: {
      slug: "mobile-app-development",
    },
  });
};

/**
 * ADD PRICING PLAN
 */
exports.addPricingPlan = async (data) => {
  const service = await prisma.mobileAppDevelopment.findUnique({
    where: {
      slug: "mobile-app-development",
    },
  });

  if (!service) return null;

  await prisma.mobileAppPricingPlan.create({
    data: {
      mobileAppDevelopmentId: service.id,
      planName: data.planName,
      priceFrom: data.priceFrom,
      priceTo: data.priceTo,
      duration: data.duration,
      features: data.features,
      isPopular: data.isPopular,
    },
  });

  return prisma.mobileAppDevelopment.findUnique({
    where: {
      slug: "mobile-app-development",
    },
    include: {
      pricingPlans: true,
    },
  });
};

/**
 * UPDATE PRICING PLAN
 */
exports.updatePricingPlan = async (planId, data) => {
  await prisma.mobileAppPricingPlan.update({
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

  return prisma.mobileAppPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });
};

/**
 * DELETE PRICING PLAN
 */
exports.deletePricingPlan = async (planId) => {
  const deletedPlan = await prisma.mobileAppPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });

  if (!deletedPlan) {
    return null;
  }

  await prisma.mobileAppPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });

  return deletedPlan;
};