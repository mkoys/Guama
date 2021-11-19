// Import database connection
const mongodb = require("../../connect.js");

module.exports = async function({username}) {
  const database = mongodb.get();

  const users = database.collection("users");

  let result = [];

  const found = await users.find({username: new RegExp(username, "gi")}).limit(10).toArray();

  found.forEach(user => {
    result.push({id: user.id, username: user.displayName})
  });

  return result;
}