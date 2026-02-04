import React from "react";

const LeftClipAccent = ({
    width = "w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48",
    color = "#9F090C",
    className = "",
}) => {
    return (
        <div
            className={`
                absolute top-0 left-0 h-full
                ${width}
                z-10
                ${className}
            `}
            style={{
                backgroundColor: color,
                clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
            }}
        />
    );
};

export default LeftClipAccent;
