const Subscriber = require("../models/subscriber.model");

exports.getAllSubscribers = () => {
  return Subscriber.find()
    .sort({ createdAt: -1 });
};

exports.getActiveSubscribers = () => {
  return Subscriber.find({ isActive: true })
    .sort({ createdAt: -1 });
};
