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
    return { error: "Can't remove yourself" };
  }

  const finder = await users.findOne({ id: userId });
  const responder = await users.findOne({ id: id });

  if (!responder) {
    return { error: "No user found" };
  }

  if (finder.connect.friends.indexOf(id) == -1) {
    return { error: "User is not your friend" };
  }

  users.updateOne({ id: userId }, { $pull: { "connect.friends": id } });
  users.updateOne({ id: id }, { $pull: { "connect.friends": userId } });

  io.to(id).to(userId).emit("removeUser", {
    user: userId,
    removed: id
  });
}