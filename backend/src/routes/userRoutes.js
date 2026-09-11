import express from "express";

import { userDetails, userLogin, userRegister } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/me",userDetails);

export default router;