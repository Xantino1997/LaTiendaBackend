const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  proveedor: String,
  cantidad: Number,
});

const CompraSchema = new mongoose.Schema({
  codigoSeguimiento: {
    type: String,
    required: true,
    unique: true,
  },
  productos: [ProductoSchema],
  direccion: String,
  documento: String,
  telefono: String,
  metodoPago: String,
  costoEnvio: Number,
  totalFinal: Number,
  precioUnitario: Number,
  proveedor: String,
  cantidad: Number,
  estado: {
    type: String,
    default: "Proceso", // o "enviado", "cancelado"
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Compra", CompraSchema);
