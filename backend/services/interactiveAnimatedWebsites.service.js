const Service = require("../models/interactiveAnimatedWebsites.model");

// UPSERT
exports.upsertService = async (data) => {
  return Service.findOneAndUpdate(
    { slug: "interactive-animated-websites" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getService = async () => {
  return Service.findOne({
    slug: "interactive-animated-websites",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return Service.findOneAndUpdate(
    { slug: "interactive-animated-websites" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteService = async () => {
  return Service.findOneAndDelete({
    slug: "interactive-animated-websites",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return Service.findOneAndUpdate(
    { slug: "interactive-animated-websites" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return Service.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return Service.findOneAndUpdate(
    { slug: "interactive-animated-websites" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
