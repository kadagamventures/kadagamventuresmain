import React from "react";
import contactUsleftsideImage from "../assets/contactus/contactus.jpg";
import LeftClipAccentCross from "../components/LeftClipAccentCross";
import RightClipAccentCross from "./RightClipAccentCross";

import useContactStore from "../zustand/useContactStore";

const ContactUs = () => {

    const { form, setField, submitForm, loading } = useContactStore()

    return (
        <div className="relative w-full max-w-7xl mx-auto h-125 rounded-3xl overflow-hidden bg-black/90 lg:bg-white">
            <div className="hidden lg:block">
                <LeftClipAccentCross />
                <RightClipAccentCross />
            </div>

            <div
                data-aos="zoom-out"
                data-aos-duration="900"
                className="absolute left-12 top-1/2 -translate-y-1/2 z-20 w-[45%] h-[75%] hidden lg:block rounded-2xl overflow-hidden shadow-xl bg-white">
                <img
                    src={contactUsleftsideImage}
                    alt="Contact us"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute right-0 top-0 z-30 w-full lg:w-1/2 h-full px-6 py-10 text-white flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-6">
                    Get in Touch
                </h2>

                <div className="space-y-6">
                    <input
                        value={form.fullName}
                        onChange={(e) => setField("fullName", e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-white lg:bg-[#3a3a3a] text-black lg:text-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        value={form.contactNumber}
                        onChange={(e) => setField("contactNumber", e.target.value)}
                        type="number"
                        placeholder="Contact Number"
                        className="w-full  bg-white lg:bg-[#3a3a3a] text-black lg:text-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <input
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        type="email"
                        placeholder="Email Id"
                        className="w-full  bg-white lg:bg-[#3a3a3a] text-black lg:text-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Radio Section */}
                <div className="mt-6">
                    <p className="text-base font-medium mb-4 text-gray-300 ">
                        Inquiry About
                    </p>

                    <div className="flex  items-start lg:items-center gap-4 lg:gap-12">
                        <label className="relative flex flex-row items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                checked={form.inquiryAbout === "services"}
                                onChange={() => setField("inquiry", "services")}
                                name="inquiry"
                                value="services"
                                className="peer sr-only"
                                defaultChecked
                            />
                            <div className="
        w-6 h-6 rounded-full border-2 border-white/70 
        flex items-center justify-center
        transition-all duration-200
        peer-checked:border-red-500 peer-checked:border-4  peer-checked:bg-white
        group-hover:border-white/90
      ">
                                <div className="
          w-3.5 h-3.5 rounded-full bg-white 
          scale-0 transition-transform duration-200
          peer-checked:scale-100
        " />
                            </div>
                            <span className="
        text-lg font-medium transition-colors duration-200
        
        text-white/80 peer-checked:text-white peer-checked:font-semibold
      ">
                                Services
                            </span>
                        </label>

                        {/* Products */}
                        <label className="relative flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                checked={form.inquiryAbout === "products"}
                                onChange={() => setField("inquiry", "product")}
                                name="inquiry"
                                value="services"
                                className="peer sr-only"
                                defaultChecked
                            />
                            <div className="
        w-6 h-6 rounded-full border-2 border-white/70 
        flex items-center justify-center
        transition-all duration-200
        peer-checked:border-red-500 peer-checked:border-4 peer-checked:bg-white
        group-hover:border-white/90
      ">
                                <div className="
          w-3.5 h-3.5 rounded-full bg-white 
          scale-0 transition-transform duration-200
          peer-checked:scale-100
        " />
                            </div>
                            <span className="
        text-lg font-medium transition-colors duration-200
        text-white/80 peer-checked:text-white peer-checked:font-semibold
      ">
                                Product
                            </span>
                        </label>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={submitForm}
                    disabled={loading}
                    className="mt-8 w-fit px-10 py-3 rounded-xl bg-linear-to-r from-red-600 to-red-500 text-white font-medium shadow-lg hover:scale-105 transition">
                    {loading ? "Sending..." : "Connect with us"}
                </button>
            </div>

        </div>
    );
};


export default ContactUs;
