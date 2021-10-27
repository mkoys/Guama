const socketIO = require("../../socket.js");

const getUserData = require("../database/getUserData.js");

module.exports = async function sendStatus(id) {
  const io = socketIO.get();
  const userData = await getUserData(null, { id: id }, { root: true });

  if (userData || userData.connect.friends) {
    userData.connect.friends.forEach(user => {
      io.to(userData.id).to(user).emit("status", {
        user: userData.id,
        status: userData.status
      });
    });
  }
}