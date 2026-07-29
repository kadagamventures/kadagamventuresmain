// const Career = require("../models/career.model");
// const CareerApplication = require("../models/careerApplication.model");
const prisma = require("../config/prisma");

//exports.createCareer = (data) => Career.create(data);
exports.createCareer = (data) =>
  prisma.career.create({
    data: {
      title: data.title,
      location: data.location,
      experience: data.experience,
      employmentType: data.employmentType,
      overview: data.overview,

      responsibilities: data.responsibilities || [],
      skills: data.skills || [],
      whatWeOffer: data.whatWeOffer || [],

      howToApply: data.howToApply,

      positionCount:
        data.positionCount != null && data.positionCount !== ""
          ? Number(data.positionCount)
          : 1,

      isActive:
        data.isActive === undefined
          ? true
          : String(data.isActive).toLowerCase() === "true",
    },
  });

// exports.getCareers = async () => {
//   return Career.aggregate([
//     { $match: { isActive: true } },
//     {
//       $lookup: {
//         from: "careerapplications",
//         localField: "_id",
//         foreignField: "careerId",
//         as: "applications",
//       },
//     },
//     {
//       $addFields: {
//         applicationCount: { $size: "$applications" },
//       },
//     },
//     { $project: { applications: 0 } },
//   ]);
// };
exports.getCareers = async () => {
  const careers = await prisma.career.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return careers.map((career) => ({
    ...career,
    applicationCount: career._count.applications,
    _count: undefined,
  }));
};


//exports.applyCareer = (data) => CareerApplication.create(data);
exports.applyCareer = (data) =>
  prisma.careerApplication.create({
    data: {
      ...data,
      careerId: Number(data.careerId),
    },
    include: {
      career: true,
    },
  });

// ADMIN
// exports.getApplications = () =>
//   CareerApplication.find().populate("careerId");
exports.getApplications = () =>
  prisma.careerApplication.findMany({
    include: {
      career: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

// exports.getApplicationById = (id) =>
//   CareerApplication.findById(id).populate("careerId");
exports.getApplicationById = (id) =>
  prisma.careerApplication.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      career: true,
    },
  });

// exports.hasAlreadyApplied = async (careerId, email) => {
//   return CareerApplication.findOne({ careerId, email });
// };
exports.hasAlreadyApplied = (careerId, email) =>
  prisma.careerApplication.findUnique({
    where: {
      careerId_email: {
        careerId: Number(careerId),
        email,
      },
    },
  });

// update
// exports.updateApplication = (id, data) =>
//   CareerApplication.findByIdAndUpdate(id, data, { new: true });
exports.updateApplication = (id, data) =>
  prisma.careerApplication.update({
    where: {
      id: Number(id),
    },
    data,
  });

// delete
// exports.deleteApplication = (id) =>
//   CareerApplication.findByIdAndDelete(id);
exports.deleteApplication = (id) =>
  prisma.careerApplication.delete({
    where: {
      id: Number(id),
    },
  });

// UPDATE CAREER
// exports.updateCareer = (id, data) =>
//   Career.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true,
//   });
exports.updateCareer = (id, data) =>
  prisma.career.update({
    where: {
      id: Number(id),
    },
    data: {
      title: data.title,
      location: data.location,
      experience: data.experience,
      employmentType: data.employmentType,
      overview: data.overview,

      responsibilities: data.responsibilities || [],
      skills: data.skills || [],
      whatWeOffer: data.whatWeOffer || [],

      howToApply: data.howToApply,

      positionCount:
        data.positionCount != null && data.positionCount !== ""
          ? Number(data.positionCount)
          : 1,

      isActive:
        data.isActive === undefined
          ? true
          : String(data.isActive).toLowerCase() === "true",
    },
  });

// DELETE CAREER
// exports.deleteCareer = (id) =>
//   Career.findByIdAndDelete(id);
exports.deleteCareer = (id) =>
  prisma.career.delete({
    where: {
      id: Number(id),
    },
  });

