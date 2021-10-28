// Import database connection
const mongodb = require("../../connect.js");

// Import getID from token
const { getId } = require("../../session.js");

module.exports = async function getMessage(token, id) {

  const database = mongodb.get();

  const messages = database.collection("messages");

  const userId = getId(token);

  let found = [];

  if (id) {
    id = parseInt(id);

    if (userId == id) {
      return { error: "Can't find messages by yourself" };
    }

    found = await messages.find({ members: { $all: [userId, id] } }).sort({ timestamp: -1 }).limit(5).toArray();

    found.forEach(msg => {
      delete msg["_id"];
    });
  } else {
    const ids = await messages.distinct("members", { "members": userId });

    ids.splice(ids.indexOf(userId), 1);

    for(let x = 0;x < ids.length; x++) {
      let rawFound = await messages.find({members: ids[x]}).sort({timestamp: -1}).limit(1).toArray();

      rawFound.forEach(msg => {
        delete msg["_id"];
      });

      found.push(rawFound);
    }; 
  }

  return found;
}