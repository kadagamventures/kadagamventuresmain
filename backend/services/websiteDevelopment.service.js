const Website = require("../models/websiteDevelopment.model");

/* CREATE OR UPSERT */
exports.upsertWebsite = async (data) => {
  return Website.findOneAndUpdate(
    { slug: "website-development" },
    data,
    { upsert: true, new: true }
  );
};

/* GET */
exports.getWebsite = async () => {
  return Website.findOne({
    slug: "website-development",
    isActive: true,
  });
};

/* UPDATE FULL */
exports.updateWebsite = async (data) => {
  return Website.findOneAndUpdate(
    { slug: "website-development" },
    data,
    { new: true }
  );
};

/* DELETE FULL */
exports.deleteWebsite = async () => {
  return Website.findOneAndDelete({
    slug: "website-development",
  });
};

/* ADD PRICING PLAN */
exports.addPricingPlan = async (data) => {
  return Website.findOneAndUpdate(
    { slug: "website-development" },
    { $push: { pricingPlans: data } },
    { new: true }
  );
};

/* UPDATE PRICING PLAN */
exports.updatePricingPlan = async (planId, data) => {
  return Website.findOneAndUpdate(
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

/* DELETE PRICING PLAN */
exports.deletePricingPlan = async (planId) => {
  return Website.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
