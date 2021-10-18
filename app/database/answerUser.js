// Import database connection
const mongodb = require("../../connect.js");

const sokcetIo = require("../../socket.js");

// Import getID from token
const { getId } = require("../../session.js");

module.exports = async function answerUser(id, token, answer) {
  id = parseInt(id);

  const io = sokcetIo.get();

  const database = mongodb.get();

  const users = database.collection("users");

  const userId = getId(token);

  if (userId == id) {
    return { error: "Can't answer yourself" };
  }

  const finder = await users.findOne({ id: userId });

  if (finder.connect.friends.indexOf(id) != -1) {
    return { error: "Already friends" };
  }

  if (finder.connect.pending.indexOf(id) == -1) {
    return { error: "No request from this user" };
  }

  if (answer == 1) {
    users.updateOne({ id: userId }, { $pull: { "connect.pending": id }, $push: { "connect.friends": id } });
    users.updateOne({ id: id }, { $pull: { "connect.send": userId }, $push: { "connect.friends": userId } });
  } else {
    users.updateOne({ id: userId }, { $pull: { "connect.pending": id } });
    users.updateOne({ id: id }, { $pull: { "connect.send": userId } });
  }

  io.to(id).to(userId).emit("answerUser", {
    answer: answer == 1 ? "Accepted" : "Declined" ,
    user: userId,
    added: id
  });
}