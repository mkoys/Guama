const {checkSession, getId, getUserSession} = require("../../session.js");

module.exports = function(token) {
  let userID;
  
  if(checkSession(token)) {
    userID = getId(token);
  }

  const numberOfSessions = getUserSession(userID).length;

  if(numberOfSessions > 0) {
    return "Online";
  }else{
    return "Offline";
  }
}