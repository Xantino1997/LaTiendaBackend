const mongoose = require("mongoose");

const operadorSchema = new mongoose.Schema({
  nombre: { type: String, default: "Operador de ejemplo" },
  apellido: { type: String, default: "Apellido Ejemplo" },
  email: { type: String, default: "operador@example.com" },
  password: { type: String, default: "1234" },
  telefono: { type: String, default: "123456789" },
  role: { type: String, default: "operador" }
});

module.exports = mongoose.model("Operador", operadorSchema);
