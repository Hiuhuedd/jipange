// routes/goals.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Create a new goal
router.post('/', async (req, res) => {
  const { userId, title, description } = req.body;
  const newGoal = new Goal({ userId, title, description });

  try {
    const savedGoal = await newGoal.save();
    res.json(savedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all goals for a user
router.get('/:userId', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId }).populate('tasks');
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
