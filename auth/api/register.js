// Import in Express
const express = require("express");

// Import input schema
const inputSchema = require("../schema/checkRegister.js");

// Create Express Router
const router = express.Router();

// Register Route
router.post("/", (req, res) => {
    // Get data from request body
    const data = req.body;

    // Store input check in variable
    const inputCheckResult = inputSchema(data);

    // Input check Error Handler
    /* If we have more then one message set status 
    code and respond with error messagtes else just 
    send the status code */
    if (inputCheckResult.messages.length > 0) {
        res.status(inputCheckResult.code);
        res.json({ error: inputCheckResult.messages });
    } else {
        res.sendStatus(inputCheckResult.code);
    }
});

// Export router
module.exports = router;