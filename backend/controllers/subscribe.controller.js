const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const prisma = require("../config/prisma");
const emailService = require("../services/subscriberemail.service");

// ==========================================
// SUBSCRIBE
// ==========================================

exports.subscribe = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    // Validate email
    if (!email) {
        return next(
            new AppError("Email is required", 400)
        );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing subscriber
    const exists = await prisma.subscriber.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    // ==========================================
    // EXISTING SUBSCRIBER
    // ==========================================

    if (exists) {

        // Already active
        if (exists.isActive) {
            return next(
                new AppError(
                    "You are already subscribed",
                    409
                )
            );
        }

        // ==========================================
        // RESUBSCRIBE
        // ==========================================

        await prisma.subscriber.update({
            where: {
                email: normalizedEmail,
            },
            data: {
                isActive: true,
            },
        });

        await emailService.sendWelcomeSubscriptionEmail(
            normalizedEmail
        );

        return res.json({
            success: true,
            message: "Welcome back! You are subscribed again.",
        });
    }

    // ==========================================
    // NEW SUBSCRIBER
    // ==========================================

    await prisma.subscriber.create({
        data: {
            email: normalizedEmail,
        },
    });

    // Send welcome email
    await emailService.sendWelcomeSubscriptionEmail(
        normalizedEmail
    );

    return res.status(201).json({
        success: true,
        message: "Subscribed successfully. Check your email!",
    });
});


// ==========================================
// UNSUBSCRIBE
// ==========================================

exports.unsubscribe = asyncHandler(async (req, res, next) => {
    const { email } = req.query;

    if (!email) {
        return next(
            new AppError("Email is required", 400)
        );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find subscriber
    const subscriber = await prisma.subscriber.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (!subscriber) {
        return next(
            new AppError("Subscriber not found", 404)
        );
    }

    // Already inactive
    if (!subscriber.isActive) {
        return res.json({
            success: true,
            message: "You are already unsubscribed",
        });
    }

    // Deactivate
    await prisma.subscriber.update({
        where: {
            email: normalizedEmail,
        },
        data: {
            isActive: false,
        },
    });

    return res.json({
        success: true,
        message: "You have been unsubscribed successfully",
    });
});