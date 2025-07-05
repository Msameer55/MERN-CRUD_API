import Users from "../models/UsersModels.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv/config"
import jwt from "jsonwebtoken"
/*********************  Generate Token   **************************/
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" })
}

/*********************  Register User   **************************/
const registerUser = (async (req, res) => {

    // Grab the fields 
    const { email, password } = req.body;

    if (!email || !password) {
       return res.status(400).json({ message: "All fields are required" })
    }
    const exist = await Users.findOne({ email });
    if (exist) {
       return res.status(400).json({ message: "Email is already taken" })
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        // Register the User
        const user = await Users.create({ email, password: hashedPassword })
        // Create the jsonWebToken
        const token = createToken(user._id)
        // Send the response
       return res.status(200).json({ success: "Register User Successfully", user, token })

    } catch (error) {
       return res.status(400).json({ error: error.message })

    }

})

/*********************  Login User   **************************/
const loginUser = (async (req, res) => {

    const { email, password } = req.body;

    if (!email, !password) {
       return res.status(400).json({ message: "All fields are required" })
    }

    const loginUser = await Users.findOne({ email });
    if (!loginUser) {
       return res.status(400).json({ message: "Invalid Email" })
    }

    const match = await bcrypt.compare(password, loginUser.password);
    if (!match) {
       return res.status(400).json({ message: "Password must match" })
    }

    try {
        if (match) {
            const token = createToken(loginUser._id)
          return  res.status(200).json({ success: "Login Successfull", email, token })

        }
    } catch (error) {
      return  res.status(400).json({ error: error.message })
    }

})

export { registerUser, loginUser };

