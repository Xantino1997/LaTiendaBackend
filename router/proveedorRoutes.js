const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Proveedor = require("../models/Proveedor");
const { registrarProveedor } = require("../controllers/proveedorController");

// 📦 Configuración de Multer para subir imágenes
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
router.post("/registrar", upload.single("imagen"), registrarProveedor);

// 📥 Ruta para obtener proveedor por ID
router.get("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (err) {
    console.error("Error al buscar proveedor:", err);
    res.status(500).json({ message: "Error al obtener proveedor" });
  }
});
// 📃 Ruta para obtener todos los proveedores
router.get("/", async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores); // Devolvés un array
  } catch (err) {
    console.error("Error al obtener proveedores:", err);
    res.status(500).json({ message: "Error al obtener proveedores" });
  }
});

module.exports = router;
