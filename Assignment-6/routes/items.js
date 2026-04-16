const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');

// Get all items (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, condition, search, page = 1, limit = 12 } = req.query;
    
    let filter = { status: 'Available' };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (condition) {
      filter.condition = condition;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const items = await Item.find(filter)
      .populate('seller', 'name phone email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Item.countDocuments(filter);

    res.json({
      items,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get item by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('seller', 'name phone email address city');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Increment views
    item.views += 1;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create item (seller)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, price, originalPrice, condition, location, seller } = req.body;

    const item = new Item({
      title,
      description,
      category,
      price,
      originalPrice,
      condition,
      location,
      seller,
      images: [] // Will be handled by frontend for simplicity
    });

    await item.save();

    res.status(201).json({
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update item (seller)
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, price, condition, location, status } = req.body;
    
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { title, description, category, price, condition, location, status, updatedAt: Date.now() },
      { new: true }
    );

    res.json({
      message: 'Item updated successfully',
      item
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete item (seller)
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured items
router.get('/featured/items', async (req, res) => {
  try {
    const items = await Item.find({ featured: true, status: 'Available' })
      .populate('seller', 'name')
      .limit(6);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get seller items
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const items = await Item.find({ seller: req.params.sellerId })
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
