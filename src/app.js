import express from "express"
import dotenv from "dotenv"
import { userRouter } from "./routes/user-routes.js";
import { Dbconnected } from "./db/index.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });
import cors from "cors";
import { imageRouter } from "./routes/image-router.js";
import { boxRouter } from "./routes/boxes-router.js";


const app = express()

Dbconnected()
const corsOptions = {
    origin:  `${process.env.ORIGIN}`, 
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json())
  app.use(cookieParser());



app.get("/", (req, res) => {
    res.send({ message: "this is the home page just for checking" })
})


app.use("/api/v1/user", userRouter)
app.use("/api/v1/img", imageRouter)
app.use("/api/v1/box", boxRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
})