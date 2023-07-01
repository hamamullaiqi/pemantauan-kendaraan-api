import express, { Router } from "express";
import { checkAuth } from "./middlewares/checkAuth.js";
import { uploadFile } from "./middlewares/uploadImage.js";
import { login, register, resfreshAuth } from "./controllers/auth.js";
import {
    getUserById,
    getUsers,
    getUsersAll,
    deleteUser,
    addUser,
    updateUser,
} from "./controllers/user.js";
import produkCtrl from "./controllers/produk.js";
const router = Router();

//auth
router.post("/register", register);
router.post("/login", login);

//checkAuth
router.get("/check-auth", checkAuth, resfreshAuth);

//user
router.get("/user/:id", getUserById);
router.get("/data-users/all", getUsers);
router.get("/users", getUsersAll);
router.post("/user/add", addUser);
router.delete("/user/:id", deleteUser);
router.patch("/edit-user/:id", uploadFile("image"), updateUser);

router.use("/produk", produkCtrl);

export default router;
