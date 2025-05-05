const express = require("express");
const router = express.Router();
const { registerUser, loginUser,verifyCode} = require("../controllers/authController");

// Ruta para registrar usuarios
router.post("/register", registerUser);
router.post("/verify-code", verifyCode); 

// Ruta para login
router.post("/login", loginUser);

module.exports = router;
