// const SoftwareTestingQA = require("../models/softwareTestingQA.model");

// // UPSERT
// exports.upsertService = async (data) => {
//   return SoftwareTestingQA.findOneAndUpdate(
//     { slug: "software-testing-qa" },
//     data,
//     { upsert: true, new: true }
//   );
// };

// // PUBLIC GET
// exports.getService = async () => {
//   return SoftwareTestingQA.findOne({
//     slug: "software-testing-qa",
//     isActive: true,
//   });
// };

// // UPDATE FULL
// exports.updateService = async (data) => {
//   return SoftwareTestingQA.findOneAndUpdate(
//     { slug: "software-testing-qa" },
//     data,
//     { new: true }
//   );
// };

// // DELETE FULL
// exports.deleteService = async () => {
//   return SoftwareTestingQA.findOneAndDelete({
//     slug: "software-testing-qa",
//   });
// };

// // ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return SoftwareTestingQA.findOneAndUpdate(
//     { slug: "software-testing-qa" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };

// // UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return SoftwareTestingQA.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };

// // DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return SoftwareTestingQA.findOneAndUpdate(
//     { slug: "software-testing-qa" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };

const prisma = require("../config/prisma");

// UPSERT
exports.upsertService = async (data) => {
  return prisma.softwareTestingQA.upsert({
    where: {
      slug: "software-testing-qa",
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
      slug: "software-testing-qa",
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
  return prisma.softwareTestingQA.findFirst({
    where: {
      slug: "software-testing-qa",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE
exports.updateService = async (data) => {
  return prisma.softwareTestingQA.update({
    where: {
      slug: "software-testing-qa",
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
  return prisma.softwareTestingQA.delete({
    where: {
      slug: "software-testing-qa",
    },
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  const service = await prisma.softwareTestingQA.findUnique({
    where: {
      slug: "software-testing-qa",
    },
  });

  if (!service) {
    return null;
  }

  await prisma.softwareTestingQAPricingPlan.create({
    data: {
      softwareTestingQAId: service.id,
      planName: plan.planName,
      priceFrom: plan.priceFrom,
      priceTo: plan.priceTo,
      duration: plan.duration,
      features: plan.features,
      isPopular: plan.isPopular,
    },
  });

  return prisma.softwareTestingQA.findUnique({
    where: {
      slug: "software-testing-qa",
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  await prisma.softwareTestingQAPricingPlan.update({
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

  return prisma.softwareTestingQAPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  const plan = await prisma.softwareTestingQAPricingPlan.findUnique({
    where: {
      id: Number(planId),
    },
  });

  if (!plan) {
    return null;
  }

  await prisma.softwareTestingQAPricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });

  return plan;
};