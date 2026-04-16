const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// Get cart for user
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId })
      .populate('items.item');
    
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/add/:userId', async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    const userId = req.params.userId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.item.toString() === itemId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }

    // Calculate total
    const populatedCart = await cart.populate('items.item');
    cart.totalPrice = populatedCart.items.reduce((total, item) => {
      return total + (item.item.price * item.quantity);
    }, 0);

    await cart.save();
    res.json({
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:userId/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.item.toString() !== req.params.itemId);

    await cart.save();
    res.json({
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.params.userId },
      { items: [], totalPrice: 0 },
      { new: true }
    );

    res.json({
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
