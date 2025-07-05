import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../store/slicers/authSlice";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, password, confirmPassword } = form;
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password must match");
    } else if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
    } else {
      try {
        await dispatch(registerUser(form)).unwrap();
        toast.success("Registered Successfully");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } catch (error) {
        toast.error(error);
      }
    }

    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
      <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              name="name"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              name="email"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              name="password"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="eye-icon absolute top-[55%] right-[20px] bottom-auto">
              {showPassword ? (
                <FaRegEyeSlash
                  className="text-white text-lg cursor-pointer"
                  onClick={togglePassword}
                />
              ) : (
                <FaEye
                  className="text-white text-lg cursor-pointer"
                  onClick={togglePassword}
                />
              )}
            </div>
          </div>
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              placeholder="••••••••"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="eye-icon absolute top-[55%] right-[20px] bottom-auto">
              {showConfirmPassword ? (
                <FaRegEyeSlash
                  className="text-white text-lg cursor-pointer"
                  onClick={toggleConfirmPassword}
                />
              ) : (
                <FaEye
                  className="text-white text-lg cursor-pointer"
                  onClick={toggleConfirmPassword}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full mt-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition duration-200"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
