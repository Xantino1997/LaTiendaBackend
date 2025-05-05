
// ✅ index.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();
const fs = require("fs");
app.use("/uploads", express.static("uploads"));

// Crear carpeta uploads si no existe
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use("./uploads", express.static(path.join(__dirname, "uploads"))); // para servir imágenes

// Rutas

app.get("/test", (req, res) => {
  res.send("¡La ruta /test funciona correctamente por fin!");
});

const mercadoPagoRoutes = require("./router/mercadoPagoRoutes");
app.use("/api/mercadopago", mercadoPagoRoutes);


const viumiRoutes = require("./router/viumiWallet");
app.use("/api/viumi", viumiRoutes);


const proveedorRoutes = require("./router/proveedorRoutes");
app.use("/api/proveedor", proveedorRoutes);

const compraCreditoRoutes = require("./router/compraCreditoRoutes");
app.use("/api/compra-credito", compraCreditoRoutes);

const clienteRoutes = require("./router/clienteRoutes");
app.use("/api/cliente", clienteRoutes);  // Solo clientes

const compraRoutes = require("./router/compra");
app.use("/api/compra", compraRoutes);   // Solo compras generales

app.use("/api/products", require("./router/productRoutes"));


const authRoutes = require("./router/authRoutes"); 

app.use("/api/auth", authRoutes);


// Para servir archivos estáticos (como imágenes subidas)
app.use("./uploads", express.static(path.join(__dirname, "uploads")));

// Ruta de carga de imágenes
const uploadRoute = require("./router/upload");
app.use("/api/upload", uploadRoute);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app
