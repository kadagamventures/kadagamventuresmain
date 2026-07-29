require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "development"}`
  });
  
  const mongoose = require("mongoose");
  const { PrismaClient } = require("@prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");
  
  const Blog = require("../models/blog.model");
  
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  
  const prisma = new PrismaClient({
    adapter,
  });
  
  async function migrate() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("✅ Connected to MongoDB");
      console.log("✅ Connected to PostgreSQL");
  
      const blogs = await Blog.find();
  
      console.log(`Found ${blogs.length} blogs`);
  
      for (const blog of blogs) {
  
        const exists = await prisma.blog.findUnique({
          where: {
            slug: blog.slug,
          },
        });
  
        if (exists) {
          console.log(
            `⚠️ Blog "${blog.slug}" already exists. Skipping.`
          );
          continue;
        }
  
        await prisma.blog.create({
          data: {
            title: blog.title,
            slug: blog.slug,
  
            content: blog.content,
            excerpt: blog.excerpt,
  
            author: blog.author,
            category: blog.category,
  
            tags: blog.tags || [],
  
            featuredImage: blog.featuredImage,
            ogImage: blog.ogImage,
  
            isRecommended: blog.isRecommended,
  
            status: blog.status,
  
            metaTitle: blog.seo?.metaTitle,
            metaDescription: blog.seo?.metaDescription,
            metaKeywords: blog.seo?.metaKeywords || [],
  
            publishedAt: blog.publishedAt,
  
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
          },
        });
  
        console.log(`✅ Blog "${blog.slug}" migrated`);
      }
  
      console.log("✅ Blog migration completed.");
  
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
      await mongoose.disconnect();
    }
  }
  
  migrate();