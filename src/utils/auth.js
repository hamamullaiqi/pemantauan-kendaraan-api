import { Router } from "express";
import { login, register, resfreshAuth } from "../controllers/auth";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();
//auth
router.post("/register", register);
router.post("/login", login);

//checkAuth
router.get("/isMe", checkAuth, resfreshAuth);

export default router;
