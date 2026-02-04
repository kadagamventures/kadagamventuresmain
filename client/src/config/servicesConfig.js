import web from "../assets/service/web.png";
import mobile from "../assets/service/mobile.png";
import marketing from "../assets/service/digitalmarketing.png";
import uiuxservice from "../assets/service/uiuxserrvice.png";
import landingservice from "../assets/service/landingservice.png";
import brandservice from "../assets/service/brandservice.png";
import softwaretestingservice from "../assets/service/softwaretestingservice.png"

export const services = [
    {
        id: 1,
        title: "Digital Marketing",
        slug: "digital-marketing",
        image: marketing,
        description:
            "Data-driven SEO, social media, and performance marketing to grow your brand online.",
    },
    {
        id: 2,
        title: "Mobile App Development",
        slug: "mobile-app-development",
        image: mobile,
        description:
            "High-performance Android and iOS apps built for scale, speed, and usability.",
    },
    {
        id: 3,
        title: "Website Development",
        slug: "website-development",
        image: web,
        description:
            "Fast, responsive, and scalable websites tailored to your business goals.",
    },
    {
        id: 4,
        title: "UI/UX Designing",
        slug: "uiux-designing",
        image: uiuxservice,
        description:
            "User-centric interfaces and seamless experiences designed for clarity and impact.",
    },
    {
        id: 5,
        title: "Landing Page Design",
        slug: "landing-page-design",
        image: landingservice,
        description:
            "High-converting landing pages with clear messaging, strong visuals, and optimized user journeys.",
    },
    {
        id: 6,
        title: "Branding & Graphic Design",
        slug: "branding-graphic-design",
        image: brandservice,
        description:
            "Distinct brand identities through impactful logos, visuals, and cohesive graphic systems.",
    },
    {
        id: 7,
        title: "Software Testing",
        slug: "software-testing",
        image: softwaretestingservice,
        description:
            "Ensure quality and reliability with manual and automated testing including functional, performance, security, and end-to-end testing.",
    },
];
