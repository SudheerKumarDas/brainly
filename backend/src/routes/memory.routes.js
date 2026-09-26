import express from "express";

import authMiddleware from "../middlewares/user.middlewares.js";
import { createMemory, deleteMemory, getMemory, getAllMemories, updateMemory } from "../controllers/memory.controllers.js";

const router = express();

router.post("/",authMiddleware,createMemory);
router.get("/",authMiddleware,getAllMemories);
router.get("/:id",authMiddleware,getMemory);
router.patch("/:id",authMiddleware,updateMemory);
router.delete("/:id",authMiddleware,deleteMemory);


export default router;