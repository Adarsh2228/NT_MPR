// const express = require("express");
// const router = express.Router();
// const chatController = require("../controllers/chatController");

// router.post("/send", chatController.sendMessage);
// router.get("/:businessId/:userId", chatController.getMessages);
// router.get("/requests/:businessId", chatController.getChatRequests);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const chatController = require("../controllers/chatController");

// router.post("/send", chatController.sendMessage);
// router.get("/requests/:businessId", chatController.getChatRequests);
// router.get("/history/:userId/:businessId", chatController.getChatHistory); // New route

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const chatController = require("../controllers/chatController");

// router.post("/send", chatController.sendMessage);
// router.get("/messages/:userId/:businessId", chatController.getMessages); // Updated route
// router.get("/history/:userId/:businessId", chatController.getChatHistory); // New route

// module.exports = router;




const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/send", chatController.sendMessage);
router.get("/messages/:userId/:businessId", chatController.getMessages);
router.get("/history/:userId/:businessId", chatController.getChatHistory);
router.get("/requests/:businessId", chatController.getChatRequests);

module.exports = router;
