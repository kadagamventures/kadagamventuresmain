const asyncHandler = require("../utils/asyncHandler");
const SubscriberService = require("../services/subscriber.service");

// 👨‍💼 ADMIN – GET ALL SUBSCRIBERS
exports.getAllSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await SubscriberService.getAllSubscribers();

  res.json({
    success: true,
    count: subscribers.length,
    data: subscribers,
  });
});

// 👨‍💼 ADMIN – GET ACTIVE SUBSCRIBERS
exports.getActiveSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await SubscriberService.getActiveSubscribers();

  res.json({
    success: true,
    count: subscribers.length,
    data: subscribers,
  });
});
