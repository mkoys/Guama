// Import database connection
const mongodb = require("../../connect.js");

// Import getID from token
const { getId } = require("../../session.js");

module.exports = function(token) {
  const userId = getId(token);

  const messages = database.collection("messages");
}