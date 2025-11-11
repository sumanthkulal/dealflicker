const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Assuming you have defined a Mongoose Product model in a separate file, e.g., './models/Product.js'
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/dealfinder';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enable CORS for all routes
app.use(cors());

// Enable Express to parse JSON data from incoming requests
app.use(express.json());

/**
 * --- GET route to fetch all products and categories ---
 */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    const categories = ['all', ...new Set(products.map(product => product.category))];
    res.json({ products, categories });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * --- GET route to fetch a single product by ID ---
 */
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * --- POST route to handle new product creation ---
 */
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    console.error('Error saving new product:', error);
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
});

/**
 * --- PUT route to update a product by ID ---
 */
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});

/**
 * --- DELETE route to remove a product by ID ---
 */
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// Get all categories (from schema enum, not just existing products)
app.get("/api/categories", (req, res) => {
  try {
    const categories = Product.schema.path("category").enumValues; 
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
