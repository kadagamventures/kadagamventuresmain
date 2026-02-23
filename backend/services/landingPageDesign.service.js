const LandingPage = require("../models/landingPageDesign.model");

// UPSERT
exports.upsertLandingPage = async (data) => {
  return LandingPage.findOneAndUpdate(
    { slug: "landing-page-design" },
    data,
    { upsert: true, new: true }
  );
};

// GET (PUBLIC)
exports.getLandingPage = async () => {
  return LandingPage.findOne({
    slug: "landing-page-design",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateLandingPage = async (data) => {
  return LandingPage.findOneAndUpdate(
    { slug: "landing-page-design" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteLandingPage = async () => {
  return LandingPage.findOneAndDelete({
    slug: "landing-page-design",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return LandingPage.findOneAndUpdate(
    { slug: "landing-page-design" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return LandingPage.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return LandingPage.findOneAndUpdate(
    { slug: "landing-page-design" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
