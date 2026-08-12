const prisma = require("../config/prisma");

// GET ALL SUBSCRIBERS
exports.getAllSubscribers = () => {
    return prisma.subscriber.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

// GET ACTIVE SUBSCRIBERS
exports.getActiveSubscribers = () => {
    return prisma.subscriber.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};