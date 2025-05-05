const Proveedor = require("../models/Proveedor");

const registrarProveedor = async (req, res) => {
  try {
    const {
      nombreEmpresa,
      precio,
      numeroFiscal,
      contacto,
      correoRecuperacion,
      email,
      password,
      role,
    } = req.body;

    const imagen = req.file ? req.file.filename : null;

    const nuevoProveedor = new Proveedor({
      nombreEmpresa,
      precio,
      numeroFiscal,
      contacto,
      correoRecuperacion,
      email,
      password,
      imagen,
      role,
    });

    await nuevoProveedor.save();
    res.status(201).json({ mensaje: "Proveedor registrado correctamente" });
  } catch (error) {
    console.error("Error registrando proveedor:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = { registrarProveedor };
