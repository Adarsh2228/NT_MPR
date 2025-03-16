

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Import components
// import Register from './components/Register';
// import Login from './components/Login';
// import BusinessRegistration from './components/BusinessRegistration';
// import BusinessProfile from './components/BusinessProfile';
// import BusinessPromotion from './components/BusinessPromotion';
// import BusinessSearch from './components/BusinessSearch';
<<<<<<< HEAD
// import ChatPage from './components/ChatPage'; 
// import QAPage from '../src/components/qapages/QAPage'; 
=======
// import ChatPage from './components/ChatPage';
// import ChatRequestsPage from './components/ChatRequests'; // New component for chat requests
// // import QAPage from '../src/components/qapages/QAPage';
>>>>>>> 022ac89 (ADARSH_ commit)

// function App() {
//   const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId') || null);
//   const [userEmail, setUserEmail] = useState('');

//   const handleLogin = (userId, email) => {
//     localStorage.setItem('userId', userId);
//     setCurrentUserId(userId);
//     setUserEmail(email);
//   };

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setCurrentUserId(storedUserId);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login onLogin={handleLogin} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/business/register" element={<BusinessRegistration />} />
//         <Route path="/business/search" element={<BusinessSearch />} />
//         <Route path="/business/:id" element={<BusinessProfile loggedInUserId={currentUserId} />} />
//         <Route path="/business/promotion/:id" element={<BusinessPromotion />} />
<<<<<<< HEAD
//         <Route path="/qa" element={<QAPage userEmail={userEmail} />} />
//         <Route path="/chat/:businessId" element={<ChatPage loggedInUserId={currentUserId} />} /> 
=======
        
//         <Route path="/chat/:businessId/:userId" element={<ChatPage loggedInUserId={currentUserId} />} />
//         {/* New route for chat requests */}
//         <Route path="/business/:businessId/chat-requests" element={<ChatRequestsPage loggedInUserId={currentUserId} />} />
>>>>>>> 022ac89 (ADARSH_ commit)
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




<<<<<<< HEAD
=======

>>>>>>> 022ac89 (ADARSH_ commit)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Register from './components/Register';
import Login from './components/Login';
import BusinessRegistration from './components/BusinessRegistration';
import BusinessProfile from './components/BusinessProfile';
import BusinessPromotion from './components/BusinessPromotion';
import BusinessSearch from './components/BusinessSearch';
import ChatPage from './components/ChatPage';
import ChatRequestsPage from './components/ChatRequests'; // New component for chat requests
<<<<<<< HEAD
import QAPage from '../src/components/qapages/QAPage';
=======
import QAPage from './components/QAPages'; // Import the QAPage component
>>>>>>> 022ac89 (ADARSH_ commit)

function App() {
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId') || null);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (userId, email) => {
    localStorage.setItem('userId', userId);
    setCurrentUserId(userId);
    setUserEmail(email);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setCurrentUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/business/register" element={<BusinessRegistration />} />
        <Route path="/business/search" element={<BusinessSearch />} />
<<<<<<< HEAD
        <Route path="/business/:id" element={<BusinessProfile loggedInUserId={currentUserId} />} />
        <Route path="/business/promotion/:id" element={<BusinessPromotion />} />
        <Route path="/qa" element={<QAPage userEmail={userEmail} />} />
        <Route path="/chat/:businessId/:userId" element={<ChatPage loggedInUserId={currentUserId} />} />
        {/* New route for chat requests */}
        <Route path="/business/:businessId/chat-requests" element={<ChatRequestsPage loggedInUserId={currentUserId} />} />
=======
        <Route
          path="/business/:id"
          element={<BusinessProfile loggedInUserId={currentUserId} />}
        />
        <Route path="/business/promotion/:id" element={<BusinessPromotion />} />
        <Route
          path="/chat/:businessId/:userId"
          element={<ChatPage loggedInUserId={currentUserId} />}
        />
        {/* New route for chat requests */}
        <Route
          path="/business/:businessId/chat-requests"
          element={<ChatRequestsPage loggedInUserId={currentUserId} />}
        />
        {/* New route for Q&A page */}
        <Route
          path="/business/:businessId/qa"
          element={<QAPage loggedInUserId={currentUserId} />}
        />
>>>>>>> 022ac89 (ADARSH_ commit)
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;