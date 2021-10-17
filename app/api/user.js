// Import in NPM modules
const express = require("express");

// Import middleware
const checkSession = require("../middleware/checkSession.js");

// Import database calls
const getUserData = require("../database/getUserData");

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

// Export router
module.exports = router;
