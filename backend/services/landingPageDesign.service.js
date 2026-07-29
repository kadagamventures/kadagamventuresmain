// const LandingPage = require("../models/landingPageDesign.model");

// // UPSERT
// exports.upsertLandingPage = async (data) => {
//   return LandingPage.findOneAndUpdate(
//     { slug: "landing-page-design" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // GET (PUBLIC)
// exports.getLandingPage = async () => {
//   return LandingPage.findOne({
//     slug: "landing-page-design",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateLandingPage = async (data) => {
//   return LandingPage.findOneAndUpdate(
//     { slug: "landing-page-design" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteLandingPage = async () => {
//   return LandingPage.findOneAndDelete({
//     slug: "landing-page-design",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return LandingPage.findOneAndUpdate(
//     { slug: "landing-page-design" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return LandingPage.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return LandingPage.findOneAndUpdate(
//     { slug: "landing-page-design" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

// UPSERT
exports.upsertLandingPage = async (data) => {
  return prisma.landingPageDesign.upsert({
    where: {
      slug: "landing-page-design",
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
      slug: "landing-page-design",
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
exports.getLandingPage = async () => {
  return prisma.landingPageDesign.findFirst({
    where: {
      slug: "landing-page-design",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE
exports.updateLandingPage = async (data) => {
  return prisma.landingPageDesign.update({
    where: {
      slug: "landing-page-design",
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
exports.deleteLandingPage = async () => {
  return prisma.landingPageDesign.delete({
    where: {
      slug: "landing-page-design",
    },
  });
};

// ADD PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.landingPageDesign.findUnique({
    where: {
      slug: "landing-page-design",
    },
  });

  if (!service) return null;

  return prisma.landingPagePricingPlan.create({
    data: {
      landingPageDesignId: service.id,
      planName: plan.planName,
      priceFrom: plan.priceFrom,
      priceTo: plan.priceTo,
      duration: plan.duration,
      features: plan.features,
      isPopular: plan.isPopular,
    },
  });
};

// UPDATE PLAN
exports.updatePricingPlan = async (planId, data) => {
  return prisma.landingPagePricingPlan.update({
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
};

// DELETE PLAN
exports.deletePricingPlan = async (planId) => {
  return prisma.landingPagePricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });
};