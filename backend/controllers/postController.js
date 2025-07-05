import mongoose from "mongoose";
import Post from "../models/PostsModel.js";
import Users from "../models/UsersModels.js";

/*********************  Get All Posts   **************************/
const getAllPosts = (async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: "desc" });
        return res.status(200).json({ success: "Post created", posts })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

/*********************  Get User Posts   **************************/
const getUserPosts = (async (req, res) => {

    const user = await Users.findById(req.user._id);

    try {
        const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });
        return res.status(200).json({ success: "User Posts", userPosts })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

/*********************  Create New Post   **************************/
const createPost = (async (req, res) => {
    // Grabbing the data from request body
    const { name, title, body } = req.body;

    if (!title || !body || !name) {
        return res.status(400).json({ error: "All fields are required" })
    }

    // Check if the user exisit then allow to create posts (authenticated) sync the user id with post id 
    const user = await Users.findById(req.user._id)

    try {
        const post = await Post.create({ user: user._id, title, body, name });
        return res.status(200).json({ success: "Post created", post })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/*********************  Delete Post   **************************/

const deletePost = (async (req, res) => {
    // res.send(req.params)

    if (!mongoose.Types.ObjectId.isValid(req.params)) {
        return res.status(400).json({ error: "Invalid Id" })
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: "Post doesnot exist" })
    }

    // Check if the user owns the post
    const user = await Users.findById(req.user._id)
    if (!post.user.equals(user._id)) {    // equals is mongoose object that compares the user id with post id 
        res.status(401).json({ message: "Not Authorized" })
    }

    try {
        await post.deleteOne();
        return res.status(200).json({ success: "Post deleted successfully" })

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }


})

/*********************  Update Post   **************************/
const updatePost = async (req, res) => {
    const { name, title, body } = req.body;

    if (!name || !title || !body) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: "Invalid Post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    if (!post.user.equals(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    post.name = name;
    post.title = title;
    post.body = body;

    try {
        const updatedPost = await post.save();
        return res.status(200).json({
            success: "Post updated successfully",
            post: updatedPost, // ✅ This is required by your frontend
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




export { getAllPosts, createPost, deletePost, updatePost, getUserPosts }