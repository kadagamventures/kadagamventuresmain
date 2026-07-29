const prisma = require("../config/prisma");

// UPSERT
exports.upsertBranding = async (data) => {
  return prisma.brandingGraphicDesign.upsert({
    where: {
      slug: "branding-graphic-design",
    },
    update: {
      description: data.description,
      platforms: data.platforms ?? ["Web", "Print", "Social Media"],
      pricingPlans: {
        deleteMany: {},
        create: data.pricingPlans,
      },
    },
    create: {
      title: "Branding & Graphic Design",
      slug: "branding-graphic-design",
      description: data.description,
      platforms: data.platforms ?? ["Web", "Print", "Social Media"],
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
// exports.getBranding = async () => {
//   return Branding.findOne({
//     slug: "branding-graphic-design",
//     isActive: true,
//   });
// };
exports.getBranding = async () => {
  return prisma.brandingGraphicDesign.findFirst({
    where: {
      slug: "branding-graphic-design",
      isActive: true,
    },
    include: {
      pricingPlans: true,
    },
  });
};

// UPDATE FULL
// exports.updateBranding = async (data) => {
//   return Branding.findOneAndUpdate(
//     { slug: "branding-graphic-design" },
//     data,
//     { new: true }
//   );
// };
exports.updateBranding = async (data) => {
  return prisma.brandingGraphicDesign.update({
    where: {
      slug: "branding-graphic-design",
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
// exports.deleteBranding = async () => {
//   return Branding.findOneAndDelete({
//     slug: "branding-graphic-design",
//   });
// };
exports.deleteBranding = async () => {
  return prisma.brandingGraphicDesign.delete({
    where: {
      slug: "branding-graphic-design",
    },
  });
};

// ADD PRICING PLAN
// exports.addPricingPlan = async (plan) => {
//   return Branding.findOneAndUpdate(
//     { slug: "branding-graphic-design" },
//     { $push: { pricingPlans: plan } },
//     { new: true }
//   );
// };
exports.addPricingPlan = async (plan) => {
  const branding = await prisma.brandingGraphicDesign.findUnique({
    where: {
      slug: "branding-graphic-design",
    },
  });

  if (!branding) return null;

  return prisma.pricingPlan.create({
    data: {
      ...plan,
      brandingGraphicDesignId: branding.id,
    },
  });
};

// UPDATE PRICING PLAN
// exports.updatePricingPlan = async (planId, data) => {
//   return Branding.findOneAndUpdate(
//     { "pricingPlans._id": planId },
//     { $set: { "pricingPlans.$": data } },
//     { new: true }
//   );
// };
exports.updatePricingPlan = async (planId, data) => {
  return prisma.pricingPlan.update({
    where: {
      id: Number(planId),
    },
    data,
  });
};

// DELETE PRICING PLAN
// exports.deletePricingPlan = async (planId) => {
//   return Branding.findOneAndUpdate(
//     { slug: "branding-graphic-design" },
//     { $pull: { pricingPlans: { _id: planId } } },
//     { new: true }
//   );
// };
exports.deletePricingPlan = async (planId) => {
  return prisma.pricingPlan.delete({
    where: {
      id: Number(planId),
    },
  });
};
