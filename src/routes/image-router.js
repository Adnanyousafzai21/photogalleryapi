import { Router } from "express";
import isAutherized from "../meddleware/auth.js";
import { deleteAllImages, getAllImages, getImagesByUser, uploadImage, getImagesByBoxId, updateImagePrivacy, deleteImage,  } from "../controller/images-controller.js";


const imageRouter = Router();

imageRouter.post('/uploadImage', isAutherized, uploadImage);
imageRouter.get("/getAllImg", getAllImages);
imageRouter.get("/getImageByUser", isAutherized, getImagesByUser);
imageRouter.delete("/deleteimageById/:imgId", isAutherized, deleteImage);
imageRouter.delete('/delete-all-images', deleteAllImages);
imageRouter.get('/SingleFloder/:boxId', getImagesByBoxId);
imageRouter.put('/updateimage/:imageId', updateImagePrivacy);

export { imageRouter };
