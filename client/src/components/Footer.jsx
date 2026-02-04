import React from "react";
import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";
import RightClipAccent from "./RightClipAccent";
import { footerConfig } from "../config/footerConfig";

import FooterBg from "../assets/Footer/footetBg.jpg";

import useSubscribeStore from "../zustand/useSubscribeStore"

const Footer = () => {

    const { email, setEmail, subscribe, loading } = useSubscribeStore()

    
    return (
        <footer
            className="relative shadow-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${FooterBg})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />
            <RightClipAccent />

            {/* Content */}
            <div className="relative z-20 px-8 md:px-16 xl:px-20 pt-12 pb-16">
                <div className="flex flex-col gap-16">

                    {/* ================= ROW 1 ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Quick Links */}
                        <section>
                            <h4 className="text-red-600 font-semibold mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {footerConfig.quickLinks.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-300 hover:text-white transition text-sm"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Our Entities */}
                        <section>
                            <h4 className="text-red-600 font-semibold mb-4">
                                Our Entities
                            </h4>
                            <ul className="space-y-3">
                                {footerConfig.entities.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-300 hover:text-white underline transition text-sm"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Our Services */}
                        <section>
                            <h4 className="text-red-600 font-semibold mb-4">
                                Our Services
                            </h4>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                {footerConfig.services.map((service) => (
                                    <li key={service}>{service}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Legal */}
                        <section>
                            <h4 className="text-red-600 font-semibold mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-3">
                                {footerConfig.legal.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-300 hover:text-white transition text-sm"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* ================= ROW 2 ================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Address */}
                        <section>
                            <h4 className="text-red-600 font-semibold mb-4">
                                Corporate Office Address
                            </h4>

                            <div className="rounded-xl overflow-hidden mb-4">
                                <iframe
                                    src={footerConfig.address.mapEmbed}
                                    className="w-full h-44 border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            <p className="text-sm text-gray-300 leading-relaxed">
                                {footerConfig.address.text}
                            </p>
                        </section>

                        {/* Contact + Newsletter */}
                        <section>
                            <h4 className="text-red-600 font-semibold mb-4">
                                Get in touch with us
                            </h4>

                            {/* Social Icons */}
                            <div className="flex gap-3 mb-6">
                                {footerConfig.social.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 flex items-center justify-center
                                            rounded-full bg-gray-800 text-gray-300
                                            hover:bg-[#9F090C] hover:text-white transition"
                                        >
                                            <Icon size={16} />
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Newsletter */}
                            <div className="max-w-md bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-xl">
                                <h6 className="text-[#9F080B] font-medium mb-1">
                                    Subscribe to our Newsletter
                                </h6>
                                <p className="text-gray-400 text-xs mb-4">
                                    Get updates, insights & offers straight to your inbox.
                                </p>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        subscribe()
                                    }}
                                    className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="flex-1 px-4 py-2 rounded-lg
                                        bg-gray-900 text-sm text-white
                                        border border-gray-700
                                        focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-5 py-2 rounded-lg
                                        bg-[#9F090C] text-white text-sm font-medium
                                        hover:bg-red-700 transition"
                                    >
                                        {loading ? "..." : "Subscribe"}
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <SiteFooter />
        </footer>
    );
};

export default Footer;
