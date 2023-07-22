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
import vendorCtrl from "./controllers/vendor.js";
const router = Router();

//user
router.get("/user/:id", getUserById);
router.get("/data-users/all", getUsers);
router.get("/users", getUsersAll);
router.post("/user/add", addUser);
router.delete("/user/:id", deleteUser);
router.patch("/edit-user/:id", uploadFile("image"), updateUser);

router.use("/produk", produkCtrl);
router.use("/vendor", vendorCtrl);

export default router;
