const { checkSession, getId, getUserSession } = require("../../session.js");

module.exports = function (token, id) {
  let userID;

  if (!id) {
    if (checkSession(token)) {
      userID = getId(token);
    }
  }

  const numberOfSessions = getUserSession(token ? userID : id).length;

  if (numberOfSessions > 0) {
    return "Online";
  } else {
    return "Offline";
  }
}