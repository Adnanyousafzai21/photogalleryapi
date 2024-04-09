import express from "express"
import dotenv from "dotenv"
import { userRouter } from "./routes/user-routes.js";
import { Dbconnected } from "./db/index.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });
import cors from "cors";
const app = express()

Dbconnected()
// const corsOptions = {
//     origin:  `${process.env.ORIGIN}`, 
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   };

app.use(cors());
app.use(cookieParser())
app.use(express.json())





app.get("/", (req, res) => {
    res.send({ message: "this is the home page just for checking" })
})


app.use("/api/v1/user", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
})