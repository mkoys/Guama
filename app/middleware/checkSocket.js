// Import session
const session = require("../../session.js");

// Checks if socket has a fucntional session to connect to server
module.exports = (socket, next) => {
  // Token variable
  let token;

  // Checks if there are any keys in auth handshake if yes set it to token
  if (Object.keys(socket.handshake.auth).length != 0) {
    token = socket.handshake.auth;
    // Chek if header auth has token if yes set token as it
  } else if (socket.handshake.headers.auth) {
    token = socket.handshake.headers.auth;
  } else {
    // If no token return error
    return next(new Error("No token provided"));
  }

  // Check if token exist
  const check = session.checkSession(token);

  /* If token exist set socket.token and append socket 
  to session register and hop next else return error */
  if (check) {
    socket.token = token;
    // Get user id from token
    const userId = session.getId(token);
    // Join users socket room
    socket.join(userId);
    // Append socket to session
    session.appendSocket(socket, socket.token);
    
    next();
  } else {
    next(new Error("Invalid token"));
  }
}