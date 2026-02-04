import NithyaEvents from "../assets/products/nithyaeventsnew.png";
import NithyaTickets from "../assets/products/nithyatickets.png";
import KadagamNext from "../assets/products/KadagamNext.png";
import kadagamfoundation from "../assets/products/kadagamfoundationtwo.png"

export const navMenu = [
    {
        label: "About us",
        path: "/about",
    },
    {
        label: "Services",
        dropdown: true,
        heading: "Our Services",
        subheading: "What we offer to grow your business",
        children: [
            {
                title: "Digital Marketing",
                description:
                    "Data-driven SEO, social media, and performance marketing to grow your brand online.",
                path: "/services/digital-marketing",
            },
            {
                title: "Mobile App Development",
                description:
                    "High-performance Android and iOS apps built for scale, speed, and usability.",
                path: "/services/mobile-app-development",
            },
            {
                title: "Website Development",
                description:
                    "Fast, responsive, and scalable websites tailored to your business goals.",
                path: "/services/website-development",
            },
            {
                title: "UI/UX Designing",
                description:
                    "User-centric interfaces and seamless experiences designed for clarity and impact.",
                path: "/services/uiux-designing",
            },
            {
                title: "Landing Page Design",
                description:
                    "High-converting landing pages with clear messaging, strong visuals, and optimized user journeys.",
                path: "/services/landing-page-design",
            },
            {
                title: "Branding & Graphic Design",
                description:
                    "Distinct brand identities through impactful logos, visuals, and cohesive graphic systems.",
                path: "/services/branding-graphic-design",
            },
            {
                title: "Software Testing",
                description:
                    "Ensure quality and reliability with manual and automated testing services, including functional, performance, security, and end-to-end testing.",
                path: "/services/software-testing",
            }

        ],
    },
    {
        label: "Products",
        dropdown: true,
        heading: "In-House Products",
        children: [
            {
                title: "Nithyaevents",
                description: "Manage events easily",
                url: "https://nithyaevent.com/",
                logo: NithyaEvents,
                external: true,
            },
            {
                title: "Nithyatickets",
                description: "Ticket booking and management",
                url: "https://nithyatickets.com/",
                logo: NithyaTickets,
                external: true,
            },
            {
                title: "Kadagam Next",
                description: "Next-gen enterprise solutions",
                url: "https://www.kadagamnext.com/",
                logo: KadagamNext,
                external: true,
            },
            {
                title: "Kadagam Foundation",
                description: "We’re Non- Profitable & Charity Organization",
                url: "https://kadagamfoundation.org/",
                logo: kadagamfoundation,
                external: true,
            },
        ],
    },
    {
        label: "Careers",
        path: "/careers",
    },
    // {
    //     label: "Blogs",
    //     path: "/blogs",
    // },
];