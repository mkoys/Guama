// Import database connection
const mongodb = require("../../connect.js");

const sokcetIo = require("../../socket.js");

// Import getID from token
const { getId } = require("../../session.js");

module.exports = async function addUser(id, token) {
  id = parseInt(id);

  const io = sokcetIo.get();

  const database = mongodb.get();

  const users = database.collection("users");

  const userId = getId(token);

  if (userId == id) {
    return { error: "Can't add yourself" };
  }

  const finder = await users.findOne({ id: userId });
  const responder = await users.findOne({ id: id });

  if (!responder) {
    return { error: "No user found" };
  }

  if (finder.connect.send.indexOf(id) != -1) {
    return { error: "Request already send" };
  }

  if (finder.connect.pending.indexOf(id) != -1) {
    return { error: "Already have request from user" };
  }

  if (finder.connect.friends.indexOf(id) != -1) {
    return { error: "Already friends" };
  }

  users.updateOne({ id: userId }, { $push: { "connect.send": id } });
  users.updateOne({ id: id }, { $push: { "connect.pending": userId } });

  io.to(id).to(userId).emit("addUser", {
    user: userId,
    added: id
  });
}