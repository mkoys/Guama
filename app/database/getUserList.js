// Import database connection
const mongodb = require("../../connect.js");

// Import getID from token
const { getId } = require("../../session.js");

// Get user data database call
const getUserData = require("./getUserData.js");

// Exports function that gets all users list of users
module.exports = async function getUserList(token) {
  // Result store
  let result = {
    friends: [],
    send: [],
    pending: [],
    blocked: []
  }

  // Get database
  const database = mongodb.get();

  // Set database collection to users
  const users = database.collection("users");

  // Find requesting user based on token
  const requestUser = await users.findOne({ id: getId(token) });

  // Get keys in result
  let resultKeys = Object.keys(result);

  /* For each result id in result keys find 
  that user with his data and push him into 
  results array */
  for (let z = 0; z < resultKeys.length; z++) {
    for (let x = 0; x < requestUser.connect[resultKeys[z]].length; x++) {
      // Find User in Database
      const user = await getUserData(
      { token: token },
      { id: requestUser.connect[resultKeys[z]][x] },
      { inherit: true }
      );
      
      // Push to result
      result[resultKeys[z]].push(user);
    }
  }

  // Return result
  return result
}