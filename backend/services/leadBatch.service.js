// const LeadBatch = require("../models/leadBatch.model");

// exports.createLeadBatch = (data) => LeadBatch.create(data);

// exports.updateLeadBatch = (id, data) =>
//   LeadBatch.findByIdAndUpdate(id, data, { new: true });

// exports.deleteLeadBatch = (id) =>
//   LeadBatch.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

// exports.getLeadBatchById = (id) =>
//   LeadBatch.findOne({ _id: id, isDeleted: false });
// exports.getLeadStats = async () => {
//   const matchStage = {
//     isDeleted: false,
//     status: "active",
//   };

//   const result = await LeadBatch.aggregate([
//     { $match: matchStage },

//     {
//       $facet: {
//         // 🔹 Overall Totals
//         overall: [
//           {
//             $group: {
//               _id: null,
//               totalLeads: { $sum: "$totalLeads" },
//               totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
//             },
//           },
//         ],

//         // 🔹 Month-wise Leads + Cost
//         monthlyStats: [
//           {
//             $group: {
//               _id: {
//                 year: { $year: "$leadGeneratedDate" },
//                 month: { $month: "$leadGeneratedDate" },
//               },
//               totalLeads: { $sum: "$totalLeads" },
//               totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
//             },
//           },
//           { $sort: { "_id.year": 1, "_id.month": 1 } },
//         ],

//         // 🔹 Campaign-wise Leads + Cost
//         campaignStats: [
//           {
//             $group: {
//               _id: { $ifNull: ["$campaignName", "Unknown"] },
//               totalLeads: { $sum: "$totalLeads" },
//               totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
//             },
//           },
//           { $sort: { totalLeads: -1 } },
//         ],

//         // 🔹 Campaign + Month-wise Leads + Cost
//         campaignMonthlyStats: [
//           {
//             $group: {
//               _id: {
//                 campaign: { $ifNull: ["$campaignName", "Unknown"] },
//                 year: { $year: "$leadGeneratedDate" },
//                 month: { $month: "$leadGeneratedDate" },
//               },
//               totalLeads: { $sum: "$totalLeads" },
//               totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               campaign: "$_id.campaign",
//               year: "$_id.year",
//               month: "$_id.month",
//               totalLeads: 1,
//               totalCost: 1,
//             },
//           },
//           { $sort: { campaign: 1, year: 1, month: 1 } },
//         ],
//       },
//     },
//   ]);

//   return {
//     totalLeads: result[0].overall[0]?.totalLeads || 0,
//     totalCost: result[0].overall[0]?.totalCost || 0,
//     monthlyStats: result[0].monthlyStats,
//     campaignStats: result[0].campaignStats,
//     campaignMonthlyStats: result[0].campaignMonthlyStats,
//   };
// };

// exports.getAllLeadBatches = async (filters, options) => {
//   const query = { isDeleted: false };

//   if (filters.search) {
//     query.leadName = { $regex: filters.search, $options: "i" };
//   }

//   if (filters.startDate && filters.endDate) {
//     query.leadGeneratedDate = {
//       $gte: new Date(filters.startDate),
//       $lte: new Date(filters.endDate),
//     };
//   }

//   const page = Number(options.page) || 1;
//   const limit = Number(options.limit) || 10;
//   const skip = (page - 1) * limit;

//   const data = await LeadBatch.find(query)
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit);

//   const total = await LeadBatch.countDocuments(query);

//   return {
//     data,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//   };
// };

const prisma = require("../config/prisma");

// CREATE
exports.createLeadBatch = (data) =>
  prisma.leadBatch.create({
    data: {
      leadName: data.leadName,

      totalLeads: Number(data.totalLeads),

      leadGeneratedDate: new Date(data.leadGeneratedDate),

      source: data.source,
      campaignName: data.campaignName,

      costPerLead:
        data.costPerLead != null && data.costPerLead !== ""
          ? parseFloat(data.costPerLead)
          : null,

      totalCost:
        data.totalCost != null && data.totalCost !== ""
          ? parseFloat(data.totalCost)
          : null,

      fileKey: data.fileKey,
      fileName: data.fileName,

      fileSize:
        data.fileSize != null && data.fileSize !== ""
          ? Number(data.fileSize)
          : null,

      notes: data.notes,
      status: data.status,
    },
  });

// UPDATE
exports.updateLeadBatch = (id, data) =>
  prisma.leadBatch.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      totalLeads: Number(data.totalLeads),
      leadGeneratedDate: new Date(data.leadGeneratedDate),
      costPerLead:
        data.costPerLead != null && data.costPerLead !== ""
          ? parseFloat(data.costPerLead)
          : null,
      totalCost:
        data.totalCost != null && data.totalCost !== ""
          ? parseFloat(data.totalCost)
          : null,
      fileSize:
        data.fileSize != null && data.fileSize !== ""
          ? Number(data.fileSize)
          : null,
    },
  });

// SOFT DELETE
exports.deleteLeadBatch = (id) =>
  prisma.leadBatch.update({
    where: {
      id: Number(id),
    },
    data: {
      isDeleted: true,
    },
  });

// GET BY ID
exports.getLeadBatchById = (id) =>
  prisma.leadBatch.findFirst({
    where: {
      id: Number(id),
      isDeleted: false,
    },
  });

// GET STATS
exports.getLeadStats = async () => {
  const batches = await prisma.leadBatch.findMany({
    where: {
      isDeleted: false,
      status: "active",
    },
  });

  let totalLeads = 0;
  let totalCost = 0;

  const monthlyMap = new Map();
  const campaignMap = new Map();
  const campaignMonthlyMap = new Map();

  for (const batch of batches) {
    totalLeads += batch.totalLeads;
    totalCost += batch.totalCost || 0;

    const date = new Date(batch.leadGeneratedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // Monthly
    const monthKey = `${year}-${month}`;

    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, {
        _id: { year, month },
        totalLeads: 0,
        totalCost: 0,
      });
    }

    monthlyMap.get(monthKey).totalLeads += batch.totalLeads;
    monthlyMap.get(monthKey).totalCost += batch.totalCost || 0;

    // Campaign
    const campaign = batch.campaignName || "Unknown";

    if (!campaignMap.has(campaign)) {
      campaignMap.set(campaign, {
        _id: campaign,
        totalLeads: 0,
        totalCost: 0,
      });
    }

    campaignMap.get(campaign).totalLeads += batch.totalLeads;
    campaignMap.get(campaign).totalCost += batch.totalCost || 0;

    // Campaign Monthly
    const campaignMonthKey = `${campaign}-${year}-${month}`;

    if (!campaignMonthlyMap.has(campaignMonthKey)) {
      campaignMonthlyMap.set(campaignMonthKey, {
        campaign,
        year,
        month,
        totalLeads: 0,
        totalCost: 0,
      });
    }

    campaignMonthlyMap.get(campaignMonthKey).totalLeads += batch.totalLeads;
    campaignMonthlyMap.get(campaignMonthKey).totalCost += batch.totalCost || 0;
  }

  return {
    totalLeads,
    totalCost,

    monthlyStats: [...monthlyMap.values()].sort(
      (a, b) =>
        a._id.year - b._id.year ||
        a._id.month - b._id.month
    ),

    campaignStats: [...campaignMap.values()].sort(
      (a, b) => b.totalLeads - a.totalLeads
    ),

    campaignMonthlyStats: [...campaignMonthlyMap.values()].sort(
      (a, b) =>
        a.campaign.localeCompare(b.campaign) ||
        a.year - b.year ||
        a.month - b.month
    ),
  };
};

// GET ALL
exports.getAllLeadBatches = async (filters, options) => {
  const where = {
    isDeleted: false,
  };

  if (filters.search) {
    where.leadName = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  if (filters.startDate && filters.endDate) {
    where.leadGeneratedDate = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate),
    };
  }

  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;

  const [data, total] = await Promise.all([
    prisma.leadBatch.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.leadBatch.count({
      where,
    }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};