import express from "express";

import authMiddleware from "../middlewares/user.middlewares.js";
import { createMemory, deleteMemory, getMemory, getAllMemories, updateMemory, toogleFavorite } from "../controllers/memory.controllers.js";

const router = express();

router.post("/",authMiddleware,createMemory);
router.get("/",authMiddleware,getAllMemories);
router.get("/:id",authMiddleware,getMemory);
router.patch("/:id",authMiddleware,updateMemory);
router.delete("/:id",authMiddleware,deleteMemory);
router.patch("/:id/fovorite",authMiddleware,toogleFavorite);


export default router;