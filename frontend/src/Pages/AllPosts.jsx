import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserPost,
  editUserPost,
  deleteUserPost,
} from "../store/slicers/postSlice";
import EditPostModal from "../Components/EditPostModal";

const AllPosts = () => {
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state) => state.post);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(getUserPost()).unwrap();
      } catch (error) {
        toast.error(error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  const handleEdit = (post) => {
    setCurrentPost(post);
    setEditModalOpen(true);
  };

  const handleSave = async (updatedPost) => {
    try {
      await dispatch(editUserPost(updatedPost)).unwrap();
      toast.success("Post updated");
      setEditModalOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserPost(id)).unwrap();
      await dispatch(getUserPost()).unwrap();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4 py-10">
        <h2 className="text-3xl text-center text-white font-bold mb-8">
          Your Posts
        </h2>
        {userPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Array.isArray(userPosts) &&
              userPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">by {post.name}</p>
                  <p className="text-gray-400 mb-4">{post.body}</p>
                  <div className="text-xs text-gray-500">
                    Created on {new Date(post.createdAt).toLocaleDateString()}{" "}
                    at {new Date(post.createdAt).toLocaleTimeString()}
                  </div>
                  <div className="flex justify-end items-center mt-6 gap-2">
                    <button
                      onClick={() => handleEdit(post)} // <-- this opens the modal
                      className="bg-white text-black text-[14px] min-w-[60px] h-[35px] rounded-[6px]"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 text-white text-[14px] min-w-[60px] h-[35px] rounded-[6px]"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <h2 className="text-9xl text-white tracking-tighter">
            Ther is no post to show{" "}
          </h2>
        )}
      </div>

      <EditPostModal
        show={editModalOpen}
        post={currentPost}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default AllPosts;
