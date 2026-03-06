const asyncHandler = require("../utils/asyncHandler");
const { uploadToS3 } = require("../utils/s3");
const {
  createLeadBatch,
  updateLeadBatch,
  deleteLeadBatch,
  getAllLeadBatches,
  getLeadBatchById,
  getLeadStats,
} = require("../services/leadBatch.service");
const {
    createLeadBatchSchema,
    updateLeadBatchSchema,
  } = require("../validations/leadBatch.joi");
  
const { validateLeadFile } = require("../utils/validateLeadFile");
const { getSignedFileUrl } = require("../utils/s3");

const LEAD_FOLDER = "leads";

// CREATE
exports.createLeadBatch = asyncHandler(async (req, res) => {
    const { error } = createLeadBatchSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
  
    if (req.file) {
      validateLeadFile(req.file);
    }
  
    let fileData = {};
  
    if (req.file) {
      const key = await uploadToS3({
        file: req.file,
        folder: "leads",
      });
  
      fileData = {
        fileKey: key,
        fileName: req.file.originalname,
        fileSize: req.file.size,
      };
    }
  
    const lead = await createLeadBatch({
      ...req.body,
      ...fileData,
    });
  
    res.status(201).json({
      success: true,
      data: lead,
    });
  });

// UPDATE
exports.updateLeadBatch = asyncHandler(async (req, res) => {
    const { error } = updateLeadBatchSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
  
    if (req.file) {
      validateLeadFile(req.file);
    }
  
    let updateData = { ...req.body };
  
    if (req.file) {
      const key = await uploadToS3({
        file: req.file,
        folder: "leads",
      });
  
      updateData.fileKey = key;
      updateData.fileName = req.file.originalname;
      updateData.fileSize = req.file.size;
    }
  
    const updated = await updateLeadBatch(req.params.id, updateData);
  
    res.json({
      success: true,
      data: updated,
    });
  });


 // get sign url 
  exports.getLeadFileUrl = asyncHandler(async (req, res) => {
    const lead = await getLeadBatchById(req.params.id);
  
    if (!lead || !lead.fileKey) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
  
    const fileUrl = await getSignedFileUrl(lead.fileKey);
  
    res.json({
      success: true,
      fileUrl,
    });
  });

// DELETE (soft delete)
exports.deleteLeadBatch = asyncHandler(async (req, res) => {
  await deleteLeadBatch(req.params.id);

  res.json({
    success: true,
    message: "Lead batch archived successfully",
  });
});

// GET ALL
exports.getLeadBatches = asyncHandler(async (req, res) => {
  const result = await getAllLeadBatches(req.query, req.query);

  res.json({
    success: true,
    ...result,
  });
});

// GET ONE
exports.getLeadBatch = asyncHandler(async (req, res) => {
  const data = await getLeadBatchById(req.params.id);

  res.json({
    success: true,
    data,
  });
});

//get total leads
exports.getLeadStats = asyncHandler(async (req, res) => {
  const stats = await getLeadStats();

  res.json({
    success: true,
    ...stats,
  });
});