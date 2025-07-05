import express from "express"
import { createPost, deletePost, getAllPosts, getUserPosts, updatePost } from "../controllers/postController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// get all posts 
router.get("/", getAllPosts)

// get user posts 
router.get("/user", auth, getUserPosts)

// create a post
router.post("/", auth, createPost)

// delete post 
router.delete("/:id",auth,  deletePost)

// update post 
router.put("/:id",auth,  updatePost)


export { router as postRoutes }