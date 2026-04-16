const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Car', 'Bike', 'Electronics', 'Furniture', 'Clothing', 'Books', 'Other']
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number,
  condition: {
    type: String,
    enum: ['Like New', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  location: String,
  images: [String],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Pending'],
    default: 'Available'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
