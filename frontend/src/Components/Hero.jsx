import React from "react";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-[#0F172A] flex items-center justify-center px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Text Section */}
        <div className="relative space-y-6">
          {/* Blue blur glow behind text */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1D4ED8] rounded-full blur-3xl opacity-40 z-0"></div>

          {/* Main Text */}
          <h1 className=" font-bold relative z-10">
            <span className=" text-7xl tracking-tight bg-gradient-to-r from-[#3B82F6] to-[#D946EF] bg-clip-text text-transparent">
              Inspiration
              <br />
              is everywhere
            </span>
          </h1>

          {/* Paragraph */}
          <p className="tracking-tighter text-xl text-[#CBD5E1] relative z-10">
            There is no passion to be found playing small in settling for a life
            that is less than the one you are capable of living
          </p>

          {/* Button */}
          <button className="bg-gradient-to-r from-[#3B82F6] to-[#D946EF] text-white px-6 py-3 rounded-md font-semibold relative z-10 shadow-lg shadow-[#3B82F680]/40 cursor-pointer">
            Get started
          </button>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-end items-center">
          {/* Background radial gradient behind cartoon */}
          <div className="absolute w-72 h-72 bg-gradient-to-r from-[#A21CAF] to-[#2563EB] rounded-full blur-3xl opacity-60 z-0"></div>

          {/* Your 3D image */}
          <img
            src="/Images/home.png"
            alt="Cartoon"
            className="relative z-10 w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
