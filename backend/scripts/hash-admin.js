require("dotenv").config();
const { hashAdminPassword } = require("../utils/hashAdminPassword");

hashAdminPassword("Admin@123")
  .then((hash) => {
    console.log("HASHED PASSWORD:\n", hash);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
