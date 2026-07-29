// const UiUx = require("../models/uiUxDesigning.model");

// // UPSERT
// exports.upsertUiUx = async (data) => {
//   return UiUx.findOneAndUpdate(
//     { slug: "ui-ux-designing" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // GET (PUBLIC)
// exports.getUiUx = async () => {
//   return UiUx.findOne({
//     slug: "ui-ux-designing",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateUiUx = async (data) => {
//   return UiUx.findOneAndUpdate(
//     { slug: "ui-ux-designing" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteUiUx = async () => {
//   return UiUx.findOneAndDelete({
//     slug: "ui-ux-designing",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return UiUx.findOneAndUpdate(
//     { slug: "ui-ux-designing" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return UiUx.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return UiUx.findOneAndUpdate(
//     { slug: "ui-ux-designing" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

// UPSERT
exports.upsertUiUx = async (data) => {
  return prisma.uiUxDesigning.upsert({
    where: {
      slug: "ui-ux-designing",
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
      slug: "ui-ux-designing",
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
exports.getUiUx = async () => {
  return prisma.uiUxDesigning.findFirst({
    where: {
      slug: "ui-ux-designing",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE
exports.updateUiUx = async (data) => {
  return prisma.uiUxDesigning.update({
    where: {
      slug: "ui-ux-designing",
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
exports.deleteUiUx = async () => {
  return prisma.uiUxDesigning.delete({
    where: {
      slug: "ui-ux-designing",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.uiUxDesigning.findUnique({
    where: {
      slug: "ui-ux-designing",
    },
  });

  if (!service) {
    return null;
  }

  await prisma.uiUxPricingPlan.create({
    data: {
      uiUxDesigningId: service.id,
      planName: plan.planName,
      priceFrom: plan.priceFrom,
      priceTo: plan.priceTo,
      duration: plan.duration,
      features: plan.features,
      isPopular: plan.isPopular,
    },
  });

  return prisma.uiUxDesigning.findUnique({
    where: {
      slug: "ui-ux-designing",
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  await prisma.uiUxPricingPlan.update({
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

  return prisma.uiUxPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  const plan = await prisma.uiUxPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });

  if (!plan) {
    return null;
  }

  await prisma.uiUxPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });

  return plan;
};