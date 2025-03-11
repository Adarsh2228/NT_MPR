// const Chat = require("../models/Chat");
// const mongoose = require("mongoose");

// // Send a message
// exports.sendMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, message, senderName } = req.body;

//     const newMessage = new Chat({ senderId, receiverId, message, senderName });
//     await newMessage.save();

//     // Emit the new message via Socket.io
//     const io = req.app.get("io");
//     io.emit("newMessage", newMessage);

//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message." });
//   }
// };

// // Fetch messages between two users
// exports.getMessages = async (req, res) => {
//   const { businessId, userId } = req.params;
//   try {
//     const messages = await Chat.find({
//       $or: [
//         { senderId: userId, receiverId: businessId },
//         { senderId: businessId, receiverId: userId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch messages." });
//   }
// };

// // Fetch chat requests for a business owner
// exports.getChatRequests = async (req, res) => {
//   const { businessId } = req.params;
//   try {
//     const chatRequests = await Chat.aggregate([
//       { $match: { receiverId: mongoose.Types.ObjectId(businessId) } },
//       {
//         $group: {
//           _id: "$senderId",
//           senderName: { $first: "$senderName" },
//           lastMessage: { $last: "$message" },
//           timestamp: { $last: "$timestamp" },
//         },
//       },
//       { $sort: { timestamp: -1 } },
//     ]);

//     if (!chatRequests || chatRequests.length === 0) {
//       return res.status(404).json({ message: "No chat requests found." });
//     }

//     res.status(200).json(chatRequests);
//   } catch (error) {
//     console.error("Error fetching chat requests:", error);
//     res.status(500).json({ error: "Failed to fetch chat requests." });
//   }
// };







// const Chat = require("../models/Chat");
// const mongoose = require("mongoose");




// // Send a message
// exports.sendMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, message, senderName } = req.body;
//     const newMessage = new Chat({ senderId, receiverId, message, senderName });
//     await newMessage.save();
    
//     req.app.get("io").emit("newMessage", newMessage);
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// };

// // Get Messages
// exports.getMessages = async (req, res) => {
//   try {
//     const messages = await Chat.find({
//       $or: [
//         { senderId: req.params.userId, receiverId: req.params.businessId },
//         { senderId: req.params.businessId, receiverId: req.params.userId }
//       ]
//     }).sort({ timestamp: 1 });
    
//     res.json(messages);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// };


// exports.getChatRequests = async (req, res) => {
//   try {
//     const requests = await Chat.aggregate([
//       { $match: { receiverId: new mongoose.Types.ObjectId(req.params.businessId) } },
//       {
//         $group: {
//           _id: "$senderId",
//           senderName: { $first: "$senderName" },
//           lastMessage: { $last: "$message" },
//           timestamp: { $last: "$timestamp" }
//         }
//       },
//       { $sort: { timestamp: -1 } }
//     ]);
//     res.json(requests);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch chat requests' });
//   }
// };
// // Fetch chat history between a user and a business
// exports.getChatHistory = async (req, res) => {
//   const { userId, businessId } = req.params;

//   try {
//     // Validate IDs
//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(businessId)) {
//       return res.status(400).json({ error: "Invalid user or business ID" });
//     }

//     // Fetch messages
//     const messages = await Chat.find({
//       $or: [
//         { senderId: userId, receiverId: businessId },
//         { senderId: businessId, receiverId: userId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//     res.status(500).json({ error: "Failed to fetch chat history." });
//   }
// };





// const Chat = require("../models/Chat");
// const mongoose = require("mongoose");


// // Send a message
// exports.sendMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, message, senderName } = req.body;

//     // Validate required fields
//     if (!senderId || !receiverId || !message || !senderName) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Create and save the new message
//     const newMessage = new Chat({ senderId, receiverId, message, senderName });
//     await newMessage.save();

//     // Emit the new message via WebSocket (if applicable)
//     req.app.get("io").emit("newMessage", newMessage);

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// };

// // Get Messages
// exports.getMessages = async (req, res) => {
//   try {
//     const messages = await Chat.find({
//       $or: [
//         { senderId: req.params.userId, receiverId: req.params.businessId },
//         { senderId: req.params.businessId, receiverId: req.params.userId }
//       ]
//     }).sort({ timestamp: 1 });

//     res.json(messages);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// };

// // Fetch chat history between a user and a business
// exports.getChatHistory = async (req, res) => {
//   const { userId, businessId } = req.params;

//   try {
//     // Validate IDs
//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(businessId)) {
//       return res.status(400).json({ error: "Invalid user or business ID" });
//     }

//     // Fetch messages
//     const messages = await Chat.find({
//       $or: [
//         { senderId: userId, receiverId: businessId },
//         { senderId: businessId, receiverId: userId },
//       ],
//     }).sort({ timestamp: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//     res.status(500).json({ error: "Failed to fetch chat history." });
//   }
// };

// // Fetch chat requests for a business
// exports.getChatRequests = async (req, res) => {
//   try {
//     const { businessId } = req.params;

//     // Validate the businessId
//     if (!mongoose.Types.ObjectId.isValid(businessId)) {
//       return res.status(400).json({ error: "Invalid business ID" });
//     }

//     // Group chat requests by senderId
//     const requests = await Chat.aggregate([
//       { $match: { receiverId: new mongoose.Types.ObjectId(businessId) } },
//       {
//         $group: {
//           _id: "$senderId",
//           senderName: { $first: "$senderName" },
//           lastMessage: { $last: "$message" },
//           timestamp: { $last: "$timestamp" },
//         },
//       },
//       { $sort: { timestamp: -1 } }, // Sort by most recent message
//     ]);

//     res.status(200).json(requests);
//   } catch (error) {
//     console.error("Error fetching chat requests:", error);
//     res.status(500).json({ error: "Failed to fetch chat requests" });
//   }
// };





















const Chat = require("../models/Chat");
const mongoose = require("mongoose");

// Send a message
// Updated sendMessage controller
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message, senderName } = req.body;

    // Validate request body
    const missingFields = [];
    if (!senderId) missingFields.push('senderId');
    if (!receiverId) missingFields.push('receiverId');
    if (!message) missingFields.push('message');
    if (!senderName) missingFields.push('senderName');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Create and save message
    const newMessage = new Chat({
      senderId,
      receiverId,
      message,
      senderName,
      timestamp: new Date()
    });

    await newMessage.save();

    // Broadcast to all connected clients
    const io = req.app.get('io');
    io.emit('newMessage', newMessage.toObject()); // Send plain JS object

    res.status(201).json(newMessage);
    
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      error: 'Message send failed',
      details: error.message
    });
  }
};

// Get Messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Chat.find({
      $or: [
        { senderId: req.params.userId, receiverId: req.params.businessId },
        { senderId: req.params.businessId, receiverId: req.params.userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Fetch chat history between a user and a business
exports.getChatHistory = async (req, res) => {
  const { userId, businessId } = req.params;

  try {
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ error: "Invalid user or business ID" });
    }

    // Fetch messages
    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: businessId },
        { senderId: businessId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history." });
  }
};

// Fetch chat requests for a business
exports.getChatRequests = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Validate the businessId
    if (!mongoose.Types.ObjectId.isValid(businessId)) {
      return res.status(400).json({ error: "Invalid business ID" });
    }

    // Group chat requests by senderId
    const requests = await Chat.aggregate([
      { $match: { receiverId: new mongoose.Types.ObjectId(businessId) } },
      {
        $group: {
          _id: "$senderId",
          senderName: { $first: "$senderName" },
          lastMessage: { $last: "$message" },
          timestamp: { $last: "$timestamp" },
        },
      },
      { $sort: { timestamp: -1 } }, // Sort by most recent message
    ]);

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching chat requests:", error);
    res.status(500).json({ error: "Failed to fetch chat requests" });
  }
};