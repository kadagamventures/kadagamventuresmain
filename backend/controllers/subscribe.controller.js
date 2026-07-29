const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
//const Subscriber = require("../models/subscriber.model");
const prisma = require("../config/prisma");
const emailService = require("../services/subscriberemail.service");

// exports.subscribe = asyncHandler(async (req, res, next) => {
//   const { email } = req.body;

//   if (!email)
//     return next(new AppError("Email is required", 400));

// const exists = await Subscriber.findOne({ email });

// if (exists) {
//   if (exists.isActive) {
//     return next(
//       new AppError("You are already subscribed", 409)
//     );
//   }

//   // 🔥 Resubscribe
//   exists.isActive = true;
//   await exists.save();

//   await emailService.sendWelcomeSubscriptionEmail(email);

//   return res.json({
//     success: true,
//     message: "Welcome back! You are subscribed again.",
//   });
// }


//   await Subscriber.create({ email });

//   await emailService.sendWelcomeSubscriptionEmail(email);

//   res.status(201).json({
//     success: true,
//     message: "Subscribed successfully. Check your email!",
//   });
// });
exports.subscribe = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const exists = await prisma.subscriber.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    if (exists.isActive) {
      return next(new AppError("You are already subscribed", 409));
    }

    // Resubscribe
    await prisma.subscriber.update({
      where: {
        email,
      },
      data: {
        isActive: true,
      },
    });

    await emailService.sendWelcomeSubscriptionEmail(email);

    return res.json({
      success: true,
      message: "Welcome back! You are subscribed again.",
    });
  }

  await prisma.subscriber.create({
    data: {
      email,
    },
  });

  await emailService.sendWelcomeSubscriptionEmail(email);

  res.status(201).json({
    success: true,
    message: "Subscribed successfully. Check your email!",
  });
});


// exports.unsubscribe = asyncHandler(async (req, res, next) => {
//     const { email } = req.query;
  
//     if (!email) {
//       return next(new AppError("Email is required", 400));
//     }
  
//     const subscriber = await Subscriber.findOne({ email });
  
//     if (!subscriber) {
//       return next(new AppError("Subscriber not found", 404));
//     }
  
//     if (!subscriber.isActive) {
//       return res.json({
//         success: true,
//         message: "You are already unsubscribed",
//       });
//     }
  
//     subscriber.isActive = false;
//     await subscriber.save();
  
//     res.json({
//       success: true,
//       message: "You have been unsubscribed successfully",
//     });
//   });
  
exports.unsubscribe = asyncHandler(async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: {
      email,
    },
  });

  if (!subscriber) {
    return next(new AppError("Subscriber not found", 404));
  }

  if (!subscriber.isActive) {
    return res.json({
      success: true,
      message: "You are already unsubscribed",
    });
  }

  await prisma.subscriber.update({
    where: {
      email,
    },
    data: {
      isActive: false,
    },
  });

  res.json({
    success: true,
    message: "You have been unsubscribed successfully",
  });
});