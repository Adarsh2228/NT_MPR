const express = require('express');
const qaController = require('../controllers/qaController');
const router = express.Router();

// Routes
router.get('/questions', qaController.getQuestions); // Get all questions
router.post('/questions', qaController.postQuestion); // Post a new question
router.post('/answers', qaController.postAnswer); // Post a new answer

module.exports = router;