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

// Enable CORS
app.use(cors());

// Define the API endpoint to serve data from MongoDB
app.get('/api/products', async (req, res) => {
  try {
    // Fetch all products from the 'products' collection
    const products = await Product.find({});
    
    // Create the unique list of categories from the fetched data
    const categories = ['all', ...new Set(products.map(product => product.category))];
    
    // Send both products and categories in the response
    res.json({ products, categories });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});