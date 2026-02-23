const SoftwareTestingQA = require("../models/softwareTestingQA.model");

// UPSERT
exports.upsertService = async (data) => {
  return SoftwareTestingQA.findOneAndUpdate(
    { slug: "software-testing-qa" },
    data,
    { upsert: true, new: true }
  );
};

// PUBLIC GET
exports.getService = async () => {
  return SoftwareTestingQA.findOne({
    slug: "software-testing-qa",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateService = async (data) => {
  return SoftwareTestingQA.findOneAndUpdate(
    { slug: "software-testing-qa" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteService = async () => {
  return SoftwareTestingQA.findOneAndDelete({
    slug: "software-testing-qa",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return SoftwareTestingQA.findOneAndUpdate(
    { slug: "software-testing-qa" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return SoftwareTestingQA.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return SoftwareTestingQA.findOneAndUpdate(
    { slug: "software-testing-qa" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
