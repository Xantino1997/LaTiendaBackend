const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI, {
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
