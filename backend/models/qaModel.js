const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  userEmail: { type: String, required: true }, // Only userEmail is required
  createdAt: { type: Date, default: Date.now }, // Automatically generated
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  businessId: { type: String }, // Optional
  userEmail: { type: String }, // Optional
  category: { type: String, required: true },
  answers: [answerSchema],
  createdAt: { type: Date, default: Date.now }, // Automatically generated
});

module.exports = mongoose.model('Question', questionSchema);