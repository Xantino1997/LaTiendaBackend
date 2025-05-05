const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  correoRecuperacion: { type: String },
  imagen: { type: String },
  telefono: { type: String, default: "No colocado" },
  gustos: [String],
  role: { type: String, default: "cliente" }
});

module.exports = mongoose.model("Cliente", clienteSchema);

 
