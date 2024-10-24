// Backend: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());


mongoose.connect( process.env.REACT_APP_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

// Rutas para productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));