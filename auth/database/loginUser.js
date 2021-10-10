// Import NPM module
const bcrypt = require("bcrypt");

// Import session
const session = require("../../session.js");

// Import database connection
const mongodb = require("../../connect.js");

// Creates and saves user based on given data
module.exports = async function createUser(data) {
  // Found user variable
  let foundUser;

  // Get database
  const database = mongodb.get();

  // Set database collection to users
  const users = database.collection("users");

  // Find user based on username or email
  if(data.email) {
    foundUser = await users.findOne({email: data.email.toLowerCase()});
  }else {
    foundUser = await users.findOne({username: data.username.toLowerCase()});
  }

  // If no user was found return 0
  if(!foundUser) {
    return 0;
  }

  // Compare hash password to string password
  const passwordResult = bcrypt.compareSync(data.password, foundUser.passcode);

  // Return 1 if hash is equal else return 0
  if(passwordResult) {
    // Create session
    session.createSession(data.token, foundUser.id);

    return 1;
  }else {
    return 0;
  }
}