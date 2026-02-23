const DigitalMarketing = require("../models/digitalMarketing.model");

// UPSERT
exports.upsertService = async (data) => {
  return DigitalMarketing.findOneAndUpdate(
    { slug: "digital-marketing" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getService = async () => {
  return DigitalMarketing.findOne({
    slug: "digital-marketing",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return DigitalMarketing.findOneAndUpdate(
    { slug: "digital-marketing" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteService = async () => {
  return DigitalMarketing.findOneAndDelete({
    slug: "digital-marketing",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return DigitalMarketing.findOneAndUpdate(
    { slug: "digital-marketing" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return DigitalMarketing.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return DigitalMarketing.findOneAndUpdate(
    { slug: "digital-marketing" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
