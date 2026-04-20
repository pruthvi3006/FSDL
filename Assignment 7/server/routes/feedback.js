const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch feedback' });
  }
});

router.post('/', async (req, res) => {
  const { studentName, course, instructor, rating, comment } = req.body;

  if (!studentName || !course || !instructor || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const feedback = new Feedback({ studentName, course, instructor, rating, comment });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Unable to save feedback' });
  }
});

module.exports = router;
