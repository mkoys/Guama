// Import database connection
const mongodb = require("../../connect.js");

const sokcetIo = require("../../socket.js");

// Import getID from token
const { getId } = require("../../session.js");

module.exports = async function sendMessage(id, token, content) {
  id = parseInt(id);

  const io = sokcetIo.get();

  const database = mongodb.get();

  const users = database.collection("users");
  const messages = database.collection("messages");

  const userId = getId(token);

  if (userId == id) {
    return { error: "Can't send message to yourself" };
  }

  const recever = await users.findOne({ id: id });

  if (recever.connect.blocked.indexOf(userId) != -1) {
    return { error: "You can't send messages to this user" };
  }

  messages.insertOne({
    members: [userId, id],
    by: userId,
    content: content,
    timestamp: new Date().getTime()
  });

  io.to(id).to(userId).emit("message", {
    user: userId,
    recever: id,
    content: content
  });

  return {};
}