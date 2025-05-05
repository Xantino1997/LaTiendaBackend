const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const Cliente = require("../models/Cliente");

const { registrarCliente } = require("../controllers/clienteController");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde guardar las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
  },
});

const upload = multer({ storage });

// 🚀 Ruta para registrar proveedor con imagen
router.post("/registrar", upload.single("imagen"), registrarCliente);


router.get("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (err) {
    console.error("Error al buscar proveedor:", err);
    res.status(500).json({ message: "Error al obtener proveedor" });
  }
});

module.exports = router;
