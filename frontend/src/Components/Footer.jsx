import React from "react";
import { LuNotebookPen } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-[#111827] border-t border-[#1E293B] pt-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2 justify-start pl-5">
            <LuNotebookPen className="text-3xl text-[#38BDF8]" />
            <span className="text-2xl font-bold text-white">NotePost</span>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-2 text-[#CBD5E1]">
            <a href="#" className="hover:text-[#D946EF]">
              Home
            </a>
            <a href="#" className="hover:text-[#D946EF]">
              About
            </a>
            <a href="#" className="hover:text-[#D946EF]">
              Contact
            </a>
            <a href="#" className="hover:text-[#D946EF]">
              Create Post
            </a>
          </div>

          {/* Newsletter Section */}
          <div>
            <p className="text-white mb-2 font-medium">
              Subscribe to our Newsletter
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-[#1E293B] text-white border border-[#334155] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#3B82F6] to-[#D946EF] text-white px-4 py-2 rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm text-[#94A3B8]">
          &copy; {new Date().getFullYear()} NotePost. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
