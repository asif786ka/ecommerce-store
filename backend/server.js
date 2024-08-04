const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to get products from RapidAPI
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://aliexpress-datahub.p.rapidapi.com/products', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Endpoint to get a single product by ID from RapidAPI
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://aliexpress-datahub.p.rapidapi.com/products/${id}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// Endpoint to create Razorpay order
app.post('/api/razorpay/order', async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
      notes,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Endpoint to verify Razorpay payment signature
app.post('/api/razorpay/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');
  if (generatedSignature === razorpay_signature) {
    res.json({ message: 'Payment verification successful' });
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
