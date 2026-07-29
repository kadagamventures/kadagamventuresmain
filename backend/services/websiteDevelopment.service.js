// const Website = require("../models/websiteDevelopment.model");

// /* CREATE OR UPSERT */
// exports.upsertWebsite = async (data) => {
//   return Website.findOneAndUpdate(
//     { slug: "website-development" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// /* GET */
// exports.getWebsite = async () => {
//   return Website.findOne({
//     slug: "website-development",
//     isActive: true,
//   });
// };

// /* UPDATE FULL */
// exports.updateWebsite = async (data) => {
//   return Website.findOneAndUpdate(
//     { slug: "website-development" },
//     data,
//     { new: true }
//   );
// };

// /* DELETE FULL */
// exports.deleteWebsite = async () => {
//   return Website.findOneAndDelete({
//     slug: "website-development",
//   });
// };

// /* ADD PRICING PLAN */
// exports.addPricingPlan = async (data) => {
//   return Website.findOneAndUpdate(
//     { slug: "website-development" },
//     { $push: { pricingPlans: data } },
//     { new: true }
//   );
// };

// /* UPDATE PRICING PLAN */
// exports.updatePricingPlan = async (planId, data) => {
//   return Website.findOneAndUpdate(
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

// /* DELETE PRICING PLAN */
// exports.deletePricingPlan = async (planId) => {
//   return Website.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

/* CREATE / UPSERT */
exports.upsertWebsite = async (data) => {
  return prisma.websiteDevelopment.upsert({
    where: {
      slug: "website-development",
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
      slug: "website-development",
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

/* GET */
exports.getWebsite = async () => {
  return prisma.websiteDevelopment.findFirst({
    where: {
      slug: "website-development",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

/* UPDATE */
exports.updateWebsite = async (data) => {
  return prisma.websiteDevelopment.update({
    where: {
      slug: "website-development",
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

/* DELETE */
exports.deleteWebsite = async () => {
  return prisma.websiteDevelopment.delete({
    where: {
      slug: "website-development",
    },
  });
};

/* ADD PRICING PLAN */
exports.addPricingPlan = async (data) => {
  const service = await prisma.websiteDevelopment.findUnique({
    where: {
      slug: "website-development",
    },
  });

  if (!service) {
    return null;
  }

  await prisma.websiteDevelopmentPricingPlan.create({
    data: {
      websiteDevelopmentId: service.id,
      planName: data.planName,
      priceFrom: data.priceFrom,
      priceTo: data.priceTo,
      duration: data.duration,
      features: data.features,
      isPopular: data.isPopular,
    },
  });

  return prisma.websiteDevelopment.findUnique({
    where: {
      slug: "website-development",
    },
    include: {
      pricingPlans: true,
    },
  });
};

/* UPDATE PRICING PLAN */
exports.updatePricingPlan = async (planId, data) => {
  await prisma.websiteDevelopmentPricingPlan.update({
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

  return prisma.websiteDevelopmentPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });
};

/* DELETE PRICING PLAN */
exports.deletePricingPlan = async (planId) => {
  const plan = await prisma.websiteDevelopmentPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });

  if (!plan) {
    return null;
  }

  await prisma.websiteDevelopmentPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });

  return plan;
};