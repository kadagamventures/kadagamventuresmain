const LeftClipAccentCross = ({
    width = "w-[46%]",
    color = "#7D0003",
    className = "",
}) => {
    return (
        <div
            data-aos="fade-right"
            data-aos-duration="800"
            className={`absolute inset-y-0 left-0 ${width} z-10 ${className}`}
            style={{
                backgroundColor: color,
                clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)",
            }}
        />
    );
};

export default LeftClipAccentCross;
