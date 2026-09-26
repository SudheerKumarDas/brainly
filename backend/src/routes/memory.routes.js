import express from "express";

import authMiddleware from "../middlewares/user.middlewares.js";
import { createMemory, deleteMemory, getMemory, getAllMemories, updateMemory, toogleFavorite, toogleArchived, restoreMemory, deleteMemoryPermanently, getDeletedMemories } from "../controllers/memory.controllers.js";

const router = express();

router.post("/",authMiddleware,createMemory);
router.get("/",authMiddleware,getAllMemories);
router.get("/trash",authMiddleware,getDeletedMemories);
router.get("/:id",authMiddleware,getMemory);
router.patch("/:id",authMiddleware,updateMemory);
router.delete("/:id",authMiddleware,deleteMemory);
router.patch("/:id/fovorite",authMiddleware,toogleFavorite);
router.patch("/:id/archived",authMiddleware,toogleArchived);
router.patch("/:id/restore",authMiddleware,restoreMemory);
router.delete("/:id/permanent",authMiddleware,deleteMemoryPermanently);


export default router;