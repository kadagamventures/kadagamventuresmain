import React from "react";
import { Helmet } from "react-helmet";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import Button from "./Button.jsx";
import BgImage from "../assets/HomeHero/herosectionbg.png";
import vectoreline from "../assets/HomeHero/vector_line.svg";
import RightClipAccent from "./RightClipAccent.jsx";

const HeroHome = ({ onGetStarted }) => {
  return (
    <>
      <Helmet>
        <title>
         Digital Marketing & Web Design Bangalore | Kadagam Ventures
        </title>

        <meta
          name="description"
          content="Looking for a Best digital marketing and web design company in Bangalore? We deliver app development and brand strategy solutions that drive real growth."
        />

        <meta
          name="keywords"
          content="Best digital marketing company in Bangalore, Digital marketing agency in Bangalore, Website design company in Bangalore, Landing page design, Mobile app development services, Difference between UI and UX, Video editing services for businesses, Animated web design services Bangalore, Logo design & branding, Graphic design agencies, Brand strategy services, AI-powered software testing, Machine learning, Test automation"
        />

        <link rel="canonical" href="https://www.kadagamventures.com" />
        {/* ✅ ADD OPEN GRAPH HERE */}
    <meta property="og:title" content="Digital Marketing & Web Design Bangalore | Kadagam Ventures" />
    <meta property="og:description" content="Looking for a Best digital marketing and web design company in Bangalore? We deliver app development and brand strategy solutions that drive real growth." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.kadagamventures.com" />
      </Helmet>

      <div className="relative h-auto lg:h-161.25 w-full overflow-hidden">
        <img
          src={BgImage}
          alt="Hero BG"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <RightClipAccent width="w-6 sm:w-10 md:w-14 lg:w-20 xl:w-24" />

        <div className="relative z-10 font-sans  px-6 lg:px-12 text-center xl:mt-8 mt-24 xl:text-start  flex justify-center xl:justify-start items-center xl:items-start">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="500"
            className="max-w-4xl p-4 xl:pt-24"
          >
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Grow Your Business With
              <br />
              Expert Digital Marketing &
              <br />
              <span className="font-bold text-red-800">Web Design</span>
              <br />
            </h1>

            <p className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              Modern software system that simplifies work and increases
              productivity, has
              <br /> and empower businesses to work smarter securely and
              efficiently.
            </p>

            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay="500"
              className="mt-8"
            >
              <Button onClick={onGetStarted} title="Get Started" />
            </div>
          </div>
        </div>

        <img
          data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-delay="500"
          src={vectoreline}
          alt="growth line"
          className="absolute bottom-6 left-160 -translate-x-1/2 w-[60%] opacity-90 hidden xl:block"
        />

        <div
          data-aos="fade-left"
          data-aos-duration="1200"
          data-aos-delay="500"
          className="absolute font-sans right-1/5 bottom-21 text-left hidden xl:block"
        >
          <p className="text-gray-300 text-sm tracking-widest leading-relaxed">
            MAKE
            <br />
            A SMART
            <br />
            MOVE WITH
            <br />
            <span className="text-white font-semibold">KADAGAM VENTURES</span>
          </p>
        </div>

        {/* Scroll Down */}
        <div className="absolute bottom-6  hidden xl:block right-[29%]   flex-col items-center text-red-600 animate-bounce">
          <MdKeyboardDoubleArrowDown
            size={40}
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="500"
          />
        </div>
      </div>
    </>
  );
};

export default HeroHome;
