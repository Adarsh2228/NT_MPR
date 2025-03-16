<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";
import "./ChatPage.css";
>>>>>>> 022ac89 (ADARSH_ commit)

const ChatPage = () => {
  const { businessId, userId } = useParams();
  const [messages, setMessages] = useState([]);
<<<<<<< HEAD
  const [newMessage, setNewMessage] = useState('');
=======
  const [newMessage, setNewMessage] = useState("");
>>>>>>> 022ac89 (ADARSH_ commit)
  const [socket, setSocket] = useState(null);

  // Initialize WebSocket connection
  useEffect(() => {
<<<<<<< HEAD
    const newSocket = io('http://localhost:4000');
=======
    const newSocket = io("http://localhost:4000");
>>>>>>> 022ac89 (ADARSH_ commit)
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Fetch chat history when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`http://localhost:4000/api/chat/messages/${userId}/${businessId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
=======
        const response = await axios.get(
          `http://localhost:4000/api/chat/history/${userId}/${businessId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
>>>>>>> 022ac89 (ADARSH_ commit)
      }
    };

    fetchMessages();
  }, [businessId, userId]);

  // Listen for new messages via WebSocket
  useEffect(() => {
    if (socket) {
<<<<<<< HEAD
      socket.on('newMessage', (message) => {
        // Check if the message is relevant to this chat
=======
      socket.on("newMessage", (message) => {
>>>>>>> 022ac89 (ADARSH_ commit)
        if (
          (message.senderId === userId && message.receiverId === businessId) ||
          (message.senderId === businessId && message.receiverId === userId)
        ) {
<<<<<<< HEAD
          // Avoid duplicate messages by checking if the message already exists
          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some((msg) => msg._id === message._id);
            return isDuplicate ? prevMessages : [...prevMessages, message];
          });
=======
          setMessages((prevMessages) => [...prevMessages, message]);
>>>>>>> 022ac89 (ADARSH_ commit)
        }
      });
    }

    return () => {
      if (socket) {
<<<<<<< HEAD
        socket.off('newMessage');
=======
        socket.off("newMessage");
>>>>>>> 022ac89 (ADARSH_ commit)
      }
    };
  }, [socket, userId, businessId]);

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        senderId: userId,
        receiverId: businessId,
        message: newMessage,
<<<<<<< HEAD
        senderName: 'User', // Must match model requirement
      };

      // Send message to backend
      const response = await axios.post('http://localhost:4000/api/chat/send', messageData);

      // Clear input
      setNewMessage('');

      // Do not update local state here; let the WebSocket handle it
    } catch (error) {
      console.error('Error sending message:', error);
=======
        senderName: "User",
      };

      await axios.post("http://localhost:4000/api/chat/send", messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
>>>>>>> 022ac89 (ADARSH_ commit)
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="messages-list">
        {messages.map((message, index) => (
<<<<<<< HEAD
          <div key={index} className={message.senderId === userId ? 'sent' : 'received'}>
            <strong>{message.senderId === userId ? 'You' : 'Business'}:</strong> {message.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
=======
          <div
            key={index}
            className={message.senderId === userId ? "sent" : "received"}
            data-timestamp={new Date(message.createdAt).toLocaleTimeString()}
          >
            <strong>{message.senderId === userId ? "You" : "Business"}:</strong>{" "}
            {message.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>
          <FaPaperPlane /> Send
        </button>
      </div>
>>>>>>> 022ac89 (ADARSH_ commit)
    </div>
  );
};

export default ChatPage;