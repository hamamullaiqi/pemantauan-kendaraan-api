const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const { auth } = require("../middlewares/checkAuth");
const router = express.Router();

//auth
router.post("/register", register);
router.post("/login", login);

//checkAuth
router.get("/check-auth",  checkAuth, auth);


module.exports = router;

