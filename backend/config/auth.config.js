module.exports = {
    jwt: {
      accessSecret: process.env.JWT_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
  
      accessExpiresIn: process.env.JWT_EXPIRES_IN || "30m",
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
  
    admin: {
      email: process.env.ADMIN_EMAIL,
      passwordHash: process.env.ADMIN_PASSWORD,
    },
  };
  