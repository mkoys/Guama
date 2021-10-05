// Import in Express
const express = require("express");

// Create Express Router
const router = express.Router();

// Register Route
router.post("/", (req, res) => {
    const data = req.body;
});

// Export router
module.exports = router;