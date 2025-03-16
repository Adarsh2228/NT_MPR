const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  senderId: { type: String, required: true }, // ID of the sender (user or business)
  receiverId: { type: String, required: true }, // ID of the receiver (user or business)
  message: { type: String, required: true }, // The message content
  senderName: { type: String, required: true }, // Name of the sender
  isFile: { type: Boolean, default: false }, // Whether the message is a file
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);