const { default: fetch } = require('node-fetch'); 

const ACCESS_TOKEN = 'TOKEN_DE_VIUMI'; 

const createViumiPreference = async (req, res) => {
  try {
    const { amount, concept } = req.body;

    const body = JSON.stringify({
      amount,
      concept,
      callback_success: 'https://web.com/exito',
      callback_cancel: 'https://web.com/cancelado',
      metadata: { orderId: 'orden123' }
    });

    const response = await fetch('https://checkout.viumi.com.ar/api/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    res.status(200).json({ checkoutUrl: data.url });
  } catch (error) {
    console.error('Error creando checkout:', error.message);
    res.status(500).json({ message: 'Error creando checkout' });
  }
};

module.exports = { createViumiPreference };
