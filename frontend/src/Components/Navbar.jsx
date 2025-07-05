import React, { useEffect } from "react";
import { LuNotebookPen } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../store/slicers/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(logOut());
      toast.success("You have been logout successfully")
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#111827] max-w-7xl mx-auto text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <LuNotebookPen className="text-3xl text-white cursor-pointer" />
          <span className="text-2xl font-bold text-[#38BDF8] cursor-pointer">
            NotePost
          </span>
        </div>

        {/* Nav Links */}
        <ul className="flex gap-6  font-medium">
          <li className="relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-[#D946EF] before:transition-all before:duration-300 hover:before:w-full  cursor-pointer hover:text-[#D946EF]">
            <NavLink to="/"> Home</NavLink>
          </li>
          <li className="relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-[#D946EF] before:transition-all before:duration-300 hover:before:w-full  cursor-pointer hover:text-[#D946EF]">
            About
          </li>
          <li className="relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-[#D946EF] before:transition-all before:duration-300 hover:before:w-full cursor-pointer hover:text-[#D946EF]">
            Contact
          </li>
          <li className="relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-[#D946EF] before:transition-all before:duration-300 hover:before:w-full  cursor-pointer hover:text-[#D946EF]">
            <NavLink to="/create-post">Create Post</NavLink>
          </li>
          {isLoggedIn && (
            <li className="relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-[#D946EF] before:transition-all before:duration-300 hover:before:w-full  cursor-pointer hover:text-[#D946EF]">
              <NavLink to="/get-user-post">Your Posts</NavLink>
            </li>
          )}
        </ul>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <button
            className="min-w-[100px] h-[37px]  cursor-pointer bg-[#2563EB]  rounded-md  transition"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-3">
            <button className="min-w-[100px] h-[37px]  cursor-pointer bg-[#2563EB]  rounded-md  transition">
              <NavLink
                className="h-full flex justify-center items-center text-[#F9FAFB]  font-semibold"
                to="/register"
              >
                Sign Up
              </NavLink>
            </button>
            <button className="min-w-[100px] h-[37px] cursor-pointer bg-[#1F2937] rounded-md  transition">
              <NavLink
                className="h-full flex justify-center items-center text-[#F9FAFB]  font-semibold"
                to="/login"
              >
                Login
              </NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
