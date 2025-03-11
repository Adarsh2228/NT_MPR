import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { QRCodeCanvas } from "qrcode.react";
import "./PostList.css";

const PostList = ({ posts = [], error }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [commentVisible, setCommentVisible] = useState({});
  const [comments, setComments] = useState({});
  const [postComments, setPostComments] = useState({});
  const [shareLinks, setShareLinks] = useState({});
  const [activeQR, setActiveQR] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);

  // Load likes and comments from localStorage on component mount
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedPosts")) || {};
    const storedLikeCounts = JSON.parse(localStorage.getItem("likeCounts")) || {};
    const storedPostComments = JSON.parse(localStorage.getItem("postComments")) || {};

    setLikedPosts(storedLikes);
    setLikeCounts(storedLikeCounts);
    setPostComments(storedPostComments);
  }, []);

  // Save likes and comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    localStorage.setItem("likeCounts", JSON.stringify(likeCounts));
    localStorage.setItem("postComments", JSON.stringify(postComments));
  }, [likedPosts, likeCounts, postComments]);

  // Toggle Like Button with Counter
  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [postId]: prev[postId] ? prev[postId] + (likedPosts[postId] ? -1 : 1) : 1,
    }));
  };

  // Toggle Comment Section
  const toggleCommentVisibility = (postId) => {
    setCommentVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle Comment Input
  const handleCommentChange = (postId, event) => {
    setComments((prev) => ({
      ...prev,
      [postId]: event.target.value,
    }));
  };

  // Submit Comment
  const submitComment = (postId) => {
    if (!comments[postId]?.trim()) return;

    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comments[postId].trim()],
    }));

    setComments((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  // Generate Shareable URL
  const generateShareLink = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    setShareLinks((prev) => ({
      ...prev,
      [postId]: url,
    }));
    setActiveQR(postId);
  };

  // Close QR Modal
  const closeQRModal = () => {
    setActiveQR(null);
  };

  // Expand Post
  const expandPost = (post) => {
    setExpandedPost(post);
  };

  // Close Expanded View
  const closeExpandedView = () => {
    setExpandedPost(null);
  };

  return (
    <div className="post-grid">
      {error && <p className="error-message">{error}</p>}
      {posts.length === 0 && <p>No posts available.</p>}

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          {/* Media Section */}
          {post.images?.length > 0 && (
            <img
              src={`http://localhost:4000/${post.images[0]}`}
              alt="Post"
              className="post-thumbnail"
              onClick={() => expandPost(post)}
            />
          )}
          {post.videos?.length > 0 && (
            <video className="post-thumbnail" controls onClick={() => expandPost(post)}>
              <source src={`http://localhost:4000/${post.videos[0]}`} type="video/mp4" />
            </video>
          )}

          {/* Post Actions */}
          <div className="post-actions">
            <button className="action-button" onClick={() => toggleLike(post._id)}>
              <FontAwesomeIcon icon={faHeart} className={likedPosts[post._id] ? "liked" : ""} />
              <span className="like-count">{likeCounts[post._id] || 0}</span>
            </button>
            <button className="action-button" onClick={() => toggleCommentVisibility(post._id)}>
              <FontAwesomeIcon icon={faComment} />
            </button>
            <button className="action-button" onClick={() => generateShareLink(post._id)}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <button className="action-button" onClick={() => expandPost(post)}>
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </button>
          </div>

          {/* Comment Section */}
          {commentVisible[post._id] && (
            <div className="comment-section">
              {/* Past Comments */}
              <div className="past-comments">
                {postComments[post._id]?.map((comment, index) => (
                  <p key={index} className="comment" style={{ color: "black" }}>
                    <strong>User:</strong> {comment}
                  </p>
                ))}
              </div>

              {/* Comment Input */}
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comments[post._id] || ""}
                  onChange={(e) => handleCommentChange(post._id, e)}
                />
                <button className="submit-comment" onClick={() => submitComment(post._id)}>
                  Post
                </button>
              </div>
            </div>
          )}

          {/* QR Code Modal */}
          {activeQR === post._id && (
            <div className="qr-modal" onClick={closeQRModal}>
              <div className="qr-content">
                <QRCodeCanvas value={shareLinks[post._id]} size={150} />
                <p>Share this post:</p>
                <input type="text" readOnly value={shareLinks[post._id]} />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Full Post View Modal */}
      {expandedPost && (
        <div className="full-post-modal" onClick={closeExpandedView}>
          <div className="full-post-content">
            {expandedPost.images?.length > 0 && (
              <img src={`http://localhost:4000/${expandedPost.images[0]}`} alt="Post" />
            )}
            {expandedPost.videos?.length > 0 && (
              <video controls>
                <source src={`http://localhost:4000/${expandedPost.videos[0]}`} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;