// const Business = require("../models/business.model");

// class BusinessController {

//     static async createOrUpdate(req, res) {
//         try {
//             let business = await Business.findOne();

//             if (!business) {
//                 business = await Business.create(req.body);
//             } else {
//                 Object.assign(business, req.body);
//                 await business.save();
//             }

//             res.json(business);


//         } catch (error) {
//             res.status(400).json({ message: error.message });
//         }
//     }

//     static async get(req, res) {
//         try {
//             const business = await Business.findOne();
//             res.json(business);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }

// }

// module.exports = BusinessController;
const prisma = require("../config/prisma");

class BusinessController {
  static async createOrUpdate(req, res) {
    try {
      const { bankDetails, ...businessData } = req.body;

      let existingBusiness = await prisma.businessSettings.findFirst({
        include: {
          bankDetails: true,
        },
      });

      let business;

      if (!existingBusiness) {
        business = await prisma.businessSettings.create({
          data: {
            ...businessData,
            bankDetails: {
              create: {
                bankName: bankDetails?.bankName || "",
                accountNumber: bankDetails?.accountNumber || "",
                ifscCode: bankDetails?.ifscCode || "",
                branch: bankDetails?.branch || "",
                upiId: bankDetails?.upiId || "",
              },
            },
          },
          include: {
            bankDetails: true,
          },
        });
      } else {
        business = await prisma.businessSettings.update({
          where: {
            id: existingBusiness.id,
          },
          data: {
            ...businessData,
            bankDetails: existingBusiness.bankDetails
              ? {
                  update: {
                    bankName: bankDetails?.bankName || "",
                    accountNumber: bankDetails?.accountNumber || "",
                    ifscCode: bankDetails?.ifscCode || "",
                    branch: bankDetails?.branch || "",
                    upiId: bankDetails?.upiId || "",
                  },
                }
              : {
                  create: {
                    bankName: bankDetails?.bankName || "",
                    accountNumber: bankDetails?.accountNumber || "",
                    ifscCode: bankDetails?.ifscCode || "",
                    branch: bankDetails?.branch || "",
                    upiId: bankDetails?.upiId || "",
                  },
                },
          },
          include: {
            bankDetails: true,
          },
        });
      }

      res.json(business);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async get(req, res) {
    try {
      const business = await prisma.businessSettings.findFirst({
        include: {
          bankDetails: true,
        },
      });

      res.json(business);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = BusinessController;