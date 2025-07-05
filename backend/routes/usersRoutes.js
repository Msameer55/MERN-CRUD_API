import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";

const router = express.Router();


// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

export {router as usersRoutes}