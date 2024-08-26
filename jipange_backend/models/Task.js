// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
