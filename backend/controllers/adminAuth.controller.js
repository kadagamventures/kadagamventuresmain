const asyncHandler = require("../utils/asyncHandler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.util");

const { loginAdmin } = require("../services/adminAuth.service");

// ---------------- LOGIN ----------------
exports.adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email & password required", 400);
  }

  const admin = await loginAdmin({ email, password });

  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // true in prod
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    accessToken,
    admin,
  });
});
