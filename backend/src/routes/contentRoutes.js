import express from "express";

import authMiddleware from "../middlewares/userMiddlewares.js";
import { contentCreate, deleteAContent, getAContent, getAllContents } from "../controllers/contentControllers.js";

const router = express();

router.post("/create",authMiddleware,contentCreate);
router.get("/get-contents",authMiddleware,getAllContents);
router.get("/get-content",authMiddleware,getAContent);
router.delete("/delete-content",authMiddleware,deleteAContent);


export default router;