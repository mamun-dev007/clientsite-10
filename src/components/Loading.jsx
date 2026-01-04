import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 gap-4">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#255f85]/30"></div>

        {/* Animated ring */}
        <div
          className="absolute inset-0 rounded-full border-4
                     border-t-[#255f85]
                     border-r-[#1f4f6d]
                     border-b-transparent
                     border-l-transparent
                     animate-spin"
        ></div>
      </div>

      {/* Loading text */}
      <p className="text-sm tracking-wide text-gray-300">
        {text}
      </p>
    </div>
  );
};

export default Loading;
