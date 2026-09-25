import express from "express";

import authMiddleware from "../middlewares/userMiddlewares.js";
import { contentCreate, getAllContents } from "../controllers/contentControllers.js";

const router = express();

router.post("/create",authMiddleware,contentCreate);
router.get("/get-contents",authMiddleware,getAllContents);


export default router;