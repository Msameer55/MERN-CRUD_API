import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../store/slicers/postSlice";

const LatestArticle = () => {
  const { posts } = useSelector((state) => state.post);
  console.log("from latest article", posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="bg-[#0F172A] text-white px-6 py-12">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Latest Articles</h2>
          <a href="#" className="text-sm text-[#38BDF8] hover:underline">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            return (
              <>
                <div
                  key={index}
                  className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8]">{post.body}</p>
                    <p className="text-sm text-[#94A3B8]">
                      Created by : {post.name}
                    </p>
                    <a
                      href="#"
                      className="text-[#D946EF] hover:underline text-sm font-medium"
                    >
                      Read more
                    </a>
                    <div className="flex justify-end text-[14px]">
                      <p>
                        Post Created At :
                        <span className="text-sm ml-2">{new Date(post.createdAt).toLocaleDateString()}</span> 
                        <span className="text-sm ml-2">{new Date(post.createdAt).toLocaleTimeString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestArticle;
