const Question = require('../models/qaModel');

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching questions.' });
  }
};

// Post a new question
exports.postQuestion = async (req, res) => {
  try {
    const { businessId, question, userEmail, category } = req.body;

    // Validate required fields
    if (!question || !category) {
      return res.status(400).json({ error: 'Question and category are required.' });
    }

    // Ensure at least one of businessId or userEmail is provided
    if (!businessId && !userEmail) {
      return res.status(400).json({ error: 'Either businessId or userEmail is required.' });
    }

    const newQuestion = new Question({ businessId, question, userEmail, category });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while posting the question.' });
  }
};

// Post a new answer
exports.postAnswer = async (req, res) => {
  try {
    const { questionId, answer, userEmail } = req.body;

    // Validate required fields
    if (!questionId || !answer || !userEmail) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    question.answers.push({ answer, userEmail });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while posting the answer.' });
  }
};