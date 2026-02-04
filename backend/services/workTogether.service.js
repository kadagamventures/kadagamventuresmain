const WorkTogether = require("../models/workTogether.model");

exports.createRequest = (data) => {
  return WorkTogether.create(data);
};

exports.getAllRequests = () => {
  return WorkTogether.find().sort({ createdAt: -1 });
};
