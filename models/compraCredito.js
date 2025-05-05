const mongoose = require("mongoose");

const compraCreditoSchema = new mongoose.Schema({
  name: String,
  direccion: String,
  documento: String,
  metodoPago: String,
  cantidad: Number,
  productos: [
    {
      name: String,
      proveedor: String,
      precioUnitario: Number,
      discount: Number,
      quantity: Number,
      image: String,
      cantidad: Number,
    }
  ],
  costoEnvio: Number,
  totalFinalConEnvio: Number,
  codigoSeguimiento: String,
  fecha: Date,
});

module.exports = mongoose.model("CompraCredito", compraCreditoSchema);
