import express from "express"
import { postRoutes } from "./routes/postsRoutes.js";
import connectDB from './config/mongoose-connection.js';
import { usersRoutes } from "./routes/usersRoutes.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true
}));

app.use(express.json())
const PORT =  process.env.PORT || 4000

app.use("/api/posts", postRoutes)
app.use("/api/users", usersRoutes)

connectDB().then(() => {
    app.listen(PORT, "localhost" , () => console.log("Listen Request at " + PORT))
}).catch((err) => {
    console.log(err || "Error on listening the port")
})