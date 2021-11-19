// Import in NPM modules
const express = require("express");

// Database calls
const sendMessage = require("../database/sendMessage.js");
const getMessages = require("../database/getMessages.js");

// Import middleware
const checkSession = require("../middleware/checkSession.js");

// Create Express Router
const router = express.Router();

// Check if user has a session
router.use(checkSession);

// POST route for sending messages
router.post("/send/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  if(typeof data.content != "string") {
    return res.sendStatus(400);
  }

  const result = await sendMessage(id, req.token, data.content);

  res.json(result);
});

// Get user chat by ID of user
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const messages = await getMessages(req.token, id);

  res.json(messages)
});

// Get All messages with users
router.get("/", async (req, res) => {
  const messages = await getMessages(req.token);

  res.json(messages)
});

// Export router
module.exports = router;
