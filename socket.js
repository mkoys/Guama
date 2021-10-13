// Import Socket
const { Server } = require("socket.io");

// Socket variable
let io = null;

module.exports = {
    // Inits server 
    init: async (server) => {
        // New server
        io = new Server(server);
        // Return socket object
        return io;
    },
    // Return socket object
    get: () => {
        return io;
    }
}