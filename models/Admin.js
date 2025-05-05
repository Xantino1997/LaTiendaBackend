const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nombre: { type: String, default: "Admin" },
  apellido: { type: String, default: "Principal" },
  email: { type: String, default: "admin@example.com" },
  password: { type: String, default: "adminpass" },
  role: { type: String, default: "admin" }
});

module.exports = mongoose.model("Admin", adminSchema);
