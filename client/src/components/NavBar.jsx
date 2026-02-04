import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { RiArrowDropDownLine } from "react-icons/ri";
import RightClipAccent from './RightClipAccent';

import Kadagamventureslogohd from '../assets/Logo/Kadagamventureslogohd.png';
import { navMenu } from '../config/navMenu';

const NavBar = () => {

    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeTimeout = useRef(null);

    const location = useLocation();
    const isActive = (path) => location.pathname.startsWith(path);

    const handleMouseEnter = (label) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const isDropdownActive = (item) => {
        if (!item.children) return false;
        return item.children.some((child) =>
            location.pathname.startsWith(child.path)
        );
    };

    const closeAllMenus = () => {
        setOpenDropdown(null);
        setMobileOpen(false);
    };

    const isExternal = (item) => item?.external || item?.url;


    return (
        <nav className="xl:fixed relative top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="relative z-30 flex items-center justify-between px-6 py-4">
                <Link
                    data-aos="fade-right"
                    data-aos-duration="1200"
                    to="/"
                    className="flex items-center gap-2 font-sans"
                >
                    <img src={Kadagamventureslogohd} alt="Kadagam Ventures" className="h-8 md:h-10" />
                    <span className="font-semibold text-[#E60012] text-lg md:text-xl">Kadagam</span>
                    <span className="font-semibold text-[#405BAA] text-lg md:text-xl">Ventures</span>
                </Link>

                <ul className="hidden xl:flex items-center gap-8 lg:gap-10">
                    {navMenu.map((item, index) => (
                        <li
                            key={item.label}
                            data-aos="fade-down"
                            data-aos-duration="1200"
                            data-aos-delay={`${index * 120}`}
                            className="relative xl:right-145"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                to={item.path}
                                className={`font-normal flex items-center gap-1 transition-colors ${isActive(item.path) || isDropdownActive(item)
                                    ? 'text-red-600'
                                    : 'text-gray-800 hover:text-red-600'
                                    }`}
                            >
                                {item.label}
                                {item.dropdown && <RiArrowDropDownLine />}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className="xl:hidden z-30 text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <RxCross2 size={28} /> : <RxHamburgerMenu size={28} />}
                </button>
            </div>

            {navMenu.map(
                (item) =>
                    item.dropdown &&
                    openDropdown === item.label && (
                        <div
                            key={item.label}
                            className="absolute left-0 right-0 top-full bg-white rounded-br-2xl shadow-2xl z-20"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

                            <div className="max-w-7xl mx-auto px-8 py-10">
                                <div className='mb-4'>
                                    <h2
                                        data-aos="fade-up"
                                        data-aos-duration="700"
                                        className="text-lg font-normal text-gray-400"
                                    >
                                        {item.heading}
                                    </h2>

                                    {item.subheading && (
                                        <p
                                            data-aos="fade-up"
                                            data-aos-duration="700"
                                            data-aos-delay="100"
                                            className="text-gray-600 text-sm mt-2 max-w-2xl"
                                        >
                                            {item.subheading}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full h-px bg-gray-200 mb-8" />
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {item.children.map((child, index) =>
                                        isExternal(child) ? (
                                            <a
                                                key={child.title}
                                                href={child.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={closeAllMenus}
                                                data-aos="zoom-up"
                                                data-aos-duration="800"
                                                data-aos-delay={`${index * 100}`}
                                                className="group block p-4 rounded-xl border-gray-200 hover:bg-[#9F090C]"
                                            >
                                                {child.logo && (
                                                    <img
                                                        src={child.logo}
                                                        alt={child.title}
                                                        className="h-24 w-24 mb-4 object-contain"
                                                    />
                                                )}

                                                <h4 className="font-semibold text-gray-900 group-hover:text-white">
                                                    {child.title}
                                                </h4>

                                                <p className="text-sm mt-1 text-gray-600 group-hover:text-white">
                                                    {child.description}
                                                </p>
                                            </a>
                                        ) : (
                                            <Link
                                                key={child.title}
                                                to={child.path}
                                                onClick={closeAllMenus}
                                                data-aos="zoom-up"
                                                data-aos-duration="800"
                                                data-aos-delay={`${index * 100}`}
                                                className={`group block p-4 rounded-xl transition
                ${location.pathname.startsWith(child.path)
                                                        ? 'bg-[#9F090C] text-white'
                                                        : 'border-gray-200 hover:bg-[#9F090C]'
                                                    }`}
                                            >
                                                {child.logo && (
                                                    <img
                                                        src={child.logo}
                                                        alt={child.title}
                                                        className="h-24 w-24 mb-4 object-contain"
                                                    />
                                                )}

                                                <h4 className={`font-semibold ${location.pathname.startsWith(child.path)
                                                    ? 'text-white'
                                                    : 'text-gray-900 group-hover:text-white'
                                                    }`}>
                                                    {child.title}
                                                </h4>

                                                <p className={`text-sm mt-1 ${location.pathname.startsWith(child.path)
                                                    ? 'text-white'
                                                    : 'text-gray-600 group-hover:text-white'
                                                    }`}>
                                                    {child.description}
                                                </p>
                                            </Link>
                                        )
                                    )}

                                </div>

                            </div>
                            <RightClipAccent />

                        </div>

                    )
            )}

            <div
                className="absolute top-0 right-0 h-full w-1/2 md:w-2/6 bg-[#9F090C] z-10"
                style={{
                    clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
                }}
            />

            {mobileOpen && (
                <div className="xl:hidden absolute top-full right-0 w-64 h-screen bg-white shadow-lg z-40">
                    <ul data-aos="fade-up" className="flex flex-col py-4 px-6">
                        {navMenu.map((item) => (
                            <li key={item.label} className="py-3">

                                {/* Top level item */}
                                {item.external ? (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block font-medium text-gray-800"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`block font-medium ${isActive(item.path)
                                            ? 'text-[#9F080B]'
                                            : 'text-gray-800'
                                            }`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}

                                {/* Dropdown children */}
                                {item.dropdown && (
                                    <div className="pl-4 mt-2 space-y-3 text-sm text-gray-700">
                                        {item.children.map((child) =>
                                            isExternal(child) ? (
                                                <a
                                                    key={child.title}
                                                    href={child.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block hover:text-[#9F090C]"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {child.title}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={child.title}
                                                    to={child.path}
                                                    className="block hover:text-[#9F090C]"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {child.title}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}

                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
