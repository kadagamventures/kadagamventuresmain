const DiagonalSeparator = () => {
    return (
        <div
            className="absolute inset-y-0 left-[48%] w-[3%] z-20 bg-white"
            style={{
                clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)",
            }}
        />
    );
};

export default DiagonalSeparator;
