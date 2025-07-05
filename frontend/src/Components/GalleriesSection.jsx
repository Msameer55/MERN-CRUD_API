import React from "react";

const GalleriesSection = () => {
  return (
    <div className="bg-[#0F172A] text-white px-6 py-10 space-y-12">
      <div className="max-w-7xl w-full mx-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-5xl font-semibold">Galleries</h2>
            <a
              href="#"
              className="text-sm bg-[#1F2937]  text-[#F9FAFB] px-4 py-2 rounded-md  transition "
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <img
              src="/Images/social-1.png"
              className="rounded-xl"
              alt="Gallery 1"
            />
            <img
              src="/Images/social-2.png"
              className="rounded-xl"
              alt="Gallery 2"
            />
            <img
              src="/Images/social-3.png"
              className="rounded-xl"
              alt="Gallery 3"
            />
            <img
              src="/Images/social-4.png"
              className="rounded-xl"
              alt="Gallery 4"
            />
          </div>
        </div>
      </div>
      {/* Galleries Section */}
    </div>
  );
};

export default GalleriesSection;
