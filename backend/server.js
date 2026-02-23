require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const express = require("express");
  const cookieParser = require("cookie-parser");
  const connectDB = require("./config/dbConfig");
  const corsMiddleware = require("./config/cors.config");
  const AppError = require("./utils/appError")
  const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
  
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
  //Mobile app development
  app.use(
    "/api/services/mobile-app-development",
    require("./routes/mobileAppDevelopment.route")
  );
 // Website Development
 app.use("/api/services/website-development", require("./routes/websiteDevelopment.route"));
 // UI/UX Designing
 app.use("/api/services/ui-ux-designing", require("./routes/uiUxDesigning.route"));
// Landing Page design
 app.use(
  "/api/services/landing-page-design",
  require("./routes/landingPageDesign.route")
);
// Branding Graphic Design
app.use(
  "/api/services/branding-graphic-design",
  require("./routes/brandingGraphicDesign.route")
);
// QA Testing
app.use(
  "/api/services/software-testing-qa",
  require("./routes/softwareTestingQA.route")
);
// Digital Marketing
app.use(
  "/api/services/digital-marketing",
  require("./routes/digitalMarketing.route")
);
// Interactive Animated Websites
app.use(
  "/api/services/interactive-animated-websites",
  require("./routes/interactiveAnimatedWebsites.route")
);
//Brand Strategy Identify
app.use(
  "/api/services/brand-strategy-identity",
  require("./routes/brandStrategyIdentity.route")
);
// Video production
app.use(
  "/api/services/video-production",
  require("./routes/videoProduction.route")
);
//Video Editing and Post Producation
app.use(
  "/api/services/video-editing-post-production",
  require("./routes/videoEditingPostProduction.route")
);

//
app.use("/api/companies", require("./routes/company.routes"));
app.use("/api/invoice", require("./routes/invoice.routes"));
app.use("/api/business", require("./routes/business.routes"));

app.use("/api/admin", adminDashboardRoutes);






  




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
  