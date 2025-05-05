const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error al obtener el producto por ID:", err);
    res.status(500).json({ error: "Error al obtener producto por ID" });
  }
};


// POST add new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Error al crear producto" });
  }
};


// productCtrl.js
exports.updateStock = async (req, res) => {
  try {
    const { cantidadComprada } = req.body;
    const cantidad = parseInt(cantidadComprada);
    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: "Cantidad inválida" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (cantidad > product.quantity) {
      return res.status(400).json({ error: "No hay suficiente stock disponible" });
    }

    product.quantity -= cantidad;
    await product.save();

    res.json({
      message: "Stock actualizado correctamente",
      nombre: product.name,
      stock: product.quantity,
    });
  } catch (err) {
    console.error("Error en updateStock:", err);
    res.status(500).json({ error: "Error al actualizar el stock" });
  }
};


// PUT update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Si en el body viene quantity y es mayor a 0, sumarlo correctamente como número
    if (req.body.quantity && Number(req.body.quantity) > 0) {
      req.body.quantity = Number(product.quantity) + Number(req.body.quantity);
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error al actualizar producto" });
  }
};


// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
