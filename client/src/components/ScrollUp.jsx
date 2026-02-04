import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollUp = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const showAfter = window.innerHeight / 2;
            setVisible(window.scrollY > showAfter);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            data-aos="zoom-out"
            data-aos-duration="600"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 p-3 bg-[#9F090C] text-white 
                 rounded-full transition shadow-lg cursor-pointer"
            aria-label="Scroll to top"
        >
            <FaArrowUp className="text-2xl cursor-pointer font-thin" />
        </button>
    );
};

export default ScrollUp;
