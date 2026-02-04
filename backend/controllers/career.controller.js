const asyncHandler = require("../utils/asyncHandler");
const service = require("../services/career.service");
const emailService = require("../services/email.service");
const schemas = require("../validations/career.joi");
const AppError = require("../utils/appError");
const { deleteFromS3 } = require("../utils/s3Delete");

// Admin create job
exports.createCareer = asyncHandler(async (req, res) => {
  const { error } = schemas.createCareerSchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const career = await service.createCareer(req.body);
  res.status(201).json({ success: true, data: career });
});

// Public jobs
exports.getCareers = asyncHandler(async (req, res) => {
  const careers = await service.getCareers();
  res.json({ success: true, data: careers });
});




// exports.applyCareer = asyncHandler(async (req, res, next) => {
//   const isImmediateJoiner =
//     req.body.isImmediateJoiner === "true" ||
//     req.body.isImmediateJoiner === true;

//   const { error } = schemas.applyCareerSchema.validate(req.body);
//   if (error) return next(new AppError(error.details[0].message, 400));

//   if (!req.file)
//     return next(new AppError("Resume PDF required", 400));

//   // ✅ CHECK DUPLICATE (friendly check)
//   const alreadyApplied = await service.hasAlreadyApplied(
//     req.params.id,
//     req.body.email
//   );

//   if (alreadyApplied) {
//     return next(
//       new AppError(
//         "You have already applied for this job. Please wait or apply for other roles.",
//         409
//       )
//     );
//   }

//   const payload = {
//     ...req.body,
//     isImmediateJoiner,
//     careerId: req.params.id,
//     resumeKey: req.file.key,
//   };

//   const savedApplication = await service.applyCareer(payload);

//   await emailService.sendAdminApplicationMail(savedApplication);
//   await emailService.sendApplicantReply(
//     savedApplication.email,
//     savedApplication.firstName
//   );

//   res.status(201).json({
//     success: true,
//     message: "Application submitted successfully",
//   });
// });

exports.applyCareer = asyncHandler(async (req, res, next) => {
  try {
    const isImmediateJoiner =
      req.body.isImmediateJoiner === "true" ||
      req.body.isImmediateJoiner === true;

    const { error } = schemas.applyCareerSchema.validate(req.body);
    if (error) {
      if (req.file) await deleteFromS3(req.file.key);
      return next(new AppError(error.details[0].message, 400));
    }

    if (!req.file) {
      return next(new AppError("Resume PDF required", 400));
    }

    // ✅ CHECK DUPLICATE
    const alreadyApplied = await service.hasAlreadyApplied(
      req.params.id,
      req.body.email
    );

    if (alreadyApplied) {
      // 🔥 DELETE uploaded resume immediately
      await deleteFromS3(req.file.key);

      return next(
        new AppError(
          "You have already applied for this job. Please wait or apply for other roles.",
          409
        )
      );
    }

    const payload = {
      ...req.body,
      isImmediateJoiner,
      careerId: req.params.id,
      resumeKey: req.file.key,
    };

    let savedApplication = await service.applyCareer(payload);
    savedApplication = await savedApplication.populate("careerId");

    await emailService.sendAdminApplicationMail(savedApplication);
    await emailService.sendApplicantReply(
      savedApplication.email,
      savedApplication.firstName
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (err) {
    // 🔥 If ANY error happens → clean S3
    if (req.file) await deleteFromS3(req.file.key);
    next(err);
  }
});



// ADMIN
exports.getApplications = asyncHandler(async (req, res) => {
  const apps = await service.getApplications();
  res.json({ success: true, data: apps });
});

exports.getApplicationById = asyncHandler(async (req, res) => {
  const app = await service.getApplicationById(req.params.id);
  res.json({ success: true, data: app });
});


// ADMIN – UPDATE APPLICATION
exports.updateApplication = asyncHandler(async (req, res, next) => {
  const updated = await service.updateApplication(req.params.id, req.body);

  if (!updated) {
    return next(new AppError("Application not found", 404));
  }

  res.json({
    success: true,
    message: "Application updated successfully",
    data: updated,
  });
});

// ADMIN – DELETE APPLICATION

exports.deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await service.getApplicationById(req.params.id);

  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  // 🔥 Delete resume from S3
  await deleteFromS3(application.resumeKey);

  // 🔥 Delete DB record
  await service.deleteApplication(req.params.id);

  res.json({
    success: true,
    message: "Application and resume deleted successfully",
  });
});


// ADMIN – UPDATE CAREER
exports.updateCareer = asyncHandler(async (req, res, next) => {
  const { error } = schemas.updateCareerSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const updatedCareer = await service.updateCareer(req.params.id, req.body);

  if (!updatedCareer) {
    return next(new AppError("Career not found", 404));
  }

  res.json({
    success: true,
    message: "Career updated successfully",
    data: updatedCareer,
  });
});

// ADMIN – DELETE CAREER
exports.deleteCareer = asyncHandler(async (req, res, next) => {
  const deletedCareer = await service.deleteCareer(req.params.id);

  if (!deletedCareer) {
    return next(new AppError("Career not found", 404));
  }

  res.json({
    success: true,
    message: "Career deleted successfully",
  });
});

