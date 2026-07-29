// const WorkTogether = require("../models/workTogether.model");

// exports.createRequest = (data) => {
//   return WorkTogether.create(data);
// };

// exports.getAllRequests = () => {
//   return WorkTogether.find().sort({ createdAt: -1 });
// };

const prisma = require("../config/prisma");

// CREATE REQUEST
exports.createRequest = (data) => {
  return prisma.workTogether.create({
    data: {
      firstName: data.firstName,
      email: data.email,
      company: data.company,
      projectDetails: data.projectDetails,
    },
  });
};

// GET ALL REQUESTS
exports.getAllRequests = () => {
  return prisma.workTogether.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};