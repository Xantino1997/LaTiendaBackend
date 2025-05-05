const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
  nombreEmpresa: String,
  precio: Number,
  numeroFiscal: String,
  contacto: String,
  correoRecuperacion: String,
  email: String,
  password: String,
  imagen: String,
  role: { type: String, default: 'proveedor' }, 
});

module.exports = mongoose.model("Proveedor", proveedorSchema);
