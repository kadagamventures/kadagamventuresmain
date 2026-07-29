// // const { model } = require("mongoose");
// // const Company = require("../models/company.model");
// const prisma = require("../config/prisma");

// class CompanyService {

//     static async create(data) {
//         return prisma.company.create({
//             data,
//         });
//     }

//     static async getAll(query) {
//         const page = Number(query.page) || 1;
//         const limit = Number(query.limit) || 10;
    
//         const [companies, total] = await Promise.all([
//             prisma.company.findMany({
//                 where: {
//                     isDeleted: false,
//                 },
//                 orderBy: {
//                     createdAt: "desc",
//                 },
//                 skip: (page - 1) * limit,
//                 take: limit,
//             }),
    
//             prisma.company.count({
//                 where: {
//                     isDeleted: false,
//                 },
//             }),
//         ]);
    
//         return { companies, total };
//     }

//     static async getById(id) {
//         const company = await prisma.company.findFirst({
//             where: {
//                 id: Number(id),
//                 isDeleted: false,
//             },
//         });
    
//         if (!company) {
//             throw new Error("Company not found");
//         }
    
//         return company;
//     }

//     static async update(id, data) {
//         const company = await prisma.company.findFirst({
//             where: {
//                 id: Number(id),
//                 isDeleted: false,
//             },
//         });
    
//         if (!company) {
//             throw new Error("Company not found");
//         }
    
//         return prisma.company.update({
//             where: {
//                 id: Number(id),
//             },
//             data,
//         });
//     }


//     static async delete(id) {
//         const company = await prisma.company.findFirst({
//             where: {
//                 id: Number(id),
//                 isDeleted: false,
//             },
//         });
    
//         if (!company) {
//             throw new Error("Company not found");
//         }
    
//         await prisma.company.update({
//             where: {
//                 id: Number(id),
//             },
//             data: {
//                 isDeleted: true,
//             },
//         });
    
//         return {
//             message: "Company deleted successfully",
//         };
//     }

// }

// module.exports = CompanyService;

const prisma = require("../config/prisma");

class CompanyService {
  static mapCompanyData(data) {
    return {
      companyName: data.companyName,
      legalName: data.legalName,
      gstNumber: data.gstNumber,
      panNumber: data.panNumber,
      registrationNumber: data.registrationNumber,

      email: data.email,
      phone: data.phone,
      website: data.website,

      contactPersonName: data.contactPersonName,
      contactPersonDesignation: data.contactPersonDesignation,
      contactPersonPhone: data.contactPersonPhone,
      contactPersonEmail: data.contactPersonEmail,

      billingStreet: data.billingAddress?.street || null,
      billingCity: data.billingAddress?.city || null,
      billingState: data.billingAddress?.state || null,
      billingCountry: data.billingAddress?.country || "India",
      billingPincode: data.billingAddress?.pincode || null,

      shippingStreet: data.shippingAddress?.street || null,
      shippingCity: data.shippingAddress?.city || null,
      shippingState: data.shippingAddress?.state || null,
      shippingCountry: data.shippingAddress?.country || "India",
      shippingPincode: data.shippingAddress?.pincode || null,
    };
  }

  static formatCompany(company) {
    return {
      ...company,

      billingAddress: {
        street: company.billingStreet,
        city: company.billingCity,
        state: company.billingState,
        country: company.billingCountry,
        pincode: company.billingPincode,
      },

      shippingAddress: {
        street: company.shippingStreet,
        city: company.shippingCity,
        state: company.shippingState,
        country: company.shippingCountry,
        pincode: company.shippingPincode,
      },
    };
  }

  static async create(data) {
    const company = await prisma.company.create({
      data: this.mapCompanyData(data),
    });

    return this.formatCompany(company);
  }

  static async getAll(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where: {
          isDeleted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.company.count({
        where: {
          isDeleted: false,
        },
      }),
    ]);

    return {
      companies: companies.map((c) => this.formatCompany(c)),
      total,
    };
  }

  static async getById(id) {
    const company = await prisma.company.findFirst({
      where: {
        id: Number(id),
        isDeleted: false,
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    return this.formatCompany(company);
  }

  static async update(id, data) {
    const company = await prisma.company.findFirst({
      where: {
        id: Number(id),
        isDeleted: false,
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    const updated = await prisma.company.update({
      where: {
        id: Number(id),
      },
      data: this.mapCompanyData(data),
    });

    return this.formatCompany(updated);
  }

  static async delete(id) {
    const company = await prisma.company.findFirst({
      where: {
        id: Number(id),
        isDeleted: false,
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    await prisma.company.update({
      where: {
        id: Number(id),
      },
      data: {
        isDeleted: true,
      },
    });

    return {
      message: "Company deleted successfully",
    };
  }
}

module.exports = CompanyService;