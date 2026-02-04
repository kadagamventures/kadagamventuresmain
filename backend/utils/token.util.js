const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, authConfig.jwt.accessSecret, {
    expiresIn: authConfig.jwt.accessExpiresIn,
  });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, authConfig.jwt.refreshSecret, {
    expiresIn: authConfig.jwt.refreshExpiresIn,
  });
};
