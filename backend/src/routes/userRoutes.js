import express from "express";

import { userDetails, userLogin, userLogout, userRegister } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/me",userDetails);
router.post("/logout",userLogout);

export default router;