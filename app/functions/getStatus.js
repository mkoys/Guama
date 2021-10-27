// Import session functions
const { checkSession, getId, getUserSession } = require("../../session.js");

// Export fucntion that will return status based on number of current sessions
module.exports = function (token, id) {
  let userID; // User id store

  // Id no ID set check for token from session and tthen set it to id store
  if (!id) {
    if (checkSession(token)) {
      userID = getId(token);
    }
  }

  // Get number of sessionsby providing eather token or id;
  const numberOfSessions = getUserSession(token ? userID : id).length;

  // Return status based on number of sessions
  if (numberOfSessions > 0) {
    return "Online";
  } else {
    return "Offline";
  }
}