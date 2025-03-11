import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from './profileComponents/PostList'; // Ensure correct path
import './BusinessPromotion.css'; // Import the CSS file

const BusinessPromotion = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all posts when component mounts
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Fetch all posts associated with any business
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/posts'); // Adjusted to fetch all posts
      setPosts(response.data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Handle errors during API requests
  const handleRequestError = (error) => {
    console.error('Error fetching data:', error);
    if (error.response) {
      setError(`Could not fetch data: ${error.response.data.error || 'Unknown error'}`);
    } else if (error.request) {
      setError('No response received from the server.');
    } else {
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h2>Business Promotion Page</h2>
      </header>

      {/* Render list of posts */}
      <div className="posts-container">
        <PostList posts={posts} error={error} />
      </div>
    </div>
  );
};

export default BusinessPromotion;
