const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Product name must be at least 3 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a number greater than or equal to 0'],
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price must be a number greater than or equal to 0'],
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be a number between 0 and 5'],
    max: [5, 'Rating must be a number between 0 and 5'],
  },
  reviews: {
    type: Number,
    min: [0, 'Reviews must be a number greater than or equal to 0'],
  },
  image: {
    type: String,
    trim: true,
    required: [true, 'Image URL is required'],
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Category is required'],
    lowercase: true,
    enum: ["electronics", "home", "fitness","appliances","automotive","computers","mobile","home & kitchen","tools"],
  },
  platform: {
    type: String,
    trim: true,
    required: [true, 'Platform is required'],
    lowercase: true,
    enum: ["amazon", "flipkart", "ebay", "best buy"],
  },
  brand: {
    type: String,
    trim: true,
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
    required: [true, 'Amazon Link is required'],
  },
  youtubeLink: {
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