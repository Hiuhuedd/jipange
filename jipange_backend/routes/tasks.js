// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  const { goalId, title } = req.body;
  const newTask = new Task({ goalId, title });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a specific goal
router.get('/:goalId', async (req, res) => {
  const { goalId } = req.params;

  try {
    // Find all tasks with the given goalId
    const tasks = await Task.find({ goalId });

    // Return the tasks in the response
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a goal by ID
router.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedGoal = await Task.findByIdAndDelete(taskId);

    if (!deletedGoal) {
      return res.status(404).json({ error: 'task not found' });
    }

    res.json({ message: 'task deleted successfully', deletedGoal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task completion status
router.patch('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { completed } = req.body;

  try {
    // Find the task by ID and update its 'completed' status
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Return the updated task
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;


