const Career = require("../models/career.model");
const CareerApplication = require("../models/careerApplication.model");

exports.createCareer = (data) => Career.create(data);

exports.getCareers = async () => {
  return Career.aggregate([
    { $match: { isActive: true } },
    {
      $lookup: {
        from: "careerapplications",
        localField: "_id",
        foreignField: "careerId",
        as: "applications",
      },
    },
    {
      $addFields: {
        applicationCount: { $size: "$applications" },
      },
    },
    { $project: { applications: 0 } },
  ]);
};

exports.applyCareer = (data) => CareerApplication.create(data);

// ADMIN
exports.getApplications = () =>
  CareerApplication.find().populate("careerId");

exports.getApplicationById = (id) =>
  CareerApplication.findById(id).populate("careerId");

exports.hasAlreadyApplied = async (careerId, email) => {
  return CareerApplication.findOne({ careerId, email });
};

// update
exports.updateApplication = (id, data) =>
  CareerApplication.findByIdAndUpdate(id, data, { new: true });

// delete
exports.deleteApplication = (id) =>
  CareerApplication.findByIdAndDelete(id);

// UPDATE CAREER
exports.updateCareer = (id, data) =>
  Career.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

// DELETE CAREER
exports.deleteCareer = (id) =>
  Career.findByIdAndDelete(id);

