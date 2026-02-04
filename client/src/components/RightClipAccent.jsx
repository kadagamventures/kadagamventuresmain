import React from "react";

const RightClipAccent = ({
    width = "w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24",
    height = "h-full",
    color = "#9F090C",
    className = "",
}) => {
    return (
        <div
            className={`
        absolute top-0 right-0 
        ${width} 
        ${height}
        z-10 
        ${className}
        hidden xl:block
      `}
            style={{ backgroundColor: color, clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)", }}
        />
    );
};

export default RightClipAccent;
