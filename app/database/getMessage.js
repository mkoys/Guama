// Import database connection
const mongodb = require("../../connect.js");

// Import getID from token
const { getId } = require("../../session.js");

module.exports = async function getMessage(token, id) {
  id = parseInt(id);

  const database = mongodb.get();

  const messages = database.collection("messages");

  const userId = getId(token);

  if (userId == id) {
    return { error: "Can't find messages by yourself" };
  }

  const found = await messages.find({members: {$all: [userId, id]}}).sort({timestamp: -1}).limit(5).toArray();

  found.forEach(msg => {
    delete msg["_id"];
  });

  return found;
}