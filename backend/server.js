// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");

// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();
// const server = http.createServer(app);

// // Middleware for JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS Configuration
// const corsOptions = {
//   origin: process.env.CLIENT_URL || "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // Serve static files from the uploads directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((error) => {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   });

// // Import Routes
// const userRoutes = require("./routes/userRoutes");
// const businessRoutes = require("./routes/businessRoutes");
// const postRoutes = require("./routes/postRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const mlRoutes = require("./routes/mlRoutes");
// const questionRoutes = require("./routes/questionRoutes");
// const answerRoutes = require("./routes/answerRoutes");
// const chatRoutes = require("./routes/chatRoutes");

// // Use Routes
// app.use("/api/users", userRoutes);
// app.use("/api/businesses", businessRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/ml", mlRoutes);
// app.use("/api/questions", questionRoutes);
// app.use("/api/answers", answerRoutes);
// app.use("/api/chat", chatRoutes);

// // WebSocket Setup for Real-time Chat
// const io = new Server(server, {
//   cors: { origin: process.env.CLIENT_URL || "http://localhost:3000", methods: ["GET", "POST"] },
// });

// // Make io accessible to routes
// app.set("io", io);

// // Socket.IO connection handler
// io.on("connection", (socket) => {
//   console.log("🔗 User connected:", socket.id);

//   // Join a room based on chatId (businessId + userId)
//   socket.on("joinRoom", ({ chatId }) => {
//     socket.join(chatId);
//     console.log(`User joined room: ${chatId}`);
//   });

//   // Handle chat messages
//   socket.on("sendMessage", (messageData) => {
//     const { chatId } = messageData;
//     io.to(chatId).emit("receiveMessage", messageData);
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected:", socket.id);
//   });
// });

// // 404 Route Handler
// app.use((req, res) => {
//   res.status(404).json({ message: "API route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("❌ Global Error:", err.stack);
//   res.status(500).json({ message: "Internal Server Error", error: err.message });
// });

// // Start Server
// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection (Remove deprecated options)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(error => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");
const postRoutes = require("./routes/postRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/users", userRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);

// WebSocket Setup
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:3000" }
});

// Attach io to app
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Error Handlers
app.use((req, res) => res.status(404).json({ message: "API route not found" }));
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));