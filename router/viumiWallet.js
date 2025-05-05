// router/viumiWallet.js
const express = require("express");
const router = express.Router();
const { createViumiPreference } = require("../controllers/viumiController");

router.post("/create_preference", createViumiPreference);

module.exports = router;
