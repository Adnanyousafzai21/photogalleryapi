import { Router } from "express";

import isAutherized from "../meddleware/auth.js";
import { createBox, updateBoxById, deleteBoxById, getBoxById, getBoxesByUser } from "../controller/boxes-controller.js";
const boxRouter = Router();

boxRouter.post("/createbox",isAutherized, createBox);
boxRouter.get("/getboxByUser",isAutherized, getBoxesByUser);
boxRouter.get("/getboxById/:boxId",isAutherized, getBoxById);
boxRouter.delete("/deletebox/:id",isAutherized, deleteBoxById);
boxRouter.put("/updatebox/:boxId", isAutherized, updateBoxById);


export { boxRouter };