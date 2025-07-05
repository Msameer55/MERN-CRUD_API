import jwt from "jsonwebtoken"
import Users from "../models/UsersModels.js"

const auth = async(req, res, next) => {
    // check if request header contain authorization key 
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({message: "Authorization token not found"})
    }

    // Grab the token from headers (taken the "Bearer " string away)
    const token = authorization.split(" ")[1];

    try {
        // Decode and extract the User Id
        const {_id} = await jwt.verify(token, process.env.SECRET)
        // Save the user in request
        req.user = await Users.findById(_id).select("_id")  // matching the token id with jwt payload id

        next();
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

export default auth;