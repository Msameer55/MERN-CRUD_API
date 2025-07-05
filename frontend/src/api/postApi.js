import axios from "axios";
import axiosInstance from "../config/axios";

const PostApi = {
    createPost: ({ name, title, body }) => axiosInstance.post("/api/posts", { name, title, body }),
    getUserPost: () => axiosInstance.get("/api/posts/user"),
    updatePost: (id, { name, title, body }) =>
        axiosInstance.put(`/api/posts/${id}`, { name, title, body }),
    deleteUserPost : (id) => axiosInstance.delete(`/api/posts/${id}`),
    getAllPosts : () => axios.get('/api/posts')
}

export default PostApi;