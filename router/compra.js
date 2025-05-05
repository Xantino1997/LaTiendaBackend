// routes/compra.js
const express = require("express");
const router = express.Router();
const {
  getCompraPorCodigo,
  cancelarCompra,
  crearCompra,
  getComprasPorNombreColeccion
} = require("../controllers/compraController");

router.post("/", crearCompra);

// Ruta para obtener compra por código de seguimiento
router.get("/:codigoSeguimiento", getCompraPorCodigo); // Esto está bien como está

// Ruta para cancelar compra
router.put("/cancelar/:codigoSeguimiento", cancelarCompra); // También está bien


// Ruta dinámica para obtener compras por nombre de colección
router.get("/proveedor/:nombreColeccion", getComprasPorNombreColeccion);


module.exports = router;
