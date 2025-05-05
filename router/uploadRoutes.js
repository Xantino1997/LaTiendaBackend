const express = require("express");
const router = express.Router();
const { upload } = require("../utils/Cloudinary");

router.post("/", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No se recibió ninguna imagen" });
      }
  
      console.log("Archivo recibido:", req.file);
  
      return res.json({ url: req.file.secure_url });
    } catch (err) {
      console.error("Error al subir imagen:", err); // <--- esto te dará el error detallado
      return res.status(500).json({ error: "Error al subir imagen", details: err.message });
    }
  });
  

module.exports = router;

