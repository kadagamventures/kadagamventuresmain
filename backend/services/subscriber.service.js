// const Subscriber = require("../models/subscriber.model");

// exports.getAllSubscribers = () => {
//   return Subscriber.find()
//     .sort({ createdAt: -1 });
// };

// exports.getActiveSubscribers = () => {
//   return Subscriber.find({ isActive: true })
//     .sort({ createdAt: -1 });
// };

const prisma = require("../config/prisma");

// GET ALL SUBSCRIBERS
exports.getAllSubscribers = () => {
  return prisma.subscriber.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET ACTIVE SUBSCRIBERS
exports.getActiveSubscribers = () => {
  return prisma.subscriber.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};