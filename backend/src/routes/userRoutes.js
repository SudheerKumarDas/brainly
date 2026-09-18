import express from "express";

import { userDetails, userLogin, userLogout, userRegister } from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/userMiddlewares.js";

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/me",authMiddleware,userDetails);
router.post("/logout",authMiddleware,userLogout);

export default router;