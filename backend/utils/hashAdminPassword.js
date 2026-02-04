const bcrypt = require("bcryptjs");

exports.hashAdminPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};


//hashAdminPassword("Admin@123").then(console.log);
