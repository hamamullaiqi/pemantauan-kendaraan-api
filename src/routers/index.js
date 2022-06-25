const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const { addPembayaran, getPembayaran, updatePembayaran, acceptPembayaran, deletePembayaran } = require("../controllers/pembayaran");
const { getAllRegistrasi, getRegistrasi, addRegistrasi, deleteRegistrasi, getRegistrasiById, updateRegistrasi } = require("../controllers/registrasi");
const { getUserById, getUsers, updateUser } = require("../controllers/user");
const { auth } = require("../middlewares/checkAuth");
const { uploadFile } = require("../middlewares/uploadImage");
const router = express.Router();

//auth
router.post("/register", register);
router.post("/login", login);

//checkAuth
router.get("/check-auth", auth, checkAuth);

//Pembayaran
router.post(
    "/add-pembayarans",
    uploadFile("bukti_pembayaran"),
    auth,
    addPembayaran
);

//registrasi
router.get("/registrasi/all", getAllRegistrasi)
router.get("/registrasi", getRegistrasi)
router.get("/registrasi/:id", getRegistrasiById)
router.post("/registrasi/add", addRegistrasi)
router.delete("/registrasi/:id", deleteRegistrasi)
router.patch("/registrasi/:id", updateRegistrasi)

//user
router.get("/user/:id", auth, getUserById);
router.get("/data-users/all", auth, getUsers);
router.patch("/edit-user/:id", uploadFile("image"), auth, updateUser);

//pembayaran 
router.post("/pembayaran", uploadFile("bukti_pembayaran"), addPembayaran)
router.get("/pembayaran", getPembayaran)
router.patch("/pembayaran/:id", uploadFile("bukti_pembayaran"), updatePembayaran)
router.patch("/pembayaran/accept/:id",  acceptPembayaran)
router.delete("/pembayaran/:id", deletePembayaran)





module.exports = router;
