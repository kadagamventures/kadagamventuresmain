import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/useAuthStore";
import { adminRoutes } from "../routes/adminRoutes";

import { FaHome, FaBriefcase, FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";

import Kadagamventureslogohd from "../assets/Logo/Kadagamventureslogohd.png";

const icons = {
    FaHome: <FaHome />,
    CgNotes: <CgNotes />,
    FaBriefcase: <FaBriefcase />,
    FaMailBulk: <FaMailBulk />,
    FaPhoneAlt: <FaPhoneAlt />
};

const AdminSidebar = () => {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3 rounded-lg transition ${isActive
            ? "bg-white text-[#9F090C]"
            : "hover:bg-white/10"
        }`;

    return (
        <aside className="h-full w-72 bg-[#9F090C] text-white flex flex-col p-3">

            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 bg-white p-2 rounded-2xl">
                <img src={Kadagamventureslogohd} alt="Kadagam Ventures" className="h-8 md:h-10" />
                <span className="font-semibold text-[#E60012] text-lg md:text-xl">Kadagam</span>
                <span className="font-semibold text-[#405BAA] text-lg md:text-xl">Ventures</span>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-2 overflow-y-auto">

                {adminRoutes.map((route) => (
                    <NavLink
                        key={route.path}
                        to={`/admin/${route.path}`}
                        className={linkClass}
                    >
                        {icons[route.icon] || null}
                        {route.name}
                    </NavLink>
                ))}

            </nav>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="mt-auto w-full bg-white text-[#9F090C] py-2 rounded-lg font-semibold"
            >
                Logout
            </button>

        </aside>
    );
};

export default AdminSidebar;
