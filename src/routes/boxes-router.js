import { Router } from "express";

import isAutherized from "../meddleware/auth.js";
import { createBox, updateBoxById, deleteBoxById, getBoxById } from "../controller/boxes-controller.js";
const boxRouter = Router();

boxRouter.post("/createbox", createBox);
boxRouter.get("/getboxById/:boxId",isAutherized, getBoxById);
boxRouter.delete("/deletebox/:id",isAutherized, deleteBoxById);
boxRouter.put("/updatebox/:id", isAutherized, updateBoxById);

export { boxRouter };