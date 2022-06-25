const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const { addPembayaran, getPembayaran } = require("../controllers/pembayaran");
const { getAllRegistrasi, getRegistrasi, addRegistrasi, deleteRegistrasi, getRegistrasiById, updateRegistrasi } = require("../controllers/registrasi");
const { getUserById } = require("../controllers/user");
const { auth } = require("../middlewares/checkAuth");
const { uploadFile } = require("../middlewares/uploadImage");
const router = express.Router();

//auth
router.post("/register", register);
router.post("/login", login);

//checkAuth
router.get("/check-auth", auth, checkAuth,);


//registrasi
router.get("/registrasi/all", getAllRegistrasi)
router.get("/registrasi", getRegistrasi)
router.get("/registrasi/:id",getRegistrasiById)
router.post("/registrasi/add", addRegistrasi)
router.delete("/registrasi/:id",  deleteRegistrasi)
router.patch("/registrasi/:id", updateRegistrasi)


//user 
router.get("/user/:id", checkAuth, getUserById)

//pembayaran 
router.post("/pembayaran", uploadFile("bukti_pembayaran") , addPembayaran)
router.get("/pembayaran",  getPembayaran)




module.exports = router;

