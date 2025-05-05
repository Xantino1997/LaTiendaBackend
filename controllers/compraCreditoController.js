const CompraCredito = require("../models/compraCredito");
const mongoose = require("mongoose");

const crearCompraCredito = async (req, res) => {
  try {
    const compraData = req.body;

    // Guardar compra completa en comprasCredito
    const nuevaCompraCredito = new CompraCredito(compraData);
    await nuevaCompraCredito.save();

    // Obtener lista única de proveedores
    const proveedores = [
      ...new Set(compraData.productos.map((p) => p.proveedor)),
    ];

    // Recorrer cada proveedor
    for (const proveedor of proveedores) {
      // Filtrar productos de este proveedor
      const productosProveedor = compraData.productos.filter(
        (p) => p.proveedor === proveedor
      );

      // Calcular total de esos productos
      const totalProductos = productosProveedor.reduce((sum, item) => {
        const precio = Number(item.precioConDescuento) || 0;
        const cantidad = Number(item.cantidad) || 0;
        return sum + (precio * cantidad);
      }, 0);

      // Crear objeto de compra solo para este proveedor
      const compraProveedorData = {
        productos: productosProveedor,
        direccion: compraData.direccion,
        documento: compraData.documento,
        metodoPago: compraData.metodoPago,
        costoEnvio: compraData.costoEnvio, // Podrías repartirlo si querés
        totalFinal: totalProductos + (compraData.costoEnvio || 0),
        codigoSeguimiento: compraData.codigoSeguimiento,
        fecha: compraData.fecha,
      };

      // Crear modelo dinámico para esa colección
      const nombreColeccion = `compra${proveedor.replace(/\s+/g, "")}`;
      const CompraProveedor = mongoose.model(
        nombreColeccion,
        CompraCredito.schema, // Reutilizamos el mismo schema
        nombreColeccion
      );

      // Guardar compra de este proveedor
      const compraProveedor = new CompraProveedor(compraProveedorData);
      await compraProveedor.save();
    }

    res.status(201).json({ message: "Compra registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la compra" });
  }
};

module.exports = {
  crearCompraCredito,
};
