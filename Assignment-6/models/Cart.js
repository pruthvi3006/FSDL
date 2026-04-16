const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Cart', cartSchema);
