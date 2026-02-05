import {
    FaWhatsapp,
    FaInstagram,
    FaFacebookF,
    FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export const footerConfig = {
    quickLinks: [
        { label: "Home", path: "/" },
        { label: "About us", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Products", path: "/products" },
        { label: "Careers", path: "/careers" },
        { label: "Blogs", path: "/blogs" },
    ],

    entities: [
        { label: "Kadagam Foundation", path: "https://kadagamfoundation.org/" },
        { label: "Nithyaevent", path: "https://nithyaevent.com/" },
        { label: "Nithya Tickets", path: "https://nithyatickets.com/" },
        { label: "Kadagam next", path: "https://www.kadagamnext.com/" },
        { label: "Nithyaevent vendor", path: "/vendor" },
    ],

    services: [
        "Web Design & Development",
        "Mobile App Development",
        "UI/UX Designer",
        "Landing page Design",
        "Digital Marketing",
        "Branding & Graphic Designer",
    ],

    legal: [
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms and Conditions", path: "/terms" },
        { label: "Refund Policy", path: "/refund-policy" },
        { label: "Help Centre", path: "/help" },
    ],

    address: {
        mapEmbed:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4378.7981812494145!2d77.59644837552439!3d12.986856414542702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17005b0a5e31%3A0xb6796593445e2823!2sKadagam%20Ventures%20Private%20Limited!5e1!3m2!1sen!2sin!4v1769051589456!5m2!1sen!2sin",
        text: `1st Floor, Kadagam Ventures Private Limited, #34, Venkatappa Rd, off Queens Road, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560051`,
    },

    social: [
        { icon: FaInstagram, url: "https://www.instagram.com/kadagamventures/" },
        { icon: FaXTwitter, url: "https://x.com/KadagamVentures" },
        { icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=61587383576859" },
        { icon: FaYoutube, url: "https://www.youtube.com/@KadagamVentures" },
    ],
};
