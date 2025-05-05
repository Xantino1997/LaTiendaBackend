const express = require("express");
const router = express.Router();
const { crearCompraCredito } = require("../controllers/compraCreditoController");

// Define la ruta relativa sin el prefijo "/compra-credito"
router.post("/", crearCompraCredito); // Usamos solo "/" aquí

module.exports = router;
