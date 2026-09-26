import express from "express";

import { userDetails, userLogin, userLogout, userRegister } from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/user.middlewares.js";

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/me",authMiddleware,userDetails);
router.post("/logout",authMiddleware,userLogout);

export default router;