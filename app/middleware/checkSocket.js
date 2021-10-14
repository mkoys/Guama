// Import session
const session = require("../../session.js");

module.exports = (socket, next) => {
  let token;

  if (Object.keys(socket.handshake.auth).length != 0) {
    token = socket.handshake.auth;
  } else if (socket.handshake.headers.auth) {
    token = socket.handshake.headers.auth;
  } else {
    next(new Error("No token provided"));
  }

  const check = session.checkSession(token);

  if (check) {
    socket.token = token;
    session.appendSocket(socket.id, socket.token);
    
    next();
  } else {
    next(new Error("Invalid token"));
  }
}