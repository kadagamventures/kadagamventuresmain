const LeadBatch = require("../models/leadBatch.model");

exports.createLeadBatch = (data) => LeadBatch.create(data);

exports.updateLeadBatch = (id, data) =>
  LeadBatch.findByIdAndUpdate(id, data, { new: true });

exports.deleteLeadBatch = (id) =>
  LeadBatch.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

exports.getLeadBatchById = (id) =>
  LeadBatch.findOne({ _id: id, isDeleted: false });

// TOTAL + MONTH-WISE
// exports.getLeadStats = async () => {
//   const result = await LeadBatch.aggregate([
//     {
//       $match: { isDeleted: false, status: "active" },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$leadGeneratedDate" },
//           month: { $month: "$leadGeneratedDate" },
//         },
//         monthlyLeads: { $sum: "$totalLeads" },
//       },
//     },
//     {
//       $sort: { "_id.year": 1, "_id.month": 1 },
//     },
//   ]);

//   const totalResult = await LeadBatch.aggregate([
//     {
//       $match: { isDeleted: false, status: "active" },
//     },
//     {
//       $group: {
//         _id: null,
//         totalLeads: { $sum: "$totalLeads" },
//       },
//     },
//   ]);

//   return {
//     totalLeads: totalResult[0]?.totalLeads || 0,
//     monthlyStats: result,
//   };
// };
exports.getLeadStats = async () => {
  const matchStage = {
    isDeleted: false,
    status: "active",
  };

  const result = await LeadBatch.aggregate([
    { $match: matchStage },

    {
      $facet: {
        // 🔹 Overall Totals
        overall: [
          {
            $group: {
              _id: null,
              totalLeads: { $sum: "$totalLeads" },
              totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
            },
          },
        ],

        // 🔹 Month-wise Leads + Cost
        monthlyStats: [
          {
            $group: {
              _id: {
                year: { $year: "$leadGeneratedDate" },
                month: { $month: "$leadGeneratedDate" },
              },
              totalLeads: { $sum: "$totalLeads" },
              totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ],

        // 🔹 Campaign-wise Leads + Cost
        campaignStats: [
          {
            $group: {
              _id: { $ifNull: ["$campaignName", "Unknown"] },
              totalLeads: { $sum: "$totalLeads" },
              totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
            },
          },
          { $sort: { totalLeads: -1 } },
        ],

        // 🔹 Campaign + Month-wise Leads + Cost
        campaignMonthlyStats: [
          {
            $group: {
              _id: {
                campaign: { $ifNull: ["$campaignName", "Unknown"] },
                year: { $year: "$leadGeneratedDate" },
                month: { $month: "$leadGeneratedDate" },
              },
              totalLeads: { $sum: "$totalLeads" },
              totalCost: { $sum: { $ifNull: ["$totalCost", 0] } },
            },
          },
          {
            $project: {
              _id: 0,
              campaign: "$_id.campaign",
              year: "$_id.year",
              month: "$_id.month",
              totalLeads: 1,
              totalCost: 1,
            },
          },
          { $sort: { campaign: 1, year: 1, month: 1 } },
        ],
      },
    },
  ]);

  return {
    totalLeads: result[0].overall[0]?.totalLeads || 0,
    totalCost: result[0].overall[0]?.totalCost || 0,
    monthlyStats: result[0].monthlyStats,
    campaignStats: result[0].campaignStats,
    campaignMonthlyStats: result[0].campaignMonthlyStats,
  };
};

exports.getAllLeadBatches = async (filters, options) => {
  const query = { isDeleted: false };

  if (filters.search) {
    query.leadName = { $regex: filters.search, $options: "i" };
  }

  if (filters.startDate && filters.endDate) {
    query.leadGeneratedDate = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
  }

  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const data = await LeadBatch.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await LeadBatch.countDocuments(query);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};