// Import socket IO
const socketIO = require("../../socket.js");

// Import database call
const getUserData = require("../database/getUserData.js");

/* Exprot function that will broadcast to every 
friend of user current status based on returned data */
module.exports = async function sendStatus(id) {
  // Get IO
  const io = socketIO.get();

  // Get all user data as root
  const userData = await getUserData(null, { id: id }, { root: true });

  // If user has friends
  if (userData.connect.friends) {
    // Loop over each user memeber and grab ID
    userData.connect.friends.forEach(user => {
      // Send status to user and friend member
      io.to(userData.id).to(user).emit("status", {
        user: userData.id,
        status: userData.status
      });
    });
  }
}