import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required: true
    },
}, {timestamps: true})

const Users = mongoose.model("User", UsersSchema)
export default Users