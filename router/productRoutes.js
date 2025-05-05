const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");

router.get("/", productCtrl.getProducts);
router.get("/:id", productCtrl.getProductById);
router.post("/", productCtrl.createProduct);

// 🔁 Primero las rutas específicas
router.put("/update-stock/:id", productCtrl.updateStock);

// 🟡 Después las genéricas
router.put("/:id", productCtrl.updateProduct);
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
