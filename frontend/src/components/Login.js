import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', user);
      
      console.log(response.data); // Log the response data to check the structure

      if (response.data && response.data.token) {
        // Set success message
        setSuccessMessage('Let\'s Go!');

        // Store token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id); // Store user ID

        onLogin(response.data.user.id); // Call onLogin function passed as prop

        // Redirect after a short delay to allow the message to be displayed
        setTimeout(() => {
          navigate('/business/search');
        }, 2000); // Delay for 2 seconds
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button type="button" onClick={login}>Login</button>
        <button type="button" onClick={navigateToRegister}>Go to Register</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div> // Display success message
      )}
    </div>
  );
};

export default Login;

