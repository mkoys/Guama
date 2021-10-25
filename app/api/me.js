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

// Me Route
router.get("/", async (req, res) => {
  const data = await getUserData(null, {token: req.token});

  res.json(data);
});

// Export router
module.exports = router;
