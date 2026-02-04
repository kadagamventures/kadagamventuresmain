require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const express = require("express");
  const cookieParser = require("cookie-parser");
  const connectDB = require("./config/dbConfig");
  const corsMiddleware = require("./config/cors.config");
  const AppError = require("./utils/appError")
  
  const app = express();



 
 
  
  // ✅ Connect Database
  connectDB();
  
  // ✅ Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use(cookieParser());
  
  // ✅ Health check
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Server running successfully 🚀" });
  });
  
  // ✅ PORT
  const PORT = process.env.PORT || 5000;


  // ---------------
  // Routes-----------
  //---------------
  app.use("/api/auth", require("./routes/adminAuth.route"));
  app.use("/api/careers", require("./routes/career.route"));
  app.use("/api/blogs", require("./routes/blog.route"))
  app.use("/api/subscribe", require("./routes/subscribe.route"));
  app.use(
    "/api/company-updates",
    require("./routes/companyUpdate.route")
  );
  app.use(
    "/api/admin/subscribers",
    require("./routes/subscriberAdmin.route")
  );
  // Inquiry Routes
  app.use("/api/inquiries", require("./routes/inquiry.route"));
  // work - together
  app.use("/api/work-together", require("./routes/workTogether.route"));

  




  //----------------
  // Global Error------
  //-----------------
  // ❌ 404
  app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
  });

// 🌍 Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status || "error",
    message: err.message,
  });
});
  

  // ✅ Start Server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
  