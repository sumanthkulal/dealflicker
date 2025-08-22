const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Rely on MongoDB's default _id for a unique identifier
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  // Make originalPrice optional, as it is only needed for discounted products
  originalPrice: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    min: 0,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: ["electronics", "home", "fitness"],
  },
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  amazonLink: {
    type: String,
    trim: true,
  },
  badge: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;