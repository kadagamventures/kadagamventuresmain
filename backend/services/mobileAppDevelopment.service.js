const MobileApp = require("../models/mobileAppDevelopment.model");

/**
 * CREATE or UPDATE FULL DOCUMENT
 */
exports.upsertMobileApp = async (data) => {
  return MobileApp.findOneAndUpdate(
    { slug: "mobile-app-development" },
    data,
    { upsert: true, new: true }
  );
};

/**
 * GET
 */
exports.getMobileApp = async () => {
  return MobileApp.findOne({ slug: "mobile-app-development", isActive: true });
};

/**
 * UPDATE FULL DOCUMENT
 */
exports.updateMobileApp = async (data) => {
  return MobileApp.findOneAndUpdate(
    { slug: "mobile-app-development" },
    data,
    { new: true }
  );
};

/**
 * DELETE FULL DOCUMENT
 */
exports.deleteMobileApp = async () => {
  return MobileApp.findOneAndDelete({
    slug: "mobile-app-development",
  });
};

/**
 * ADD PRICING PLAN
 */
exports.addPricingPlan = async (data) => {
    return MobileApp.findOneAndUpdate(
      { slug: "mobile-app-development" },
      {
        $push: {
          pricingPlans: data,
        },
      },
      { new: true }
    );
  };
  

/**
 * UPDATE PRICING PLAN
 */
exports.updatePricingPlan = async (planId, data) => {
  return MobileApp.findOneAndUpdate(
    { "pricingPlans._id": planId },
    {
      $set: {
        "pricingPlans.$.planName": data.planName,
        "pricingPlans.$.priceFrom": data.priceFrom,
        "pricingPlans.$.priceTo": data.priceTo,
        "pricingPlans.$.duration": data.duration,
        "pricingPlans.$.features": data.features,
        "pricingPlans.$.isPopular": data.isPopular,
      },
    },
    { new: true }
  );
};

/**
 * DELETE PRICING PLAN
 */
exports.deletePricingPlan = async (planId) => {
  return MobileApp.findOneAndUpdate(
    { "pricingPlans._id": planId },
    {
      $pull: {
        pricingPlans: { _id: planId },
      },
    },
    { new: true }
  );
};
