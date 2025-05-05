const Compra = require("../models/compra");

// Crear nueva compra
const crearCompra = async (req, res) => {
  try {
    const compraData = req.body;

    const nuevaCompra = new Compra(compraData);
    await nuevaCompra.save();

    res.status(201).json({ mensaje: "Compra creada con éxito", compra: nuevaCompra });
  } catch (error) {
    console.error("Error al guardar la compra:", error);
    res.status(500).json({ error: "Error al guardar la compra" });
  }
};

// Buscar compra por código de seguimiento
const getCompraPorCodigo = async (req, res) => {
  const { codigoSeguimiento } = req.params;

  try {
    const compra = await Compra.findOne({ codigoSeguimiento });

    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la compra" });
  }
};

// Cancelar compra
const cancelarCompra = async (req, res) => {
  const { codigoSeguimiento } = req.params;

  try {
    const compra = await Compra.findOneAndUpdate(
      { codigoSeguimiento },
      { estado: "cancelado" },
      { new: true }
    );

    if (!compra) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.json({ mensaje: "Compra cancelada con éxito", compra });
  } catch (error) {
    res.status(500).json({ error: "Error al cancelar la compra" });
  }
};

const mongoose = require("mongoose");

const getComprasPorNombreColeccion = async (req, res) => {
  const { nombreColeccion } = req.params;

  try {
    // Verificamos si ya existe el modelo en mongoose para evitar error
    const modelName = `compra_${nombreColeccion}`;
    const CompraDinamica =
      mongoose.models[modelName] ||
      mongoose.model(
        modelName,
        new mongoose.Schema(
          {
            codigoSeguimiento: String,
            estado: String,
            productos: Array,
            cliente: String,
            fecha: Date,
          },
          { collection: nombreColeccion } // Esto apunta a la colección real de Mongo
        )
      );

    const compras = await CompraDinamica.find();

    res.json(compras);
  } catch (error) {
    console.error("❌ Error al obtener compras dinámicas:", error);
    res.status(500).json({ error: "No se pudieron obtener las compras del proveedor" });
  }
};


module.exports = {
  crearCompra,
  getCompraPorCodigo,
  cancelarCompra,
  getComprasPorNombreColeccion,
};
