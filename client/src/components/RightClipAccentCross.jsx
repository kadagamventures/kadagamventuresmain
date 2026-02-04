const RightClipAccentCross = ({
    width = "w-[68.5%]",
    color = "#282828",
    className = "",
}) => {
    return (
        <div
            data-aos="fade-left"
            data-aos-duration="900"
            className={`absolute inset-y-0 right-0 ${width} z-10 ${className}`}
            style={{
                backgroundColor: color,
                clipPath: "polygon(23% 0, 100% 0, 100% 100%, 0 100%)",
            }}
        />
    );
};

export default RightClipAccentCross;
