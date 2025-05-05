const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ala282016:Gali282016*@cluster0.8xzv1tn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado el servidor");
  } catch (err) {
    console.error("Error al conectar DB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
