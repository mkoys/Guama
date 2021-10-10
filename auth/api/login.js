// Import in Express
const express = require("express");

// Import input schema
const inputSchema = require("../schema/checkLogin.js");

// Import input schema
const loginUser = require("../database/loginUser.js");

// Create Express Router
const router = express.Router();

// Register Route
router.post("/", async (req, res) => {
  // Get data from request body
  const data = req.body;

  // Store input check in variable
  const inputCheckResult = await inputSchema(data);

  // If input is valid
  if(inputCheckResult.code == 200) {
    // Try to login user and store return value
    const foundUser = await loginUser(data);

    /* Try login value if 1 user loggin succes 0 
    failed return message and status code */
    if(!foundUser) {
      inputCheckResult.messages.push("Wrong credentials");
      inputCheckResult.code = 400;
    }
  }

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