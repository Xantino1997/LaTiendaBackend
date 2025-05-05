const express = require("express");
const router = express.Router();
const {
  getCompraPorCodigo,
  cancelarCompra,
} = require("../controllers/compraController");

router.get("/compra/:codigoSeguimiento", getCompraPorCodigo);
router.put("/compra/cancelar/:codigoSeguimiento", cancelarCompra);

module.exports = router;
