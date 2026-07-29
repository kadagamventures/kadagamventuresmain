// const Inquiry = require("../models/inquiry.model");

// // CREATE
// exports.createInquiry = (data) => {
//   return Inquiry.create(data);
// };

// // GET ALL
// exports.getAllInquiries = () => {
//   return Inquiry.find().sort({ createdAt: -1 });
// };

// // GET SERVICES ONLY
// exports.getServiceInquiries = () => {
//   return Inquiry.find({ inquiryAbout: "services" }).sort({ createdAt: -1 });
// };

// // GET PRODUCTS ONLY
// exports.getProductInquiries = () => {
//   return Inquiry.find({ inquiryAbout: "products" }).sort({ createdAt: -1 });
// };

const prisma = require("../config/prisma");

// CREATE
exports.createInquiry = (data) => {
  return prisma.inquiry.create({
    data,
  });
};

// GET ALL
exports.getAllInquiries = () => {
  return prisma.inquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET SERVICES ONLY
exports.getServiceInquiries = () => {
  return prisma.inquiry.findMany({
    where: {
      inquiryAbout: "services",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET PRODUCTS ONLY
exports.getProductInquiries = () => {
  return prisma.inquiry.findMany({
    where: {
      inquiryAbout: "products",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};