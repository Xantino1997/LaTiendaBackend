const Cliente = require("../models/Cliente");

const registrarCliente = async (req, res) => {
  try {
    const {
      nombreCompleto,
      dni,
      email,
      password,
      telefono,
      correoRecuperacion,
      gustos,
      role
    } = req.body;

    const imagen = req.file ? req.file.filename : null;

    const nuevoCliente = new Cliente({
      nombreCompleto,
      dni,
      email,
      password,
      telefono,
      correoRecuperacion,
      imagen,
      gustos: Array.isArray(gustos) ? gustos : [gustos],
      role
    });

    await nuevoCliente.save();
    res.status(201).json({ mensaje: "Cliente registrado correctamente" });
  } catch (error) {
    console.error("Error registrando cliente:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = { registrarCliente };
