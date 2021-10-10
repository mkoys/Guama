// Import Socket
const { Server } = require("socket.io");

// Dtabase variable
let io = null;

module.exports = {
    // Inits server connection to database
    init: async (server) => {
        // Async connection using client
        io = new Server(server);
        // Return database object
        return io;
    },
    // Return database object
    get: () => {
        return io;
    }
}