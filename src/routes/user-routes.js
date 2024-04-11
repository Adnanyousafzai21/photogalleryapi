import { Router } from "express";
import { Login, Register, getuser, logedOut } from "../controller/user-controller.js";
import isAutherized from "../meddleware/auth.js";


  const userRouter= Router()

userRouter.post("/register", Register)
userRouter.post("/login", Login)
userRouter.get("/getuser", isAutherized, getuser)
userRouter.post("/logedout",isAutherized,logedOut)

export {userRouter}