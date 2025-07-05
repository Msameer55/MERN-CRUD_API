import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserPost } from "../store/slicers/postSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    title: "",
    body: "",
  });

  const submitPost = (e) => {
    e.preventDefault();
    try {
      dispatch(createUserPost(form)).unwrap();
      toast.success("Post has been created successfully");
      setForm({
        name: "",
        title: "",
        body: "",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
        <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-8 w-full max-w-xl shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create New Post
          </h2>
          <form className="space-y-5" onSubmit={submitPost}>
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
              <label className="block text-gray-300 text-sm mb-1">Title</label>
              <input
                type="text"
                placeholder="Post title"
                value={form.title}
                name="title"
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Body</label>
              <textarea
                placeholder="Write your post..."
                value={form.body}
                rows="6"
                name="body"
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition duration-200"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
