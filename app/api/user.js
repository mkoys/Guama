// Import in NPM modules
const express = require("express");

// Import middleware
const checkSession = require("../middleware/checkSession.js");

// Import database calls
const getUserData = require("../database/getUserData.js");
const addUser = require("../database/addUser.js");
const answerUser = require("../database/answerUser.js");
const removeUser = require("../database/removeUser.js");

// Create Express Router
const router = express.Router();

// Check if user has a session
router.use(checkSession);

// Get user info Route
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await getUserData(null, id, {inherit: true});

  res.json(data);
});

// Add user by ID
router.get("/add/:id", async (req, res) => {
  const id = req.params.id;

  const result = await addUser(id, req.token);

  res.json(result);
});

// Remove user by ID
router.get("/remove/:id", async (req, res) => {
  const id = req.params.id;

  const result = await removeUser(id, req.token);

  res.json(result);
});

// Answer user by ID with answer
router.post("/answer/:id", async (req, res) => {
  const id = req.params.id;

  const answer = req.body.answer;

  if(!answer) {
    return res.sendStatus(400);
  }

  if(!Number.isInteger(answer)) {
    return res.sendStatus(400);
  }

  const result = await answerUser(id, req.token, answer);

  res.json(result);
});

// Export router
module.exports = router;
