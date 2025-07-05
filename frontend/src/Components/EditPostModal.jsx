import React, { useState, useEffect } from "react";

const EditPostModal = ({ show, post, onClose, onSave }) => {
  const [formData, setFormData] = useState({ name: "", title: "", body: "" });

  useEffect(() => {
    if (post) {
      setFormData({ name: post.name, title: post.title, body: post.body });
    }
  }, [post]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...formData, id: post._id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />
        <textarea
          name="body"
          value={formData.body}
          placeholder="Body"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded text-white">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 px-4 py-2 rounded text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
