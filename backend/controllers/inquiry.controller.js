const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const inquiryService = require("../services/inquiry.service");
const emailService = require("../services/inquiryEmail.service");

// POST – Create inquiry (Public)
exports.createInquiry = asyncHandler(async (req, res) => {
    const { fullName, contactNumber, email, inquiryAbout } = req.body;
  
    if (!fullName || !contactNumber || !email || !inquiryAbout) {
      throw new AppError("All fields are required", 400);
    }
  
    const inquiry = await inquiryService.createInquiry({
      fullName,
      contactNumber,
      email,
      inquiryAbout,
    });
  
    // 🔥 SEND EMAIL TO ADMIN
    await emailService.sendInquiryEmailToAdmin({
      fullName,
      contactNumber,
      email,
      inquiryAbout,
    });
  
    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  });

  
// GET – ALL (Admin)
exports.getAllInquiries = asyncHandler(async (req, res) => {
  const data = await inquiryService.getAllInquiries();
  res.json({ success: true, count: data.length, data });
});

// GET – SERVICES ONLY
exports.getServiceInquiries = asyncHandler(async (req, res) => {
  const data = await inquiryService.getServiceInquiries();
  res.json({ success: true, count: data.length, data });
});

// GET – PRODUCTS ONLY
exports.getProductInquiries = asyncHandler(async (req, res) => {
  const data = await inquiryService.getProductInquiries();
  res.json({ success: true, count: data.length, data });
});
