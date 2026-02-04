import webdev from "../assets/service/webdev.png"
import seo from "../assets/service/dm.png"
import uiuxservice from "../assets/service/uiuxservice.png"
import landingpagedesign from "../assets/service/landingpagedesigne.png"
import brandinggraphic from "../assets/service/brandinggraphic.png"
import mobilebg from "../assets/service/mobilebg.png"
import softwareTesting from "../assets/service/softwareTesting.png"

import {
    FaSearch,
    FaMapSigns,
    FaPencilRuler,
    FaPalette,
    FaVial,
    FaClipboardList,
    FaSitemap,
    FaPaintBrush,
    FaCode,
    FaBug,
    FaRocket,
    FaBullseye,
    FaLayerGroup,
    FaPenNib,
    FaChartLine,
    FaPaperPlane,
    FaGem,
    FaVectorSquare,
    FaShapes,
    FaSwatchbook,
    FaEye,
    FaHandshake,
    FaMobileAlt,
    FaProjectDiagram,
    FaPencilAlt,
    FaCogs,
    FaShieldAlt,
    FaCloudUploadAlt,
    FaTasks,
    FaPlayCircle,
    FaCheckCircle
} from "react-icons/fa";

import { FaPenRuler } from "react-icons/fa6";


export const servicesData = {
    "website-development": {
        title: "Web Design & Development",
        description:
            "We design and develop fast, responsive, and visually engaging websites that help your business build trust, attract users, and drive measurable growth.",
        image: webdev,

        sections: [
            {
                title: "What We Offer",
                description:
                    "We provide end-to-end website solutions tailored to your business goals.",
                items: [
                    "Custom website design aligned with your brand",
                    "Responsive design for mobile, tablet, and desktop",
                    "Clean, scalable, and secure development",
                    "SEO-friendly structure and performance optimization",
                    "Easy content management and future scalability",
                ],
            },
            {
                title: "Our Approach",
                description:
                    "We follow a structured process to ensure quality and clarity at every stage.",
                ordered: true,
                items: [
                    "Requirement Discovery – Understand your business, users, and goals",
                    "UX Planning & Wireframing – Build intuitive user journeys",
                    "UI Design – Create modern, engaging visual designs",
                    "Development – Convert designs into high-performance websites",
                    "Testing & Launch – Ensure speed, security, and compatibility",
                    "Support & Optimization – Ongoing improvements and maintenance",
                ],
            },
            {
                title: "Why Choose Us",
                description:
                    "We focus on more than just design — we focus on results.",
                items: [
                    "Business-focused design decisions",
                    "User-centric UX approach",
                    "Fast loading and optimized performance",
                    "Transparent communication and timelines",
                    "Reliable post-launch support",
                ],
            },
        ],
        process: {
            title: "Our Web Development Process",
            description:
                "We follow a structured and collaborative approach to design, develop, and launch websites that are fast, scalable, and business-focused.",

            steps: [
                {
                    title: "Discovery",
                    icon: FaClipboardList,
                },
                {
                    title: "Planning",
                    icon: FaSitemap,
                },
                {
                    title: "Design",
                    icon: FaPaintBrush,
                },
                {
                    title: "Development",
                    icon: FaCode,
                },
                {
                    title: "Testing",
                    icon: FaBug,
                },
                {
                    title: "Launch & Support",
                    icon: FaRocket,
                },
            ],
        },

    },
    "digital-marketing": {
        title: "Digital Marketing",
        description:
            "We help businesses grow online through result-driven digital marketing strategies that increase visibility, engagement, and conversions across search engines and social platforms.",
        image: seo,

        sections: [
            // ===== SEO =====
            {
                title: "Search Engine Optimization (SEO)",
                description:
                    "Improve your search engine rankings, drive qualified traffic, and achieve long-term organic growth.",
                items: [
                    "Comprehensive keyword research & competitor analysis",
                    "On-page SEO including meta tags, content optimization, and internal linking",
                    "Technical SEO for site speed, mobile-friendliness, and crawlability",
                    "High-quality link building and authority growth",
                    "Local SEO and Google Business Profile optimization",
                    "SEO-focused content strategy and blog optimization",
                ],
            },
            {
                title: "Our SEO Approach",
                description:
                    "A structured, data-driven process focused on sustainable ranking improvements.",
                ordered: true,
                items: [
                    "SEO Audit – Analyze website performance and technical gaps",
                    "Keyword & Market Research – Identify high-intent opportunities",
                    "On-page Optimization – Improve content relevance and structure",
                    "Technical Improvements – Enhance speed, indexing, and UX",
                    "Content & Link Building – Build authority and trust",
                    "Monitoring & Optimization – Track rankings, traffic, and conversions",
                ],
            },

            // ===== SMO =====
            {
                title: "Social Media Optimization (SMO)",
                description:
                    "Build a strong social presence, engage your audience, and amplify your brand voice across platforms.",
                items: [
                    "Social profile setup and optimization",
                    "Content strategy and creative post planning",
                    "Hashtag research and trend analysis",
                    "Audience engagement and community management",
                    "Platform-specific growth strategies",
                    "Performance tracking and insights",
                ],
            },
            {
                title: "Our SMO Approach",
                description:
                    "We create consistent, engaging social strategies that connect brands with their audience.",
                ordered: true,
                items: [
                    "Brand & Audience Analysis – Understand tone, goals, and users",
                    "Content Planning – Create platform-specific content calendars",
                    "Design & Copywriting – Engaging visuals and captions",
                    "Publishing & Engagement – Consistent posting and interaction",
                    "Analytics & Optimization – Improve reach and engagement",
                ],
            },

            // ===== WHY US =====
            {
                title: "Why Choose Us",
                description:
                    "We combine search visibility and social engagement to deliver measurable business growth.",
                items: [
                    "Integrated SEO + SMO strategies",
                    "Data-driven and performance-focused execution",
                    "Transparent reporting and communication",
                    "Focus on traffic, engagement, and conversions",
                    "Long-term growth mindset, not shortcuts",
                ],
            },

            //==== WHO IS THIS FOR =====
            {
                title: "Who Is This For",
                description:
                    "Our digital marketing services are designed for businesses that want consistent growth, visibility, and real results online.",
                items: [
                    "Startups looking to build strong online visibility",
                    "Small & medium businesses aiming to increase leads and sales",
                    "Local businesses wanting to rank higher in local searches",
                    "Brands seeking better engagement on social media platforms",
                    "Businesses tired of paid ads and looking for long-term growth",
                ],
            },
        ],
        process: {
            title: "Our Digital Marketing Approach",
            description:
                "We understand your audience, craft the right message, execute targeted strategies, and continuously optimize to drive scalable business growth.",
            steps: [
                { title: "Research" },
                { title: "Strategy" },
                { title: "Execute" },
                { title: "Optimize" },
                { title: "Scale" },
            ]
        }


    },
    "uiux-designing": {
        title: "UI / UX Designing",
        description:
            "We design intuitive, visually appealing, and user-focused digital experiences that improve usability, engagement, and conversions.",
        image: uiuxservice,

        sections: [
            {
                title: "What We Offer",
                description:
                    "Our UI/UX design services focus on creating meaningful and seamless user experiences.",
                items: [
                    "User research and persona creation",
                    "Information architecture and user flow design",
                    "Wireframing and interactive prototypes",
                    "Modern, clean, and consistent UI design",
                    "Design systems and component libraries",
                    "Usability testing and design validation",
                ],
            },
            {
                title: "Our Approach",
                description:
                    "We follow a structured, user-first design process to ensure clarity and impact.",
                ordered: true,
                items: [
                    "Discovery & Research – Understand users, goals, and pain points",
                    "User Journey Mapping – Define flows and interactions",
                    "Wireframing – Create low-fidelity layouts and structure",
                    "UI Design – Craft visually engaging and consistent interfaces",
                    "Prototyping – Build clickable, interactive prototypes",
                    "Testing & Iteration – Refine designs based on real feedback",
                ],
            },
            {
                title: "Why Choose Us",
                description:
                    "We design experiences that balance aesthetics, usability, and business goals.",
                items: [
                    "User-centered and research-driven design decisions",
                    "Clean, modern, and scalable UI systems",
                    "Strong focus on usability and accessibility",
                    "Designs aligned with business and product goals",
                    "Smooth collaboration with developers",
                ],
            },
            {
                title: "Who Is This For",
                description:
                    "Our UI/UX design services are ideal for teams that want better user experiences and higher engagement.",
                items: [
                    "Startups building their first product or MVP",
                    "Businesses redesigning existing websites or apps",
                    "SaaS products aiming to improve usability and retention",
                    "Mobile and web apps seeking better user engagement",
                    "Teams needing clear design systems for scalability",
                ],
            },
        ],
        process: {
            title: "Our UI / UX Design Process",
            description:
                "We follow a user-centered design approach to create intuitive, visually engaging, and scalable digital experiences.",

            steps: [
                {
                    title: "Research",
                    icon: FaSearch,
                },
                {
                    title: "Define",
                    icon: FaMapSigns,
                },
                {
                    title: "Wireframe",
                    icon: FaPencilRuler,
                },
                {
                    title: "Design",
                    icon: FaPalette,
                },
                {
                    title: "Test & Iterate",
                    icon: FaVial,
                },
            ],

        },

    },
    "mobile-app-development": {
        title: "Mobile App Development",
        description:
            "We design and develop high-performance mobile applications for iOS and Android that deliver seamless user experiences and real business value.",
        image: mobilebg,

        sections: [
            {
                title: "What We Offer",
                description:
                    "End-to-end mobile app development services tailored to your product and business goals.",
                items: [
                    "Custom iOS app development (Swift)",
                    "Custom Android app development (Kotlin / Java)",
                    "Cross-platform app development (React Native / Flutter)",
                    "UI/UX design optimized for mobile experiences",
                    "API integration and backend connectivity",
                    "App maintenance, updates, and performance optimization",
                ],
            },
            {
                title: "Our Approach",
                description:
                    "We follow a structured development process to ensure quality, performance, and scalability.",
                ordered: true,
                items: [
                    "Requirement Analysis – Understand app goals, users, and features",
                    "UX Planning & Wireframing – Define smooth mobile user flows",
                    "UI Design – Create intuitive and platform-consistent interfaces",
                    "Development – Build secure and scalable iOS & Android apps",
                    "Testing – Ensure performance, security, and device compatibility",
                    "Deployment & Support – App Store & Play Store launch and updates",
                ],
            },
            {
                title: "Why Choose Us",
                description:
                    "We build mobile apps that are reliable, scalable, and user-focused.",
                items: [
                    "Native and cross-platform expertise",
                    "Performance-optimized and scalable architecture",
                    "User-centric mobile UI/UX design",
                    "Transparent development process and communication",
                    "Reliable post-launch support and maintenance",
                ],
            },
            {
                title: "Who Is This For",
                description:
                    "Our mobile app development services are ideal for businesses and startups building mobile-first products.",
                items: [
                    "Startups building MVPs for iOS and Android",
                    "Businesses launching customer-facing mobile apps",
                    "SaaS products extending to mobile platforms",
                    "Enterprises modernizing legacy mobile applications",
                    "Brands looking to increase mobile user engagement",
                ],
            },
        ],

        process: {
            title: "Our Mobile App Development Process",
            description:
                "We follow a proven, mobile-first development process to build secure, scalable, and high-performing applications.",

            steps: [
                {
                    title: "Requirement Analysis",
                    icon: FaProjectDiagram,
                },
                {
                    title: "UX & App Planning",
                    icon: FaMobileAlt,
                },
                {
                    title: "UI Design",
                    icon: FaPencilAlt,
                },
                {
                    title: "Development",
                    icon: FaCogs,
                },
                {
                    title: "Testing & Security",
                    icon: FaShieldAlt,
                },
                {
                    title: "Deployment",
                    icon: FaCloudUploadAlt,
                },
            ],
        },
    },
    "landing-page-design": {
        title: "Landing Page Design",
        description:
            "We design high-converting landing pages focused on clear messaging, strong visuals, and conversion-driven user experience to turn visitors into customers.",
        image: landingpagedesign,

        sections: [
            {
                title: "What We Offer",
                description:
                    "Our landing page design services are focused on performance, clarity, and conversions.",
                items: [
                    "Custom landing page design aligned with your campaign goals",
                    "Conversion-focused layouts with strong visual hierarchy",
                    "Clear call-to-actions (CTAs) and user flow optimization",
                    "Mobile-first and fully responsive designs",
                    "Fast-loading and SEO-friendly structure",
                    "Integration-ready designs for forms, analytics, and ads",
                ],
            },
            {
                title: "Our Approach",
                description:
                    "We follow a strategic design process to maximize engagement and conversions.",
                ordered: true,
                items: [
                    "Goal & Audience Analysis – Understand campaign intent and target users",
                    "Content Structuring – Craft clear headlines, sections, and CTAs",
                    "Wireframing – Define layout and conversion flow",
                    "Visual Design – Create high-impact, brand-consistent designs",
                    "Optimization – Improve clarity, speed, and usability",
                    "Testing & Refinement – Iterate for better performance",
                ],
            },
            {
                title: "Why Choose Us",
                description:
                    "We design landing pages that don’t just look good — they perform.",
                items: [
                    "Conversion-focused design thinking",
                    "Clear messaging and visual storytelling",
                    "Strong understanding of marketing funnels",
                    "Designs optimized for ads, SEO, and campaigns",
                    "Fast turnaround with consistent quality",
                ],
            },
            {
                title: "Who Is This For",
                description:
                    "Our landing page design services are ideal for businesses running campaigns and promotions.",
                items: [
                    "Startups launching new products or MVPs",
                    "Businesses running paid ad campaigns",
                    "Brands promoting services or events",
                    "Marketing teams improving lead generation",
                    "Companies testing new offers or ideas",
                ],
            },
        ],

        process: {
            title: "Our Landing Page Design Process",
            description:
                "We follow a focused, conversion-driven process to design landing pages that capture attention and drive action.",

            steps: [
                {
                    title: "Goal Definition",
                    icon: FaBullseye,
                },
                {
                    title: "Content Structure",
                    icon: FaLayerGroup,
                },
                {
                    title: "Visual Design",
                    icon: FaPenNib,
                },
                {
                    title: "Conversion Optimization",
                    icon: FaChartLine,
                },
                {
                    title: "Launch",
                    icon: FaPaperPlane,
                },
            ],
        },
    },
    "branding-graphic-design": {
        title: "Branding & Graphic Design",
        description:
            "We craft strong brand identities and visually compelling designs that help businesses stand out, communicate clearly, and build lasting brand recognition.",
        image: brandinggraphic,

        sections: [
            {
                title: "What We Offer",
                description:
                    "Our branding and graphic design services focus on clarity, consistency, and visual impact.",
                items: [
                    "Logo design and brand identity creation",
                    "Brand guidelines and visual systems",
                    "Marketing creatives (banners, posters, flyers)",
                    "Social media graphics and ad creatives",
                    "Presentation, pitch deck, and brochure design",
                    "Print-ready and digital design assets",
                ],
            },
            {
                title: "Our Approach",
                description:
                    "We follow a strategic and creative process to ensure every design reflects your brand’s personality.",
                ordered: true,
                items: [
                    "Brand Discovery – Understand vision, values, and audience",
                    "Visual Research – Explore styles, trends, and inspiration",
                    "Concept Development – Create multiple design directions",
                    "Design Execution – Craft polished, high-quality visuals",
                    "Feedback & Refinement – Iterate until it feels right",
                    "Final Delivery – Provide organized, ready-to-use assets",
                ],
            },
            {
                title: "Why Choose Us",
                description:
                    "We design visuals that are not just attractive, but meaningful and memorable.",
                items: [
                    "Strong understanding of branding principles",
                    "Consistency across digital and print designs",
                    "Creative yet business-aligned designs",
                    "Attention to detail and visual balance",
                    "Designs that scale with your brand",
                ],
            },
            {
                title: "Who Is This For",
                description:
                    "Our branding and graphic design services are ideal for businesses building or refreshing their brand.",
                items: [
                    "Startups creating their brand identity",
                    "Businesses rebranding or modernizing visuals",
                    "Marketing teams needing consistent creatives",
                    "Brands running campaigns and promotions",
                    "Companies wanting stronger visual recognition",
                ],
            },
        ],

        process: {
            title: "Our Branding & Design Process",
            description:
                "We blend strategy and creativity to build brand identities and visual systems that resonate with audiences.",

            steps: [
                {
                    title: "Brand Discovery",
                    icon: FaGem,
                },
                {
                    title: "Visual Direction",
                    icon: FaVectorSquare,
                },
                {
                    title: "Concept Design",
                    icon: FaShapes,
                },
                {
                    title: "Refinement",
                    icon: FaSwatchbook,
                },
                {
                    title: "Brand Review",
                    icon: FaEye,
                },
                {
                    title: "Final Delivery",
                    icon: FaHandshake,
                },
            ],
        },
    },
    "software-testing": {
        title: "Software Testing & QA",
        description:
            "We ensure your applications are reliable, secure, and bug-free through comprehensive manual and automated testing. Our QA services improve performance, stability, and user experience before every release.",
        image: softwareTesting,

        sections: [
            {
                title: "What We Offer",
                description:
                    "End-to-end quality assurance services to validate functionality, performance, and security across all platforms.",
                items: [
                    "Manual & automated testing",
                    "Functional and regression testing",
                    "Performance and load testing",
                    "API and backend testing",
                    "Security and vulnerability testing",
                    "Cross-browser & cross-device testing",
                    "Test case creation and documentation",
                ],
            },
            {
                title: "Our Approach",
                description:
                    "We follow a structured testing lifecycle to catch issues early and deliver stable releases faster.",
                ordered: true,
                items: [
                    "Requirement Analysis – Understand product goals and risks",
                    "Test Planning – Define strategy, scope, and tools",
                    "Test Case Design – Write detailed scenarios and edge cases",
                    "Execution – Perform manual and automated tests",
                    "Bug Reporting – Track, prioritize, and retest issues",
                    "Release Validation – Ensure production readiness",
                ],
            },
            {
                title: "Why Choose Us",
                description:
                    "We focus on delivering quality software that users trust and businesses depend on.",
                items: [
                    "Experienced QA engineers",
                    "Automation-first testing strategy",
                    "Early bug detection to reduce costs",
                    "Detailed reports and clear insights",
                    "Improved app performance and reliability",
                    "Faster and safer releases",
                ],
            },
            {
                title: "Who Is This For",
                description:
                    "Our testing services are perfect for teams that value stability, performance, and customer satisfaction.",
                items: [
                    "Startups preparing product launches",
                    "SaaS platforms handling high traffic",
                    "E-commerce and fintech applications",
                    "Mobile and web app development teams",
                    "Businesses needing ongoing QA support",
                ],
            },
        ],

        process: {
            title: "Our Testing Process",
            description:
                "A systematic testing workflow that ensures your software performs flawlessly in real-world scenarios.",

            steps: [
                {
                    title: "Requirement Analysis",
                    icon: FaClipboardList,
                },
                {
                    title: "Test Planning",
                    icon: FaTasks,
                },
                {
                    title: "Test Design",
                    icon: FaPenRuler,
                },
                {
                    title: "Test Execution",
                    icon: FaPlayCircle,
                },
                {
                    title: "Bug Tracking",
                    icon: FaBug,
                },
                {
                    title: "Release Validation",
                    icon: FaCheckCircle,
                },
            ],
        },
    },
};
