-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "InquiryAbout" AS ENUM ('services', 'products');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('Tax_Invoice', 'Proforma_Invoice');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('draft', 'sent', 'partial', 'paid', 'overdue', 'cancelled');

-- CreateEnum
CREATE TYPE "LeadBatchStatus" AS ENUM ('active', 'archived');

-- CreateEnum
CREATE TYPE "AgreementType" AS ENUM ('one_time', 'monthly', 'quarterly', 'yearly');

-- CreateEnum
CREATE TYPE "AgreementStatus" AS ENUM ('draft', 'sent', 'active', 'expired', 'terminated');

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "featuredImage" TEXT NOT NULL,
    "ogImage" TEXT,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "status" "BlogStatus" NOT NULL DEFAULT 'draft',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT[],
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandingGraphicDesign" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Branding & Graphic Design',
    "slug" TEXT NOT NULL DEFAULT 'branding-graphic-design',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandingGraphicDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "brandingGraphicDesignId" INTEGER NOT NULL,

    CONSTRAINT "PricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandStrategyIdentity" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Brand Strategy & Identity',
    "slug" TEXT NOT NULL DEFAULT 'brand-strategy-identity',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandStrategyIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandStrategyPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "brandStrategyIdentityId" INTEGER NOT NULL,

    CONSTRAINT "BrandStrategyPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSettings" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "cin" TEXT,
    "state" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "signatureUrl" TEXT,
    "authorizedPerson" TEXT,
    "invoicePrefix" TEXT NOT NULL DEFAULT 'INV',
    "nextInvoiceNumber" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankDetails" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT,
    "accountNumber" TEXT,
    "ifscCode" TEXT,
    "branch" TEXT,
    "upiId" TEXT,
    "businessSettingsId" INTEGER NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "responsibilities" TEXT[],
    "skills" TEXT[],
    "whatWeOffer" TEXT[],
    "howToApply" TEXT,
    "positionCount" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerApplication" (
    "id" SERIAL NOT NULL,
    "careerId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "gender" TEXT,
    "location" TEXT,
    "experience" TEXT,
    "currentSalary" TEXT,
    "expectedSalary" TEXT,
    "noticePeriod" TEXT,
    "joiningDate" TIMESTAMP(3),
    "joiningTime" TEXT,
    "isImmediateJoiner" BOOLEAN,
    "resumeKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "legalName" TEXT,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "registrationNumber" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "contactPersonName" TEXT,
    "contactPersonDesignation" TEXT,
    "contactPersonPhone" TEXT,
    "contactPersonEmail" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "billingStreet" TEXT,
    "billingCity" TEXT,
    "billingState" TEXT,
    "billingCountry" TEXT DEFAULT 'India',
    "billingPincode" TEXT,
    "shippingStreet" TEXT,
    "shippingCity" TEXT,
    "shippingState" TEXT,
    "shippingCountry" TEXT DEFAULT 'India',
    "shippingPincode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyUpdate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "pdfKey" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalMarketing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Digital Marketing',
    "slug" TEXT NOT NULL DEFAULT 'digital-marketing',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DigitalMarketing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalMarketingPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "digitalMarketingId" INTEGER NOT NULL,

    CONSTRAINT "DigitalMarketingPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inquiryAbout" "InquiryAbout" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteractiveAnimatedWebsites" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Interactive & Animated Websites',
    "slug" TEXT NOT NULL DEFAULT 'interactive-animated-websites',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InteractiveAnimatedWebsites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteractiveAnimatedWebsitePricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "interactiveAnimatedWebsiteId" INTEGER NOT NULL,

    CONSTRAINT "InteractiveAnimatedWebsitePricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceType" "InvoiceType" NOT NULL DEFAULT 'Tax_Invoice',
    "companyId" INTEGER NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "placeOfSupply" TEXT,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'draft',
    "subTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalGST" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roundOff" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grandTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advanceAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pendingAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amountInWords" TEXT,
    "termsAndConditions" TEXT,
    "pdfKey" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceService" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT,
    "sacCode" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "gstRate" DOUBLE PRECISION NOT NULL DEFAULT 18,
    "taxableAmount" DOUBLE PRECISION,
    "cgst" DOUBLE PRECISION,
    "sgst" DOUBLE PRECISION,
    "igst" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,

    CONSTRAINT "InvoiceService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoicePayment" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "InvoicePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTracking" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "lastSentAt" TIMESTAMP(3),

    CONSTRAINT "EmailTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailHistory" (
    "id" SERIAL NOT NULL,
    "emailTrackingId" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3),
    "sentTo" TEXT,

    CONSTRAINT "EmailHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingPageDesign" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Landing Page Design',
    "slug" TEXT NOT NULL DEFAULT 'landing-page-design',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingPageDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingPagePricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "landingPageDesignId" INTEGER NOT NULL,

    CONSTRAINT "LandingPagePricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadBatch" (
    "id" SERIAL NOT NULL,
    "leadName" TEXT NOT NULL,
    "totalLeads" INTEGER NOT NULL,
    "leadGeneratedDate" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'Unknown',
    "campaignName" TEXT,
    "costPerLead" DOUBLE PRECISION,
    "totalCost" DOUBLE PRECISION,
    "fileKey" TEXT,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "notes" TEXT,
    "status" "LeadBatchStatus" NOT NULL DEFAULT 'active',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileAppDevelopment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Mobile App Development',
    "slug" TEXT NOT NULL DEFAULT 'mobile-app-development',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobileAppDevelopment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileAppPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "mobileAppDevelopmentId" INTEGER NOT NULL,

    CONSTRAINT "MobileAppPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceAgreement" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "agreementNumber" TEXT NOT NULL,
    "agreementType" "AgreementType" NOT NULL DEFAULT 'one_time',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "AgreementStatus" NOT NULL DEFAULT 'draft',
    "documentUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgreementEmailTracking" (
    "id" SERIAL NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3),
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "openedAt" TIMESTAMP(3),
    "serviceAgreementId" INTEGER NOT NULL,

    CONSTRAINT "AgreementEmailTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareTestingQA" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Software Testing & QA',
    "slug" TEXT NOT NULL DEFAULT 'software-testing-qa',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoftwareTestingQA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareTestingQAPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "softwareTestingQAId" INTEGER NOT NULL,

    CONSTRAINT "SoftwareTestingQAPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UiUxDesigning" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'UI / UX Designing',
    "slug" TEXT NOT NULL DEFAULT 'ui-ux-designing',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UiUxDesigning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UiUxPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "uiUxDesigningId" INTEGER NOT NULL,

    CONSTRAINT "UiUxPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoEditingPostProduction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Video Editing & Post-Production',
    "slug" TEXT NOT NULL DEFAULT 'video-editing-post-production',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoEditingPostProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoEditingPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "videoEditingPostProductionId" INTEGER NOT NULL,

    CONSTRAINT "VideoEditingPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProduction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Video Production',
    "slug" TEXT NOT NULL DEFAULT 'video-production',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoProduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProductionPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "videoProductionId" INTEGER NOT NULL,

    CONSTRAINT "VideoProductionPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteDevelopment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Website Development',
    "slug" TEXT NOT NULL DEFAULT 'website-development',
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteDevelopment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteDevelopmentPricingPlan" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "websiteDevelopmentId" INTEGER NOT NULL,

    CONSTRAINT "WebsiteDevelopmentPricingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkTogether" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "projectDetails" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkTogether_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BrandingGraphicDesign_slug_key" ON "BrandingGraphicDesign"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BrandStrategyIdentity_slug_key" ON "BrandStrategyIdentity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BankDetails_businessSettingsId_key" ON "BankDetails"("businessSettingsId");

-- CreateIndex
CREATE UNIQUE INDEX "CareerApplication_careerId_email_key" ON "CareerApplication"("careerId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "DigitalMarketing_slug_key" ON "DigitalMarketing"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InteractiveAnimatedWebsites_slug_key" ON "InteractiveAnimatedWebsites"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Invoice_companyId_idx" ON "Invoice"("companyId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_invoiceDate_idx" ON "Invoice"("invoiceDate");

-- CreateIndex
CREATE UNIQUE INDEX "EmailTracking_invoiceId_key" ON "EmailTracking"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingPageDesign_slug_key" ON "LandingPageDesign"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MobileAppDevelopment_slug_key" ON "MobileAppDevelopment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAgreement_agreementNumber_key" ON "ServiceAgreement"("agreementNumber");

-- CreateIndex
CREATE INDEX "ServiceAgreement_companyId_idx" ON "ServiceAgreement"("companyId");

-- CreateIndex
CREATE INDEX "ServiceAgreement_status_idx" ON "ServiceAgreement"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AgreementEmailTracking_serviceAgreementId_key" ON "AgreementEmailTracking"("serviceAgreementId");

-- CreateIndex
CREATE UNIQUE INDEX "SoftwareTestingQA_slug_key" ON "SoftwareTestingQA"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UiUxDesigning_slug_key" ON "UiUxDesigning"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VideoEditingPostProduction_slug_key" ON "VideoEditingPostProduction"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VideoProduction_slug_key" ON "VideoProduction"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteDevelopment_slug_key" ON "WebsiteDevelopment"("slug");

-- AddForeignKey
ALTER TABLE "PricingPlan" ADD CONSTRAINT "PricingPlan_brandingGraphicDesignId_fkey" FOREIGN KEY ("brandingGraphicDesignId") REFERENCES "BrandingGraphicDesign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandStrategyPricingPlan" ADD CONSTRAINT "BrandStrategyPricingPlan_brandStrategyIdentityId_fkey" FOREIGN KEY ("brandStrategyIdentityId") REFERENCES "BrandStrategyIdentity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_businessSettingsId_fkey" FOREIGN KEY ("businessSettingsId") REFERENCES "BusinessSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerApplication" ADD CONSTRAINT "CareerApplication_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalMarketingPricingPlan" ADD CONSTRAINT "DigitalMarketingPricingPlan_digitalMarketingId_fkey" FOREIGN KEY ("digitalMarketingId") REFERENCES "DigitalMarketing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractiveAnimatedWebsitePricingPlan" ADD CONSTRAINT "InteractiveAnimatedWebsitePricingPlan_interactiveAnimatedW_fkey" FOREIGN KEY ("interactiveAnimatedWebsiteId") REFERENCES "InteractiveAnimatedWebsites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceService" ADD CONSTRAINT "InvoiceService_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicePayment" ADD CONSTRAINT "InvoicePayment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTracking" ADD CONSTRAINT "EmailTracking_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailHistory" ADD CONSTRAINT "EmailHistory_emailTrackingId_fkey" FOREIGN KEY ("emailTrackingId") REFERENCES "EmailTracking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingPagePricingPlan" ADD CONSTRAINT "LandingPagePricingPlan_landingPageDesignId_fkey" FOREIGN KEY ("landingPageDesignId") REFERENCES "LandingPageDesign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileAppPricingPlan" ADD CONSTRAINT "MobileAppPricingPlan_mobileAppDevelopmentId_fkey" FOREIGN KEY ("mobileAppDevelopmentId") REFERENCES "MobileAppDevelopment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAgreement" ADD CONSTRAINT "ServiceAgreement_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgreementEmailTracking" ADD CONSTRAINT "AgreementEmailTracking_serviceAgreementId_fkey" FOREIGN KEY ("serviceAgreementId") REFERENCES "ServiceAgreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareTestingQAPricingPlan" ADD CONSTRAINT "SoftwareTestingQAPricingPlan_softwareTestingQAId_fkey" FOREIGN KEY ("softwareTestingQAId") REFERENCES "SoftwareTestingQA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UiUxPricingPlan" ADD CONSTRAINT "UiUxPricingPlan_uiUxDesigningId_fkey" FOREIGN KEY ("uiUxDesigningId") REFERENCES "UiUxDesigning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoEditingPricingPlan" ADD CONSTRAINT "VideoEditingPricingPlan_videoEditingPostProductionId_fkey" FOREIGN KEY ("videoEditingPostProductionId") REFERENCES "VideoEditingPostProduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProductionPricingPlan" ADD CONSTRAINT "VideoProductionPricingPlan_videoProductionId_fkey" FOREIGN KEY ("videoProductionId") REFERENCES "VideoProduction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteDevelopmentPricingPlan" ADD CONSTRAINT "WebsiteDevelopmentPricingPlan_websiteDevelopmentId_fkey" FOREIGN KEY ("websiteDevelopmentId") REFERENCES "WebsiteDevelopment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
