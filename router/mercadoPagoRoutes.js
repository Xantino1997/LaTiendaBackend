const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
require('dotenv').config();


// produccion

mercadopago.configure({
  access_token: 'APP_USR-2932034330459248-043008-33bddc32f40eb62a21feaa4db97acbe8-1523040829',
});


router.post("/create_preference", async (req, res) => {
  try {
    const { items } = req.body;

    const preference = {
      items,
      back_urls: {
        success: "https://la-tienda-sooty.vercel.app/pago",
        failure: "https://la-tienda-sooty.vercel.app/pago/failure",
        pending: "https://la-tienda-sooty.vercel.app/pago/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: "Error al crear preferencia" });
  }
});

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const mercadopago = require("mercadopago");
// require('dotenv').config();
// const fetch = require("node-fetch");
// const { updateStock } = require("../controllers/productController"); // Importamos la función para actualizar el stock
// const crypto = require('crypto');

// // Configuración de Mercado Pago con el access token de producción
// mercadopago.configure({
//   access_token: process.env.Token_MP,
// });

// // Ruta para crear la preferencia de pago
// router.post("/create_preference", async (req, res) => {
//   try {
//     const { items } = req.body;

//     const preference = {
//       items,
//       back_urls: {
//         success: "https://www.jw.org/es/success",
//         failure: "https://www.jw.org/es/failure",
//         pending: "https://www.jw.org/es/pending",
//       },
//       auto_return: "approved",
//       notification_url: "https://7d83-181-5-208-156.ngrok-free.app/api/mercadopago/webhook", // URL para el Webhook
//     };

//     const response = await mercadopago.preferences.create(preference);
//     res.status(200).json({ init_point: response.body.init_point });
//   } catch (error) {
//     console.error("Error al crear preferencia:", error);
//     res.status(500).json({ error: "Error al crear preferencia" });
//   }
// });


// router.post("/create_preference", async (req, res) => {
//   try {
//     const { items } = req.body;

//     const preference = {
//       items,
//       back_urls: {
//         success: "https://www.jw.org/es/success",
//         failure: "https://www.jw.org/es/failure",
//         pending: "https://www.jw.org/es/pending",
//       },
//       auto_return: "approved",
//     };

//     const response = await mercadopago.preferences.create(preference);
//     res.status(200).json({ init_point: response.body.init_point });
//   } catch (error) {
//     console.error("Error al crear preferencia:", error);
//     res.status(500).json({ error: "Error al crear preferencia" });
//   }
// });

// module.exports = router;
