

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Register.css'; // Importing the CSS file for styling

// const Register = () => {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     password: '',
//     username: '', // Add username to state
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const register = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/users/register', user);
//       console.log(response.data);
//       alert('User created successfully');
//       navigate('/login'); // Redirect to login page after successful registration
//     } catch (error) {
//       console.error('Registration error:', error);
//       const message = error.response?.data?.message || 'Error creating user';
//       alert(message); // Show the error message returned by the server
//     }
//   };

//   const navigateToLogin = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="input-container">
//           <label>Name:</label>
//           <input type="text" name="name" value={user.name} onChange={handleChange} required />
//         </div>
//         <div className="input-container">
//           <label>Email:</label>
//           <input type="email" name="email" value={user.email} onChange={handleChange} required />
//         </div>
//         <div className="input-container">
//           <label>Password:</label>
//           <input type="password" name="password" value={user.password} onChange={handleChange} required />
//         </div>
//         <div className="input-container">
//           <label>Username:</label> {/* New input for username */}
//           <input type="text" name="username" value={user.username} onChange={handleChange} required />
//         </div>
//         <button type="button" onClick={register}>Register</button>
//         <button type="button" onClick={navigateToLogin}>Go to Login</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Importing the CSS file for styling

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError(''); // Clear error on input change
  };

  // Handle registration
  const register = async () => {
    if (!user.name || !user.email || !user.password || !user.username) {
      setError('All fields are required');
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/register',
        user
      );

      // Show success message and redirect to login
      alert(`Registration successful! Your user code: ${response.data.userCode}`);
      navigate('/login');
    } catch (error) {
      // Handle errors
      const message =
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.';
      setError(message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Navigate to login page
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
        </div>

        {/* Display error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Register button with loading state */}
        <button
          type="button"
          onClick={register}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Go to Login button */}
        <button type="button" onClick={navigateToLogin}>
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default Register;