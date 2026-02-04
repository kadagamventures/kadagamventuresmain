const InfinityLoader = () => {
    return (
        <div className="flex justify-center items-center py-6">
            <svg
                width="80"
                height="40"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background Track (Static) */}
                <path
                    d="M20,25 C20,10 40,10 50,25 C60,40 80,40 80,25 C80,10 60,10 50,25 C40,40 20,40 20,25 z"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200"
                />

                {/* Animated Path (Moving) */}
                <path
                    d="M20,25 C20,10 40,10 50,25 C60,40 80,40 80,25 C80,10 60,10 50,25 C40,40 20,40 20,25 z"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-[#405BAA]"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset="0"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="1"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                    {/* Optional: Add this to make the trail shorter/look like a 'snake' */}
                    <animate
                        attributeName="stroke-dasharray"
                        values="0.1 0.9; 0.6 0.4; 0.1 0.9"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};

export default InfinityLoader;