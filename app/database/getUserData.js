// Import settings
const settings = require("../../settings.js");

// Import database connection
const mongodb = require("../../connect.js");

// Import getID from token
const { getId } = require("../../session.js");

// Findes and parses user based on given token
module.exports = async function getUserData(token) {

  // Items to delte from found user 
  const deleteArray = ["passcode", "_id", "status", "username"];

  // Get database
  const database = mongodb.get();

  // Set database collection to users
  const users = database.collection("users");

  // Inser user to database
  const foundUser = await users.findOne({ id: getId(token) });

  // Loop over each delte item and delte it
  for(let x = 0; x < deleteArray.length; x++) {
    delete foundUser[deleteArray[x]];
  }

  // Return parsed user
  return foundUser;
}