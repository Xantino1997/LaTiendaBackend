const User = require("../models/User");
// controllers/authController.js
const Proveedor = require("../models/Proveedor");
const Cliente = require("../models/Cliente");
const Operador = require("../models/Operador");
const Admin = require("../models/Admin"); // si tenés uno
const nodemailer = require("nodemailer");
require('dotenv').config();


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const colecciones = [
      { model: Admin, role: "admin" },
      { model: Proveedor, role: "proveedor" },
      { model: Cliente, role: "cliente" },
      { model: Operador, role: "operador" },
    ];

    for (let c of colecciones) {
      const user = await c.model.findOne({ email, password }); 
      if (user) {
        return res.json({
          message: "Login exitoso",
          userId: user._id,
          role: c.role,
        });
      }
    }

    res.status(401).json({ message: "Credenciales incorrectas" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
};




const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});


const registerUser = async (req, res) => {
  const { nombre, apellido, email, password, role } = req.body;

  if (!nombre || !apellido || !email || !password || !role) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "El usuario ya está registrado" });
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const codeExpires = Date.now() + 2 * 60 * 1000;

    const newUser = new User({
      nombre,
      apellido,
      email,
      password,
      role,
      verificationCode,
      codeExpires,
    });

    await newUser.save();

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 8px; background: #f9f9f9; text-align: center;">
        <h2 style="color: #333;">Verificación de cuenta</h2>
        <p style="font-size: 16px;">Hola <strong>${nombre}</strong>, usá el siguiente código para verificar tu cuenta:</p>
        <div style="font-size: 28px; background: #333 font-weight: bold; color: #007BFF; margin: 20px 0;">${verificationCode}</div>
        <p style="font-size: 14px; color: #999;">Este código expirará en 2 minutos.</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"Tienda Gali" <ala282016@gmail.com>',
      to: email,
      subject: "Código de Verificación",
      html: emailHTML,
    });

    res.status(201).json({ message: "Usuario registrado. Código enviado por correo." });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.verificationCode !== parseInt(code)) {
      return res.status(400).json({ message: "Código incorrecto" });
    }

    if (Date.now() > user.codeExpires) {
      return res.status(400).json({ message: "El código ha expirado" });
    }

    // Marcar como verificado
    user.verificado = true;
    user.verificationCode = null;
    user.codeExpires = null;
    await user.save();

    res.json({ message: "Código verificado correctamente" });
  } catch (error) {
    console.error("Error al verificar código:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


module.exports = { registerUser, loginUser,verifyCode };


