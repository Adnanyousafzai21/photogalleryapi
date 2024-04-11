import { Router } from "express";
import isAutherized from "../meddleware/auth.js";
import { deleteAllImages, getAllImages, getImagesByUser, uploadImage } from "../controller/images-controller.js";
import { upload } from "../meddleware/multer-middleware.js";

const imageRouter = Router()

imageRouter.post('/uploadImage',isAutherized, uploadImage);
imageRouter.get("/getAllImg", getAllImages)
imageRouter.get("/getuser", getImagesByUser)
imageRouter.delete('/delete-all-images', deleteAllImages);

export { imageRouter }