const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["cliente", "proveedor"], default: "cliente" },
  verificationCode: { type: Number },
  codeExpires: { type: Number },
  verificado: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
