import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './QAPage.css';

const QAPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);
  const [answerCategory, setAnswerCategory] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [userEmail, setUserEmail] = useState(''); // User enters their email
  const [businessId, setBusinessId] = useState(''); // User enters businessId

  const categories = [
    'Ice Cream Parlor', 'Clothing Store', 'Shoe Store', 'Fruit Vendor', 'Pharmacy',
    'Pet Shop', 'Electrical Appliances', 'Bakery', 'Sweet Shop', 'Gym', 'Spice Shop',
    'Auto Parts Shop', 'Toy Shop', 'Photo Studio', 'Tea Stall', 'Stationery Shop',
    'Optician', 'Vegetable Vendor', 'Bookstore', 'Cyber Cafe', 'Tailor Shop',
    'Dry Cleaning Service', 'Hair Salon', 'Furniture Store', 'Grocery Store',
    'Flower Shop', 'Street Food Vendor', 'Jewelry Store', 'Tech Shop', 'Mobile Repair Shop'
  ];

  // Fetch questions from the backend
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/qa/questions');
      setQuestions(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred while fetching questions.');
    }
  }, []);

  // Fetch questions when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Handle posting a new question
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !selectedCategory || (!businessId && !userEmail)) {
      setError('Please fill all fields: question, category, and either business ID or email.');
      return;
    }

    const payload = {
      businessId, // Optional
      question: newQuestion,
      userEmail, // Optional
      category: selectedCategory,
    };

    console.log('Request Payload:', payload); // Log the payload

    try {
      const response = await axios.post('http://localhost:4000/api/qa/questions', payload);
      setQuestions([response.data, ...questions]); // Add the new question to the list
      setNewQuestion(''); // Clear the input field
      setSelectedCategory(''); // Reset the category dropdown
      setUserEmail(''); // Clear the email field
      setBusinessId(''); // Clear the businessId field
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error posting question:', error.response ? error.response.data : error); // Log the error
      setError(error.response ? error.response.data.error : 'An error occurred while posting the question.');
    }
  };

  // Handle posting a new answer
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || !selectedQuestionId || !userEmail) {
      setError('Please enter an answer, select a question, and provide your email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/qa/answers', {
        questionId: selectedQuestionId,
        answer: answer,
        userEmail, // User enters email
      });

      // Update the questions list with the new answer
      const updatedQuestions = questions.map((question) =>
        question._id === selectedQuestionId
          ? { ...question, answers: [...question.answers, response.data] }
          : question
      );

      setQuestions(updatedQuestions);
      setAnswer(''); // Clear the answer input field
      setSelectedQuestionId(null); // Reset the selected question
      setUserEmail(''); // Clear the email field
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred while posting the answer.');
    }
  };

  // Filter questions based on the selected category
  const filteredQuestions = answerCategory
    ? questions.filter((question) => question.category === answerCategory)
    : questions;

  return (
    <div className="qa-page-container">
      <h2>Q&A</h2>

      <div className="qa-sections">
        {/* Left Section: Questions */}
        <div className="questions-section">
          <h3>Ask a Question</h3>
          <form onSubmit={handleQuestionSubmit}>
            <input
              type="text"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              placeholder="Enter Business ID (optional)"
            />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email (optional)"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter your question..."
              required
            />
            <button type="submit">Post Question</button>
          </form>

          <div className="questions-list">
            {filteredQuestions.map((question) => (
              <div key={question._id} className="question-item">
                <h4>{question.question}</h4>
                <p>
                  Asked by: {question.userEmail || question.businessId} on{' '}
                  {new Date(question.createdAt).toLocaleString()}
                </p>
                <p>Category: {question.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Answers */}
        <div className="answers-section">
          <h3>Answer Questions</h3>
          <select
            value={answerCategory}
            onChange={(e) => setAnswerCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="answers-list">
            {filteredQuestions.map((question) => (
              <div key={question._id} className="question-item">
                <h4>{question.question}</h4>
                <p>
                  Asked by: {question.userEmail || question.businessId} on{' '}
                  {new Date(question.createdAt).toLocaleString()}
                </p>
                <p>Category: {question.category}</p>

                <div className="answers-list">
                  {question.answers.map((answer) => (
                    <div key={answer._id} className="answer-item">
                      <p>{answer.answer}</p>
                      <p>
                        Answered by: {answer.userEmail} on{' '}
                        {new Date(answer.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <textarea
                  value={selectedQuestionId === question._id ? answer : ''}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                />
                <button
                  onClick={() => {
                    setSelectedQuestionId(question._id);
                    handleAnswerSubmit();
                  }}
                >
                  Post Answer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default QAPage;