import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './QAPage.css'; // Import a CSS file for styling

const QAPage = () => {
  // Static list of categories
  const categories = [
    "Ice Cream Parlor",
    "Clothing Store",
    "Shoe Store",
    "Fruit Vendor",
    "Pharmacy",
    "Pet Shop",
    "Electrical Appliances",
    "Bakery",
    "Sweet Shop",
    "Gym",
    "Spice Shop",
    "Auto Parts Shop",
    "Toy Shop",
    "Photo Studio",
    "Tea Stall",
    "Stationery Shop",
    "Optician",
    "Vegetable Vendor",
    "Bookstore",
    "Cyber Cafe",
    "Tailor Shop",
    "Dry Cleaning Service",
    "Hair Salon",
    "Furniture Store",
    "Grocery Store",
    "Flower Shop",
    "Street Food Vendor",
    "Jewelry Store",
    "Tech Shop",
    "Mobile Repair Shop"
  ];

  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category from dropdown
  const [questions, setQuestions] = useState([]); // Stores questions for the selected category
  const [selectedQuestion, setSelectedQuestion] = useState(''); // Selected question for answering
  const [answers, setAnswers] = useState([]); // Stores answers for the selected question
  const [userEmail, setUserEmail] = useState(''); // User's email for posting questions/answers
  const [newQuestion, setNewQuestion] = useState(''); // Input for new question
  const [newAnswer, setNewAnswer] = useState(''); // Input for new answer
  const [mode, setMode] = useState('question'); // Toggle between 'question' and 'answer' mode

  // Fetch questions for the selected category
  useEffect(() => {
    if (selectedCategory) {
      axios.get(`/api/questions/${selectedCategory}`)
        .then(response => setQuestions(response.data))
        .catch(error => console.error('Error fetching questions:', error));
    }
  }, [selectedCategory]);

  // Fetch answers for the selected question
  useEffect(() => {
    if (selectedQuestion) {
      axios.get(`/api/answers/${selectedQuestion}`)
        .then(response => setAnswers(response.data))
        .catch(error => console.error('Error fetching answers:', error));
    }
  }, [selectedQuestion]);

  // Handle asking a new question
  const handleAskQuestion = () => {
    if (newQuestion && userEmail && selectedCategory) {
      axios.post('/api/questions', { content: newQuestion, category: selectedCategory, userEmail })
        .then(response => {
          setQuestions([...questions, response.data]); // Add the new question to the list
          setNewQuestion(''); // Clear the input field
        })
        .catch(error => console.error('Error posting question:', error));
    } else {
      alert('Please fill in all fields (email, category, and question).');
    }
  };

  // Handle posting a new answer
  const handleAnswerQuestion = () => {
    if (newAnswer && userEmail && selectedQuestion) {
      axios.post('/api/answers', { questionId: selectedQuestion, text: newAnswer, userEmail })
        .then(response => {
          setAnswers([...answers, response.data]); // Add the new answer to the list
          setNewAnswer(''); // Clear the input field
        })
        .catch(error => console.error('Error posting answer:', error));
    } else {
      alert('Please fill in all fields (email and answer).');
    }
  };

  return (
    <div className="qa-page">
      <h1>Q&A Page</h1>

      {/* Dropdowns and Mode Toggle */}
      <div className="controls">
        <div className="dropdown">
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="dropdown">
          <label>Select Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="question">Ask a Question</option>
            <option value="answer">Answer a Question</option>
          </select>
        </div>
      </div>

      {/* User Email Input */}
      <div className="email-input">
        <label>Your Email:</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      {/* Ask Question Section */}
      {mode === 'question' && selectedCategory && (
        <div className="ask-question">
          <label>Ask a Question:</label>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here"
            rows={4}
          />
          <button onClick={handleAskQuestion}>Ask</button>
        </div>
      )}

      {/* Answer Question Section */}
      {mode === 'answer' && selectedCategory && (
        <div className="answer-question">
          <h2>Questions in {selectedCategory}</h2>
          {questions.map(question => (
            <div key={question._id} className="question-item">
              <h3>{question.content}</h3>
              <p>Asked by: {question.userEmail}</p>

              {/* Answer Input for Each Question */}
              <div className="answer-input">
                <textarea
                  value={selectedQuestion === question._id ? newAnswer : ''}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Type your answer here"
                  rows={4}
                />
                <button onClick={() => {
                  setSelectedQuestion(question._id);
                  handleAnswerQuestion();
                }}>Answer</button>
              </div>

              {/* Display Answers for Each Question */}
              <div className="answers-list">
                <h4>Answers:</h4>
                {answers
                  .filter(answer => answer.questionId === question._id)
                  .map(answer => (
                    <div key={answer._id} className="answer-item">
                      <p>{answer.text}</p>
                      <p>Answered by: {answer.userEmail}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QAPage;