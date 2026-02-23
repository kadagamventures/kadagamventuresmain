const Blog = require("../models/blog.model");
const Career = require("../models/career.model");
const Subscriber = require("../models/subscriber.model");
const Contact = require("../models/inquiry.model"); // Contact Us model

exports.getDashboardStats = async (req, res) => {
  try {

    // Run all queries in parallel (fast)
    const [
      totalBlogs,
      totalCareers,

      activeSubscribers,
      inactiveSubscribers,

      servicesCount,
      productsCount,

    ] = await Promise.all([

      Blog.countDocuments(),

      Career.countDocuments(),

      Subscriber.countDocuments({ isActive: true }),

      Subscriber.countDocuments({ isActive: false }),

      Contact.countDocuments({ inquiryAbout: "services" }),

      Contact.countDocuments({ inquiryAbout: "products" }),

    ]);

    res.json({
      success: true,
      data: {
        blogs: totalBlogs,

        careers: totalCareers,

        subscribers: {
          active: activeSubscribers,
          inactive: inactiveSubscribers,
        },

        contactUs: {
          services: servicesCount,
          products: productsCount,
        },
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });

  }
};